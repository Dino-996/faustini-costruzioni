import { ChangeDetectionStrategy, Component, computed, input, Input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroExclamationTriangle, heroInformationCircle, heroNoSymbol } from '@ng-icons/heroicons/outline';

type Tipologia = 'avvertimento' | 'messaggio' | 'errore';

@Component({
  selector: 'app-messaggio',
  imports: [
    NgIcon,
  ],
  providers: [provideIcons({
    heroInformationCircle,
    heroExclamationTriangle,
    heroNoSymbol
  })],
  templateUrl: './messaggio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessaggioComponent {

  // Inputs usando la nuova sintassi
  readonly tipologia = input.required<Tipologia>();
  readonly messaggio = input.required<string>();

  // Signals per gestire lo stato
  private readonly visibile = signal<boolean>(true);
  private readonly staUscendo = signal<boolean>(false);
  private readonly shouldRender = signal<boolean>(true);

  // Computed per la visibilità
  readonly isVisible = computed(() => this.shouldRender());

  // Computed per le classi del contenitore
  readonly containerClasses = computed(() => {
    const tipologia = this.tipologia();
    const baseClasses = this.getBaseClasses(tipologia);
    const animationClass = this.staUscendo() ? 'slide-out-down' : 'slide-in-up';

    return `${baseClasses} ${animationClass}`;
  });

  // Computed per il nome dell'icona
  readonly iconName = computed(() => {
    const tipologia = this.tipologia();
    switch (tipologia) {
      case 'avvertimento':
        return 'heroExclamationTriangle';
      case 'messaggio':
        return 'heroInformationCircle';
      case 'errore':
        return 'heroNoSymbol';
      default:
        return 'heroInformationCircle';
    }
  });

  // Computed per il testo screen reader
  readonly srOnlyText = computed(() => {
    const tipologia = this.tipologia();
    switch (tipologia) {
      case 'avvertimento':
        return 'Attenzione: ';
      case 'messaggio':
        return 'Informazione: ';
      case 'errore':
        return 'Errore! ';
      default:
        return '';
    }
  });

  // Computed per il testo prefisso
  readonly prefixText = computed(() => {
    const tipologia = this.tipologia();
    switch (tipologia) {
      case 'avvertimento':
        return 'Attenzione: ';
      case 'errore':
        return 'Errore! ';
      case 'messaggio':
      default:
        return '';
    }
  });

  private getBaseClasses(tipologia: Tipologia): string {
    switch (tipologia) {
      case 'avvertimento':
        return 'text-yellow-800 border border-yellow-300 bg-yellow-50';
      case 'messaggio':
        return 'text-blue-800 border border-blue-300 bg-blue-50';
      case 'errore':
        return 'text-red-800 border border-red-300 bg-red-50';
      default:
        return 'text-blue-800 border border-blue-300 bg-blue-50';
    }
  }

  chiudi(): void {
    this.staUscendo.set(true);

    // Usa un timeout che corrisponde alla durata dell'animazione CSS
    setTimeout(() => {
      this.visibile.set(false);
      this.staUscendo.set(false); // Reset dello stato per eventuali riutilizzi
    }, 300);
  }

  mostra(): void {
    this.staUscendo.set(false);
    this.visibile.set(true);
  }

}
