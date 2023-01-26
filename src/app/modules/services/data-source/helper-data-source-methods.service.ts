import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { appInjector } from "src/app/app.component";
import { environment } from "src/environments/environment";
import { Response } from "../../../core/api/models/response.model";

@Injectable({
  providedIn: "root",
})
export class HelperDataSourceMethodsService {
  http: HttpClient;
  private url: string;

  constructor(@Inject(String) endPoint: string) {
    this.http = appInjector.get(HttpClient);
    if (endPoint.length > 0) { this.url = `${environment.apiUrl}/${endPoint}/`; }
    else { this.url = `${environment.apiUrl}/`; }
  }

  getFullUrl(resrouceName?: string) {
    return resrouceName ? this.url + resrouceName : this.url;
  }

  protected changeParamInBaseUrl(paramName: string, value: string) {
    this.url = this.url.replace(`{${paramName}}`, value);
  }

  protected prepareData<T>(response: Response<T>) {
    return response.result;
  }

  protected responseCheck<T>(response: Response<T>) {
    if (!response.status) {
      throwError(response.error);
    }
  }

  protected handleError(error: Response<Error>) {
    if (error instanceof HttpErrorResponse) {
      return throwError(error);
    }
    return throwError("Error");
  }
}
