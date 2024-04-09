import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import { DefaultResponse } from 'src/app/shared/models/Http';
import { ErrorService } from 'src/app/shared/services/error/error.service';
import { QuoteData, Quote } from '../models/Quote';

export enum QuoteRoutes {
  LIST = '/v1/quote/list',
  GET = '/v1/quote/get',
  SAVE = '/v1/quote/add',
  UPDATE = '/v1/quote/edit',
  DELETE = '/v1/quote/delete'
}

@Injectable({
  providedIn: 'root'
})

export class QuoteService {

  private apiUrl: string = "http://localhost:8082/api";

  constructor(private _http: HttpClient) {
  }

  listQuotes(): Observable<any> {
    return this._http.get<DefaultResponse>(`${this.apiUrl}${QuoteRoutes.LIST}`).pipe(
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

  getQuoteById(id: number): Observable<QuoteData> {
    return this._http.get<DefaultResponse>(`${this.apiUrl}${QuoteRoutes.GET}/${id}`).pipe(
      map((response: DefaultResponse) => {
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  createQuote(Quote: Quote) {
    return this._http.post<DefaultResponse>(`${this.apiUrl}${QuoteRoutes.SAVE}`, Quote).pipe(
      map((response: DefaultResponse) => {
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  updateQuote(Quote: Quote) {
    return this._http.put<DefaultResponse>(`${this.apiUrl}${QuoteRoutes.UPDATE}`, Quote).pipe(
      map((response: DefaultResponse) => {
        if (response.resCode === 0) {
          return response.dto;
        }
        throw new Error(`${response.resCode}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  deleteQuote(id: number) {
    return this._http.delete<DefaultResponse>(`${this.apiUrl}${QuoteRoutes.DELETE}?id=${id}`).pipe(
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