import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {

  @Input('excellentPercent') excellentPercentage: number = 0;
  @Input('goodPercent') goodPercentage: number = 0;
  @Input('okPercent') okPercentage: number = 0;
  @Input('weakPercent') weakPercentage: number = 0;
  @Input('unassignedPercent') unassignedPercentage: number = 0;

  @Input('startDate')  startDate: string = '2018-10-01';
  @Input('endDate')  endDate: string = '2017-10-01';
}
