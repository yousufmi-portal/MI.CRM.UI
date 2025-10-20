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
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-page2',
  imports: [CommonModule, TableModule, FormsModule, SelectModule, AddDisbursedDialogComponent, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss'
})
export class Page2Component implements OnInit {

  projectBudgetEntries = signal<ProjectBudgetEntryDto[]>([]);
  loading = signal<boolean>(true);

  budgetCategoryList = BudgetCategoryList;
  selectedBudgetCategory = signal<{ id: number; name: string; description: string | null } | null>(this.budgetCategoryList[0]);

  projectId: number | null = null;
  constructor(private projectsService: ProjectsService, private disbursementsService: DisbursementsService, private selectedProjectService: SelectedProjectService, private route: ActivatedRoute, private messageService: MessageService) {
    this.route.paramMap.subscribe(params => {
      this.projectId = (Number(params.get('projectId')));
    });
  }

  currentDisbursementLogId: number | null = null;

  ngOnInit(): void {
    this.selectedProjectService.projectId$
      .subscribe(projectId => {
        this.projectId = projectId;
        this.loadProjectBudgetEntries();
      });
  }

  disbursementEntries = signal<DisbursementDto[]>([]);
  loadProjectBudgetEntries() {
    this.currentDisbursementLogId = null;
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

  openEditDisbursementDialog(disbursementLogId: number) {
    console.log('Editing disbursement with ID:', disbursementLogId);
    this.currentDisbursementLogId = disbursementLogId;
    this.visibleAddDisbursedDialog = true;
  }

  deleteDisbursement(disbursementLogId: number) {
    this.disbursementsService.deleteDisbursement(disbursementLogId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Disbursement deleted successfully.' });
        this.loadProjectBudgetEntries(); // reload everything
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete disbursement.' });
      }
    });
  }

}
