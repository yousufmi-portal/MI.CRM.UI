import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StakeHolderDto } from '../../../../../api-dtos/stakeholder.dto';
import { StakeholdersService } from '../../../../services/stakeholders-service/stakeholders.service';

@Component({
  selector: 'app-stakeholder-directory',
  imports: [
    CommonModule,
    CardModule,
    AvatarModule,
    BadgeModule,
    RippleModule,
    MenuModule,
    ButtonModule
  ],
  templateUrl: './stakeholder-directory.component.html',
  styleUrl: './stakeholder-directory.component.scss'
})
export class StakeholderDirectoryComponent implements OnInit {
  stakeholders = signal<StakeHolderDto[]>([]);
  selectedStakeholder = signal<StakeHolderDto | null>(null);

  constructor(private stakeholdersService: StakeholdersService) {

  }

  ngOnInit(): void {
    this.loadStakeholders();
  }

  loadStakeholders(): void {
    this.stakeholdersService.getAllStakeholders().subscribe({
      next: (stakeholders) => {
        this.stakeholders.set(stakeholders);
      },
      error: (err) => {
        console.error('Error fetching stakeholders:', err);
      }
    });
  }
}
