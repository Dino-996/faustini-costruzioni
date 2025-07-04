import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
})

export class AppComponent {

  public isCaricamento: boolean = true;

  public onAttivato(): void {
    setTimeout(()=>{
      this.isCaricamento = false;
    }, 300)
  }

  public onDisattivo(): void {
    this.isCaricamento = true;
  }

}