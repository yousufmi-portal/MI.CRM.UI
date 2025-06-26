import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { LoginModel } from '../../models/login.model';
import { RegisterModel } from '../../models/register.model';
import { FormControls } from '../../forms/form-control-types';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    PasswordModule,
    DividerModule,
    RouterModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isLogin = true;
  authForm!: FormGroup;

  mockUsers: LoginModel[] = [
    { email: 'umerdev@noemail.com', password: '12345678' },
    { email: 'ziadev@noemail.com', password: '12345678' }
  ];


  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.isLogin ? this.buildLoginForm() : this.buildRegisterForm();
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
    this.isLogin ? this.buildLoginForm() : this.buildRegisterForm();
  }

  onSubmit() {
    // if (this.authForm.invalid) return;

    const formData = this.authForm.value;
    if (this.isLogin) {
      let isAuthenticated: boolean = this.mockLoginAuth(formData.email, formData.password);

      if (isAuthenticated) {
        this.router.navigate(['/main/overview']);
      }
    } else {
      console.log('Registering with:', formData);
    }
  }

  private buildLoginForm(): void {
    this.authForm = this.fb.group<FormControls<LoginModel>>({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    });
  }



  private buildRegisterForm(): void {
    this.authForm = this.fb.group<FormControls<RegisterModel>>({
      fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      role: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    });
  }

  private mockLoginAuth(email: string, password: string): boolean {
    return this.mockUsers.some(
      user => user.email === email && user.password === password
    );
  }

}
