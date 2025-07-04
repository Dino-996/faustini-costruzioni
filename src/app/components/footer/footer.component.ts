import { Component, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPhone, heroEnvelope } from '@ng-icons/heroicons/outline';
import { bootstrapCaretDownFill, bootstrapFacebook, bootstrapInstagram, bootstrapPhone, bootstrapPinMap } from '@ng-icons/bootstrap-icons'
import { RouterLink } from '@angular/router';
import { InformazioniContatto, LinkUtili, LinkSocial, FAQ } from '../../model/footer';


@Component({
  selector: 'app-footer',
  imports: [
    NgIcon,
    RouterLink
  ],
  providers: [provideIcons({
    heroPhone,
    heroEnvelope,
    bootstrapFacebook,
    bootstrapInstagram,
    bootstrapPinMap,
    bootstrapPhone,
    bootstrapCaretDownFill
  })],
  templateUrl: './footer.component.html',
})

export class FooterComponent {

  private readonly indice = signal<number | null>(null);
  private readonly informazioniContatto = signal<InformazioniContatto[]>([
    { id: 0, icon: 'bootstrapPhone', href: 'tel:+393488107321', text: '348 81 07 321', ariaLabel: 'Chiama il numero 348 81 07 321' },
    { id: 1, icon: 'heroPhone', href: 'tel:0971718745', text: '0971 71 87 45', ariaLabel: 'Chiama il numero 0971 71 87 45' },
    { id: 2, icon: 'heroEnvelope', href: 'mailto:faustini.costruzioni@gmail.it', text: 'faustini.costruzioni@gmail.it', ariaLabel: 'Invia email a faustini.costruzioni@gmail.it' },
    { id: 3, icon: 'heroEnvelope', href: 'mailto:faustini.costruzioni@pec.it', text: 'faustini.costruzioni@pec.it', ariaLabel: 'Invia PEC a faustini.costruzioni@pec.it' }
  ]);
  private readonly linkUtili = signal<LinkUtili[]>([
    { id: 0, text: 'Attestazioni', href: 'https://www.attestazione.net/SoaEngine/Dettaglio?piva=01699410765', external: true },
    { id: 1, text: 'Ufficio Camerale', href: 'https://www.ufficiocamerale.it/4104/faustini-costruzioni-srl', external: true }
  ]);
  private readonly linkLegali = signal<LinkUtili[]>([
    { id: 0, text: 'Privacy Policy', href: 'https://www.iubenda.com/privacy-policy/86318650', external: true },
    { id: 1, text: 'Termini di Servizio', href: '#', external: false },
    { id: 2, text: 'Cookie Policy', href: 'https://www.iubenda.com/privacy-policy/86318650/cookie-policy', external: true }
  ]);
  private readonly linkSocial = signal<LinkSocial[]>([
    { id: 0, platform: 'Facebook', href: 'https://www.facebook.com/faustini.costruzioni.Srl.1/?locale=it_IT', icon: 'bootstrapFacebook' },
    { id: 1, platform: 'Instagram', href: 'https://www.instagram.com/faustinicostruzioni/?igsh=MWI2ejNvN3ppOTA2dQ%3D%3D', icon: 'bootstrapInstagram' },
    { id: 2, platform: 'Google Maps', href: 'https://maps.app.goo.gl/XhVmcszZT2v6d2H49', icon: 'bootstrapPinMap' }
  ]);
  private readonly listaFaq = signal<FAQ[]>([
    { id: 0, question: 'Dove offrite i vostri servizi?', answer: 'In Basilicata e nelle regioni limitrofe' },
    { id: 1, question: 'Offrite preventivi gratuiti?', answer: 'Sì, contattaci via modulo, telefono o whatsapp' },
    { id: 2, question: 'Quali garanzie offrite?', answer: 'Qualità, durabilità e massima precisione' }
  ]);

  public readonly getInformazioniContatto = computed(() => this.informazioniContatto());
  public readonly getLinkUtili = computed(() => this.linkUtili());
  public readonly getLinkLegali = computed(() => this.linkLegali());
  public readonly getLinkSocial = computed(() => this.linkSocial());
  public readonly getListaFaq = computed(() => this.listaFaq());
  public readonly getAnnoCorrente = computed(() => new Date().getFullYear());

  public visualizzaFaq(altroIndice: number): void {
    this.indice.update(valore => (valore === altroIndice ? null : altroIndice));
  }

  public isAperto(indice: number): boolean {
    return this.indice() === indice;
  }

}
