import { Component } from '@angular/core';
import { ProgettoComponent } from '../../../components/progetto/progetto.component';
import { tipoProgetto, materialiPrincipali } from '../../../model/progetto';

@Component({
  selector: 'app-teatro-cecilia',
  imports: [ProgettoComponent],
  templateUrl: './teatro-cecilia.component.html',
})

export class TeatroCeciliaComponent {

  public tipoProgetto: tipoProgetto = 'Ristrutturazione';
  public anno: number = 2023;
  public costo: number = 226000;
  public descrizione: string = "Lavori di efficentamento energetico del teatro 'Centro per la Creatività Cecilia' per ridurre consumi ed emissioni, senza compromettere l'integrità architettonica dell'immobile";
  public materiali: materialiPrincipali[] = [
    { "nome": "Cappotto termico in EPS grafitato spessore 12 cm" },
    { "nome": "Collante-rasante per cappotto" },
    { "nome": "Rete in fibra di vetro per cappotto" },
    { "nome": "Finitura silossanica traspirante" },
    { "nome": "Materiali isolanti per copertura (pannello coibentato grecato)" }
  ];
  public architetti: string[] = ['Antonio Tancredi'];
  public certificazioni: string[] = [];
  public galleria: string[] = [
    '/assets/progetti/teatro-cecilia/teatro-cecilia-2.webp',
    '/assets/progetti/teatro-cecilia/teatro-cecilia-1.webp',
    '/assets/progetti/teatro-cecilia/teatro-cecilia-3.webp'
  ];
  public planimetrie: string[] = ['/assets/planimetrie/cecilia/piano-terra.pdf', '/assets/planimetrie/cecilia/primo-piano.pdf', '/assets/planimetrie/cecilia/secondo-piano.pdf'];
}