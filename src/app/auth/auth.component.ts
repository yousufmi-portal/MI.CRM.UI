import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { LoginModel } from '../../app-models/login.model';
import { RegisterModel } from '../../app-models/register.model';
import { FormControls } from '../../forms/form-control-types';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ROLES } from '../constants/roles.list';
import { SelectModule } from 'primeng/select';
import { AuthService } from '../services/auth-service/auth.service';
import { RegisterDto } from '../../api-dtos/register.dto';
import { LoginDto } from '../../api-dtos/login.dto';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { FileUploadModule } from 'primeng/fileupload';

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
    RouterModule,
    SelectModule,
    ToastModule,
    ProgressSpinnerModule,
    FileUploadModule
  ],
  providers: [MessageService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isLogin = true;
  authForm!: FormGroup;

  Roles = ROLES;
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.isLogin ? this.buildLoginForm() : this.buildRegisterForm();
  }

  toggleAuthMode() {
    this.isLogin = !this.isLogin;
    this.isLogin ? this.buildLoginForm() : this.buildRegisterForm();
  }

  onSubmit() {
    this.loading = true;
    console.log(this.authForm.value);

    if (this.isLogin) {
      let loginDto: LoginDto = {
        email: this.authForm.value.email,
        password: this.authForm.value.password
      }

      this.authService.loginUser(loginDto).subscribe({
        next: (response) => {
          this.authForm.reset();
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful!' });
          this.router.navigate(['/main/admin']);
          this.loading = false;
        },
        error: (error) => {
          console.error('Login failed:', error);

          this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid email or password' });

          this.loading = false;
        }
      });
    }
    else {

      let registerDto: RegisterDto = {
        name: this.authForm.value.fullName,
        email: this.authForm.value.email,
        roleId: this.authForm.value.roleId,
        password: this.authForm.value.password,
        imageFile: this.selectedFile || undefined // 👈 add this line
      }
      this.authService.registerUser(registerDto).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration successful!' });
          // this.router.navigate(['/login']);
          this.isLogin = true;
          this.authForm.reset();
          this.buildLoginForm(); // Reset to login form after successful registration
          this.loading = false;
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.messageService.add({ severity: 'error', summary: 'Registration Failed', detail: 'Something went wrong!' });
          this.loading = false;
        }
      });
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
      roleId: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
    });
  }

  selectedFile: File | null = null;
  selectedImageUrl: string | null = null;

  onImageSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.selectedFile = file;

    }
  }

  removeSelectedImage() {
    this.selectedFile = null;
    this.selectedImageUrl = null;
  }
}
