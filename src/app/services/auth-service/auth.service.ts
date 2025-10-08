import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RegisterDto } from '../../../api-dtos/register.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }


  private baseUrl = `${environment.apiUrl}/auth`;

  registerUser(registerDto: RegisterDto): Observable<any> {
    const formData = new FormData();

    formData.append('name', registerDto.name);
    formData.append('email', registerDto.email);
    formData.append('roleId', registerDto.roleId.toString());
    formData.append('password', registerDto.password);

    // 👇 only append the file if it's selected
    if (registerDto.imageFile) {
      formData.append('imageFile', registerDto.imageFile);
    }

    return this.http.post(`${this.baseUrl}/register`, formData);
  }


  loginUser(loginDto: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginDto);
  }
}
