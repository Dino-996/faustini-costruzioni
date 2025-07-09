import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroUserGroup, heroShieldCheck, heroEnvelope, heroDevicePhoneMobile, heroGlobeAlt } from '@ng-icons/heroicons/outline';
import { CallToActionComponent } from '../../components/call-to-action/call-to-action.component';
import { NgOptimizedImage } from '@angular/common';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { VideoConfig } from '../../model/video';
import { bootstrapPatchCheckFill } from '@ng-icons/bootstrap-icons';
import { Valori, Certificazioni, Garanzie } from '../../model/chi-siamo';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-chi-siamo',
  imports: [
    NgIcon,
    NgOptimizedImage,
    CallToActionComponent,
    VideoPlayerComponent
  ],
  providers: [
    provideIcons({
      heroUserGroup,
      heroShieldCheck,
      heroEnvelope,
      heroDevicePhoneMobile,
      heroGlobeAlt,
      bootstrapPatchCheckFill
    })
  ],
  templateUrl: './chi-siamo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChiSiamoComponent implements OnInit {

  private readonly seoService = inject(SeoService);

  private readonly valori = signal<Valori[]>([
    { id: 0, titolo: 'Competenza', descrizione: 'Un team di professionisti altamente qualificati in grado di affrontare ogni sfida costruttiva con comprovata esperienza tecnica', icona: 'heroUserGroup' },
    { id: 1, titolo: 'Qualità', descrizione: 'Utilizziamo solo materiali di prima scelta e tecniche costruttive all\'avanguardia per garantire risultati duraturi e di elevato standard', icona: 'heroShieldCheck' },
    { id: 2, titolo: 'Sostenibilità', descrizione: 'Progettiamo e costruiamo con un occhio attento all\'ambiente, utilizzando soluzioni a basso impatto energetico e materiali eco-compatibili', icona: 'heroGlobeAlt' }
  ]);

  public readonly certificazioniSOA = signal<Certificazioni[]>([
    { id: 0, categoria: 'OG1', descrizione: 'Edifici civili e industriali', pdf: 'assets/certificazioni/SOA.pdf' },
    { id: 1, categoria: 'OG2', descrizione: 'Restauro e tutela di beni immobili', pdf: 'assets/certificazioni/SOA.pdf' },
    { id: 2, categoria: 'OG3', descrizione: 'Strade, ponti, ferrovie e metropolitane', pdf: 'assets/certificazioni/SOA.pdf' },
    { id: 3, categoria: 'OG6', descrizione: 'Acquedotti, gasdotti, oleodotti, opere di irrigazione e di evacuazione', pdf: 'assets/certificazioni/SOA.pdf' },
    { id: 4, categoria: 'OG13', descrizione: 'Opere di ingegneria naturalistica', pdf: 'assets/certificazioni/SOA.pdf' },
    { id: 5, categoria: 'OS21', descrizione: 'Opere strutturali speciali', pdf: 'assets/certificazioni/SOA.pdf' }
  ]);

  public readonly certificazioniISO = signal<Certificazioni[]>([
    { id: 0, categoria: 'ISO 9001:2015', descrizione: 'Manutenzione di edifici civili', pdf: 'assets/certificazioni/ISO_9001.pdf' },
    { id: 1, categoria: 'ISO 45001:2018', descrizione: 'Sistema di gestione della salute e della sicurezza sul lavoro', pdf: 'assets/certificazioni/ISO_45001.pdf' },
  ]);

  private readonly garanzie = signal<Garanzie[]>([
    { id: 0, descrizione: 'Qualità e durabilità dei nostri interventi' },
    { id: 1, descrizione: 'Assistenza post-vendita garantita' },
    { id: 2, descrizione: 'Rispetto delle normative edilizie italiane' },
    { id: 3, descrizione: 'Precisione e attenzione in ogni dettaglio' }
  ]);

  private readonly videoConfig = signal<VideoConfig>({
    src: '/assets/video/chi-siamo.mp4',
    poster: 'assets/image/image-video/poster.webp',
    title: 'Persone per le persone',
  });

  public ngOnInit(): void {
    this.setupSeoForPage();
  }

  private setupSeoForPage(): void {
    this.seoService.updateSeo({
      title: 'Chi Siamo - Faustini Costruzioni',
      description: 'Scopri la storia di Faustini Costruzioni: oltre 20 anni di esperienza nel settore edile.',
      url: 'https://faustinicostruzioni.it/chi-siamo',
      keywords: 'chi siamo, storia, esperienza, Faustini Costruzioni'
    });
  }

  public readonly getValori = computed(() => this.valori());
  public readonly getGaranzie = computed(() => this.garanzie());
  public readonly getVideoConfig = computed(() => this.videoConfig());

}
