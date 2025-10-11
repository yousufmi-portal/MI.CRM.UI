import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { UsersService } from '../../services/users-service/users.service';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, DialogModule, ReactiveFormsModule, PasswordModule, ButtonModule, DividerModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() userId!: number;

  verifyForm: FormGroup;
  updateForm: FormGroup;
  isVerified = false;
  verifying = false;
  updating = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService
  ) {
    // Step 1: Verify password form
    this.verifyForm = this.fb.group({
      currentPassword: ['', Validators.required]
    });

    // Step 2: Update new password form
    this.updateForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/) // one lowercase, one uppercase, one digit
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordsMatch }
    );
  }

  // Custom validator for confirming passwords
  passwordsMatch(group: AbstractControl) {
    const newPass = group.get('newPassword')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return newPass && confirmPass && newPass !== confirmPass ? { mismatch: true } : null;
  }

  verifyCurrentPassword() {
    if (this.verifyForm.invalid || !this.userId) return;
    this.verifying = true;

    const { currentPassword } = this.verifyForm.value;
    this.usersService.verifyPassword(this.userId, currentPassword).subscribe({
      next: (res: boolean) => {
        this.verifying = false;
        if (res) {
          this.isVerified = true;
          this.messageService.add({ severity: 'success', summary: 'Verified', detail: 'Current password verified.' });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Incorrect current password.' });
        }
      },
      error: () => {
        this.verifying = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verification failed.' });
      }
    });
  }

  updatePassword() {
    if (this.updateForm.invalid || this.updateForm.hasError('mismatch') || !this.userId) return;
    this.updating = true;

    const { newPassword } = this.updateForm.value;
    this.usersService.updatePassword(this.userId, newPassword).subscribe({
      next: () => {
        this.updating = false;
        this.isVerified = false;
        this.verifyForm.reset();
        this.updateForm.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password updated successfully.' });
        this.visible = false;
        this.visibleChange.emit(false);
      },
      error: () => {
        this.updating = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update password.' });
      }
    });
  }

  onDialogClose() {
    this.verifyForm.reset();
    this.updateForm.reset();
    this.isVerified = false;
    this.visibleChange.emit(false);
  }
}
