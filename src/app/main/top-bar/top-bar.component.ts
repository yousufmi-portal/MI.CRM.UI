import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectDto } from '../../../api-dtos/project.dto';
import { ProjectsService } from '../../services/projects-service/projects.service';
import { SelectModule } from 'primeng/select';
import { SelectedProjectService } from '../../services/selected-project-service/selected-project.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    ToolbarModule,
    AvatarModule,
    Menu,
    SelectModule,
    CommonModule
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {
  currentUrl = '';
  hiddenRoutes = ['/main/admin', '/main/operations/stakeholder-directory'];
  selectVisible = false;
  constructor(private router: Router, private projectsService: ProjectsService, private route: ActivatedRoute, private selectedProjectService: SelectedProjectService) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
      this.selectVisible = !this.hiddenRoutes.includes(this.currentUrl);
    });
  }

  ngOnInit(): void {
    this.selectedProjectService.projectId$
      .subscribe(projectId => {
        this.projectId = projectId ?? 0;
        this.getProjects();
      });

  }

  @Input() isDrawerOpen: boolean = true;
  @Output() toggleLeftSideBar = new EventEmitter<void>();
  search: string = '';

  projects: ProjectDto[] = [];
  selectedProject?: ProjectDto;

  projectId!: number;

  topMenuItems: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Admin',
          icon: 'pi pi-arrow-up-right',
          routerLink: ['/main/admin']
        },
        {
          label: 'Log Out',
          icon: 'pi pi-sign-out',
          command: () => this.logout()
        }
      ]
    }
  ];


  hamburgerBtnClickHandler(): void {
    this.toggleLeftSideBar.emit();
  }

  avatarClickHandler() {
    console.log('Avatar clicked');
  }

  logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Navigate to base URL
    this.router.navigate(['/']);
  }

  getProjects() {
    this.projectsService.getAllProjects().subscribe({
      next: (res) => {
        this.projects = res;
        this.selectedProject = this.projects.find(p => p.projectId === this.projectId);
        console.log(this.selectedProject);
      }
    })
  }

  onProjectSelected() {
    this.selectedProjectService.setProjectId(this.selectedProject?.projectId ?? null);
  }

  shouldShowSelector(): boolean {
    this.selectVisible = !this.hiddenRoutes.includes(this.currentUrl);
    return this.selectVisible;
  }
}
