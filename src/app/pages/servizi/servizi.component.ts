import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight, heroCheckCircle } from '@ng-icons/heroicons/outline';
import { CallToActionComponent } from '../../components/call-to-action/call-to-action.component';
import { NgOptimizedImage } from '@angular/common';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-servizi',
  imports: [
    RouterOutlet,
    NgIcon,
    CallToActionComponent,
    NgOptimizedImage
  ],
  providers: [provideIcons({
    heroCheckCircle,
    heroArrowRight,


  })],
  templateUrl: './servizi.component.html',
})

export class ServiziComponent implements OnInit {

  private readonly seoService = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  public servizi = [
    {
      id: 0,
      titolo: 'Costruzioni generali',
      descrizione: 'Realizziamo edifici residenziali, commerciali e industriali con materiali di prima qualità e tecniche costruttive all\'avanguardia, seguendo ogni fase del progetto dalla fondazione alla finitura',
      immagine: '/assets/servizi/costruzioni-generali.webp',
      dettagli: ['Edifici residenziali e commerciali', 'Strutture industriali', 'Ristrutturazioni complete'],
      rotta: 'costruzioni'
    },
    {
      id: 1,
      titolo: 'Lavori Edili e Stradali',
      descrizione: 'Ci occupiamo della realizzazione e manutenzione di opere edili e infrastrutture stradali con un focus particolare sulla durabilità, sicurezza e rispetto delle normative vigenti',
      immagine: '/assets/servizi/lavori-stradali.webp',
      dettagli: ['Pavimentazioni e asfalti', 'Opere di urbanizzazione', 'Infrastrutture pubbliche'],
      rotta: 'lavori'
    },
    {
      id: 2,
      titolo: 'Restauro Conservativo',
      descrizione: 'Interveniamo su edifici storici e di pregio con tecniche specializzate per preservare il valore artistico e culturale, rispettando l\'autenticità e le caratteristiche originali',
      immagine: '/assets/servizi/restauro.webp',
      dettagli: ['Restauro facciate storiche', 'Recupero edifici vincolati', 'Conservazione elementi decorativi'],
      rotta: 'restauri'
    },
    {
      id: 3,
      titolo: 'Idrodemolizione',
      descrizione: 'La nostra principale specializzazione: utilizziamo tecniche avanzate di idrodemolizione ad alta pressione per rimuovere calcestruzzo deteriorato senza danneggiare le strutture sottostanti',
      immagine: '/assets/servizi/idrodemolizioni.webp',
      dettagli: ['Idrodemolizione selettiva', 'Rimozione calcestruzzo ammalorato', 'Preparazione superfici per ripristino'],
      rotta: 'idrodemolizioni'
    },
    {
      id: 4,
      titolo: 'Noleggio Ponteggi e Attrezzature',
      descrizione: 'Offriamo servizi di noleggio di ponteggi e attrezzature edili di alta qualità, con installazione professionale e assistenza tecnica continua per ogni tipo di cantiere',
      immagine: '/assets/servizi/ponteggio.webp',
      dettagli: ['Ponteggi certificati', 'Attrezzature moderne', 'Installazione e manutenzione'],
      rotta: 'noleggio'
    }
  ]

  public ngOnInit(): void {
    this.setupSeoForPage();
  }

  public isChildRoute(): boolean {
    return this.route.children.length > 0;
  }

  public onRotta(rottaSelezionata: string): void {
    this.router.navigate([`/servizi/${rottaSelezionata}`]);
  }

  private setupSeoForPage(): void {
    this.seoService.updateSeo({
      title: 'Servizi - Faustini Costruzioni',
      description: 'Vieni a scoprire tutti i progetti che ci contrddistinguono',
      url: 'https://faustinicostruzioni.it/progetti',
      keywords: 'servizi, noleggio ponteggi, opere di riqualificazione'
    });
  }

}
