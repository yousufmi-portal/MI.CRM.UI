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

interface Column {
  field: string;
  header: string;
  align?: 'left' | 'right' | 'center';
}
@Component({
  selector: 'app-admin',
  imports: [ButtonModule, TableModule, CommonModule, AddProjectFormComponent, ProjectsPowerbiSummaryDialogComponent, ShortenCurrencyPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})


export class AdminComponent implements OnInit {

  constructor(private projectsService: ProjectsService, private router: Router, private selectedProjectService: SelectedProjectService, private usersService: UsersService) { }

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
      this.projectsService.getAllProjects().subscribe(projects => {
        this.projects.set(projects);
      });
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
}
