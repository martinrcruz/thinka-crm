import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorService } from 'src/app/shared/services/error/error.service';
import { catchError, map } from 'rxjs/operators';
import { DefaultResponse } from 'src/app/shared/models/Http';
import { Customer } from 'src/app/modules/contacts/models/Customer';
import { CustomerData } from 'src/app/modules/contacts/models/Customer';
import { environment } from '../../../../environments/environment';

export enum CustomerRoutes {
  LIST = '/v1/client/list',
  GET = '/v1/client/get',
  SAVE = '/v1/client/add',
  UPDATE = '/v1/client/edit',
  DELETE = '/v1/client/delete'
}

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  private apiUrl: string = environment.apiUrl;

  constructor(private _http: HttpClient) {
  }

  listCustomers(): Observable<any> {
    return this._http.get<DefaultResponse>(`${this.apiUrl}${CustomerRoutes.LIST}`).pipe(
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

  getCustomerById(id: number): Observable<Customer> {
    return this._http.get<DefaultResponse>(`${this.apiUrl}${CustomerRoutes.GET}/${id}`).pipe(
      map((response: DefaultResponse) => {
        if (response.code === 200) {
          return response.data;
        }
        throw new Error(`${response.code}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  createCustomer(customer: CustomerData) {
    return this._http.post<DefaultResponse>(`${this.apiUrl}${CustomerRoutes.SAVE}`, customer).pipe(
      map((response: DefaultResponse) => {
        if (response.code === 0) {
          return response.data;
        }
        throw new Error(`${response.code}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  updateCustomer(customer: CustomerData) {
    return this._http.put<DefaultResponse>(`${this.apiUrl}${CustomerRoutes.UPDATE}`, customer).pipe(
      map((response: DefaultResponse) => {
        if (response.code === 0) {
          return response.data;
        }
        throw new Error(`${response.code}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

  deleteCustomer(id: number) {
    return this._http.delete<DefaultResponse>(`${this.apiUrl}${CustomerRoutes.DELETE}?id=${id}`).pipe(
      map((response: DefaultResponse) => {
        if (response.code === 0) {
          return response.data;
        }
        throw new Error(`${response.code}`);
      }),
      catchError(ErrorService.handleServiceError),
    );
  }

}
