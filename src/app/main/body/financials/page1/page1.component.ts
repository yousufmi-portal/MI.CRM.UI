import { Component, signal } from '@angular/core';
import { ProjectDto } from '../../../../../api-dtos/project.dto';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { CommonModule } from '@angular/common';
import { ProjectBudgetEntryDto } from '../../../../../api-dtos/project-budget-entry.dto';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { TableModule } from 'primeng/table';
import { getBudgetCategoryList } from '../../../../constants/budget-category.map';
import { SelectedProjectService } from '../../../../services/selected-project-service/selected-project.service';

@Component({
  selector: 'app-page1',
  imports: [
    CommonModule,
    TableModule
  ],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})
export class Page1Component {
  project = signal<ProjectDto | null>(null);
  projectBudgetEntries = signal<ProjectBudgetEntryDto[]>([]);
  loading = signal<boolean>(true);

  budgetCategoryList = signal<{ name: string; description: string | null }[]>(getBudgetCategoryList());

  constructor(private projectsService: ProjectsService, private selectedProjectService: SelectedProjectService) { }

  ngOnInit(): void {
    const projectId = localStorage.getItem('selectedProjectId') ? Number(localStorage.getItem('selectedProjectId')) : null;
    forkJoin({
      project: this.projectsService.getProjectById(projectId || 0),
      budgetEntries: this.projectsService.getBudgetEntriesByProjectId(projectId || 0)
    }).subscribe({
      next: ({ project, budgetEntries }) => {
        this.project.set(project);
        this.projectBudgetEntries.set(budgetEntries);
        this.loading.set(false);
      },
      error: () => {
        // Handle error for either request
        this.loading.set(false);
      }
    });

  }

  getApprovedAmount(categoryName: string): number {
    const match = this.projectBudgetEntries().find(
      entry => entry.categoryName === categoryName && entry.typeId === 1
    );
    return match?.amount ?? 0;
  }

}
