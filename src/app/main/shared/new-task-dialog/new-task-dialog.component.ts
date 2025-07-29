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

@Component({
  selector: 'app-new-task-dialog',
  imports: [DialogModule, ButtonModule, InputTextModule, DropdownModule, ReactiveFormsModule, CommonModule, SelectModule, DatePickerModule],
  templateUrl: './new-task-dialog.component.html',
  styleUrl: './new-task-dialog.component.scss'
})
export class NewTaskDialogComponent {
  @Input() visible: boolean = false;
  @Input() projectId!: number;
  @Output() visibleChange = new EventEmitter<boolean>();

  taskForm: FormGroup;

  // Dummy options for now
  users = [{ id: 1, name: 'John Doe' }];
  statuses = [
    { id: 1, name: 'To Do' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Done' },
    { id: 4, name: 'In Review' }
  ];
  activityTypes = [
    { id: 1, name: 'Session' },
  ];

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      assignedTo: [null],
      statusId: [null, Validators.required],
      activityTypeId: [null, Validators.required],
    });
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.taskForm.reset();
  }

  

  onSubmit() {
    if (this.taskForm.valid) {
      let newTaskDto : NewTaskDto = {
        projectId: this.projectId,
        ...this.taskForm.value
      }
      console.log('Task data:', newTaskDto);
      this.close();
    }
  }
}

