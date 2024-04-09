import { Injectable } from '@angular/core';
import { ResponseError } from 'src/app/shared/models/Error';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor() { }

  public static handleServiceError(error: any) {
      if (error.error?.codError) {
          return throwError(error.error.codError);
      }

      if (error.status) {
          return throwError(error.status);
      }

      return throwError(Number(error.message));
  }

  public static handleResponseError(code: number, errors: ResponseError[]) {
      const error: ResponseError | undefined = errors.find((error: ResponseError) => error.code === code);
      if (error) return error.message;
      return 'Error inesperado';
  }
}
