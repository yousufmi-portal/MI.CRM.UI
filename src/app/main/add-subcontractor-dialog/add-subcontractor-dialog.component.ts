import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectsService } from '../../services/projects-service/projects.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-subcontractor-dialog',
  imports: [DialogModule, FormsModule, ReactiveFormsModule, CommonModule, InputTextModule, InputNumberModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './add-subcontractor-dialog.component.html',
  styleUrl: './add-subcontractor-dialog.component.scss'
})
export class AddSubcontractorDialogComponent {
  @Input() display = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() projectId!: number;

  @Output() subcontractorAdded = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private projectsService: ProjectsService, private messageService: MessageService) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
    });
  }

  close() {
    this.display = false;
  }

  submit() {
    if (this.form.valid) {
      const subcontractorData = {
        ...this.form.value,
        projectId: this.projectId
      };
      this.projectsService.addSubcontractor(subcontractorData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Subcontractor added successfully' });
          this.subcontractorAdded.emit();
          this.form.reset();
          this.close();
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add subcontractor' });
        }
      });
    }
  }
}
