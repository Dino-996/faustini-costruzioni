import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoConfig } from '../../model/video';

import { VideoPlayerComponent } from './video-player.component';
import { By } from '@angular/platform-browser';

describe('Test del componente VideoPlayerComponent', () => {
  let component: VideoPlayerComponent;
  let fixture: ComponentFixture<VideoPlayerComponent>;
  let videoElement: HTMLVideoElement;

  const mockVideoConfig: VideoConfig = {
    src: '/assets/image/image-video/poster.webp',
    poster: '/assets/video/chi-siamo.mp4',
    title: 'Test Video'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPlayerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoPlayerComponent);
    component = fixture.componentInstance;
    // Configurazione iniziale
    fixture.componentRef.setInput('config', mockVideoConfig);
    fixture.detectChanges();
    // Riferimento all'elemento video
    const videoDebugElement = fixture.debugElement.query(By.css('video'));
    videoElement = videoDebugElement.nativeElement as HTMLVideoElement;
  });

  describe('Configurazione iniziale', () => {
    it('componente creato correttamente', () => {
      expect(component).toBeTruthy();
    });

    it('dovrebbe inizializzare con stati corretti', () => {
      expect(component.playingState()).toBeFalsy();
      expect(component.loadingState()).toBeFalsy();
      expect(component.errorState()).toBeFalsy();
    });

    it('dovrebbe configurare l\'elemento video con src e poster corretti', () => {
      const sourceElement = fixture.debugElement.query(By.css('source'));

      expect(videoElement.poster).toContain(mockVideoConfig.poster!);
      expect(sourceElement.nativeElement.src).toContain(mockVideoConfig.src);
    });

    it('dovrebbe mostrare il pulsante play quando il video non è in riproduzione', () => {
      const playButton = fixture.debugElement.query(By.css('[data-testid="play-button"], .cursor-pointer'));

      expect(playButton).toBeTruthy();
      expect(component.playingState()).toBeFalse();
    });

    it('dovrebbe nascondere il pulsante play quando il video è in riproduzione', () => {
      // Simula l'inizio della riproduzione
      component.onPlay();
      fixture.detectChanges();

      const playButton = fixture.debugElement.query(By.css('.cursor-pointer'));

      expect(playButton).toBeFalsy();
      expect(component.playingState()).toBeTrue();
    });

    it('dovrebbe mostrare lo stato di caricamento', () => {
      component['isLoading'].set(true);
      fixture.detectChanges();

      const loadingElement = fixture.debugElement.query(By.css('.animate-spin'));

      expect(loadingElement).toBeTruthy();
      expect(component.loadingState()).toBeTruthy();
    });

    it('dovrebbe mostrare lo stato di errore', () => {
      // Simula un errore
      component.onError('Test error');
      fixture.detectChanges();

      const errorElement = fixture.debugElement.query(By.css('.text-red-400'));
      const retryButton = fixture.debugElement.query(By.css('button'));

      expect(errorElement).toBeTruthy();
      expect(retryButton).toBeTruthy();
      expect(component.errorState()).toBeTrue();
      expect(component.playingState()).toBeFalse();
    });
  });

  describe('Gestore degli eventi', () => {
    it('dovrebbe gestire onPlay correttamente', () => {
      component.onPlay();

      expect(component.playingState()).toBeTrue();
      expect(component.loadingState()).toBeFalse();
    });

    it('dovrebbe gestire onPause correttamente', () => {
      // Prima avvia la riproduzione
      component.onPlay();
      expect(component.playingState()).toBeTrue();

      // Poi metti in pausa
      component.onPause();
      expect(component.playingState()).toBeFalse();
    });

    it('dovrebbe gestire onLoadedMetadata correttamente', () => {
      // Imposta stati iniziali
      component['isLoading'].set(true);
      component['hasError'].set(true);

      component.onLoadedMetadata();

      expect(component.loadingState()).toBeFalse();
      expect(component.errorState()).toBeFalse();
    });

    it('dovrebbe gestire onError correttamente', () => {
      spyOn(console, 'error');

      component.onError('Test error message');

      expect(component.errorState()).toBeTrue();
      expect(component.loadingState()).toBeFalse();
      expect(component.playingState()).toBeFalse();
      expect(console.error).toHaveBeenCalledWith('Errore video:', 'Test error message');
    });
  });

  describe('Interazione utente', () => {
    it('dovrebbe chiamare playVideo quando si clicca sul pulsante play', () => {
      spyOn(component, 'playVideo');

      const playButton = fixture.debugElement.query(By.css('.cursor-pointer'));
      playButton.triggerEventHandler('click', null);

      expect(component.playVideo).toHaveBeenCalledWith(videoElement);
    });

    it('dovrebbe gestire playVideo correttamente quando il video si riproduce con successo', async () => {
      spyOn(videoElement, 'play').and.returnValue(Promise.resolve());

      await component.playVideo(videoElement);

      expect(component.loadingState()).toBeTrue();
      expect(component.errorState()).toBeFalse();
      expect(videoElement.play).toHaveBeenCalled();
    });

    it('dovrebbe gestire playVideo quando si verifica un errore', async () => {
      const testError = new Error('Playback failed');
      spyOn(videoElement, 'play').and.returnValue(Promise.reject(testError));
      spyOn(console, 'error');
      spyOn(component, 'onError');

      await component.playVideo(videoElement);

      expect(component.loadingState()).toBeTrue();
      expect(component.errorState()).toBeFalse();
      expect(console.error).toHaveBeenCalledWith('Errore durante la riproduzione del video:', testError);
      expect(component.onError).toHaveBeenCalledWith(testError);
    });

    it('dovrebbe gestire retryLoad correttamente', () => {
      spyOn(videoElement, 'load');

      // Prima imposta lo stato di errore
      component.onError('Test error');
      expect(component.errorState()).toBeTrue();

      // Poi riprova il caricamento
      component.retryLoad(videoElement);

      expect(component.errorState()).toBeFalse();
      expect(videoElement.load).toHaveBeenCalled();
    });

    it('dovrebbe chiamare retryLoad quando si clicca sul pulsante riprova', () => {
      spyOn(component, 'retryLoad');

      // Prima imposta stato di errore per mostrare il pulsante
      component.onError('Test error');
      fixture.detectChanges();

      const retryButton = fixture.debugElement.query(By.css('button'));
      retryButton.triggerEventHandler('click', null);

      expect(component.retryLoad).toHaveBeenCalledWith(videoElement);
    });
  });

  describe('Eventi dell\'elemento video', () => {
    it('dovrebbe chiamare onPlay quando il video inizia', () => {
      spyOn(component, 'onPlay');

      videoElement.dispatchEvent(new Event('play'));

      expect(component.onPlay).toHaveBeenCalled();
    });

    it('dovrebbe chiamare onPause quando il video è in pausa', () => {
      spyOn(component, 'onPause');

      videoElement.dispatchEvent(new Event('pause'));

      expect(component.onPause).toHaveBeenCalled();
    });

    it('dovrebbe chiamare onLoadedMetadata quando i metadata sono caricati', () => {
      spyOn(component, 'onLoadedMetadata');

      videoElement.dispatchEvent(new Event('loadedmetadata'));

      expect(component.onLoadedMetadata).toHaveBeenCalled();
    });

    it('dovrebbe chiamare onError quando si verifica un errore nel video', () => {
      spyOn(component, 'onError');

      const errorEvent = new Event('error');
      videoElement.dispatchEvent(errorEvent);

      expect(component.onError).toHaveBeenCalledWith(errorEvent);
    });
  });

  describe('Rendering del modello', () => {
    it('dovrebbe mostrare il messaggio di fallback per browser non supportati', () => {
      const fallbackMessage = fixture.debugElement.query(By.css('video p'));

      expect(fallbackMessage.nativeElement.textContent.trim()).toBe('Il tuo browser non supporta i video HTML5.');
    });

    it('dovrebbe applicare le classi CSS corrette al container video', () => {
      const videoContainer = fixture.debugElement.query(By.css('.relative.bg-black.rounded-2xl'));

      expect(videoContainer).toBeTruthy();
    });

    it('dovrebbe mostrare solo uno stato alla volta', () => {
      // Stato normale
      expect(component.playingState()).toBeFalse();
      expect(component.loadingState()).toBeFalse();
      expect(component.errorState()).toBeFalse();

      // Stato di caricamento
      component['isLoading'].set(true);
      fixture.detectChanges();
      expect(component.loadingState()).toBeTrue();

      // Stato di errore
      component.onError('test');
      fixture.detectChanges();
      expect(component.errorState()).toBeTrue();
      expect(component.loadingState()).toBeFalse();
    });
  });

});
