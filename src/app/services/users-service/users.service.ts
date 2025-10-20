import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserDto } from '../../../api-dtos/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/Users`;
  constructor() { }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.baseUrl}/get-all`);
  }

  getUserById(id: number): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/get/${id}`);
  }

  getCurrentUser(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/current`);
  }

  updateUser(formData: FormData): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.baseUrl}/update`, formData);
  }

  verifyPassword(userId: number, currentPassword: string) {
    return this.http.post<boolean>(`${this.baseUrl}/verify-password`, { userId, currentPassword });
  }

  updatePassword(userId: number, newPassword: string) {
    return this.http.put(`${this.baseUrl}/update-password`, { userId, newPassword });
  }

}
