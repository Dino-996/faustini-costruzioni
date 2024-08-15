import {
  Component,
  ElementRef,
  signal,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ProjectsCards } from '../../interfaces/interface';
import { AnimationService } from '../animation.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf, NgFor],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements AfterViewInit, OnDestroy {
  projects: Array<ProjectsCards> = [
    {
      id: 0,
      fileimage:
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FareaRupe%2Fwork2.webp?alt=media&token=1d1e429c-8cb0-468e-b86d-9876f7dc4931',
      subfileimage: [
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FareaRupe%2Fwork2.webp?alt=media&token=1d1e429c-8cb0-468e-b86d-9876f7dc4931',
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FareaRupe%2Fwork3.webp?alt=media&token=cac204db-f424-46c8-9b94-ec888eb0bc74',
      ],
      title: 'Area Rupe',
      subtitle: 'Vietri di Potenza (PZ)',
      text: "L'area Rupe nel centro storico di Vietri di Potenza rappresenta un importante patrimonio culturale e storico della città. L'intervento di riqualificazione ha l'obiettivo di valorizzare e riqualificare questa zona, conservando e valorizzando le sue caratteristiche architettoniche e storiche, nonché migliorando la qualità urbana e il benessere dei cittadini",
    },
    {
      id: 1,
      fileimage:
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork4.webp?alt=media&token=71e9cc4a-530c-4562-98cb-5e12759c6d62',
      subfileimage: [
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork4.webp?alt=media&token=71e9cc4a-530c-4562-98cb-5e12759c6d62',
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork1.webp?alt=media&token=293e5dac-8bdb-4737-8519-ed6e12a8a8a9',
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FteatroCecilia%2Fwork5.webp?alt=media&token=16516fc9-df21-48fa-ac43-afd6d7af4e89',
      ],
      title: 'Teatro Cecilia',
      subtitle: 'Tito (PZ)',
      text: "Il Teatro Cecilia di Tito è un edificio storico situato in provincia di Potenza. Considerato il suo valore culturale e storico, l'obiettivo dell'intervento di efficientamento energetico è stato quello di migliorare la performance energetica dell'edificio riducendo consumi ed emissioni, senza compromettere l'integrità architettonica e storica dell'immobile",
    },
    {
      id: 2,
      fileimage:
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FsantaVenere%2Fwork6.webp?alt=media&token=7478b14c-f72c-44d1-95e9-532ba8173496',
      subfileimage: [
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FsantaVenere%2Fwork6.webp?alt=media&token=7478b14c-f72c-44d1-95e9-532ba8173496',
      ],
      title: 'Risanamento locale',
      subtitle: 'Viadotto S.Venere I e II R.A n.5 Sicignano - Potenza',
      text: "Abbiamo eseguito interventi di risanamento locale delle strutture del Viadotto S.Venere I e II R.A n.5 sulla tratta Sicignano - Potenza. Il nostro team di esperti ha effettuato un'analisi dettagliata delle condizioni strutturali del viadotto, identificando le aree critiche e i punti di degrado. Attraverso l'applicazione di tecniche e materiali avanzati, abbiamo proceduto con interventi mirati di ripristino e consolidamento delle strutture, garantendo la sicurezza, la durabilità e l'integrità del viadotto",
    },
    {
      id: 3,
      fileimage:
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FgalleriaSanNicola%2Fwork7.webp?alt=media&token=3ff0bdc1-8f3e-4514-8ca1-c7bf815a4a27',
      subfileimage: [
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FgalleriaSanNicola%2Fwork7.webp?alt=media&token=3ff0bdc1-8f3e-4514-8ca1-c7bf815a4a27',
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FgalleriaSanNicola%2Fwork8.webp?alt=media&token=0954a9a4-7f20-4bda-8fb0-646523ffff77',
      ],
      title: 'Galleria San Nicola',
      subtitle: 'SS 658 Potenza-Melfi',
      text: 'Abbiamo realizzato interventi di manutenzione straordinaria per il rivestimento e il ripristino corticale della galleria San Nicola sulla SS 658 Potenza-Melfi. Il nostro team di professionisti ha lavorato con precisione e competenza, applicando materiali di alta qualità per risolvere problemi di usura, deterioramento e degrado delle superfici interne della galleria. La nostra esperienza e professionalità hanno permesso di completare i lavori nel rispetto dei tempi di realizzazione e delle normative vigenti, assicurando la conservazione e la manutenzione ottimale delle infrastrutture stradali',
    },
    {
      id: 4,
      fileimage:
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FviadottoSicignanoPotenza%2Fwork9.webp?alt=media&token=7a1c859c-f2cf-4b5c-a7b4-d4a8a0977ea2',
      subfileimage: [
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FviadottoSicignanoPotenza%2Fwork9.webp?alt=media&token=7a1c859c-f2cf-4b5c-a7b4-d4a8a0977ea2',
      ],
      title: 'Viadotto autostradale',
      subtitle: 'Raccordo autostradale Sicignano - Potenza',
      text: "Il ripristino con malta tixotropica delle pile di viadotti sul raccordo autostradale Sicignano - Potenza ha permesso di riparare e rinforzare le strutture danneggiate, garantendo la sicurezza e la durabilità delle pile nel tempo. Attraverso l'applicazione di soluzioni tecnologicamente avanzate e l'utilizzo di materiali di alta qualità, abbiamo contribuito a prolungare la vita utile dei viadotti, minimizzando i rischi di cedimenti strutturali e garantendo la continuità e l'efficienza del collegamento autostradale tra la Campania e la Basilicata",
    },
    {
      id: 5,
      fileimage:
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FvietriDiPotenza%2Fwork11.webp?alt=media&token=a646fbd0-808d-4793-994f-25d6d7ab3071',
      subfileimage: [
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FvietriDiPotenza%2Fwork10.webp?alt=media&token=3a79cd61-216f-4dc5-8ab2-23b635658046',
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2FvietriDiPotenza%2Fwork11.webp?alt=media&token=a646fbd0-808d-4793-994f-25d6d7ab3071',
      ],
      title: 'Ripristino facciate',
      subtitle: 'Vietri di Potenza (PZ)',
      text: "Il ripristino facciate dell'edificio restituisce all'immobile un aspetto estetico rinnovato e valorizzato, migliorando la sua integrità architettonica e preservando il suo valore storico e patrimoniale. Grazie all'applicazione di soluzioni tecniche appropriate e all'utilizzo di materiali di alta qualità, l'edificio risplende in una nuova veste, riaffermando la sua presenza nel contesto urbano e contribuendo a valorizzare l'ambiente circostante",
    },
    {
      id: 6,
      fileimage:
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2Fidrodemolizione%2Fwork12.webp?alt=media&token=a96b3a53-00fb-4bc1-9989-d223081f036f',
      subfileimage: [
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2Fidrodemolizione%2Fwork13.webp?alt=media&token=eb276be0-e149-447a-b376-3526a23eceeb',
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/works%2Fidrodemolizione%2Fwork12.webp?alt=media&token=a96b3a53-00fb-4bc1-9989-d223081f036f',
        'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fidrodemolizioni.webp?alt=media&token=1a7c5727-0e49-48d2-aaa8-560870257cbe',
      ],
      title: 'Idrodemolizione',
      subtitle: 'Raccordo autostradale Sicignano - Potenza ',
      text: "Abbiamo trasformato le pile autostradali del raccordo 05 Sicignano-Potenza con la nostra tecnologia d'avanguardia di idrodemolizione. Grazie ai getti d'acqua ad alta pressione, abbiamo rimosso il calcestruzzo deteriorato con precisione chirurgica, salvaguardando la struttura d'acciaio e garantendo una durata senza pari. Se cerchi un intervento efficiente e di alta qualità per il rinnovamento delle infrastrutture, sei nel posto giusto",
    },
  ];
  displayedProjects: Array<ProjectsCards> = [];
  currentIndex: number = 0;
  projectsPerLoad: number = 3;
  isMore: boolean = false;
  totalSlides: number = 0;
  cardSelected: number = 0;
  index: number = 0;
  currentSlideIndex = 0;
  intervalID: any;
  imageUrls: string[] = [];
  scrollPosition: number = 0;
  isPlay: boolean = false;
  private scrollListenerProjectTitle!: () => boolean | void;
  private scrollListenerProjectCard!: () => boolean | void;
  public isAnimationProjectTitle = signal(false);
  public isAnimationProjectCard = signal(false);

  /**
   * Initializes a new instance of the ProjectComponent class.
   *
   * @param {ElementRef} elementRef - A reference to the DOM element.
   * @param {AnimationService} animationService - A service for handling animations.
   */
  constructor(
    private elementRef: ElementRef,
    private animationService: AnimationService
  ) {
    this.loadMoreProjects();
  }

  /**
   * Initializes the animation listeners for the project title and card after the view has been initialized.
   *
   * @return {void}
   */
  ngAfterViewInit(): void {
    const projectTitle =
      this.elementRef.nativeElement.querySelector('.projectTitle');
    const projectCard =
      this.elementRef.nativeElement.querySelector('.projectCard');
    this.scrollListenerProjectTitle = this.animationService.renderAnimation(
      projectTitle,
      600,
      this.isAnimationProjectTitle
    );
    this.scrollListenerProjectCard = this.animationService.renderAnimation(
      projectCard,
      600,
      this.isAnimationProjectCard
    );
  }

  /**
   * Destroys the component by cleaning up the animation listeners.
   *
   * @return {void}
   */
  ngOnDestroy(): void {
    if (this.scrollListenerProjectTitle) {
      this.scrollListenerProjectTitle();
    }
    if (this.scrollListenerProjectCard) {
      this.scrollListenerProjectCard();
    }
  }

  /**
   * Displays a modal with a slideshow of images.
   *
   * @param {string[]} imageUrls - An array of URLs for the images to be displayed in the slideshow.
   * @return {void} Nothing is returned.
   */
  showModal(imageUrls: string[]): void {
    this.imageUrls = imageUrls;
    const modal = document.getElementById('modal');
    modal?.classList.remove('hidden');
    document.body.classList.add('overflow-y-hidden');
    this.showSlide(this.currentSlideIndex);

    this.intervalID = setInterval(() => {
      this.currentSlideIndex =
        this.currentSlideIndex < imageUrls.length - 1
          ? this.currentSlideIndex + 1
          : 0;
      this.showSlide(this.currentSlideIndex);
    }, 2000);
  }

  /**
   * Displays the slide at the specified index in the slideshow.
   *
   * @param {number} index - The index of the slide to display.
   * @return {void} Nothing is returned.
   */
  showSlide(index: number): void {
    const sliderContainer = document.getElementById(
      'slider-container'
    ) as HTMLElement;
    const slideWidth =
      sliderContainer?.querySelector('.flex-shrink-0')?.clientWidth || 0;
    sliderContainer.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  /**
   * Hides the modal and stops the slideshow interval.
   *
   * @return {void} Nothing is returned.
   */
  hideModal(): void {
    const modal = document.getElementById('modal');
    modal?.classList.add('hidden');
    document.body.classList.remove('overflow-y-hidden');
    clearInterval(this.intervalID);
    this.isPlay = false;
  }

  /**
   * Loads and displays the next set of projects.
   *
   * @return {void} Nothing is returned.
   */
  loadMoreProjects(): void {
    const nextIndex = this.currentIndex + this.projectsPerLoad;
    const projectsToLoad = this.projects.slice(this.currentIndex, nextIndex);
    this.displayedProjects = [...this.displayedProjects, ...projectsToLoad];
    this.currentIndex = nextIndex;
  }

  /**
   * Stops the interval and toggles the value of isPlay.
   *
   * This function clears the interval using the clearInterval() method and toggles the value of the isPlay property.
   * It also logs the interval ID and the new value of isPlay to the console.
   *
   * @return {void} This function does not return anything.
   */
  stop(): void {
    clearInterval(this.intervalID);
    this.isPlay = !this.isPlay;
    console.log('Stop intervallo: ', this.intervalID);
    console.log('Valore booleano:', this.isPlay);
  }

  /**
   * Starts the slideshow interval and toggles the play state.
   *
   * This function sets an interval to automatically switch to the next slide every 2000 milliseconds.
   * It also toggles the value of the isPlay property to indicate whether the slideshow is currently playing.
   *
   * @return {void} Nothing is returned.
   */
  play(): void {
    this.intervalID = setInterval(() => {
      this.currentSlideIndex =
        this.currentSlideIndex < this.imageUrls.length - 1
          ? this.currentSlideIndex + 1
          : 0;
      this.showSlide(this.currentSlideIndex);
    }, 2000);
    this.isPlay = !this.isPlay;
    console.log('Inizio intervallo:', this.intervalID);
    console.log('Valore booleano:', this.isPlay);
  }
}
