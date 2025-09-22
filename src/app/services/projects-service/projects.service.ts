import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDto } from '../../../api-dtos/project.dto';
import { environment } from '../../../environments/environment.development';
import { ProjectBudgetEntryDto } from '../../../api-dtos/project-budget-entry.dto';
import { OverviewRequestDto } from '../../../api-dtos/overview-request.dto';
import { OverviewResponseDto } from '../../../api-dtos/overview-response.dto';
import { CreateProjectDto } from '../../../api-dtos/create-project.dto';
import { OperationsSummaryDto } from '../../../api-dtos/operations-summary.dto';
import { MainPageDataDto } from '../../../api-dtos/main-page-data.dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/projects`;

  getAllProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(`${this.baseUrl}/GetAll`);
  }

  getProjectById(id: number): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(`${this.baseUrl}/GetById/${id}`);
  }

  getBudgetEntriesByProjectId(projectId: number): Observable<ProjectBudgetEntryDto[]> {
    return this.http.get<ProjectBudgetEntryDto[]>(`${this.baseUrl}/GetBudgetEntriesByProjectId/${projectId}`);
  }

  getProjectBudgetEntriesByCategory(projectId: number, categoryId: number): Observable<ProjectBudgetEntryDto[]> {
    return this.http.get<ProjectBudgetEntryDto[]>(`${this.baseUrl}/ProjectBudgetEntriesByCategory/${projectId}/${categoryId}`);
  }

  getProjectOverview(request: OverviewRequestDto): Observable<OverviewResponseDto> {
    return this.http.post<OverviewResponseDto>(`${this.baseUrl}/Overview`, request);
  }

  createProject(project: CreateProjectDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Create`, project);
  }

  getPowerBiEmbedConfig(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/PowerBI/embed-config`);
  }

  getOperationsSummary(projectId: number): Observable<OperationsSummaryDto> {
    return this.http.get<OperationsSummaryDto>(`${this.baseUrl}/OperationsSummary/${projectId}`);
  }

  getMainPageData(): Observable<MainPageDataDto> {
    return this.http.get<MainPageDataDto>(`${this.baseUrl}/MainPageData`);
  }

  updateProjectStatusDescription(projectId: number, statusDescription: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/UpdateProjectStatusDescription`, { projectId: projectId, status: statusDescription });
  }
}
