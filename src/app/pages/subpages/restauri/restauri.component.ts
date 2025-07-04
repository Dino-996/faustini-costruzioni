import { Component } from '@angular/core';
import { ServiziCorrelati } from '../../../model/servizio';
import { ServizioComponent } from '../../../components/servizio/servizio.component';


@Component({
  selector: 'app-restauri',
  imports: [
    ServizioComponent
  ],
  templateUrl: './restauri.component.html',
})

export class RestauriComponent {

  public caratteristiche: string[] = [
    'Restauro facciate storiche',
    'Recupero edifici vincolati',
    'Conservazione elementi decorativi'
  ];

  public correlati: ServiziCorrelati[] = [
    {
      titolo: 'Costruzioni Generali',
      descrizione: 'Specializzati nella cura di edifici pubblici e privati, offriamo manutenzione, ristrutturazione e miglioramenti energetici e sismici per costruzioni sicure e durature',
      immagine: '/assets/servizi/costruzioni-generali.webp',
      rotta: '/servizi/costruzioni'
    },
    { 
      titolo: 'Idrodemolizione', 
      descrizione: 'Utilizziamo l\'idrodemolizione per ripristinare ponti, viadotti e gallerie, eliminando i segni del tempo e rinnovando la stabilità delle infrastrutture essenziali',
      immagine:'/assets/servizi/idrodemolizioni.webp',
      rotta: '/servizi/idrodemolizioni'
    },
    { 
      titolo: 'Noleggio Ponteggi e Attrezzature', 
      descrizione: 'Offriamo il noleggio di ponteggi e attrezzature',
      immagine:'/assets/servizi/ponteggio.webp',
      rotta: '/servizi/noleggio'
    }
  ]

}
