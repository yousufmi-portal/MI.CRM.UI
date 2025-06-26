import { Component } from '@angular/core';
import { ProgressBarModule, ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-overview',
  imports: [ProgressBarModule, ProgressBar],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {

}