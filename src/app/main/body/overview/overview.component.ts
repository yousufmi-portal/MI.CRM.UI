import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProgressBarModule, ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-overview',
  imports: [ProgressBarModule, ProgressBar, CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  weekStartDate: Date;
  weekEndDate: Date;

  constructor() {
    const today = new Date();

    // Calculate Monday (start of week)
    const day = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
    const diffToMonday = (day === 0 ? -6 : 1 - day);
    this.weekStartDate = new Date(today);
    this.weekStartDate.setDate(today.getDate() + diffToMonday);

    // Calculate Sunday (end of week)
    this.weekEndDate = new Date(this.weekStartDate);
    this.weekEndDate.setDate(this.weekStartDate.getDate() + 6);
  }

}