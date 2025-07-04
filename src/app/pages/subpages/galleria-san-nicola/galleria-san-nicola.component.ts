import { Component } from '@angular/core';
import { ProgettoComponent } from '../../../components/progetto/progetto.component';
import { tipoProgetto, materialiPrincipali } from '../../../model/progetto';

@Component({
  selector: 'app-galleria-san-nicola',
  imports: [
    ProgettoComponent
  ],
  templateUrl: './galleria-san-nicola.component.html',
})

export class GalleriaSanNicolaComponent {

  public tipoProgetto: tipoProgetto = 'Infrastrutturale';
  public anno: number = 2022;
  public costo: number = 700000;
  public materiali: materialiPrincipali[] = [
    { "nome": "Rivestimento in lamiere di acciaio" },
    { "nome": "Sistemi di drenaggio" },
    { "nome": "Materiali per il consolidamento strutturale" },
  ];
  public architetti: string[] = [];
  public ingegneri: string[] = ['Pietro Mastrangelo (Anas Potenza)'];
  public certificazioni: string[] = [];
  public galleria: string[] = [
    '/assets/progetti/galleria-san-nicola/galleria-san-nicola-2.webp',
    '/assets/progetti/galleria-san-nicola/galleria-san-nicola-1.webp'
  ]
  public planimetrie: string[] = [];

}
