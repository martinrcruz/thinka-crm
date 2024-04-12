import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  statusList = ['New', 'In Progress', 'Done'];


  action: string = "";

  taskForm = this._form.group({
    id: [''],
    projectId: [''],
    title: [''],
    resume: [''],
    description: [''],
    objectives: [''],
    taskStatus: [''],
    inCharge: [''],
    priority: [''],
    comments: [''],
    startDate: [''],
    endDate: [''],
    tags: [''],
    files: [''],
    createdAt: [''],
    createdBy: [''],
    lastModifiedAt: [''],
    lastModifiedBy: ['']
  });

  task: Task = {
    id: 0,
    projectId: 0,
    title: '',
    resume: '',
    description: '',
    objectives: '',
    taskStatus: '',
    inCharge: '',
    priority: '',
    comments: '',
    startDate: '',
    endDate: '',
    tags: '',
    files: [],
    createdAt: '',
    createdBy: '',
    lastModifiedAt: '',
    lastModifiedBy: ''
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TaskModalComponent>,
    private _form: FormBuilder,
    private _task: TaskService
  ) { }

  ngOnInit(): void {
    if (this.data.id != null) {
      this.action = "Actualizar";
      this.loadData();
    } else {
      this.action = "Agregar";
    }
  }

  loadData() {
    this._task.getTaskById(this.data.id)
      .subscribe((response: Task) => {
        this.task = response;
        this.taskForm.setValue({
          id: String(this.task.id),
          title: this.task.title,
          resume: this.task.resume,
          description: this.task.description,
          objectives: this.task.objectives,
          taskStatus: this.task.taskStatus,
          inCharge: this.task.inCharge,
          priority: this.task.priority,
          comments: this.task.comments,
          startDate: this.task.startDate,
          endDate: this.task.endDate,
          tags: "",
          createdAt: this.task.createdAt,
          createdBy: this.task.createdBy,
          lastModifiedAt: this.task.lastModifiedAt,
          lastModifiedBy: this.task.lastModifiedBy,
          projectId: String(this.task.projectId),
          files: null
        })
      })
  }

  createOrUpdate() {
    const request: Task = {
      id: this.task.id,
      title: this.task.title,
      resume: this.task.resume,
      description: this.task.description,
      objectives: this.task.objectives,
      taskStatus: this.task.taskStatus,
      inCharge: this.task.inCharge,
      priority: this.task.priority,
      comments: this.task.comments,
      startDate: this.task.startDate,
      endDate: this.task.endDate,
      tags: "",
      createdAt: this.task.createdAt,
      createdBy: this.task.createdBy,
      lastModifiedAt: this.task.lastModifiedAt,
      lastModifiedBy: this.task.lastModifiedBy,
      projectId: this.task.projectId,
      files: []
    };

    if (this.data.id != null) {
      this._task.updateTask(request)
        .subscribe(() => {
          this.dialogRef.close();
        })
    } else {
      this._task.createTask(request)
        .subscribe(() => {
          this.dialogRef.close();
        })
    }
  }
}
