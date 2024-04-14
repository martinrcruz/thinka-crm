import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { DefaultResponse } from 'src/app/shared/models/Http';
import { ErrorService } from 'src/app/shared/services/error/error.service';
import { ProjectData, Project } from '../models/Project';
import { environment } from 'src/environments/environment';

export enum ProjectRoutes {
  LIST = '/v1/project/list',
  GET = '/v1/project/get',
  SAVE = '/v1/project/add',
  UPDATE = '/v1/project/edit',
  DELETE = '/v1/project/delete'
}

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {
  }

  listProjects(): Observable<any> {
    return this._http.get<DefaultResponse>(`${this.apiUrl}${ProjectRoutes.LIST}`).pipe(
      map((response: DefaultResponse) => {
        console.log(response)
        if (response.code === 200) {
          return response.data;
        }
        throw new Error(`${response.code}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  getProjectById(id: number): Observable<Project> {
    return this._http.get<DefaultResponse>(`${this.apiUrl}${ProjectRoutes.GET}/${id}`).pipe(
      map((response: DefaultResponse) => {
        if (response.code === 200) {
          return response.data;
        }
        throw new Error(`${response.code}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  createProject(project: ProjectData) {
    return this._http.post<DefaultResponse>(`${this.apiUrl}${ProjectRoutes.SAVE}`, project).pipe(
      map((response: DefaultResponse) => {
        if (response.code === 200) {
          return response.data;
        }
        throw new Error(`${response.code}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  updateProject(project: ProjectData) {
    return this._http.put<DefaultResponse>(`${this.apiUrl}${ProjectRoutes.UPDATE}`, project).pipe(
      map((response: DefaultResponse) => {
        if (response.code === 200) {
          return response.data;
        }
        throw new Error(`${response.code}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  deleteProject(id: number) {
    return this._http.delete<DefaultResponse>(`${this.apiUrl}${ProjectRoutes.DELETE}?id=${id}`).pipe(
      map((response: DefaultResponse) => {
        if (response.code === 200) {
          return response.data;
        }
        throw new Error(`${response.code}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }
}
