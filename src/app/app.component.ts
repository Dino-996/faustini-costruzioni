import { Component, ElementRef } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CallToActionComponent } from './call-to-action/call-to-action.component';
import { ProjectComponent } from './project/project.component';
import { FooterComponent } from './footer/footer.component';
import { QuoteComponent } from './quote/quote.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    RouterLink,
    CardComponent,
    CallToActionComponent,
    QuoteComponent,
    ProjectComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isMobileMenuOpen: boolean = false;

  constructor(private elementRef: ElementRef) { }

  /**
   *  Toggles the mobile menu open or closed.
   *
   *  @return {void} No return value.
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  /**
   * Scrolls the page to the specified element and toggles the mobile menu.
   *
   * @param {string} elementId - The id of the element to scroll to.
   * @return {void} Nothing is returned.
   */
  scrollToElement(elementId: string): void {
    const elementToScroll = document.getElementById(elementId);
    if (elementToScroll) {
      elementToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.toggleMobileMenu();
  }

  /**
   * Scrolls to the quote element on the page.
   *
   * @return {void} No return value.
   */
  goQuote(): void {
    const element = document.getElementById('quote') as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Scrolls the element into view from the top with a smooth animation.
   *
   * @return {void} No return value.
   */
  onTop(): void {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
