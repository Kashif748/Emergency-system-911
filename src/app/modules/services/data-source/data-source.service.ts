import {Inject, Injectable} from '@angular/core';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, pluck, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Response} from '../../../core/api/models/response.model';
import {HelperDataSourceMethodsService} from './helper-data-source-methods.service';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService extends HelperDataSourceMethodsService {


  constructor(@Inject(String) endPoint: string) {
    super(endPoint);
  }

  get<T>(id: number, param?: any, queryParams?: any): Observable<T> {
    return this.http
      .get<Response<T>>(this.getFullUrl() + id, {
        params: queryParams,
      })
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  getWithResoruceName<T>(
    resoruceName: string,
    id: number,
    param?: any,
    queryParams?: any
  ): Observable<T> {
    return this.http
      .get<Response<T>>(this.getFullUrl(resoruceName) + id, {
        params: queryParams,
      })
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  getAll<T>(resoruceName?: string, queryParams?: any): Observable<T> {
    return this.http
      .get<Response<T>>(this.getFullUrl(resoruceName), {
        params: queryParams,
      })
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  getAllOrgs<T>(): Observable<T> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get<Response<T>>(`${environment.apiUrl}/ext/organizations`, {
        headers: header,
      })
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  post<T>(data: any, resoruceName?: string): Observable<T> {
    return this.http
      .post<Response<T>>(this.getFullUrl(resoruceName), data)
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  put<T>(data: any, id?: number, resoruceName?: string): Observable<T> {
    if (id) {
      if (resoruceName) {
        resoruceName += '/' + id;
      } else {
        resoruceName = id.toString();
      }
    }

    return this.http
      .put<Response<T>>(this.getFullUrl(resoruceName), data)
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  delete<T>(
    id: number,
    queryParams?: any,
    resoruceName?: string
  ): Observable<T> {
    return this.http
      .put<Response<T>>(`${this.getFullUrl(resoruceName)}inactive/${id}`, {
        params: queryParams
      })
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  deleteReminder<T>(data: any, id?: number, resoruceName?: string): Observable<T> {
    return this.http
      .delete<Response<T>>(`${this.getFullUrl(resoruceName)}${data?.id}`, {
      })
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  upload(file: File, recordId: number, tagId: number) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    const queryParams = new HttpParams()
      .append('recordId', recordId.toString())
      .append('tagId', tagId.toString());

    return this.http.post(environment.apiUrl + '/dms/upload', formData, {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + localStorage.getItem('jwt')
      ),
      params: queryParams,
    });
  }

  getFiles<T>(resoruceName: any, params: HttpParams) {
    const url = environment.apiUrl + '/' + resoruceName;
    return this.http
      .get(url, {
        params,
      })
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  getSpeicalUrlAddress(url: string, params?: HttpParams) {
    const apiUrl = environment.apiUrl + '/' + url;
    return this.http
      .get<any>(apiUrl, {
        params
      })
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  getData(url: string, params?: HttpParams) {
    const apiUrl = environment.apiUrl + '/' + url;
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http
      .get<any>(apiUrl, {
        params,
        headers: header,
      })
      .pipe(
        tap(this.responseCheck),
        map(this.prepareData),
        catchError(this.handleError)
      );
  }

  downloadFile(uid: string) {
    return this.http.get<Blob>(environment.apiUrl + '/dms/load/' + uid, {
      responseType: 'blob' as 'json',
      observe: 'response',
    });
  }

  getNavigationsMenu(parentId) {
    return this.http.get<any>(`${environment.apiUrl}/module-org/organization/${parentId}`)
        .pipe(
          pluck('result'))
  }

  createOrgModule(module) {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(`${environment.apiUrl}/module-org`, module)
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject();
          }
          const list = response['result'];
          resolve(list);
        }, reject);
    });
  }

  updateOrgModule(module) {
   return this.http.put<any>(`${environment.apiUrl}/module-org`, module);
        // .subscribe((response: any) => {
        //   if (!response || response['status']) {
        //     reject();
        //   }
        //   const list = response['result'];
        //   resolve(list);
        // }, reject);

  }
}
