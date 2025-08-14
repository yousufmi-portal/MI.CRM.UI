import { Component, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ProjectBudgetEntryDto } from '../../../../../api-dtos/project-budget-entry.dto';
import { ProjectDto } from '../../../../../api-dtos/project.dto';
import { BudgetCategoryList, BudgetCategoryMap, getBudgetCategoryList } from '../../../../constants/budget-category.map';
import { ProjectsService } from '../../../../services/projects-service/projects.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { AddDisbursedDialogComponent } from "../../../shared/add-disbursed-dialog/add-disbursed-dialog.component";
import { DisbursementsService } from '../../../../services/disbursements/disbursements.service';
import { DisbursementDto } from '../../../../../api-dtos/disbursement.dto';
import { SelectedProjectService } from '../../../../services/selected-project-service/selected-project.service';

@Component({
  selector: 'app-page2',
  imports: [CommonModule, TableModule, FormsModule, SelectModule, AddDisbursedDialogComponent],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss'
})
export class Page2Component implements OnInit {

  projectBudgetEntries = signal<ProjectBudgetEntryDto[]>([]);
  loading = signal<boolean>(true);

  budgetCategoryList = BudgetCategoryList;
  selectedBudgetCategory = signal<{ id: number; name: string; description: string | null } | null>(this.budgetCategoryList[0]);

  projectId: number | null = null;
  constructor(private projectsService: ProjectsService, private disbursementsService: DisbursementsService, private selectedProjectService: SelectedProjectService) {
    this.projectId = localStorage.getItem('selectedProjectId') ? Number(localStorage.getItem('selectedProjectId')) : null;
  }

  ngOnInit(): void {

    this.loadProjectBudgetEntries();
  }

  disbursementEntries = signal<DisbursementDto[]>([]);
  loadProjectBudgetEntries() {

    forkJoin({
      projectBudgetEntries: this.projectsService.getProjectBudgetEntriesByCategory(this.projectId || 0, this.selectedBudgetCategory()?.id ?? 0),
      disbursements: this.disbursementsService.getDisbursementsByProjectId(this.projectId || 0, this.selectedBudgetCategory()?.id ?? 0)
    }).subscribe({
      next: ({ projectBudgetEntries, disbursements }) => {
        this.projectBudgetEntries.set(projectBudgetEntries);
        this.disbursementEntries.set(disbursements);
        this.loading.set(false);
      },
      error: () => {
        // Handle error
        this.loading.set(false);
      }
    });
  }

  visibleAddDisbursedDialog = false;

  selectedDisbursedBudgetEntry: ProjectBudgetEntryDto | null = null;
  showAddDisbursedDialog() {
    this.selectedDisbursedBudgetEntry = this.projectBudgetEntries()?.length > 0 ? this.projectBudgetEntries()[1] : null;
    this.visibleAddDisbursedDialog = true;
  }

  previousBudgetCategory: any = null;
  onBudgetCategoryChange(event: any): void {
    const newValue = event.value;
    if (this.previousBudgetCategory?.id !== newValue?.id) {
      this.previousBudgetCategory = newValue;
      this.loadProjectBudgetEntries();
      console.log('Budget category actually changed:', newValue);
    } else {
      // Value didn't actually change
      console.log('Same category selected again, ignoring.');
    }
  }

  getBudgetAmount(index: number): number {
    const entries = this.projectBudgetEntries();
    return entries.length > index ? entries[index].amount : 0;
  }

}
