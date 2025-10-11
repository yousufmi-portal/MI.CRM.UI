import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsService } from '../../services/projects-service/projects.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SubcontractorDto } from '../../../api-dtos/stakeholder.dto';

@Component({
  selector: 'app-add-subcontractor-dialog',
  imports: [DialogModule, FormsModule, ReactiveFormsModule, CommonModule, InputTextModule, InputNumberModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './add-subcontractor-dialog.component.html',
  styleUrl: './add-subcontractor-dialog.component.scss'
})
export class AddSubcontractorDialogComponent implements OnChanges {
  @Input() display = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() projectId!: number;

  @Output() subcontractorAdded = new EventEmitter<void>();

  @Input() editMode: boolean = false;
  @Input() subcontractorToEdit: SubcontractorDto | null = null;
  @Output() subcontractorEdited = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private projectsService: ProjectsService, private messageService: MessageService) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Prefill form in edit mode
    if (this.editMode && this.subcontractorToEdit) {
      this.form.patchValue({
        name: this.subcontractorToEdit.name,
        email: this.subcontractorToEdit.email,
      });
    } else if (!this.editMode) {
      this.form.reset();
    }
  }

  submit() {
    if (this.form.invalid) return;

    const subcontractorData: SubcontractorDto = this.form.value;

    if (this.editMode && this.subcontractorToEdit) {
      // 🔹 EDIT MODE
      this.projectsService.updateSubcontractor(this.subcontractorToEdit.id, subcontractorData).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Subcontractor updated successfully!',
          });
          this.subcontractorEdited.emit();
          this.close();
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update subcontractor.',
          });
        },
      });
    } else {
      // 🔹 ADD MODE
      this.projectsService.addSubcontractor({ ...subcontractorData, projectId: this.projectId }).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Added',
            detail: 'Subcontractor added successfully!',
          });
          this.subcontractorAdded.emit();
          this.close();
        },
        error: (err) => {
          console.error(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add subcontractor.',
          });
        },
      });
    }
  }


  close() {
    this.display = false;
    this.displayChange.emit(false);
  }
}
