import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { StakeHolderDto } from '../../../api-dtos/stakeholder.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StakeholdersService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/StakeHolders`;

  constructor() { }

  getAllStakeholders(): Observable<StakeHolderDto[]> {
    return this.http.get<StakeHolderDto[]>(this.baseUrl + '/GetAll');
  }

  getStakeholdersByProject(projectId: number): Observable<StakeHolderDto[]> {
    return this.http.get<StakeHolderDto[]>(`${this.baseUrl}/GetByProject/${projectId}`);
  }
}
