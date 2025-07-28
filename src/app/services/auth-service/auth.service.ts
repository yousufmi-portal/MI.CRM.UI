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
    return this.http.post(`${this.baseUrl}/register`, registerDto);
  }

  loginUser(loginDto: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginDto);
  }
}
