import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ProjectsService } from '../../../services/projects-service/projects.service';
import { PowerBIEmbedModule } from "powerbi-client-angular";
import { models } from 'powerbi-client';

import * as powerbi from 'powerbi-client';

@Component({
  selector: 'app-projects-powerbi-summary-dialog',
  imports: [DialogModule, PowerBIEmbedModule],
  templateUrl: './projects-powerbi-summary-dialog.component.html',
  styleUrl: './projects-powerbi-summary-dialog.component.scss'
})
export class ProjectsPowerbiSummaryDialogComponent {
  constructor(private projectsService: ProjectsService) { }

  embedConfig: powerbi.IReportEmbedConfiguration | undefined;

  ngOnInit() {
    this.projectsService.getPowerBiEmbedConfig().subscribe(res => {
      this.embedConfig = {
        type: 'report',
        id: res.reportId,
        embedUrl: res.embedUrl,
        accessToken: res.accessToken,
        tokenType: models.TokenType.Embed,
        settings: {
          layoutType: models.LayoutType.Custom,
          customLayout: {
            displayOption: models.DisplayOption.ActualSize
          },
          panes: {
          },
          background: models.BackgroundType.Transparent
        }
      };
    });

  }

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() projectCreated = new EventEmitter<boolean>();

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
