import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-projects-powerbi-summary-dialog',
  imports: [DialogModule],
  templateUrl: './projects-powerbi-summary-dialog.component.html',
  styleUrl: './projects-powerbi-summary-dialog.component.scss'
})
export class ProjectsPowerbiSummaryDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() projectCreated = new EventEmitter<boolean>();

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
