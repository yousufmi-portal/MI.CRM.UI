import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from "primeng/select";
import { DisbursementsService } from '../../../services/disbursements/disbursements.service';

@Component({
  selector: 'app-add-disbursed-dialog',
  imports: [FormsModule, CommonModule, DialogModule, ButtonModule, InputTextModule, Select, ReactiveFormsModule],
  templateUrl: './add-disbursed-dialog.component.html',
  styleUrl: './add-disbursed-dialog.component.scss'
})
export class AddDisbursedDialogComponent {
  @Input() display = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() projectId!: number;
  @Input() categoryId!: number;
  form: FormGroup;

  constructor(private fb: FormBuilder, private disbursementsService: DisbursementsService) {
    this.form = this.fb.group({
      description: [''],
      amount: [null],
      date: [''],
      documentId: [null]  // This is just a placeholder, file upload should be handled separately
    });
  }

  show() {
    this.display = true;
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
    this.form.reset();
  }

  submit() {
    console.log('Form Data:', this.form.value);
    const disbursementData = {
      ...this.form.value,
      projectId: this.projectId,
      categoryId: this.categoryId
    };
    this.disbursementsService.createDisbursement(disbursementData).subscribe({
      next: () => {
        console.log('Disbursement created successfully');
        this.close();
      },
      error: (error) => {
        console.error('Error creating disbursement:', error);
      }
    });
  }
}
