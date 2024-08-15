import { Component, ElementRef, AfterViewInit, OnDestroy, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { Slides } from '../../interfaces/interface';
import { AnimationService } from '../animation.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})

export class CarouselComponent implements OnDestroy, AfterViewInit {

  slides: Slides[] = [
    { id: 0, src: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FcostruzioniGenerali.webp?alt=media&token=73fd9d18-5e91-4b24-a473-03711d49a5d2' },
    { id: 1, src: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fidrodemolizioni.webp?alt=media&token=1a7c5727-0e49-48d2-aaa8-560870257cbe' },
    { id: 2, src: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2FlavoriStradali.webp?alt=media&token=ce87be66-0e3a-435b-9b05-f3f10265fa0c' },
    { id: 3, src: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Fponteggio.webp?alt=media&token=0b422240-f08e-432b-8ebc-af40e2ff7582' },
    { id: 4, src: 'https://firebasestorage.googleapis.com/v0/b/faustinicostruzioni-b5930.appspot.com/o/services%2Frestauro.webp?alt=media&token=989ba4d7-3016-440e-997e-a89aa98b5b67' }
  ];
  currentSlide = 0;
  startX: number = 0;
  endX: number = 0;
  isDragging: boolean = false;
  threshold: number = 50;
  private scrollListenerCarousel!: () => boolean | void;
  public isAnimationCarousel = signal(false);

  constructor(private elementRef: ElementRef, private animationService: AnimationService) { }

  /**
   * Returns a CSS transform string that translates the carousel to the current slide.
   *
   * @return {string} A CSS transform string in the format 'translateX(-X%)' where X is the current slide number.
   */
  get transform(): string {
    return `translateX(-${this.currentSlide * 100}%)`;
  }

  /**
   * Navigates to the previous slide in the carousel.
   *
   * If the current slide is the first slide, it wraps around to the last slide.
   *
   * @return {void}
   */
  prevSlide(): void {
    this.currentSlide = (this.currentSlide > 0) ? this.currentSlide - 1 : this.slides.length - 1;
  }

  /**
   * Updates the current slide to the next slide in the carousel.
   * If the current slide is the last slide, it wraps around to the first slide.
   *
   * @return {void} This function does not return anything.
   */
  nextSlide(): void {
    this.currentSlide = (this.currentSlide < this.slides.length - 1) ? this.currentSlide + 1 : 0;
  }

  /**
   * Navigates to a specific slide in the carousel.
   *
   * @param {number} index - The index of the slide to navigate to.
   * @return {void} This function does not return a value.
   */
  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  /**
   * Handles the start of a touch event on the carousel.
   *
   * @param {TouchEvent} event - The touch event object containing information about the touch.
   * @return {void} This function does not return a value.
   */
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
  }

  /**
   * Handles the touch end event for the carousel.
   *
   * Calculates the difference in X coordinates between the start and end of the touch event.
   * If the difference is greater than the threshold, navigates to the next or previous slide.
   *
   * @param {TouchEvent} event - The touch event object.
   * @return {void} This function does not return a value.
   */
  onTouchEnd(event: TouchEvent): void {
    this.endX = event.changedTouches[0].clientX;
    const diffX = this.startX - this.endX;

    if (Math.abs(diffX) > this.threshold) {
      if (diffX > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  /**
   * Handles the mouse down event to track the start position of a drag operation.
   *
   * @param {MouseEvent} event - The mouse event object containing information about the event.
   * @return {void} No return value.
   */
  onMouseDown(event: MouseEvent): void {
    this.startX = event.clientX;
    this.isDragging = true;
  }

  /**
   * Handles the mouse move event to track the end position of a drag operation.
   *
   * @param {MouseEvent} event - The mouse event object containing information about the event.
   * @return {void} No return value.
   */
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      this.endX = event.clientX;
    }
  }

  /**
   * Handles the mouse up event to finalize a drag operation.
   *
   * @param {MouseEvent} event - The mouse event object containing information about the event.
   * @return {void} No return value.
   */
  onMouseUp(event: MouseEvent): void {
    if (this.isDragging) {
      this.endX = event.clientX;
      this.isDragging = false;
      this.handleSwipe();
    }
  }

  /**
   * Handles swipe gestures for the carousel component.
   *
   * Calculates the difference in x-coordinates between the start and end of the swipe gesture.
   * If the absolute difference exceeds the threshold, navigates to the next or previous slide based on the swipe direction.
   *
   * @return {void} Nothing is returned.
   */
  handleSwipe(): void {
    const diffX = this.startX - this.endX;
    if (Math.abs(diffX) > this.threshold) {
      if (diffX > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  /**
   * Lifecycle hook that is called after a component's view has been initialized.
   * It is used to render the animation for the carousel component.
   *
   * @return {void} Nothing is returned.
   */
  ngAfterViewInit(): void {
    const carousel = this.elementRef.nativeElement.querySelector('.carousel');
    this.scrollListenerCarousel = this.animationService.renderAnimation(carousel, 600, this.isAnimationCarousel);
  }

  /**
   * Lifecycle hook that is called when a directive, pipe, or service is destroyed.
   *
   * Removes the scroll listener for the carousel if it exists.
   *
   * @return {void} Nothing is returned.
   */
  ngOnDestroy(): void {
    if (this.scrollListenerCarousel) {
      this.scrollListenerCarousel();
    }
  }

}
