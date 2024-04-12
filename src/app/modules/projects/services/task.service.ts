import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { DefaultResponse } from 'src/app/shared/models/Http';
import { ErrorService } from 'src/app/shared/services/error/error.service';
import { TaskData, Task } from '../models/Task';

export enum TaskRoutes {
  LIST = '/v1/task/list',
  GET = '/v1/task/get',
  SAVE = '/v1/task/add',
  UPDATE = '/v1/task/edit',
  DELETE = '/v1/task/delete'
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private apiUrl: string = "http://localhost:8083/api";

  constructor(private _http: HttpClient) {
  }

  listTasks(): Observable<any> {
    return this._http.get<DefaultResponse>(`${this.apiUrl}${TaskRoutes.LIST}`).pipe(
      map((response: DefaultResponse) => {
        console.log(response)
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  getTaskById(id: number): Observable<Task> {
    return this._http.get<DefaultResponse>(`${this.apiUrl}${TaskRoutes.GET}/${id}`).pipe(
      map((response: DefaultResponse) => {
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  createTask(task: TaskData) {
    return this._http.post<DefaultResponse>(`${this.apiUrl}${TaskRoutes.SAVE}`, task).pipe(
      map((response: DefaultResponse) => {
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  updateTask(task: TaskData) {
    return this._http.put<DefaultResponse>(`${this.apiUrl}${TaskRoutes.UPDATE}`, task).pipe(
      map((response: DefaultResponse) => {
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  deleteTask(id: number) {
    return this._http.delete<DefaultResponse>(`${this.apiUrl}${TaskRoutes.DELETE}?id=${id}`).pipe(
      map((response: DefaultResponse) => {
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }
}