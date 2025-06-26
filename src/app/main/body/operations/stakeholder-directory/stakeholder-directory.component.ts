import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-stakeholder-directory',
  imports: [
    CommonModule,
    CardModule,
    AvatarModule,
    BadgeModule,
    RippleModule,
    Menu,
    ButtonModule, MenuModule
  ],
  templateUrl: './stakeholder-directory.component.html',
  styleUrl: './stakeholder-directory.component.scss'
})
export class StakeholderDirectoryComponent {
  @Input() isDrawerOpen: boolean = false; // 🔥 Sidebar state input

  users = [
    {
      name: 'Anna M. Hines',
      email: 'georgia.young@example.com',
      role: 'Lead',
      image: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      name: 'Philip',
      email: 'alma.lawson@example.com',
      role: 'Customer',
      image: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      name: 'Dianne Russell',
      email: 'deanna.lawson@example.com',
      role: 'Lead',
      image: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      name: 'Theresa Webb',
      email: 'michelle.rivara@example.com',
      role: 'Customer',
      image: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      name: 'Leeanna Cline',
      email: 'leeannacline@example.com',
      role: 'Lead',
      image: 'https://randomuser.me/api/portraits/women/5.jpg'
    },
    {
      name: 'David Hardy',
      email: 'davidhardy@example.com',
      role: 'Customer',
      image: 'https://randomuser.me/api/portraits/men/6.jpg'
    },
    {
      name: 'Christina Correa',
      email: 'christinavorrea@example.com',
      role: 'Lead',
      image: 'https://randomuser.me/api/portraits/women/7.jpg'
    },
    {
      name: 'Kay Haines',
      email: 'kaychaines@example.com',
      role: 'Customer',
      image: 'https://randomuser.me/api/portraits/men/8.jpg'
    }
  ];
  menuItems = [
    { label: 'View', icon: 'pi pi-eye', command: () => console.log('View clicked') },
    { label: 'Edit', icon: 'pi pi-pencil', command: () => console.log('Edit clicked') },
    { label: 'Delete', icon: 'pi pi-trash', command: () => console.log('Delete clicked') }
  ];
  @ViewChild('menu') menu!: Menu;

  showMenu(event: Event) {
    this.menu.toggle(event);
  }
}
