import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    ToolbarModule,
    AvatarModule,
    Menu
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  @Input() isDrawerOpen: boolean = true;
  @Output() toggleLeftSideBar = new EventEmitter<void>();
  search: string = '';

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

  constructor(private router: Router) { }

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

}
