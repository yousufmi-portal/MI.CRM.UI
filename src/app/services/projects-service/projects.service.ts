import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDto } from '../../../api-dtos/project.dto';
import { environment } from '../../../environments/environment.development';
import { ProjectBudgetEntryDto } from '../../../api-dtos/project-budget-entry.dto';
import { OverviewRequestDto } from '../../../api-dtos/overview-request.dto';
import { OverviewResponseDto } from '../../../api-dtos/overview-response.dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/projects`;

  getProjectById(id: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${this.baseUrl}/GetById/${id}`);
  }

  getBudgetEntriesByProjectId(projectId: number): Observable<ProjectBudgetEntryDto[]> {
    return this.http.get<ProjectBudgetEntryDto[]>(`${this.baseUrl}/GetBudgetEntriesByProjectId/${projectId}`);
  }

  getProjectOverview(request: OverviewRequestDto): Observable<OverviewResponseDto> {
    return this.http.post<OverviewResponseDto>(`${this.baseUrl}/Overview`, request);
  }
}
