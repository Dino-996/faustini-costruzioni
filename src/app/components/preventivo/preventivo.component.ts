import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy, viewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessaggioComponent } from '../messaggio/messaggio.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowPath, heroCalculator } from '@ng-icons/heroicons/outline';
import { Email } from '../../util/email';
import { Form } from '../../util/form';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Preventivo } from '../../model/preventivo';
import { collection, collectionData, CollectionReference, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-preventivo',
  imports: [
    ReactiveFormsModule,
    MessaggioComponent,
    NgIcon,
    NgOptimizedImage,
  ],
  providers: [provideIcons({
    heroCalculator,
    heroArrowPath
  })],
  templateUrl: './preventivo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PreventivoComponent implements OnInit {

  private readonly targetElement = viewChild<ElementRef>('target'); // Per gestire meglio lo scroll

  private readonly ORA_MILLISECONDI = 60 * 60 * 1000; // 1 ora in millisecondi
  private readonly DUE_ORE_MILLISECONDI = 2 * 60 * 60 * 1000; // 2 ore in millisecondi

  private readonly firestore = inject(Firestore);
  private readonly preventivi$: Observable<Preventivo[]>;
  private readonly collezionePreventiviRef: CollectionReference<Preventivo>;

  private readonly router = inject(Router);
  private readonly generaEmail = new Email(); // Classe di utilità

  public constructor() {
    this.collezionePreventiviRef = collection(this.firestore, 'preventivi') as CollectionReference<Preventivo>;
    this.preventivi$ = collectionData(this.collezionePreventiviRef, { idField: 'id' }) as Observable<Preventivo[]>;
  }

  // Signals
  public readonly loading = signal<boolean>(false);
  public readonly esito = signal<boolean | undefined>(undefined);
  public readonly sessioneCorrente = signal<number | null>(
    Number(localStorage.getItem('ultimaCompilazione')) || null
  );

  // Computed signals
  public readonly onMessaggioInviato = computed(() => {
    const timestamp = localStorage.getItem('ultimaCompilazione');

    if (!timestamp) {
      return false;
    }

    const ultimoTimestamp = Number(timestamp);
    const oraCorrente = new Date().getTime();

    return (oraCorrente - ultimoTimestamp) <= this.DUE_ORE_MILLISECONDI;
  });

  public readonly isTempoScaduto = computed(() => {
    const timestamp = this.sessioneCorrente();
    if (!timestamp) return true;

    const oraCorrente = Date.now();
    const scadenza = timestamp + this.ORA_MILLISECONDI;
    return oraCorrente >= scadenza;
  });

  public readonly tempoMancante = computed(() => {
    const timestamp = this.sessioneCorrente();
    if (!timestamp) return '0 minuti';

    const oraCorrente = Date.now();
    const scadenza = timestamp + this.ORA_MILLISECONDI;
    const millisecondiMancanti = scadenza - oraCorrente;

    if (millisecondiMancanti <= 0) {
      return '0 minuti';
    }

    const totaleMinuti = Math.ceil(millisecondiMancanti / (1000 * 60));
    const ore = Math.floor(totaleMinuti / 60);
    const minuti = totaleMinuti % 60;

    if (ore > 0 && minuti > 0) {
      return `${ore} ${ore === 1 ? 'ora' : 'ore'} e ${minuti} minuti`;
    } else if (ore > 0) {
      return `${ore} ${ore === 1 ? 'ora' : 'ore'}`;
    } else {
      return `${minuti} minuti`;
    }
  });

  // Form reattivo
  public readonly formPreventivo = new FormGroup<{
    nome: FormControl<string>;
    cognome: FormControl<string>;
    email: FormControl<string>;
    telefono: FormControl<string>;
    servizio: FormControl<string>;
    dettagli: FormControl<string>;
    privacy_policy: FormControl<boolean>;
  }>({
    nome: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    cognome: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    telefono: new FormControl('', {
      nonNullable: true,
    }),
    servizio: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    dettagli: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(2000),
      ],
      nonNullable: true,
    }),
    privacy_policy: new FormControl(false, {
      validators: [Validators.requiredTrue],
      nonNullable: true,
    }),
  });

  // Getter (da sostituire con computed)
  public get nome() { return this.formPreventivo.get('nome'); }
  public get cognome() { return this.formPreventivo.get('cognome'); }
  public get email() { return this.formPreventivo.get('email'); }
  public get telefono() { return this.formPreventivo.get('telefono'); }
  public get servizio() { return this.formPreventivo.get('servizio'); }
  public get dettagli() { return this.formPreventivo.get('dettagli'); }
  public get privacy_policy() { return this.formPreventivo.get('privacy_policy'); }

  public ngOnInit(): void {

    // -- DEBUG -- 
    localStorage.clear();
    this.esito.set(undefined);
    this.sessioneCorrente.set(0);


    /*if (this.isTempoScaduto()) {
      localStorage.clear();
      this.esito.set(undefined);
    }*/

  }

  public async richiestaPreventivo(): Promise<void> {
    if (!this.formPreventivo.valid || !this.isTempoScaduto()) {
      return;
    }

    const oraCorrente = new Date().getTime();
    this.loading.set(true);

    try {
      const formValues: Preventivo = this.formPreventivo.getRawValue();

      await this.generaEmail.inviaEmailPreventivo(
        new Form(formValues.nome).primaLetteraMaiuscola(),
        new Form(formValues.cognome).primaLetteraMaiuscola(),
        formValues.email.toLowerCase(),
        new Form(formValues.telefono!).telefonoInserito(),
        new Form(formValues.servizio).formattaTesto(),
        formValues.dettagli,
        new Form(formValues.privacy_policy).privacyPolicyAccettata()
      );

      await this.createPreventivo(this.formPreventivo.getRawValue());
      this.handleSuccessfulSubmission(oraCorrente);
    } catch (error) {
      this.handleSubmissionError();
    } finally {
      this.formPreventivo.reset();
    }
  }

  private handleSuccessfulSubmission(oraCorrente: number): void {
    this.esito.set(true);
    this.loading.set(false);

    // Scroll verso il target
    setTimeout(() => {
      if (this.targetElement) {
        this.targetElement()?.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 0);

    // Salva timestamp e reindirizza dopo un delay
    setTimeout(() => {
      localStorage.setItem('ultimaCompilazione', String(oraCorrente));
      this.sessioneCorrente.set(oraCorrente);
    }, 7000);

    setTimeout(() => this.redirezionaAllaHome(), 6000);
  }

  private handleSubmissionError(): void {
    this.esito.set(false);
    this.loading.set(false);
  }

  private async redirezionaAllaHome(): Promise<void> {
    await this.router.navigate(['/home']);
  }

    private async createPreventivo(preventivo: Preventivo): Promise<string> {
    try {
      const newDocRef = doc(this.collezionePreventiviRef);
      preventivo.id = newDocRef.id;

      await setDoc(newDocRef, preventivo);
      return newDocRef.id;
    } catch (error) {
      console.error("Errore durante la creazione del preventivo:", error);
      throw error;
    }
  }

  private readPreventivi(): Observable<Preventivo[]> {
    return this.preventivi$;
  }
}