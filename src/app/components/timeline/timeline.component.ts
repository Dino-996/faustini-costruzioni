import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Steps } from '../../model/steps';

@Component({
  selector: 'app-timeline',
  imports: [],
  templateUrl: './timeline.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TimelineComponent {

  public readonly steps = input.required<Steps[]>();

}