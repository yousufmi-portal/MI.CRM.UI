import { Component } from '@angular/core';

import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [
    LeftSideBarComponent,
    TopBarComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  isDrawerVisible = false;

  toggleLeftSideBarVisibility(): void {
    this.isDrawerVisible = !this.isDrawerVisible;
  }

  onSidebarClosed(): void {
    this.isDrawerVisible = false;
  }
}
