import { Component } from '@angular/core';
import { ServizioComponent } from '../../../components/servizio/servizio.component';
import { ServiziCorrelati } from '../../../model/servizio';

@Component({
  selector: 'app-idrodemolizioni',
  imports: [
    ServizioComponent
  ],
  templateUrl: './idrodemolizioni.component.html',
})
export class IdrodemolizioniComponent {

  public caratteristiche: string[] = [
    'Idrodemolizione selettiva',
    'Rimozione calcestruzzo ammalorato',
    'Preparazione superfici per ripristino'
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
  ]

}
