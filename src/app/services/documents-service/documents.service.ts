import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { DocumentDto } from '../../../api-dtos/document.dto';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/Documents`;

  constructor() { }

  uploadDocument(file: File, projectId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId.toString());
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getDocumentsByProject(projectId: number): Observable<DocumentDto[]> {
    return this.http.get<DocumentDto[]>(`${this.baseUrl}/project/${projectId}`);
  }

  deleteDocument(documentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${documentId}`);
  }

  uploadDocuments(formData: FormData) {
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

}
