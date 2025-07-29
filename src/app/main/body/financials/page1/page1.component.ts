import { Component, signal } from '@angular/core';
import { ProjectDto } from '../../../../../api-dtos/project.dto';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { CommonModule } from '@angular/common';
import { ProjectBudgetEntryDto } from '../../../../../api-dtos/project-budget-entry.dto';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { TableModule } from 'primeng/table';
import { getBudgetCategoryList } from '../../../../constants/budget-category.map';

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

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    const projectId = 19; // Replace with route param if needed
    forkJoin({
      project: this.projectsService.getProjectById(projectId),
      budgetEntries: this.projectsService.getBudgetEntriesByProjectId(projectId)
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
