import { Component, Input, OnInit } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { heroArrowRightCircle, heroArrowLeftCircle } from '@ng-icons/heroicons/outline';

export interface Testimonial {
  id: number;
  avatar: string;
  comment: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [
    NgIcon,
    CommonModule
  ],
  providers: [provideIcons({
    heroArrowLeftCircle,
    heroArrowRightCircle
  })],
  templateUrl: './testimonials.component.html',
})

export class TestimonialsComponent implements OnInit {

  @Input() testimonials: Testimonial[] = [];
  @Input() primaryColor: string = '#FF7420';
  @Input() autoplay: boolean = false;
  @Input() autoplayInterval: number = 10000;

  currentIndex: number = 0;
  private autoplayTimer: any;

  ngOnInit() {
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  prevAvatar() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.resetAutoplay();
  }

  nextAvatar() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.resetAutoplay();
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
    this.resetAutoplay();
  }

  private startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      this.nextAvatar();
    }, this.autoplayInterval);
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
    }
  }

  private resetAutoplay() {
    if (this.autoplay) {
      this.stopAutoplay();
      this.startAutoplay();
    }
  }
}
