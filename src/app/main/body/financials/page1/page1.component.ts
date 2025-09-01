import { Component, signal } from '@angular/core';
import { ProjectDto } from '../../../../../api-dtos/project.dto';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { CommonModule } from '@angular/common';
import { ProjectBudgetEntryDto } from '../../../../../api-dtos/project-budget-entry.dto';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { TableModule } from 'primeng/table';
import { getBudgetCategoryList } from '../../../../constants/budget-category.map';
import { SelectedProjectService } from '../../../../services/selected-project-service/selected-project.service';
import { ActivatedRoute } from '@angular/router';

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

  projectId!: number;

  constructor(private projectsService: ProjectsService, private selectedProjectService: SelectedProjectService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.projectId = (Number(params.get('projectId')));
    });
  }

  ngOnInit(): void {
    this.selectedProjectService.projectId$
      .subscribe(projectId => {
        this.projectId = projectId!;
        this.getData();
      });

  }

  getApprovedAmount(categoryName: string): number {
    const match = this.projectBudgetEntries().find(
      entry => entry.categoryName === categoryName && entry.typeId === 1
    );
    return match?.amount ?? 0;
  }

  getDisbursedAmount(categoryName: string): number {
    const match = this.projectBudgetEntries().find(
      entry => entry.categoryName === categoryName && entry.typeId === 2
    );
    return match?.amount ?? 0;
  }

  getRemainingAmount(categoryName: string): number {
    const match = this.projectBudgetEntries().find(
      entry => entry.categoryName === categoryName && entry.typeId === 3
    );
    return match?.amount ?? 0;
  }

 getData () {
  forkJoin({
      project: this.projectsService.getProjectById(this.projectId || 0),
      budgetEntries: this.projectsService.getBudgetEntriesByProjectId(this.projectId || 0)
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
}
