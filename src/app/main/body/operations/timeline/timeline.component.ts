import { Component, OnInit } from '@angular/core';
import { Checkbox } from 'primeng/checkbox';
import { OperationsSummaryDto } from '../../../../../api-dtos/operations-summary.dto';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { SelectedProjectService } from '../../../../services/selected-project-service/selected-project.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TasksService } from '../../../../service/tasks-service/tasks.service';

@Component({
  selector: 'app-timeline',
  imports: [TableModule, CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit {
  finishedTodos = [
    {
      "text": "There was exactly three inches.",
      "completed": true,
      "timestamp": "2025-05-09 10:03:15"
    },
    {
      "text": "Will you, won't you.",
      "completed": true,
      "timestamp": "2025-05-09 16:46:23"
    },
    {
      "text": "Queen jumped up on tiptoe, and.",
      "completed": true,
      "timestamp": "2025-05-09 10:03:15"
    },
    {
      "text": "Go on! \"I'm a poor man, your Majesty.'.",
      "completed": true,
      "timestamp": "2025-05-09 17:31:01"
    },
    {
      "text": "Alice with one eye.",
      "completed": true,
      "timestamp": "2025-05-09 10:03:15"
    }
  ]

  operationsSummary: OperationsSummaryDto | null = null;

  constructor(private projectsService: ProjectsService, private selectedProjectService: SelectedProjectService, private tasksService: TasksService) { }
  projectId: number | null = null;
  ngOnInit(): void {
    this.selectedProjectService.projectId$.subscribe(projectId => {
      this.projectId = projectId;
      this.loadOperationsSummary();
    });

  }

  loadOperationsSummary() {
    if (this.projectId) {
      this.projectsService.getOperationsSummary(this.projectId).subscribe(summary => {
        this.operationsSummary = summary;
      });
    }
  }

  loadTasks(customFilter: string = ''): void {
    this.tasksService.getTasksByProject(this.projectId || 0, undefined, customFilter).subscribe({
      next: (data) => {
        if (this.operationsSummary) {
          this.operationsSummary.tasks = data;
        }
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }
}
