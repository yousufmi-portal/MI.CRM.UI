import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { BudgetCategoryList } from '../../../constants/budget-category.map';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { CreateProjectDto } from '../../../../api-dtos/create-project.dto';
import { ProjectsService } from '../../../services/projects-service/projects.service';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-add-project-form',
  imports: [CommonModule, ButtonModule, StepperModule, Dialog, ReactiveFormsModule, InputTextModule, FloatLabelModule, TableModule, DatePickerModule, SelectModule],
  templateUrl: './add-project-form.component.html',
  styleUrl: './add-project-form.component.scss'
})
export class AddProjectFormComponent {

  projectForm: FormGroup;

  budgetCategories = BudgetCategoryList; // Assuming this function is imported from the budget category map file

  constructor(private fb: FormBuilder, private projectsService: ProjectsService) {
    this.projectForm = this.fb.group({
      projectDetails: this.fb.group({
        title: ['', Validators.required],
        awardNumber: ['', Validators.required],
        category: ['', Validators.required],
        agency: ['', Validators.required],
        company: ['', Validators.required],
        state: ['', Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        projectStatus: ['', Validators.required]
      }),
      subcontractorDetails: this.fb.group({
        subcontractorName: ['', Validators.required],
        email: [''] // optional
      }),
      projectBudgetInfo: this.fb.array([]) // dynamic table rows (category + amount)
    });

    const budgetArray = this.projectForm.get('projectBudgetInfo') as FormArray;

    this.budgetCategories.forEach(category => {
      budgetArray.push(this.fb.group({
        categoryId: [category.id], // hidden/fixed
        approvedAmount: [0]
      }));
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0); // force 00:00
    this.projectForm.get('endDate')?.setValue(today);
  }

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Output() projectCreated = new EventEmitter<boolean>();

  close(success: boolean = false) {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.projectCreated.emit(success);
  }

  getCategoryName(id: number): string {
    return this.budgetCategories.find(c => c.id === id)?.name ?? '';
  }

  get projectBudgetInfo(): FormArray {
    return this.projectForm.get('projectBudgetInfo') as FormArray;
  }

  submit() {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;

      let projectData: CreateProjectDto = {
        projectDetails: {
          title: formData.projectDetails.title,
          awardNumber: formData.projectDetails.awardNumber,
          category: formData.projectDetails.category,
          agency: formData.projectDetails.agency,
          company: formData.projectDetails.company,
          state: formData.projectDetails.state,
          startDate: formData.projectDetails.startDate,
          endDate: formData.projectDetails.endDate,
          projectStatus: formData.projectDetails.projectStatus
        },
        subcontractorDetails: {
          subcontractorName: formData.subcontractorDetails.subcontractorName,
          email: formData.subcontractorDetails.email
        },
        projectBudgetInfo: formData.projectBudgetInfo
      };

      this.projectsService.createProject(projectData).subscribe({
        next: (response) => {
          console.log('Project created successfully:', response);
          this.close(true); // Close the dialog after successful submission
        }
      });
      console.log('Form submitted:', projectData);
      // this.close(); // Close the dialog after submission
    } else {
      // Handle form validation errors
      console.error('Form is invalid');
    }
  }

}
