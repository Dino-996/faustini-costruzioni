import { Component } from '@angular/core';
import { ProgettoComponent } from '../../../components/progetto/progetto.component';
import { tipoProgetto, materialiPrincipali } from '../../../model/progetto';

@Component({
  selector: 'app-viadotto-santa-venere',
  imports: [
    ProgettoComponent,
  ],
  templateUrl: './viadotto-santa-venere.component.html',
})

export class ViadottoSantaVenereComponent {

  public tipoProgetto: tipoProgetto = 'Infrastrutturale';
  public anno: number = 2020;
  public costo: number = 600000;
  public descrizione: string = "Abbiamo eseguito interventi di risanamento locale delle strutture del Viadotto S. Venere I e II R.A n.5 sulla tratta Sicignano - Potenza. Il nostro team di esperti ha effettuato un'analisi dettagliata delle condizioni strutturali del viadotto, identificando le aree critiche e i punti di degrado. Attraverso l'applicazione di tecniche e materiali avanzati, abbiamo proceduto con interventi mirati di ripristino e consolidamento delle strutture, garantendo la sicurezza, la durabilità e l'integrità del viadotto. Abbiamo inoltre trasformato le pile autostradali grazie alla nostra tecnologia d'avanguardia di idrodemolizione: utilizzando getti d'acqua ad alta pressione, abbiamo rimosso con precisione chirurgica il calcestruzzo deteriorato, salvaguardando la struttura d'acciaio e assicurando una durata senza pari. Il ripristino con malta tixotropica delle pile ha completato il processo di rinforzo, garantendo nel tempo la sicurezza e la durabilità delle strutture. Attraverso soluzioni tecnologiche avanzate e materiali di alta qualità, abbiamo prolungato la vita utile dei viadotti, minimizzando i rischi di cedimenti strutturali e assicurando la continuità ed efficienza del collegamento autostradale tra Campania e Basilicata";
  public materiali: materialiPrincipali[] = [
    { "nome": "Malte per ripristino corticale" },
    { "nome": "Calcestruzzo" },
    { "nome": "Acciaio per cemento armato" }
  ];
  public architetti: string[] = [];
  public ingegneri: string[] = ['Di Tolla (Anas Potenza)'];
  public certificazioni: string[] = [];
  public planimetrie: string[] = [];
  public galleria: string[] = [
    '/assets/progetti/viadotto-venere/viadotto-venere-1.webp',
    '/assets/progetti/viadotto-venere/viadotto-venere-2.webp',
    '/assets/progetti/viadotto-venere/viadotto-venere-3.webp',
    '/assets/progetti/viadotto-venere/viadotto-venere-4.webp'
  ]

}
