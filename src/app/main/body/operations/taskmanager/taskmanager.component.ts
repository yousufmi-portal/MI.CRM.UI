import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TaskDto } from '../../../../../api-dtos/task.dto';
import { TasksService } from '../../../../service/tasks-service/tasks.service';
import { NewTaskDialogComponent } from '../../../shared/new-task-dialog/new-task-dialog.component';

@Component({
  selector: 'app-taskmanager',
  imports: [CommonModule, TableModule, SelectModule, FormsModule, NewTaskDialogComponent],
  templateUrl: './taskmanager.component.html',
  styleUrl: './taskmanager.component.scss'
})
export class TaskmanagerComponent {
  tasks: TaskDto[] = [];
  statusOptions = ['To Do', 'In Progress', 'Done', 'In Review'];
  projectId = 19; // Use actual projectId or inject via route
  showTaskDialog: boolean = false;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(statusId?: number): void {
    this.tasksService.getTasksByProject(this.projectId, statusId).subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      }
    });
  }

  openNewTaskDialog() {
    this.showTaskDialog = true;
  }
}
