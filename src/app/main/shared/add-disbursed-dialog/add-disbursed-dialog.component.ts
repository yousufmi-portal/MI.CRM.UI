import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from "primeng/select";

@Component({
  selector: 'app-add-disbursed-dialog',
  imports: [FormsModule, CommonModule, DialogModule, ButtonModule, InputTextModule, Select],
  templateUrl: './add-disbursed-dialog.component.html',
  styleUrl: './add-disbursed-dialog.component.scss'
})
export class AddDisbursedDialogComponent {
  @Input() display = false;
  @Output() displayChange = new EventEmitter<boolean>();

  form = {
    description: '',
    amount: null,
    date: '',
    document: null
  };

  show() {
    this.display = true;
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
    this.form = {
      description: '',
      amount: null,
      date: '',
      document: null
    };
  }

  submit() {
    console.log('Form Data:', this.form);
    // this.close();
  }
}
