import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-taskmanager',
  imports: [CommonModule, TableModule, SelectModule, FormsModule],
  templateUrl: './taskmanager.component.html',
  styleUrl: './taskmanager.component.scss'
})
export class TaskmanagerComponent {
  statusOptions = ["To Do", "In Progress", "Done", "In Review"];
  tasks = [
    {
      title: 'Training Session for App',
      description: 'The training session would be four hour',
      activityType: 'Session',
      dueDate: '2025-05-10',
      assignedTo: 'Olive Gorden',
      status: this.statusOptions[1]
    },
    {
      title: 'Training Session for App',
      description: 'The training session would be four hour',
      activityType: 'Session',
      dueDate: '2025-05-10',
      assignedTo: 'Olive Gorden',
      status: this.statusOptions[1]
    },
    {
      title: 'Training Session for App',
      description: 'The training session would be four hour',
      activityType: 'Session',
      dueDate: '2025-05-10',
      assignedTo: 'Olive Gorden',
      status: this.statusOptions[1]
    },
    {
      title: 'Training Session for App',
      description: 'The training session would be four hour',
      activityType: 'Session',
      dueDate: '2025-05-10',
      assignedTo: 'Olive Gorden',
      status: this.statusOptions[1]
    }
  ];

}
