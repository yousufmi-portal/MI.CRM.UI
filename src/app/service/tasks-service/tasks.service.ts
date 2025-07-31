import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDto } from '../../../api-dtos/task.dto';
import { environment } from '../../../environments/environment.development';
import { NewTaskDto } from '../../../api-dtos/new-task.dto';
import { UpdateTaskStatusDto } from '../../../api-dtos/update-task-status.dto';
import { UpdateTaskDateTimeDto } from '../../../api-dtos/update-tast-datetime.dto';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/tasks`;


  createTask(task: NewTaskDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, task);
  }

  updateTaskStatus(dto: UpdateTaskStatusDto): Observable<any> {
    return this.http.put(`${this.baseUrl}/update-status`, dto);
  }

  updateTaskDateTime(dto: UpdateTaskDateTimeDto): Observable<any> {
    const url = `${this.baseUrl}/update-datetime`;
    return this.http.put(url, dto);
  }


  getTasksByProject(projectId: number, statusId?: number): Observable<TaskDto[]> {
    let params = new HttpParams().set('projectId', projectId.toString());

    if (statusId !== undefined && statusId !== null) {
      params = params.set('statusId', statusId.toString());
    }

    return this.http.get<TaskDto[]>(`${this.baseUrl}/ProjectTasks`, { params });
  }
}
