import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { VideoConfig } from '../../model/video';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent {

  public readonly config = input.required<VideoConfig>();

  private isPlaying = signal(false);
  private isLoading = signal(false);
  private hasError = signal(false);

  // Getter dei signal
  public readonly playingState = computed(() => this.isPlaying());
  public readonly loadingState = computed(() => this.isLoading());
  public readonly errorState = computed(() => this.hasError());

  public playVideo(videoElement: HTMLVideoElement): void {
    this.isLoading.set(true);
    this.hasError.set(false);

    videoElement.play().catch(error => {
      console.error("Errore durante la riproduzione del video:", error);
      this.onError(error);
    });
  }

  public onPlay(): void {
    this.isPlaying.set(true);
    this.isLoading.set(false);
  }

  public onPause(): void {
    this.isPlaying.set(false);
  }

  public onLoadedMetadata(): void {
    this.isLoading.set(false);
    this.hasError.set(false);
  }

  public onError(error: unknown): void {
    console.error("Errore video:", error);
    this.isLoading.set(false);
    this.hasError.set(true);
    this.isPlaying.set(false);
  }

  public retryLoad(videoElement: HTMLVideoElement): void {
    this.hasError.set(false);
    videoElement.load();
  }
}