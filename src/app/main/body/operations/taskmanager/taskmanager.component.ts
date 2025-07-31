import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TaskDto } from '../../../../../api-dtos/task.dto';
import { TasksService } from '../../../../service/tasks-service/tasks.service';
import { NewTaskDialogComponent } from '../../../shared/new-task-dialog/new-task-dialog.component';
import { UpdateTaskStatusDto } from '../../../../../api-dtos/update-task-status.dto';

@Component({
  selector: 'app-taskmanager',
  imports: [CommonModule, TableModule, SelectModule, FormsModule, NewTaskDialogComponent],
  templateUrl: './taskmanager.component.html',
  styleUrl: './taskmanager.component.scss'
})
export class TaskmanagerComponent {
  tasks: TaskDto[] = [];
  statuses = [
    { id: 1, name: 'To Do', color: '#FFC1C1' },
    { id: 2, name: 'In Progress', color: '#FFD8A8' },
    { id: 3, name: 'Done', color: '#B9FBC0' },
    { id: 4, name: 'In Review', color: '#A7D3F2' }
  ];

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

  onStatusChange(task: any, newStatusId: number): void {
    if (task.statusId === newStatusId) return;

    const selectedStatus = this.statuses.find(s => s.id === newStatusId);
    if (!selectedStatus) return;

    const dto: UpdateTaskStatusDto = {
      taskId: task.id,
      statusId: newStatusId
    };

    task.statusId = newStatusId;
    task.statusColor = selectedStatus.color;
    
    this.tasksService.updateTaskStatus(dto).subscribe({
      next: () => {
        console.log('Status updated');
      },
      error: err => {
        console.error('Failed to update status', err);
      }
    });
  }

}
