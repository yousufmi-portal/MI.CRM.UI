import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog'
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TaskDto } from '../../../../api-dtos/task.dto';
import { NewTaskDto } from '../../../../api-dtos/new-task.dto';
import { TasksService } from '../../../service/tasks-service/tasks.service';
import { MessageService } from 'primeng/api';
import { UsersService } from '../../../services/users-service/users.service';
import { UserDto } from '../../../../api-dtos/user.dto';

@Component({
  selector: 'app-new-task-dialog',
  imports: [DialogModule, ButtonModule, InputTextModule, DropdownModule, ReactiveFormsModule, CommonModule, SelectModule, DatePickerModule],
  providers: [MessageService],
  templateUrl: './new-task-dialog.component.html',
  styleUrl: './new-task-dialog.component.scss'
})
export class NewTaskDialogComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() projectId!: number;
  // @Output() projectIdChange = new EventEmitter<number>();

  taskForm: FormGroup;

  // Dummy options for now
  users: UserDto[] = [];
  statuses = [
    { id: 1, name: 'To Do' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Done' },
    { id: 4, name: 'In Review' }
  ];
  activityTypes = [
    { id: 1, name: 'Session' },
  ];

  constructor(private fb: FormBuilder, private tasksService: TasksService, private messageService: MessageService, private usersService: UsersService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      assignedTo: [null],
      statusId: [null, Validators.required],
      activityTypeId: [null, Validators.required],
      deliverableType: ['']
    });
  }

  ngOnInit() {
    console.log('Project ID in NewTaskDialogComponent:', this.projectId);
    // Load users from the service
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.taskForm.reset();
  }



  onSubmit() {
    if (this.taskForm.valid) {
      let newTaskDto: NewTaskDto = {
        projectId: this.projectId,
        ...this.taskForm.value
      }
      this.tasksService.createTask(newTaskDto).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'New task created successfully' });
          this.close();
        },
        error: (error) => {
          console.error('Error creating task:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create task' });
        }
      });
    }
  }
}

