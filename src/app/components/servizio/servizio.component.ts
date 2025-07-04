import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowTopRightOnSquare, heroCheckCircle } from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';
import { ServiziCorrelati } from '../../model/servizio';

@Component({
  selector: 'app-servizio',
  imports: [
    NgIcon,
    RouterLink
  ],
  providers: [provideIcons({
    heroCheckCircle,
    heroArrowTopRightOnSquare
  })],
  templateUrl: './servizio.component.html',
})

export class ServizioComponent {

  @Input()
  public titolo: string = '';
  @Input()
  public immagine: string = '';
  @Input()
  public descrizione: string = '';
  @Input()
  public caratteristichePrincipali: string[] = [];
  @Input()
  public serviziCorrelati: ServiziCorrelati[] = [];

}