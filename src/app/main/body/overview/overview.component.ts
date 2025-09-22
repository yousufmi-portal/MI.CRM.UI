import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { ProgressBarModule, ProgressBar } from 'primeng/progressbar';
import { ProjectsService } from '../../../services/projects-service/projects.service';
import { OverviewRequestDto } from '../../../../api-dtos/overview-request.dto';
import { OverviewResponseDto } from '../../../../api-dtos/overview-response.dto';
import { SelectedProjectService } from '../../../services/selected-project-service/selected-project.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-overview',
  imports: [ProgressBarModule, ProgressBar, CommonModule, FormsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  weekStartDate: Date;
  weekEndDate: Date;
  projectId = signal<number | null>(null);
  isEditing: boolean = false;

  constructor(private projectService: ProjectsService, private selectedProjectService: SelectedProjectService, private route: ActivatedRoute) {
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

  ngOnInit(): void {
    this.selectedProjectService.projectId$
      .subscribe(projectId => {
        this.projectId.set(projectId);
        this.getProjectOverview();
      });
  }

  ProjectOverview: OverviewResponseDto | null = null;

  getProjectOverview(): void {
    const request: OverviewRequestDto = {
      projectId: this.projectId() || 0, // Fallback to 0 if null
      weekStartDate: this.weekStartDate.toISOString(),
      weekEndDate: this.weekEndDate.toISOString()
    };

    this.projectService.getProjectOverview(request).subscribe({
      next: (response) => {
        console.log('Project Overview:', response);
        this.ProjectOverview = response;
        this.editableStatus = this.ProjectOverview?.project?.status || '';
      },
      error: (err) => {
        console.error('Error fetching project overview:', err);
      }
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  editableStatus: string = '';

  isSaving: boolean = false;

  saveStatusDescription(): void {
    if (!this.ProjectOverview || !this.ProjectOverview.project) {
      console.error("No project loaded.");
      return;
    }

    const projectId = this.ProjectOverview.project.projectId; // adjust if key is named differently
    const status = this.editableStatus;

    if (!status || status.trim() === '') {
      console.warn("Status cannot be empty.");
      return;
    }

    this.isSaving = true;

    this.projectService.updateProjectStatusDescription(projectId, status)
      .subscribe({
        next: (response) => {
          console.log("Status updated successfully:", response);

          // update local project object with new status
          if (this.ProjectOverview) {
            this.ProjectOverview.project.status = status;
          }

          this.isEditing = false;
          this.isSaving = false;
        },
        error: (err) => {
          console.error("Error updating status:", err);
          // optionally show toast/snackbar here
        }
      });
  }

}