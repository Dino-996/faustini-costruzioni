import { Component, ElementRef, OnDestroy, AfterViewInit, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Projects } from '../../interfaces/interface';
import { AnimationService } from '../animation.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent implements OnDestroy, AfterViewInit {

  projects: Array<Projects> = [
    {
      id: 0,
      title: 'Costruzioni Generali',
      image: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FcostruzioniGenerali.webp?alt=media&token=73fd9d18-5e91-4b24-a473-03711d49a5d2',
      description: 'Specializzati nella cura di edifici pubblici e privati, offriamo manutenzione, ristrutturazione e miglioramenti energetici e sismici per costruzioni sicure e durature',
      expanded: false
    },
    {
      id: 1,
      title: 'Lavori Edili e Stradali',
      image: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FlavoriStradali.webp?alt=media&token=ce87be66-0e3a-435b-9b05-f3f10265fa0c',
      description: 'Curiamo la salute delle strade, gestendo la manutenzione di viadotti, acque e sistemi di canalizzazione per garantire una circolazione fluida e sicura della comunità',
      expanded: false
    },
    {
      id: 2,
      title: 'Idrodemolizione',
      image: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fidrodemolizioni.webp?alt=media&token=1a7c5727-0e49-48d2-aaa8-560870257cbe',
      description: "Utilizziamo l'idrodemolizione per ripristinare ponti, viadotti e gallerie, eliminando i segni del tempo e rinnovando la stabilità delle infrastrutture essenziali",
      expanded: false
    },
    {
      id: 3,
      title: 'Restauro Conservativo',
      image: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Frestauro.webp?alt=media&token=989ba4d7-3016-440e-997e-a89aa98b5b67',
      description: "Preserviamo la storia degli edifici attraverso interventi conservativi che rinforzano le ossature, mantenendo l'estetica originale e permettendo al passato di dialogare con il futuro",
      expanded: false
    },
    {
      id: 4,
      title: 'Noleggio Ponteggi',
      image: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fponteggio.webp?alt=media&token=0b422240-f08e-432b-8ebc-af40e2ff7582',
      description: "Offriamo il noleggio di ponteggi e attrezzature",
      expanded: false
    }
  ];
  private scrollListenerTitleCard!: () => boolean | void;
  private scrollListenerTextCard!: () => boolean | void;
  private scrollListenerItemCard!: () => boolean | void;
  public isAnimationTitleCard = signal(false);
  public isAnimationTextCard = signal(false);
  public isAnimationItemCard = signal(false);

  constructor(private elementRef: ElementRef, private animationService: AnimationService) { }

  /**
   * Toggles the expanded state of a given project.
   *
   * @param {any} project - the project object to toggle the expanded state for
   * @return {void} no return value
   */
  toggleDescription(project: any): void {
    project.expanded = !project.expanded;
  }

  /**
   * Lifecycle hook that is called after the component's view has been initialized.
   * It sets up the animation listeners for the title, text, and item cards.
   *
   * @return {void}
   */
  ngAfterViewInit(): void {
    const titleCard = this.elementRef.nativeElement.querySelector('.titleCard');
    const textCard = this.elementRef.nativeElement.querySelector('.textCard');
    const itemCard = this.elementRef.nativeElement.querySelector('.itemCard');
    this.scrollListenerTitleCard = this.animationService.renderAnimation(titleCard, 600, this.isAnimationTitleCard);
    this.scrollListenerTextCard = this.animationService.renderAnimation(textCard, 600, this.isAnimationTextCard);
    this.scrollListenerItemCard = this.animationService.renderAnimation(itemCard, 600, this.isAnimationItemCard);
  }

  /**
   * Destroys the component and removes event listeners.
   *
   * Removes scroll event listeners for title card, text card, and item card.
   *
   * @return {void} No return value.
   */
  ngOnDestroy(): void {
    if (this.scrollListenerTitleCard) {
      this.scrollListenerTitleCard();
    }

    if (this.scrollListenerTextCard) {
      this.scrollListenerTextCard();
    }

    if (this.scrollListenerItemCard) {
      this.scrollListenerItemCard();
    }
  }
}
