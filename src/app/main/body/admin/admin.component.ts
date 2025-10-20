import { Component, OnInit, signal, Signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProjectsService } from '../../../services/projects-service/projects.service';
import { ProjectDto } from '../../../../api-dtos/project.dto';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { AddProjectFormComponent } from "../../shared/add-project-form/add-project-form.component";
import { Router } from '@angular/router';
import { SelectedProjectService } from '../../../services/selected-project-service/selected-project.service';
import { UserDto } from '../../../../api-dtos/user.dto';
import { UsersService } from '../../../services/users-service/users.service';
import { forkJoin } from 'rxjs';
import { ROLES } from '../../../constants/roles.list';
import { ProjectsPowerbiSummaryDialogComponent } from "../../shared/projects-powerbi-summary-dialog/projects-powerbi-summary-dialog.component";
import { MainPageDataDto } from '../../../../api-dtos/main-page-data.dto';
import { ShortenCurrencyPipe } from '../../../../pipes/shorten-currency.pipe';
import { MessageService } from 'primeng/api';
import { HttpResponse } from '@angular/common/http';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface Column {
  field: string;
  header: string;
  align?: 'left' | 'right' | 'center';
}
@Component({
  selector: 'app-admin',
  imports: [ButtonModule, TableModule, CommonModule, AddProjectFormComponent, ProjectsPowerbiSummaryDialogComponent, ShortenCurrencyPipe, ProgressSpinnerModule],
  providers: [MessageService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})


export class AdminComponent implements OnInit {

  constructor(private projectsService: ProjectsService, private router: Router, private selectedProjectService: SelectedProjectService, private usersService: UsersService, private messageService: MessageService) { }

  projects = signal<ProjectDto[]>([]);
  user = signal<UserDto | null>(null);
  roles = ROLES;
  selectedProjectId = signal<number | null>(null);
  isAddProjectFormVisible = false;
  isProjectsSummaryDialogVisible = false;
  cols: Column[] = [
    {
      field: 'title',
      header: 'Project Title',
      align: 'left'
    },
    {
      field: 'awardNumber',
      header: 'Award Number',
      align: 'left'
    }
  ]

  ngOnInit(): void {
    // this.loadProjectsData(true);
    // this.loadProjectsAndUser();
    this.loadMainPageData();
  }

  loadProjectsData(shouldCallData: boolean = false) {
    if (shouldCallData) {
      this.loadMainPageData();
    }
  }

  onProjectSelected(projectId: number) {
    this.selectedProjectId.set(projectId);
    localStorage.setItem('selectedProjectId', projectId.toString());
    this.selectedProjectService.setProjectId(projectId);
    this.router.navigate([`/main/overview/${projectId}`]);
  }

  loadProjectsAndUser() {
    forkJoin({
      projects: this.projectsService.getAllProjects(),
      user: this.usersService.getCurrentUser()
    }).subscribe({
      next: ({ projects, user }) => {
        this.projects.set(projects);
        this.user.set(user);
      },
      error: (err) => {
        console.error('Error loading projects or user:', err);
      }
    });
  }

  getRoleName(roleId: number): string {
    const role = this.roles.find(r => r.roleId === roleId);
    return role ? role.name : 'Unknown Role';
  }

  data: MainPageDataDto | null = null;
  loadMainPageData() {
    this.projectsService.getMainPageData().subscribe(data => {
      this.data = data;
    });

  }

  deleteProject(projectId: number) {
    this.projectsService.deleteProject(projectId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Project deleted successfully' });
        this.loadMainPageData();
      },
      error: (err) => {
        console.error('Error deleting project:', err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete project' });
      }
    });
  }

  reportGeneratingIds = new Set<number>();
  generateProjectReport(projectId: number, awardNumber: string) {
    this.reportGeneratingIds.add(projectId);
    this.projectsService.generateProjectReport(projectId).subscribe({
      next: (response: HttpResponse<Blob>) => {
        // ✅ Extract filename from Content-Disposition header
        let fileName = `ProjectReport_${awardNumber}.pdf`; // default filename
        

        // ✅ Create blob and open in new tab
        const blob = response.body!;
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName;
        // document.body.appendChild(a);
        a.click();
        // document.body.removeChild(a);

        // (Optional) Clean up memory
        this.reportGeneratingIds.delete(projectId);
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 5000);
      },
      error: (err) => {
        this.reportGeneratingIds.delete(projectId);
        console.error('Error generating project report:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to generate project report'
        });
      }
    });
  }

}
