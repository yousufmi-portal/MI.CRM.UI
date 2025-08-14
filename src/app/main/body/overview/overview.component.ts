import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { ProgressBarModule, ProgressBar } from 'primeng/progressbar';
import { ProjectsService } from '../../../services/projects-service/projects.service';
import { OverviewRequestDto } from '../../../../api-dtos/overview-request.dto';
import { OverviewResponseDto } from '../../../../api-dtos/overview-response.dto';
import { SelectedProjectService } from '../../../services/selected-project-service/selected-project.service';

@Component({
  selector: 'app-overview',
  imports: [ProgressBarModule, ProgressBar, CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  weekStartDate: Date;
  weekEndDate: Date;
  projectId = signal<number | null>(null);

  constructor(private projectService: ProjectsService, private selectedProjectService: SelectedProjectService) {
    const today = new Date();
    this.projectId.set(this.selectedProjectService.getProjectId()());
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
    this.projectId.set(Number(localStorage.getItem('selectedProjectId')));
    this.getProjectOverview();
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
      },
      error: (err) => {
        console.error('Error fetching project overview:', err);
      }
    });
  }

}