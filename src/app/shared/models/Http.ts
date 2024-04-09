export interface DefaultResponse {
  resCode: number;
  resCodeDesc: string;
  dto: any;
}

// export interface Pagination<T> {
//   total: number;
//   result: T;
// }

export enum HttpError {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TimeOut = 408,
  Conflict = 409,
  RequestEntityTooLarge = 413,
  InternalServerError = 500,
  GatewayTimeout = 504,
}
