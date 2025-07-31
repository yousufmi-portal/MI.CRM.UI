import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { DisbursementDto, NewDisbursementDto } from '../../../api-dtos/disbursement.dto';

@Injectable({
  providedIn: 'root'
})
export class DisbursementsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/disbursement`;
  constructor() { }

  createDisbursement(disbursement: NewDisbursementDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, disbursement);
  }
  getDisbursementsByProjectId(projectId: number, categoryId: number): Observable<DisbursementDto[]> {
    return this.http.get<DisbursementDto[]>(`${this.baseUrl}/get/${projectId}/${categoryId}`);
  }


}
