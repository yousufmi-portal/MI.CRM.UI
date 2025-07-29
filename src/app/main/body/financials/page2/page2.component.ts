import { Component, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProjectBudgetEntryDto } from '../../../../../api-dtos/project-budget-entry.dto';
import { ProjectDto } from '../../../../../api-dtos/project.dto';
import { getBudgetCategoryList } from '../../../../constants/budget-category.map';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { AddDisbursedDialogComponent } from "../../../shared/add-disbursed-dialog/add-disbursed-dialog.component";

@Component({
  selector: 'app-page2',
  imports: [CommonModule, TableModule, FormsModule, SelectModule, AddDisbursedDialogComponent],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss'
})
export class Page2Component {
  project = signal<ProjectDto | null>(null);
  projectBudgetEntries = signal<ProjectBudgetEntryDto[]>([]);
  loading = signal<boolean>(true);

  budgetCategoryList = signal<{ name: string; description: string | null }[]>(getBudgetCategoryList());
  selectedBudgetCategory = signal<{ name: string; description: string | null } | null>(null);

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

  getDisbursedEntriesForSelectedCategory(): ProjectBudgetEntryDto[] {
    const selected = this.selectedBudgetCategory();
    if (!selected) return [];

    return this.projectBudgetEntries().filter(
      entry =>
        entry.categoryName?.trim().toLowerCase() === selected.name.trim().toLowerCase() &&
        entry.typeId === 2
    );
  }

  visibleAddDisbursedDialog = false;
  showAddDisbursedDialog() {
    this.visibleAddDisbursedDialog = true;
  }

}
