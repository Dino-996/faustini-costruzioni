import { Component } from '@angular/core';
import { ProgettoComponent } from '../../../components/progetto/progetto.component';
import { tipoProgetto, materialiPrincipali } from '../../../model/progetto';

@Component({
  selector: 'app-area-rupe',
  imports: [
    ProgettoComponent
  ],
  templateUrl: './area-rupe.component.html',
})

export class AreaRupeComponent {

  public tipoProgetto: tipoProgetto = 'Ristrutturazione';
  public anno: number = 2022;
  public costo: number = 600000;
  public descrizione: string = "Il progetto riguarda interventi di messa in sicurezza di aree a rischio idrogeologico nel centro storico del Comune di Vietri di Potenza, su una superficie complessiva di circa 1.500 metri quadrati. Le opere hanno interessato il consolidamento di una porzione del costone roccioso, ottenuto attraverso l’installazione di una rete paramassi, e la demolizione di superfetazioni e di parti di strutture gravemente compromesse. Sono state inoltre eseguite puntellature localizzate sulle pareti murarie, con l’obiettivo di ridurre la pericolosità di alcune zone. Il progetto ha incluso anche la riqualificazione delle pavimentazioni e dell’arredo urbano lungo via San Michele, via San Biagio e nella piazzetta San Biagio, contribuendo al miglioramento complessivo del decoro e della sicurezza dell’area storica.";
  public materiali: materialiPrincipali[] = [
    { nome: 'Rete paramassi' },
    { nome: 'Pietre locali' },
    { nome: 'Cubetti di porfidio' },
    { nome: 'Sabbia e cemento' },
  ];
  public architetti: string[] = ['Severino Macellaro', 'Matteo Felitti'];
  public certificazioni: string[] = [];
  public planimetrie: string[] = [];
  public galleria: string[] = ['/assets/progetti/area-rupe/area-rupe-1.webp', '/assets/progetti/area-rupe/area-rupe-2.webp']
}
