import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StakeHolderDto, SubcontractorDto } from '../../../../../api-dtos/stakeholder.dto';
import { StakeholdersService } from '../../../../services/stakeholders-service/stakeholders.service';
import { SelectedProjectService } from '../../../../services/selected-project-service/selected-project.service';
import { AddSubcontractorDialogComponent } from '../../../add-subcontractor-dialog/add-subcontractor-dialog.component';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { MessageService } from 'primeng/api';

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
  providers: [MessageService],
  templateUrl: './stakeholder-directory.component.html',
  styleUrl: './stakeholder-directory.component.scss'
})
export class StakeholderDirectoryComponent implements OnInit {
  stakeholders = signal<StakeHolderDto[]>([]);
  selectedStakeholder = signal<StakeHolderDto | null>(null);

  projectId: number = 0;

  addSubcontractorDialogVisible = false;

  isEditMode = false;
  selectedSubcontractor: SubcontractorDto | null = null;

  constructor(private stakeholdersService: StakeholdersService, private selectedProjectService: SelectedProjectService, private projectsService: ProjectsService, private messageService: MessageService) {

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

  openAddDialog() {
    this.isEditMode = false;
    this.selectedSubcontractor = null;
    this.addSubcontractorDialogVisible = true;
  }

  openEditDialog(subcontractor: SubcontractorDto) {
    this.isEditMode = true;
    this.selectedSubcontractor = subcontractor;
    this.addSubcontractorDialogVisible = true;
  }

  deleteSubcontractor(subcontractorId: number) {
    this.projectsService.deleteSubcontractor(this.projectId, subcontractorId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Subcontractor deleted successfully!' });
        this.loadStakeholders();
      },
      error: (err) => {
        console.error('Error deleting subcontractor:', err);
      }
    });
  }
}
