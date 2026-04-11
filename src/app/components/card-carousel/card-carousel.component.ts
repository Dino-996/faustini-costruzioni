import { AfterViewInit, Component, Input, ElementRef, HostListener, ViewChild, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLongRight, heroArrowRight, heroArrowRightEndOnRectangle } from '@ng-icons/heroicons/outline';

interface Card {
  id: number
  title: string;
  description?: string;
  location: string;
  imageUrl: string;
  buttonLink: string;
}

@Component({
  selector: 'app-card-carousel',
  imports: [
    NgIcon,
    RouterLink
  ],
  templateUrl: './card-carousel.component.html',
  viewProviders: [provideIcons({
    heroArrowRight,
    heroArrowRightEndOnRectangle
  })]
})
export class CardCarouselComponent implements AfterViewInit, OnDestroy {

  public router:Router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  @Input() 
  public cards: Card[] = [];
  @ViewChild('carouselTrack') 
  public carouselTrack!: ElementRef;

  position = 0;
  startX = 0;
  currentTranslate = 0;
  isDragging = false;
  animationId: number | null = null;
  prevTranslate = 0;
  currentSlide = 0;
  slideWidth = 0;
  resizeObserver: ResizeObserver | null = null;

  public ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeCarousel();

      this.resizeObserver = new ResizeObserver(() => {
        this.initializeCarousel();
        this.navigateToSlide(this.currentSlide, false);
      });

      if (this.carouselTrack?.nativeElement) {
        this.resizeObserver.observe(this.carouselTrack.nativeElement.parentElement);
      }
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  initializeCarousel() {
    if (!this.carouselTrack?.nativeElement) return;

    setTimeout(() => {
      const track = this.carouselTrack.nativeElement;
      const trackWidth = track.parentElement.offsetWidth;
      this.slideWidth = trackWidth / this.getVisibleSlides();

      // Reset alla prima slide quando si ridimensiona
      this.position = 0;
      this.prevTranslate = 0;
      this.currentTranslate = 0;
      this.currentSlide = 0;
      track.style.transform = `translateX(${this.position}px)`;
    }, 0);
  }

  getCardWidth(): string {
    // Semplificata la gestione delle larghezze per una migliore responsività
    return 'w-full sm:w-1/2 lg:w-1/3 flex-shrink-0';
  }

  getVisibleSlides(): number {
    if (!isPlatformBrowser(this.platformId)) return 3; // Default lato server
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  }

  getMaxSlides(): number {
    return Math.max(0, this.cards.length - this.getVisibleSlides());
  }

  startDragging(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.startX = this.getPositionX(event);
    this.currentTranslate = this.prevTranslate;

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    this.animation();

    if (event instanceof TouchEvent && event.cancelable) {
      event.preventDefault();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  @HostListener('window:touchmove', ['$event'])
  onMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;

    const currentPosition = this.getPositionX(event);
    const currentDistance = currentPosition - this.startX;
    this.currentTranslate = this.prevTranslate + currentDistance;

    // Aggiungi resistenza quando si trascina oltre i limiti
    const maxPosition = 0;
    const minPosition = -(this.slideWidth * this.getMaxSlides());

    if (this.currentTranslate > maxPosition) {
      this.currentTranslate = maxPosition + (this.currentTranslate - maxPosition) * 0.2;
    } else if (this.currentTranslate < minPosition) {
      this.currentTranslate = minPosition + (this.currentTranslate - minPosition) * 0.2;
    }
  }

  @HostListener('window:mouseup')
  @HostListener('window:touchend')
  stopDragging() {
    if (!this.isDragging) return;
    this.isDragging = false;

    const movedDistance = this.currentTranslate - this.prevTranslate;
    const slideThreshold = this.slideWidth * 0.2; // 20% della larghezza della slide

    if (Math.abs(movedDistance) > slideThreshold) {
      if (movedDistance > 0 && this.currentSlide > 0) {
        this.navigateToSlide(this.currentSlide - 1);
      } else if (movedDistance < 0 && this.currentSlide < this.getMaxSlides()) {
        this.navigateToSlide(this.currentSlide + 1);
      } else {
        this.snapToCurrentSlide();
      }
    } else {
      this.snapToCurrentSlide();
    }

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  snapToCurrentSlide() {
    this.navigateToSlide(this.currentSlide);
  }

  animation() {
    if (this.isDragging) {
      this.setSliderPosition();
      this.animationId = requestAnimationFrame(() => this.animation());
    }
  }

  setSliderPosition() {
    this.position = this.currentTranslate;
  }

  getPositionX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }

  navigateToSlide(index: number, animate: boolean = true): void {
    if (!this.carouselTrack?.nativeElement) return;

    const maxIndex = this.getMaxSlides();
    this.currentSlide = Math.max(0, Math.min(maxIndex, index));

    const newPosition = -this.currentSlide * this.slideWidth;

    this.currentTranslate = newPosition;
    this.prevTranslate = newPosition;
    this.position = newPosition;

    const track = this.carouselTrack.nativeElement;
    if (animate) {
      track.style.transition = 'transform 0.5s ease-out';
      setTimeout(() => {
        track.style.transition = '';
      }, 500);
    } else {
      track.style.transition = 'none';
    }

    track.style.transform = `translateX(${this.position}px)`;
  }

  getIndicators(): number[] {
    const maxVisibleSlides = this.getMaxSlides() + 1;
    return Array.from({ length: maxVisibleSlides }, (_, i) => i);
  }

  public onProgetto():void{
    this.router.navigate(['/progetti']);
  }
}