import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class NewTaskDialogComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() projectId!: number;
  // @Output() projectIdChange = new EventEmitter<number>();
  @Input() taskToEdit: TaskDto | null = null;
  @Output() taskToEditChange = new EventEmitter<TaskDto | null>();

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.taskToEdit) {
      const startDate = this.taskToEdit.startDate
        ? new Date(this.taskToEdit.startDate)
        : null;
      const endDate = this.taskToEdit.endDate
        ? new Date(this.taskToEdit.endDate)
        : null;

      this.taskForm.patchValue({
        title: this.taskToEdit.title,
        description: this.taskToEdit.description,
        startDate: startDate,
        endDate: endDate,
        assignedTo: this.taskToEdit.assignedTo,
        statusId: this.taskToEdit.statusId,
        activityTypeId: this.taskToEdit.activityTypeId,
        deliverableType: this.taskToEdit.deliverableType
      });
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.taskForm.reset();
  }



  onSubmit() {
    if (this.taskForm.invalid) return;

    const formData = this.taskForm.value;

    if (this.taskToEdit) {
      // EDIT mode
      this.tasksService.updateTask(this.taskToEdit.id, formData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Task updated successfully' });
          this.close();
        }
      });
    } else {
      // CREATE mode
      this.tasksService.createTask(formData).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Created', detail: 'Task created successfully' });
          this.close();
        }
      });
    }
  }


}

