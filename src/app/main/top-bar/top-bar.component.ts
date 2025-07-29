import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToolbarModule } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-top-bar',
  imports: [
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    ToolbarModule,
    AvatarModule
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  @Input() isDrawerOpen: boolean = true;
  @Output() toggleLeftSideBar = new EventEmitter<void>();
  search: string = '';

  hamburgerBtnClickHandler(): void {
    this.toggleLeftSideBar.emit();
  }
}
