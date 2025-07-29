import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDto } from '../../../api-dtos/task.dto';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/tasks`;


  getTasksByProject(projectId: number, statusId?: number): Observable<TaskDto[]> {
    let params = new HttpParams().set('projectId', projectId.toString());

    if (statusId !== undefined && statusId !== null) {
      params = params.set('statusId', statusId.toString());
    }

    return this.http.get<TaskDto[]>(`${this.baseUrl}/ProjectTasks`, { params });
  }
}
