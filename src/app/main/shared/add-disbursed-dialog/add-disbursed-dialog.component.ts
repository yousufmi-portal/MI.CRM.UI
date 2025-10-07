import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DisbursementsService } from '../../../services/disbursements/disbursements.service';
import { DisbursementDto, NewDisbursementDto } from '../../../../api-dtos/disbursement.dto';
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

  @Input() disbursementLogId: number | null = null; // null means new disbursement, otherwise edit existing
  @Output() disbursementLogIdChange = new EventEmitter<number | null>();
  @Output() disbursementAdded = new EventEmitter<void>();

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

    if (changes['disbursementLogId']) {
      const newId = changes['disbursementLogId'].currentValue;

      if (newId && newId !== 0) {
        // 🟢 Edit mode → load existing disbursement data
        this.display = true;
        this.disbursementsService.getDisbursementById(newId).subscribe({
          next: (data) => {
            this.form.patchValue({
              description: data.description,
              amount: data.disbursedAmount,
              date: new Date(data.disbursementDate),
              documentId: data.documentId || null,
              claimNumber: data.claimNumber || null,
              units: data.units || null,
              rate: data.rate || null
            });

            this.loadClaimNumbers(data.claimNumber);
          }
        })
      } else {
        // ⚪ New mode → reset form
        this.form.reset();
        this.disbursementLogId = null;
      }
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
    this.disbursementLogId = null;
    this.displayChange.emit(this.display);
    this.form.reset();
  }

  submit() {
    if (!this.form.valid) {
      console.warn('⚠️ Form is invalid');
      return;
    }

    // Base form values
    const baseDisbursementData = {
      projectId: this.projectId,
      categoryId: this.categoryId,
      description: this.form.value.description,
      disbursementDate: this.form.value.date?.toISOString(),
      disbursedAmount: this.form.value.amount,
      documentId: this.form.value.documentId,
      claimNumber: this.form.value.claimNumber,
      units: this.form.value.units,
      rate: this.form.value.rate
    };

    const isUpdate = this.disbursementLogId && this.disbursementLogId > 0;

    if (isUpdate) {
      // Existing disbursement - update
      const updatedDisbursement: DisbursementDto = {
        ...baseDisbursementData,
        disbursementLogId: this.disbursementLogId
      } as DisbursementDto;
      this.disbursementsService.updateDisbursement(updatedDisbursement).subscribe({
        next: () => {
          console.log('✅ Disbursement updated successfully');
          this.disbursementAdded.emit();
          this.close();
        }
      });
    }
    else {
      // New disbursement
      const newDisbursement: NewDisbursementDto = {
        ...baseDisbursementData,
        budgetEntryId: this.budgetEntryId
      } as NewDisbursementDto;

      this.disbursementsService.createDisbursement(newDisbursement).subscribe({
        next: () => {
          console.log('✅ Disbursement created successfully');
          this.disbursementAdded.emit();
          this.close();
        }
      });
    }
  }



  private loadClaimNumbers(claimNumber?: number): void {
    if (this.projectId) {
      this.disbursementsService.getClaimNumbers(this.projectId).subscribe(claimNumbers => {
        this.claimNumbers = claimNumbers;
        this.buildClaimOptions();

        // ✅ Preselect existing claim if available
        if (claimNumber) {
          this.form.patchValue({ claimNumber: claimNumber });
        }
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
