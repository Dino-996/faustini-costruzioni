import { Component, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Accordions } from '../../interfaces/interface';
import { AnimationService } from '../animation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgClass],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit, OnDestroy {

  fullYear = new Date().getFullYear();

  accordions: Accordions[] = [
    { id: 0, title: 'Dove offrite i vostri servizi?', content: 'Offriamo i nostri servizi in Basilicata e nelle regioni limitrofe', open: false },
    { id: 1, title: 'Offrite preventivi gratuito?', content: 'Certamente. Offriamo preventivi gratuiti per tutti i nostri servizi. Puoi contattarci attraverso il modulo di contatto sul nostro sito web, via email o telefonicamente per richiedere un preventivo personalizzato', open: false },
    { id: 2, title: "Siete un'impresa qualificata?", content: "Sì, siamo un'impresa qualificata con l'attestazione SOA in varie categorie, garantiamo professionalità e competenza nei nostri servizi", open: false },
    { id: 3, title: "L'idrodemolizione è sicura?", content: "La nostra tecnologia di idrodemolizione ad alta pressione permette una rimozione precisa del calcestruzzo senza danneggiare la struttura d'acciaio sottostante, garantendo un intervento efficace e duraturo", open: false },
    { id: 4, title: "Quali garanzie offrite sui vostri lavori?", content: "Offriamo garanzie sulla qualità e la durabilità dei nostri interventi. Inoltre, il nostro team di professionisti altamente qualificati assicura la massima precisione e attenzione ai dettagli in ogni lavoro", open: false }
  ];

  private scrollListenerFooterContainer!: () => boolean | void;
  public isAnimationFooterContainer = signal(false);

  constructor(private elementRef: ElementRef, private animationService: AnimationService) {}

  /**
   * Lifecycle hook that is called after a component's view has been initialized.
   *
   * This method is responsible for setting up the animation for the footer container.
   *
   * @return {void} No return value.
   */
  ngAfterViewInit(): void {
    const footerContainer = this.elementRef.nativeElement.querySelector('.footerContainer');
    this.scrollListenerFooterContainer = this.animationService.renderAnimation(footerContainer, 600, this.isAnimationFooterContainer);
  }

  /**
   * Destroys the component and cleans up any resources.
   *
   * Specifically, it checks if the scroll listener for the footer container is set and calls it to clean up.
   *
   * @return {void} No return value.
   */
  ngOnDestroy(): void {
    if (this.scrollListenerFooterContainer) {
      this.scrollListenerFooterContainer();
    }
  }

  /**
   * Toggles the open state of the given accordion.
   *
   * @param {Accordions} accordion - The accordion object to toggle.
   * @return {void} This function does not return anything.
   */
  toggleAccordion(accordion: Accordions): void {
    accordion.open = !accordion.open;
  }

}
