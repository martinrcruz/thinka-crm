import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeadData } from 'src/app/models/LeadData';
import { ErrorService } from 'src/app/shared/services/error/error.service';
import { catchError, map } from 'rxjs/operators';
import { DefaultResponse, Pagination } from 'src/app/shared/models/Http';
import { Lead } from 'src/app/models/Lead';

export enum LeadRoutes {
  LIST = '/lead/list',
  GET = '/lead/get',
  SAVE = '/lead/save',
  UPDATE = '/lead/update',
  DELETE = '/lead/delete'
}

@Injectable({
  providedIn: 'root'
})

export class LeadsService {
  constructor(private _http: HttpClient) { }

  listLeads(pageNumber: number, pageSize: number, search: string): Observable<Pagination<Lead[]>> {
    let params = new HttpParams();
    params = params.append('pageNumber', `${pageNumber}`);
    params = params.append('pageSize', `${pageSize}`);
    if (search) params = params.append('search', `${search}`);

    return this._http.get<DefaultResponse>(LeadRoutes.LIST, { params }).pipe(
      map((response: DefaultResponse) => {
        if (response.codError === 0) {
          return response.dto;
        }
        throw new Error(`${response.codError}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  getLeadById(id: number): Observable<LeadData> {
    return this._http.get<DefaultResponse>(`${LeadRoutes.GET}?id=${id}`).pipe(
      map((response: DefaultResponse) => {
        if (response.codError === 0) {
          return response.dto;
        }
        throw new Error(`${response.codError}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  createLead(lead: Lead) {
    return this._http.post<DefaultResponse>(LeadRoutes.SAVE, lead).pipe(
      map((response: DefaultResponse) => {
        if (response.codError === 0) {
          return response.dto;
        }
        throw new Error(`${response.codError}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  updateLead(lead: Lead) {
    return this._http.put<DefaultResponse>(LeadRoutes.UPDATE, lead).pipe(
      map((response: DefaultResponse) => {
        if (response.codError === 0) {
          return response.dto;
        }
        throw new Error(`${response.codError}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  deleteLeads(id: number) {
    return this._http.delete<DefaultResponse>(`${LeadRoutes.DELETE}?id=${id}`).pipe(
      map((response: DefaultResponse) => {
        if (response.codError === 0) {
          return response.dto;
        }
        throw new Error(`${response.codError}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

}
