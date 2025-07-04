import { Component } from '@angular/core';
import { ServiziCorrelati } from '../../../model/servizio';
import { ServizioComponent } from '../../../components/servizio/servizio.component';

@Component({
  selector: 'app-noleggi',
  imports: [
    ServizioComponent
  ],
  templateUrl: './noleggi.component.html',
})

export class NoleggiComponent {

  public caratteristiche: string[] = [
    'Ponteggi Certificati',
    'Attrezzature moderne',
    'Installazione e manutenzione'
  ];

  public correlati: ServiziCorrelati[] = [
    {
      titolo: 'Costruzioni Generali',
      descrizione: 'Specializzati nella cura di edifici pubblici e privati, offriamo manutenzione, ristrutturazione e miglioramenti energetici e sismici per costruzioni sicure e durature',
      immagine: '/assets/servizi/costruzioni-generali.webp',
      rotta: '/servizi/costruzioni'
    },
    {
      titolo: 'Restauro Conservativo',
      descrizione: 'Preserviamo la storia degli edifici attraverso interventi conservativi che rinforzano le ossature, mantenendo l\'estetica originale e permettendo al passato di dialogare con il futuro',
      immagine: '/assets/servizi/restauro.webp',
      rotta: '/servizi/restauri'
    },
  ];
}
