import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { heroArrowTopRightOnSquare, heroClock, heroEnvelope, heroMapPin, heroPaperAirplane, heroPhone } from '@ng-icons/heroicons/outline';
import { Email } from '../../util/email';
import { MessaggioComponent } from '../../components/messaggio/messaggio.component';
import { NgOptimizedImage } from '@angular/common';
import { InformazioniContatto, OpzioniOggetto, Orari } from '../../model/contatti';
import { Form } from '../../util/form';
import { bootstrapArrowClockwise } from '@ng-icons/bootstrap-icons';
import { Observable } from 'rxjs';
import { Messaggi } from '../../model/contatti';
import { collection, collectionData, CollectionReference, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-contatti',
  imports: [
    NgIcon,
    ReactiveFormsModule,
    MessaggioComponent,
    NgOptimizedImage,
    MessaggioComponent
  ],
  providers: [provideIcons({
    heroMapPin,
    heroPhone,
    heroEnvelope,
    heroClock,
    heroArrowTopRightOnSquare,
    heroPaperAirplane,
    bootstrapArrowClockwise
  })],
  templateUrl: './contatti.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ContattiComponent {

  private readonly targetElement = viewChild<ElementRef>('target');

  private readonly CHIUSO = 'Chiuso' as const;
  private readonly emailService = new Email();

  private readonly loading = signal<boolean>(false);
  private readonly esito = signal<boolean | undefined>(undefined);

  private readonly orari = signal<Orari[]>([
    { id: 0, giorno: 'Lunedì', orariMattina: '9:00 - 12:30', orariPomeriggio: '16:00 - 20:30' },
    { id: 1, giorno: 'Martedì', orariMattina: '9:00 - 12:30', orariPomeriggio: '16:00 - 20:30' },
    { id: 2, giorno: 'Mercoledì', orariMattina: '9:00 - 12:30', orariPomeriggio: '16:00 - 20:30' },
    { id: 3, giorno: 'Giovedì', orariMattina: '9:00 - 12:30', orariPomeriggio: '16:00 - 20:30' },
    { id: 4, giorno: 'Venerdì', orariMattina: '9:00 - 12:30', orariPomeriggio: '16:00 - 20:30' },
    { id: 5, giorno: 'Sabato', orariMattina: this.CHIUSO, orariPomeriggio: this.CHIUSO },
    { id: 6, giorno: 'Domenica', orariMattina: this.CHIUSO, orariPomeriggio: this.CHIUSO },
  ]);

  private readonly opzioniOggetto = signal<OpzioniOggetto[]>([
    { id: 0, value: 'richiestaPreventivo', label: 'Richiesta preventivo' },
    { id: 1, value: 'informazioni', label: 'Informazioni generali' },
    { id: 2, value: 'propostaDiCollaborazione', label: 'Proposta di collaborazione' },
    { id: 3, value: 'altro', label: 'Altro' }
  ]);

  private readonly informazioniContatto = signal<InformazioniContatto[]>([
    { id: 0, tipo: 'indirizzo', icona: 'heroMapPin', titolo: 'Indirizzo', informazioni: ['Corso Garibaldi, 82, 85058 Vietri di Potenza PZ'] },
    { id: 1, tipo: 'telefono', icona: 'heroPhone', titolo: 'Telefono', informazioni: ['0971 71 87 45', '+39 348 81 07 321'] },
    { id: 2, tipo: 'email', icona: 'heroEnvelope', titolo: 'Email', informazioni: ['faustini.costruzioni@gmail.it', 'faustini.costruzioni@pec.it'] }
  ]);

  private readonly firestore = inject(Firestore);
  private readonly messaggi$: Observable<Messaggi[]>;
  private collezioneMessaggiRef: CollectionReference<Messaggi>;

  public readonly formContatti = new FormGroup<{
    nome: FormControl<string>;
    cognome: FormControl<string>;
    email: FormControl<string>;
    telefono: FormControl<string>;
    oggetto: FormControl<string>;
    messaggio: FormControl<string>;
    privacy_policy: FormControl<boolean>;
  }>({
    nome: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    cognome: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    telefono: new FormControl('', { nonNullable: true }),
    oggetto: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    messaggio: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]
    }),
    privacy_policy: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] })
  });

  public constructor() {
    this.collezioneMessaggiRef = collection(this.firestore, 'messaggi') as CollectionReference<Messaggi>;
    this.messaggi$ = collectionData(this.collezioneMessaggiRef, { idField: 'id' }) as Observable<Messaggi[]>;
  }

  public readonly emailControl = computed(() => this.formContatti.controls.email);
  public readonly messaggioControl = computed(() => this.formContatti.controls.messaggio);
  public readonly getOrari = computed(() => this.orari());
  public readonly getOpzioniOggetto = computed(() => this.opzioniOggetto());
  public readonly getInformazioniContatto = computed(() => this.informazioniContatto());
  public readonly getLoading = computed(() => this.loading());
  public readonly getEsito = computed(() => this.esito());

  public async inviaMessaggio(): Promise<void> {

    this.loading.set(true);
    if (!this.formContatti.valid) { 
      return; 
    }

    try {
      // Salva su server
      await this.createMessaggio(this.formContatti.getRawValue());
      // Invia Email
      const formValue = this.formContatti.getRawValue();
      this.emailService.inviaEmailContatti(
        new Form(formValue.nome).primaLetteraMaiuscola(),
        new Form(formValue.cognome).primaLetteraMaiuscola(),
        formValue.email,
        new Form(formValue.telefono).telefonoInserito(),
        new Form(formValue.oggetto).formattaTesto(),
        formValue.messaggio,
        new Form(formValue.privacy_policy).privacyPolicyAccettata()
      );

      this.handleSuccessfulSubmission();
    } catch (error) {
      this.handleSubmissionError();
    } finally {
      this.formContatti.reset();
    }
  }

  private handleSuccessfulSubmission(): void {
    this.esito.set(true);
    this.loading.set(false);

    // Scroll verso il target
    setTimeout(() => {
      const element = this.targetElement();
      if (element?.nativeElement) {
        element.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      } else {
        console.warn('L\'elemento target per lo scrolling non è stato trovato');
      }
    }, 100);
    setTimeout(() => this.esito.set(undefined), 6000);
  }

  private handleSubmissionError(): void {
    this.esito.set(false);
    this.loading.set(false);
  }

  // Metodi per gestire classi di stile
  public getCellClasses(orario: string): string {
    return orario === this.CHIUSO ? 'px-4 py-2 text-red-400 font-medium' : 'px-4 py-2';
  }

  public getMobileTextClasses(orario: string): string {
    return orario === this.CHIUSO ? 'text-red-400 font-medium' : 'text-[#F5F5F5]';
  }

  public getButtonImageAnimation() {
    return this.loading()
      ? 'ml-3 animate-spin pointer-events-none cursor-not-allowed'
      : 'ml-3 transition-transform duration-300 group-hover:translate-x-1'
  }

  private async createMessaggio(messaggio: Messaggi): Promise<string> {
    try {
      const newDocRef = doc(this.collezioneMessaggiRef);
      messaggio.id = newDocRef.id;

      await setDoc(newDocRef, messaggio);
      return newDocRef.id;
    } catch (error) {
      console.error("Errore durante la creazione del preventivo:", error);
      throw error;
    }
  }

  private readMessaggi(): Observable<Messaggi[]> {
    return this.messaggi$;
  }
}