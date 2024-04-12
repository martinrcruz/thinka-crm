import { Component, OnInit } from '@angular/core';
import { TaskDetail } from '../../../models/Task';
import { TaskService } from '../../../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {
  loading: boolean = false;

  taskId: number = 0;

  task: TaskDetail = {} as TaskDetail

  constructor(
    private _task: TaskService,
    private _dialog: MatDialog,
    private _router: Router,
    private _activeRouter: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this._activeRouter.queryParams.subscribe(params => {
      this.taskId = params['id'];
    });

    if(this.taskId != 0) {
      this.getTaskById(Number(this.taskId));
    } else {
      alert('error')
    }
  }

getTaskById(id: number) {
  this._task.getTaskById(id).subscribe({
    next: (res) => {
      this.task = res
      console.log(res)
    },
    error: (error) => {
      console.log(error)
    }
  })
}

}
