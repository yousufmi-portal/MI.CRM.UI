import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DisbursementsService } from '../../../services/disbursements/disbursements.service';
import { NewDisbursementDto } from '../../../../api-dtos/disbursement.dto';
import { DatePickerModule } from 'primeng/datepicker';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-add-disbursed-dialog',
  imports: [FormsModule, CommonModule, DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule, DatePickerModule, DropdownModule],
  templateUrl: './add-disbursed-dialog.component.html',
  styleUrl: './add-disbursed-dialog.component.scss'
})
export class AddDisbursedDialogComponent implements OnInit, OnChanges {
  @Input() display = false;
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() projectId!: number;
  @Input() categoryId!: number;

  @Input() budgetEntryId!: number;
  form: FormGroup;

  claimNumbers: number[] = [];

  ngOnInit(): void {

    // Whenever units or rate changes → recalc amount
    this.form.get('units')?.valueChanges.subscribe(() => this.updateAmount());
    this.form.get('rate')?.valueChanges.subscribe(() => this.updateAmount());

    this.loadClaimNumbers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId'] && !changes['projectId'].firstChange) {
      this.loadClaimNumbers();
    }
  }

  constructor(private fb: FormBuilder, private disbursementsService: DisbursementsService) {
    this.form = this.fb.group({
      description: [''],
      amount: [null],
      date: [''],
      documentId: [null],
      claimNumber: [null],
      units: [null],
      rate: [null]
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
    const disbursementData: NewDisbursementDto = {

      projectId: this.projectId,
      categoryId: this.categoryId,
      budgetEntryId: this.budgetEntryId,
      description: this.form.value.description,
      disbursementDate: this.form.value.date.toISOString(), // Convert to ISO string
      disbursedAmount: this.form.value.amount,
      documentId: this.form.value.documentId, // Optional, handle file upload separately if needed
      claimNumber: this.form.value.claimNumber, // Optional claim number
      units: this.form.value.units,
      rate: this.form.value.rate
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

  private loadClaimNumbers(): void {
    if (this.projectId) {
      this.disbursementsService.getClaimNumbers(this.projectId).subscribe(claimNumbers => {
        this.claimNumbers = claimNumbers;
        this.buildClaimOptions();
      });
    }
  }

  claimOptions: { label: string; value: number | 'new' }[] = [];
  private buildClaimOptions(): void {
    this.claimOptions = this.claimNumbers.map(num => ({
      label: `Claim ${num}`,
      value: num
    }));

    // Always add the "Add new claim" option
    this.claimOptions.push({ label: '+ Add new claim', value: 'new' });
  }

  onClaimChange(event: any) {
    if (event.value === 'new') {
      const newClaim = (this.claimNumbers.length > 0 ? Math.max(...this.claimNumbers) : 0) + 1;

      // Add it to list
      this.claimNumbers.push(newClaim);
      this.buildClaimOptions();

      // Select it
      this.form.patchValue({ claimNumber: newClaim });
    }
  }

  updateAmount() {
    if (this.categoryId == 2) return; // skip for fringe benefits

    // Calculate amount based on units and rate
    const units = this.form.get('units')?.value || 0;
    const rate = this.form.get('rate')?.value || 0;
    const autoAmount = units * rate;

    // ✅ Only update if user hasn't manually changed amount right now
    const currentAmount = this.form.get('amount')?.value;
    if (currentAmount !== autoAmount) {
      this.form.patchValue({ amount: autoAmount }, { emitEvent: false });
    }
  }
}
