import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { DefaultResponse } from 'src/app/shared/models/Http';
import { ErrorService } from 'src/app/shared/services/error/error.service';
import { SaleData, Sale } from '../models/Sale';
import { environment } from 'src/environments/environment';

export enum SaleRoutes {
  LIST = '/v1/sale/list',
  GET = '/v1/sale/get',
  SAVE = '/v1/sale/add',
  UPDATE = '/v1/sale/edit',
  DELETE = '/v1/sale/delete'
}

@Injectable({
  providedIn: 'root'
})

export class SaleService {

  private apiUrl: string = environment.saleMicroserviceUrl;

  constructor(private _http: HttpClient) {
  }

  listSales(): Observable<any> {
    return this._http.get<DefaultResponse>(`${this.apiUrl}${SaleRoutes.LIST}`).pipe(
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

  getSaleById(id: number): Observable<Sale> {
    return this._http.get<DefaultResponse>(`${this.apiUrl}${SaleRoutes.GET}/${id}`).pipe(
      map((response: DefaultResponse) => {
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  createSale(Sale: SaleData) {
    return this._http.post<DefaultResponse>(`${this.apiUrl}${SaleRoutes.SAVE}`, Sale).pipe(
      map((response: DefaultResponse) => {
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  updateSale(Sale: SaleData) {
    return this._http.put<DefaultResponse>(`${this.apiUrl}${SaleRoutes.UPDATE}`, Sale).pipe(
      map((response: DefaultResponse) => {
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  deleteSale(id: number) {
    return this._http.delete<DefaultResponse>(`${this.apiUrl}${SaleRoutes.DELETE}?id=${id}`).pipe(
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