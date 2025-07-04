import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRightCircle, heroMagnifyingGlass, heroArrowLongDown, heroArrowLongUp, heroClock, heroArrowRight, heroMagnifyingGlassCircle, heroXMark, heroArrowPath } from '@ng-icons/heroicons/outline';

type ordine = 'crescente' | 'decrescente';

@Component({
  selector: 'app-progetti',
  imports: [
    RouterOutlet,
    NgClass,
    FormsModule,
    NgIcon,
    RouterLink,
    NgOptimizedImage
  ],
  providers: [provideIcons({
    heroArrowRightCircle,
    heroMagnifyingGlass,
    heroArrowLongDown,
    heroArrowLongUp,
    heroClock,
    heroArrowRight,
    heroMagnifyingGlassCircle,
    heroArrowPath,
  })],
  templateUrl: './progetti.component.html',
})

export class ProgettiComponent {

  public route: ActivatedRoute = inject(ActivatedRoute);

  public termineDiRicerca: string = '';
  public ordine: string = 'crescente';
  public filtraProgetti: any;

  public progetti = [
    {
      id: 0,
      titolo: 'Viadotto Santa Venere',
      descrizione: 'Ingegneria e funzionalità al servizio della mobilità: un’opera che unisce territori e persone',
      immagine: '/assets/progetti/viadotto-venere/viadotto-venere-1.webp',
      anno: '2020',
      link: '/progetti/viadotto-svenere'
    },
    {
      id: 1,
      titolo: 'Area Rupe',
      descrizione: 'Un viaggio nel cuore storico di Vietri di Potenza, dove la pietra racconta secoli di storia e cultura',
      immagine: '/assets/progetti/area-rupe/area-rupe-1.webp',
      anno: '2022',
      link: '/progetti/area-rupe'
    },
    {
      id: 2,
      titolo: 'Galleria San Nicola',
      descrizione: 'Un\'infrastruttura strategica realizzata con precisione e sicurezza per una viabilità più fluida e moderna',
      immagine: '/assets/progetti/galleria-san-nicola/galleria-san-nicola-2.webp',
      anno: '2022',
      link: '/progetti/galleria-snicola'
    },
    {
      id: 3,
      titolo: 'Teatro Cecilia',
      descrizione: 'Uno spazio vivo e vibrante dove arte, creatività e tecnologia si incontrano per dar vita a esperienze uniche',
      immagine: '/assets/progetti/teatro-cecilia/teatro-cecilia-2.webp',
      anno: '2023',
      link: '/progetti/teatro-cecilia'
    },
  ]

  public isChildRoute(): boolean {
    return this.route.children.length > 0;
  }

  public progettiFiltrati() {
    this.filtraProgetti = this.progetti.filter(progetto => progetto.titolo.toLocaleLowerCase().includes(this.termineDiRicerca.toLocaleLowerCase()));
    return this.filtraProgetti;
  }

  public filtraPerData(ordine: ordine): void {
    this.ordine = ordine;
    console.log('Ordinamento:', ordine);
    const dataFiltrata = ordine === 'crescente' ?
      this.progetti.sort((a, b) => parseInt(a.anno) - parseInt(b.anno)) :
      this.progetti.sort((a, b) => parseInt(b.anno) - parseInt(a.anno))
    this.filtraProgetti = dataFiltrata;
  }

  public isNuovoProgetto(anno: string | number): boolean {
    const dataCorrente = new Date().getFullYear();
    let annoIntero: number = (typeof anno === 'string') ? parseInt(anno) : anno;
    return dataCorrente === annoIntero;
  }

  public resettaFiltri() {
    this.filtraPerData('crescente');
    this.filtraProgetti = '';
    this.termineDiRicerca = '';
  }
}