import { Injectable, Renderer2, RendererFactory2, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AnimationService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  renderAnimation(ref: any, Yaxis:number = 300, isAnimation:WritableSignal<boolean>): () => boolean | void {
    let scrollListener!: () => boolean | void;
    if (ref) {
      scrollListener = this.renderer.listen('window', 'scroll', () => {
        if (ref.getBoundingClientRect().y <= Yaxis) {
          isAnimation.set(true);
        } else {
          isAnimation.set(false);
        }
      });
    }
    return scrollListener;
  }

}
