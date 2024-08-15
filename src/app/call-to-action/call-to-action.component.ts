import { Component, AfterViewInit, OnDestroy, ElementRef, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { AnimationService } from '../animation.service';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-call-to-action',
  standalone: true,
  imports: [
    NgClass,
    CarouselComponent
  ],
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.css']
})
export class CallToActionComponent implements AfterViewInit, OnDestroy {
  private scrollListenerTitleAction!: () => boolean | void;
  private scrollListenerTextAction!: () => boolean | void;
  private scrollListenerButtonAction!: () => boolean | void;
  public isAnimationTitleAction = signal(false);
  public isAnimationTextAction = signal(false);
  public isAnimationButtonAction = signal(false);

  constructor(private elementRef: ElementRef, private animationService: AnimationService) { }

  /**
   * Initializes the component after the view has been initialized.
   * Queries for the elements with the classes 'titleAction', 'textAction', and 'buttonAction'
   * and assigns them to the respective variables. Then, it calls the 'renderAnimation' method
   * of the 'animationService' to set up animations for each element with the specified delay
   * and assigns the returned functions to the 'scrollListenerTitleAction', 'scrollListenerTextAction',
   * and 'scrollListenerButtonAction' variables.
   *
   * @return {void} This function does not return anything.
   */
  ngAfterViewInit(): void {
    const titleAction = this.elementRef.nativeElement.querySelector('.titleAction');
    const textAction = this.elementRef.nativeElement.querySelector('.textAction');
    const buttonAction = this.elementRef.nativeElement.querySelector('.buttonAction');
    this.scrollListenerTitleAction = this.animationService.renderAnimation(titleAction, 600, this.isAnimationTitleAction);
    this.scrollListenerTextAction = this.animationService.renderAnimation(textAction, 600, this.isAnimationTextAction);
    this.scrollListenerButtonAction = this.animationService.renderAnimation(buttonAction, 900, this.isAnimationButtonAction);
  }

  /**
   * Destroys the component and stops any ongoing animations.
   *
   * This method is called when the component is being removed from the DOM.
   * It checks if the scroll listeners for title, text, and button actions are defined,
   * and if so, calls them to stop any ongoing animations.
   *
   * @return {void} This function does not return anything.
   */
  ngOnDestroy(): void {
    if (this.scrollListenerTitleAction) {
      this.scrollListenerTitleAction();
    }
    if (this.scrollListenerTextAction) {
      this.scrollListenerTextAction();
    }
    if (this.scrollListenerButtonAction) {
      this.scrollListenerButtonAction();
    }
  }

  /**
   * Opens a new window with the specified URL.
   *
   * This function navigates to the Google Calendar page for scheduling a meeting.
   *
   * @return {void} This function does not return any value.
   */
  onPage(): void {
    window.open('https://calendar.app.google/5YZNfrpVXKVYj8Sw6', '_blank', 'noopener,noreferrer');
  }

}
