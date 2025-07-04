import { Component } from '@angular/core';
import { ServizioComponent } from '../../../components/servizio/servizio.component';
import { ServiziCorrelati } from '../../../model/servizio';

@Component({
  selector: 'app-costruzioni',
  imports: [
    ServizioComponent
  ],
  templateUrl: './costruzioni.component.html',
})

export class CostruzioniComponent {

  public caratteristiche:string[] = [
    'Edifici residenziali e commerciali',
    'Strutture industriali',
    'Ristrutturazioni complete'
  ];

  public correlati:ServiziCorrelati[] = [
    { 
      titolo: 'Lavori Edili e Stradali', 
      descrizione: 'Curiamo la salute delle strade, curando la manutenzione di viadotti, acqua e sistemi di canalizzazione per garantire una circolazione fluida e sicura',
      immagine:'/assets/servizi/lavori-stradali.webp',
      rotta: '/servizi/lavori'
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
