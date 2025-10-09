import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StakeHolderDto } from '../../../../../api-dtos/stakeholder.dto';
import { StakeholdersService } from '../../../../services/stakeholders-service/stakeholders.service';
import { SelectedProjectService } from '../../../../services/selected-project-service/selected-project.service';
import { AddSubcontractorDialogComponent } from '../../../add-subcontractor-dialog/add-subcontractor-dialog.component';

@Component({
  selector: 'app-stakeholder-directory',
  imports: [
    CommonModule,
    CardModule,
    AvatarModule,
    BadgeModule,
    RippleModule,
    MenuModule,
    ButtonModule,
    AddSubcontractorDialogComponent
  ],
  templateUrl: './stakeholder-directory.component.html',
  styleUrl: './stakeholder-directory.component.scss'
})
export class StakeholderDirectoryComponent implements OnInit {
  stakeholders = signal<StakeHolderDto[]>([]);
  selectedStakeholder = signal<StakeHolderDto | null>(null);

  projectId: number = 0;

  addSubcontractorDialogVisible = false;

  constructor(private stakeholdersService: StakeholdersService, private selectedProjectService: SelectedProjectService) {

  }

  ngOnInit(): void {
    this.selectedProjectService.projectId$.subscribe(projectId => {
      this.projectId = projectId ?? 0;
      this.loadStakeholders();
    });
  }

  loadStakeholders(): void {
    this.stakeholdersService.getStakeholdersByProject(this.projectId).subscribe({
      next: (stakeholders) => {
        this.stakeholders.set(stakeholders);
      },
      error: (err) => {
        console.error('Error fetching stakeholders:', err);
      }
    });
  }
}
