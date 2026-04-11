import { CurrencyPipe, DOCUMENT } from '@angular/common';
import { Component, inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tipoProgetto, materialiPrincipali } from '../../model/progetto';
import { heroXMark, heroChevronLeft, heroChevronRight } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-progetto',
  imports: [
    NgIcon,
    CurrencyPipe
  ],
  providers: [
    provideIcons({
      heroXMark,
      heroChevronLeft,
      heroChevronRight
    })],
  templateUrl: './progetto.component.html',
})

export class ProgettoComponent implements OnDestroy {

  public render = inject(Renderer2);
  private document = inject(DOCUMENT);

  public selectedImage: string | null = null;
  public currentImageIndex: number = 0;

  // Chiude sempre l'overlay quando il componente viene distrutto
  public ngOnDestroy(): void {
    this.chiudiOverlay();
  }

  // Metodi di input
  @Input({ alias: 'titoloProgetto', required: true })
  public titolo: string = '';
  @Input({ alias: 'tipoProgetto', required: true })
  public tipo: tipoProgetto = 'Residenziale';
  @Input({ alias: 'descrizioneBreveProgetto', required: true })
  public descrizioneBreve: string = 'Descrizione breve';
  @Input({ alias: 'descrizioneCompletaProgetto', required: true })
  public descrizioneCompleta: string = 'Descrizione completa';
  @Input({ alias: 'annoProgetto', required: true })
  public anno: number = new Date().getFullYear();
  @Input({ alias: 'clienteProgetto', required: true })
  public cliente: string = 'Nome cliente';
  @Input({ alias: 'ubicazioneProgetto', required: true })
  public ubicazione: string = 'Indirizzo';
  @Input({ alias: 'costoTotaleProgetto', required: true })
  public costoTotale: number = 0;
  @Input({ alias: 'tempoRealizzazioneProgetto', required: true })
  public tempoRealizzazione: string = '14 mesi';
  @Input({ alias: 'architettiProgetto', required: true })
  public architetti: string[] = [];
  @Input({ alias: 'ingegneriProgetto', required: false })
  public ingegneri: string[] = [];
  @Input({ alias: 'impresaAppaltatriceProgetto', required: true })
  public impresaAppaltatrice: string = 'Faustini Costruzioni S.r.l.';
  @Input({ alias: 'materialiPrincipaliProgetto', required: true })
  public materialiPrincipali: materialiPrincipali[] = [{ nome: 'Cemento', quantita: '220', fornitore: 'SolTech S.r.l' }, { nome: 'Cemento', quantita: '220', fornitore: 'SolTech S.r.l' }];
  @Input({ alias: 'galleriaProgetto', required: true })
  public galleria: string[] = ["https://picsum.photos/id/235/1800/1920", "https://picsum.photos/id/240/1800/1920", "https://picsum.photos/id/241/1800/1920"];
  @Input({ alias: 'planimetrieProgetto', required: true })
  public planimetrie: string[] = ["/assets/planimetrie/villa-pianta-esterno.pdf", "/assets/planimetrie/villa-pianta-interno.pdf"];
  @Input({ alias: 'certificazioniProgetto', required: true })
  public certificazioni: string[] = ["Certificazione energetica A4", "Certificazione antisismica"];
  @Input({ alias: 'linkAltriDettagliProgetto', required: true })
  public linkAltriDettagli: string = "https://google.com";

  // Naviga all'immagine precedente
  public immaginePrecedente(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }

  // Naviga all'immagine successiva
  public immagineSuccessiva(): void {
    if (this.currentImageIndex < this.galleria.length - 1) {
      this.currentImageIndex++;
    }
  }

  // Naviga direttamente all'immagine desiderata
  public restituisciImmagine(index: number): void {
    if (index >= 0 && index < this.galleria.length) {
      this.currentImageIndex = index;
    }
  }

  // Navigazione da tastiera
  public onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowLeft':
        this.immaginePrecedente();
        event.preventDefault();
        break;
      case 'ArrowRight':
        this.immagineSuccessiva();
        event.preventDefault();
        break;
      case 'Escape':
        this.chiudiOverlay();
        event.preventDefault();
        break;
    }
  }

  // Apre l'overlay immagini
  public apriOverlay(img: string): void {
    this.selectedImage = img;
    this.render.addClass(this.document.body, 'overflow-hidden');
  }

  // Chiude l'overlay immagini
  public chiudiOverlay(): void {
    this.selectedImage = null;
    this.render.removeClass(this.document.body, 'overflow-hidden');
  }

}