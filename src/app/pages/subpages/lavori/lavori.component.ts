import { Component } from '@angular/core';
import { ServiziCorrelati } from '../../../model/servizio';
import { ServizioComponent } from '../../../components/servizio/servizio.component';

@Component({
  selector: 'app-lavori',
  imports: [
    ServizioComponent
  ],
  templateUrl: './lavori.component.html',
})

export class LavoriComponent {

  public caratteristiche: string[] = [
    'Pavimentazione e Asfalti',
    'Opere di urbanizzazione',
    'Infrastrutture pubbliche'
  ];

  public correlati:ServiziCorrelati[] = [
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
  ]

}
