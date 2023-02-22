import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { UrlHelperService } from '@core/services/url-helper.service';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Page, PageRequest } from '../models/page.model';
import { GResult } from '../models/result.model';

@Injectable({
  providedIn: 'root',
  deps: [DatePipe],
})
export class TaskService {
  private baseUrl = `${environment.apiUrl}/tasks`;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private langFacade: ILangFacade,
    private urlHelper: UrlHelperService
  ) {}

  create(task: any) {
    return this.http.post(`${this.baseUrl}`, task);
  }

  update(task: any) {
    return this.http.put(`${this.baseUrl}/${task?.id}`, task);
  }

  getAll(
    pageRequest: PageRequest,
    search,
    sort: { active: string; direction: 'asc' | 'desc' }
  ): Observable<Page> {
    console.log(search);
    // search = {
    //   ...search,
    //   startDueDate: !search.startDueDate
    //     ? search.startDueDate
    //     : this.datePipe
    //         .transform(search.startDueDate, 'yyyy-MM-dd hh:mm:ss')
    //         .toString(),

    //   endDueDate: !search.endDueDate
    //     ? search.endDueDate
    //     : this.datePipe
    //         .transform(search.endDueDate, 'yyyy-MM-dd hh:mm:ss')
    //         .toString(),
    // };
    let params = new HttpParams()
      .append('body', search.desc ?? '')
      .append('title', search.title ?? '')
      .append('priority', search.priority ?? '')
      .append('status', search.status ?? '')
      .append('sort', `${sort?.active ?? ''},${sort?.direction ?? ''}`)
      .append('assignTo', search.assignedTo ?? '')
      .append('userId', search?.createdByUser?.id ?? '')
      .append('startDate', search.startDueDate ?? '')
      .append('endDate', search.endDueDate ?? '');
    pageRequest &&
      Object.keys(pageRequest).forEach((k) => {
        params = params.append(k, pageRequest[k] ?? '');
      });
    return this.http
      .get<GResult<Page>>(`${this.baseUrl}`, {
        params: params,
      })
      .pipe(map((r) => r.result));
  }

  getAllForMyOrg(
    pageRequest: PageRequest,
    search,
    sort: { active: string; direction: 'asc' | 'desc' }
  ): Observable<Page> {
    let params = new HttpParams()
      .append('body', search.desc ?? '')
      .append('title', search.title ?? '')
      .append(
        'dueDate',
        search.dueDate ? DateTimeUtil.format(new Date(search.dueDate), DateTimeUtil.DATE_FORMAT) : ''
      )
      .append('priority', search.priority ?? '')
      .append('status', search.status ?? '')
      .append('sort', `${sort?.active ?? ''},${sort?.direction ?? ''}`);

    pageRequest &&
      Object.keys(pageRequest).forEach((k) => {
        params = params.append(k, pageRequest[k] ?? '');
      });
    return this.http
      .get<GResult<Page>>(`${this.baseUrl}/for-my-org`, {
        params: params,
      })
      .pipe(map((r) => r.result));
  }

  getAllByMyOrg(
    pageRequest: PageRequest,
    search,
    sort: { active: string; direction: 'asc' | 'desc' }
  ): Observable<Page> {
    let params = new HttpParams()
      .append('body', search.desc ?? '')
      .append('title', search.title ?? '')
      .append(
        'dueDate',
        search.dueDate ? DateTimeUtil.format(new Date(search.dueDate), DateTimeUtil.DATE_FORMAT) : ''
      )
      .append('priority', search.priority ?? '')
      .append('status', search.status ?? '')
      .append('sort', `${sort?.active ?? ''},${sort?.direction ?? ''}`);

    pageRequest &&
      Object.keys(pageRequest).forEach((k) => {
        params = params.append(k, pageRequest[k] ?? '');
      });
    return this.http
      .get<GResult<Page>>(`${this.baseUrl}/by-my-org`, {
        params: params,
      })
      .pipe(map((r) => r.result));
  }

  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  delete(id) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getTypes() {
    return this.http
      .get<any>(`${environment.apiUrl}/tasks/types`)
      .pipe(map((r) => r.result as any[]));
  }

  getStatistics(filter?: any) {
    console.log(filter);
    // filter = {
    //   ...filter,
    //   startDueDate: !filter?.startDueDate
    //     ? filter?.startDueDate
    //     : this.datePipe
    //         .transform(filter?.startDueDate, 'yyyy-MM-dd hh:mm:ss')
    //         .toString(),

    //   endDueDate: !filter?.endDueDate
    //     ? filter?.endDueDate
    //     : this.datePipe
    //         .transform(filter?.endDueDate, 'yyyy-MM-dd hh:mm:ss')
    //         .toString(),
    // };
    let params = new HttpParams()
      .append('body', filter?.desc ?? '')
      .append('title', filter?.title ?? '')
      .append('priority', filter?.priority ?? '')
      .append('status', filter?.status ?? '')
      .append('assignTo', filter?.assignedTo ?? '')
      .append('userId', filter?.createdByUser?.id ?? '')
      .append('startDate', filter?.startDueDate ?? '')
      .append('endDate', filter?.endDueDate ?? '')
      .append('incidentId', filter?.incidentId ?? '');
    return this.http
      .get<any>(`${this.baseUrl}/metrics`, { params })
      .pipe(map((r) => r.result));
  }

  downloadReport(as: 'PDF' | 'EXCEL', lang: any, search?: any) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(search);
    // search = {
    //   ...search,
    //   startDueDate: !search.startDueDate
    //     ? search.startDueDate
    //     : this.datePipe
    //         .transform(search.startDueDate, 'yyyy-MM-dd hh:mm:ss')
    //         .toString(),

    //   endDueDate: !search.endDueDate
    //     ? search.endDueDate
    //     : this.datePipe
    //         .transform(search.endDueDate, 'yyyy-MM-dd hh:mm:ss')
    //         .toString(),
    // };
    let params = new HttpParams()
      .set('as', as)
      .set('lang', lang)
      .append('body', search.desc ?? '')
      .append('title', search.title ?? '')
      .append('priority', search.priority ?? '')
      .append('status', search.status ?? '')
      .append('assignTo', search.assignedTo ?? '')
      .append('userId', search?.createdByUser?.id ?? '')
      .append('startDate', search.startDueDate ?? '')
      .append('endDate', search.endDueDate ?? '')
      .append('incidentId', search?.incidentId ?? '');
    return this.http
      .get<any>(`${this.baseUrl}/export`, {
        headers,
        params,
        responseType: 'blob' as any,
      })
      .pipe(
        tap((res) => {
          const newBlob = new Blob([res], {
            type: `application/${
              as === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }`,
          });
          this.urlHelper.downloadBlob(newBlob);
        })
      );
  }

  appendValidParameterValues(params: HttpParams, obj: any) {
    let paramsOptions = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        if (key == 'startDueDate') {
          paramsOptions['startDate'] = obj[key];
        } else if (key == 'endDueDate') {
          paramsOptions['endDate'] = obj[key];
        } else {
          paramsOptions[key] = obj[key];
        }
      }
    });
    let newParams = new HttpParams(paramsOptions);
    console.log(newParams);
    return newParams;
  }
}
