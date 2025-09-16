import { Component, EventEmitter, Input, Output, HostListener, OnInit } from '@angular/core';

import { DrawerModule } from 'primeng/drawer'
import { ButtonModule } from 'primeng/button';
import { Select, SelectModule } from 'primeng/select';
import { PanelMenuModule } from 'primeng/panelmenu'
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SelectedProjectService } from '../../services/selected-project-service/selected-project.service';

@Component({
  selector: 'app-left-side-bar',
  imports: [DrawerModule, ButtonModule, SelectModule, PanelMenuModule],
  templateUrl: './left-side-bar.component.html',
  styleUrl: './left-side-bar.component.scss'
})
export class LeftSideBarComponent implements OnInit {
  @Input() isOpen: boolean = true;
  @Output() closed = new EventEmitter<void>();
  projectId : number | null = null;

  constructor(private router: Router, private selectedProjectService: SelectedProjectService) { }

  ngOnInit(): void {
    // Initialize menu items
    this.buildMenuItems();

    this.selectedProjectService.projectId$
      .subscribe(projectId => {
        this.projectId = projectId!;
      });
  }

  // Close on Escape key press
  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    if (this.isOpen) {
      this.closed.emit();
    }
  }

  menuItems: MenuItem[] = [];

  overviewOptions = [
    { label: 'Analytics', value: 'analytics' }
  ];

  operationsOptions = [
    { label: 'Timeline', value: 'timeline' },
    { label: 'TaskManager', value: 'taskmanager' },
    { label: 'Stakeholder Directory', value: 'stakeholder_directory' }
  ];

  financialsOptions = [
  ];

  documentsOptions = [
  ];

  navigateTo(section: string) {
    // Navigate based on section (main click)
    switch (section) {
      case 'overview':
        this.router.navigate(['/overview']);
        break;
      // case 'operations':
      //   this.router.navigate(['/operations']);
      //   break;
      // case 'financials':
      //   this.router.navigate(['/financials']);
      //   break;
      case 'documents':
        this.router.navigate(['/documents']);
        break;
    }
  }

  onOptionSelect(event: any, section: string) {
    const selectedValue = event.value;
    // Navigate based on dropdown selection
    this.router.navigate([`/${section}/${selectedValue}`]);
  }

  private buildMenuItems() {
    this.menuItems = [
      {
        label: 'Overview',
        icon: 'pi pi-chart-bar',
        command: () => this.router.navigate(['main/overview/' + this.projectId]),
        items: [
          // {
          //   label: 'Analytics',
          //   icon: 'pi pi-chart-line',
          //   command: () => this.router.navigate(['main/overview/analytics'])
          // }
        ]
      },
      {
        label: 'Operations',
        icon: 'pi pi-cog',
        // command: () => this.router.navigate(['main/operations']),
        items: [
          {
            label: 'Summary',
            icon: 'pi pi-file',
            command: () => this.router.navigate(['main/operations/summary/' + this.projectId])
          },
          {
            label: 'Timeline',
            icon: 'pi pi-calendar',
            command: () => this.router.navigate(['main/operations/timeline/' + this.projectId])
          },
          {
            label: 'TaskManager',
            icon: 'pi pi-address-book',
            command: () => this.router.navigate(['main/operations/taskmanager/' + this.projectId])
          },
          {
            label: 'Stakeholder Directory',
            icon: 'pi pi-users',
            command: () => this.router.navigate(['main/operations/stakeholder-directory'])
          }
        ]
      },
      {
        label: 'Financials',
        icon: 'pi pi-wallet',
        // command: () => this.router.navigate(['main/financials/page1/' + this.projectId]),
        // command: () => this.router.navigate(['main/financials']),
        items: [
          {
            label: 'Summary',
            icon: 'pi pi-file',
            command: () => this.router.navigate(['main/financials/page1/' + this.projectId])
          },
          {
            label: 'Budget Category',
            icon: 'pi pi-file',
            command: () => this.router.navigate(['main/financials/page2/' + this.projectId])
          },
          {
            label: 'Claims',
            icon: 'pi pi-file-edit',
          }
        ]
      },
      {
        label: 'Documents',
        icon: 'pi pi-folder',
        command: () => this.router.navigate(['main/documents']),
        items: [] // No options currently
      }
    ];

  }
}
