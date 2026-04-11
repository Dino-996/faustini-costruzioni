import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroDocumentCheck, heroChatBubbleLeft, heroHeart, heroMap, heroMapPin, heroStar, heroSwatch, heroArrowRight } from '@ng-icons/heroicons/outline';
import { CardCarouselComponent } from '../../components/card-carousel/card-carousel.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';
import { CallToActionComponent } from '../../components/call-to-action/call-to-action.component';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Steps } from '../../model/steps';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [
    NgIcon,
    CardCarouselComponent,
    TimelineComponent,
    TestimonialsComponent,
    CallToActionComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './home.component.html',
  viewProviders: [provideIcons({
    heroDocumentCheck,
    heroChatBubbleLeft,
    heroHeart,
    heroMap,
    heroMapPin,
    heroStar,
    heroSwatch,
    heroArrowRight,
  })]
})

export class HomeComponent implements OnInit, OnDestroy {

  private readonly seoService = inject(SeoService);

  readonly imagePath: string = '/assets/image/hero/hero-content-1.webp';
  readonly imageAlt: string = 'Geom. Sergio Macellaro';

  readonly signaturePath: string = '/assets/image/hero/hero-content-2.webp';
  readonly signatureAlt: string = 'Firma Geom. Sergio Macellaro';

  public bgImmagini = [
    { id: 0, url: '/assets/image/hero/hero-9.webp' },
    { id: 1, url: '/assets/image/hero/hero-2.webp' },
    { id: 2, url: '/assets/image/hero/hero-3.webp' },
    { id: 3, url: '/assets/image/hero/hero-4.webp' },
    { id: 4, url: '/assets/image/hero/hero-5.webp' },
    { id: 5, url: '/assets/image/hero/hero-6.webp' },
    { id: 6, url: '/assets/image/hero/hero-7.webp' },
    { id: 7, url: '/assets/image/hero/hero-8.webp' },
    { id: 8, url: '/assets/image/hero/hero-1.webp' },
  ]
  public idCorrente: number = 0;
  public idImmagineAttiva: number = this.bgImmagini[0].id;
  public intervalloImmaginiSfondo: any;

  public steps: Steps[] = [
    { id: 0, description: 'Progettazione' },
    { id: 1, description: 'Autorizzazione' },
    { id: 2, description: 'Esecuzione' },
    { id: 3, description: 'Consegna' },
  ];

  public testimonials = [
    { id: 0, avatar: '../assets/image/testimonials/andrea.webp', comment: 'Ho avuto il piacere di lavorare con Faustini Costruzioni per una ristrutturazione completa della mia casa. Puntuali e molto attenti ai dettagli. La qualità del lavoro è eccellente e il progetto è stato completato nei tempi previsti. Consigliatissimi!', name: 'Andrea R.', role: 'Geometra' },
    { id: 1, avatar: '../assets/image/testimonials/giulia.webp', comment: 'Un grazie speciale al Sig. Macellaro che ha realizzato il mio nuovo appartamento. Ha gestito ogni aspetto della costruzione con competenza e serietà, sempre disponibile per ogni richiesta. Sono davvero soddisfatta del risultato finale.', name: 'Giulia B.', role: 'Commercialista' },
    { id: 2, avatar: '../assets/image/testimonials/luca.webp', comment: 'Per il mio ufficio, ho optato per una ristrutturazione e non potevo fare scelta migliore. Velocità, qualità e precisione in ogni fase del lavoro. La mia attività è ora molto più funzionale!', name: 'Luca T.', role: 'Architetto' },
    { id: 3, avatar: '../assets/image/testimonials/marta.webp', comment: 'Ho richiesto una ristrutturazione completa di un immobile commerciale. Il team di Faustini Costruzioni ha dimostrato grande capacità. Il risultato è stato superiore alle aspettative', name: 'Marta S.', role: 'Sviluppatore immobiliare' },
    { id: 4, avatar: '../assets/image/testimonials/roberto.webp', comment: 'Un\'impresa seria e affidabile! Ho ristrutturato il mio appartamento e il risultato è stato eccezionale. Ottima qualità dei materiali e rispetto dei tempi di consegna. Consiglio vivamente!', name: 'Roberto P.', role: 'Responsabile acquisti' },
    { id: 5, avatar: '../assets/image/testimonials/francesca.webp', comment: 'Sono rimasta molto colpita dalla loro professionalità. Hanno realizzato la mia nuova casa con cura e attenzione ad ogni dettaglio. I lavori sono stati eseguiti in tempi rapidi e con il massimo rispetto delle le mie richieste', name: 'Francesca M.', role: 'Designer di d\'interni' }
  ];

  public progetti = [
    { id: 0, title: 'Area rupe', description: 'Un viaggio nel cuore storico di Vietri di Potenza, dove la pietra racconta secoli di storia e cultura', location: 'Vietri di Potenza', imageUrl: '/assets/progetti/area-rupe/area-rupe-1.webp', buttonLink: '/progetti/area-rupe' },
    { id: 1, title: 'Teatro Cecilia', description: 'Uno spazio vivo e vibrante dove arte, creatività e tecnologia si incontrano per dar vita a esperienze uniche', location: 'Tito', imageUrl: '/assets/progetti/teatro-cecilia/teatro-cecilia-2.webp', buttonLink: '/progetti/teatro-cecilia' },
    { id: 2, title: 'Viadotto Santa Venere', description: 'Ingegneria e funzionalità al servizio della mobilità: un’opera che unisce territori e persone', imageUrl: '/assets/progetti/viadotto-venere/viadotto-venere-1.webp', location: 'R.A. n. 5 Sicignano - Potenza', buttonLink: '/progetti/viadotto-svenere' },
    { id: 3, title: 'Galleria San Nicola', description: 'Un\'infrastruttura strategica realizzata con precisione e sicurezza per una viabilità più fluida e moderna', imageUrl: '/assets/progetti/galleria-san-nicola/galleria-san-nicola-2.webp', location: 'S.S. 658 Potenza - Melfi', buttonLink: '/progetti/galleria-snicola' },
  ];

  public ngOnInit(): void {
    // Ritardo avvio slideshow per non competere con il LCP
    setTimeout(() => {
      this.intervalloImmaginiSfondo = setInterval(() => this.cambiaImmagine(), 5000);
    }, 2000);
    this.setupSeoForPage();
  }

  public ngOnDestroy(): void {
    clearInterval(this.intervalloImmaginiSfondo);
  }

  private setupSeoForPage(): void {
    this.seoService.updateSeo({
      title: 'Faustini Costruzioni - Impresa Edile in Basilicata',
      description: 'Impresa edile specializzata in costruzioni pubbliche e private in Basilicata.',
      url: 'https://faustinicostruzioni.it/home',
      keywords: 'impresa edile, costruzioni, Basilicata'
    });
  }

  public getExperience() {
    return new Date().getFullYear() - 2008;
  }

  public getProject() {
    return this.getExperience() * 3;
  }

  public getCertification() {
    return this.getExperience() - 13;
  }

  public async cambiaImmagine(): Promise<void> {
    this.idCorrente = await this.trovaImmagine();
    const idSuccessivo = (this.idCorrente + 1) % this.bgImmagini.length;
    this.idImmagineAttiva = this.bgImmagini[idSuccessivo].id;
  }

  public async trovaImmagine(): Promise<number> {
    return this.bgImmagini.findIndex(immagine => immagine.id === this.idImmagineAttiva);
  }

}
