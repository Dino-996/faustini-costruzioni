import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowRight} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-call-to-action',
  imports: [
    NgIcon,
  ],
  providers: [provideIcons({
    heroArrowRight
  })],
  templateUrl: './call-to-action.component.html',
})

export class CallToActionComponent {

  public router:Router = inject(Router);

  @Input({alias: 'titoloCTA', required: true}) 
  public titolo!: string;
  
  @Input({alias: 'descrizioneCTA', required: true})
  public descrizione!: string;

  public onContatti() {
    this.router.navigate(['/contatti']);
  }

}
