/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { RestApiResponseListUsersIncidentsStatisticsReportResponse } from '../models/rest-api-response-list-users-incidents-statistics-report-response';
import { RestApiResponseListUsersTaskStaticsReportResponse } from '../models/rest-api-response-list-users-task-statics-report-response';
import { UserStatisticsReportFilter } from '../models/user-statistics-report-filter';

@Injectable()
export class UsersStatisticsReportControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation exportTasks
   */
  static readonly ExportTasksPath = '/v1/user-statistics-report/tasks/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `exportTasks()` instead.
   *
   * This method doesn't expect any request body.
   */
  exportTasks$Response(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    filter: UserStatisticsReportFilter;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersStatisticsReportControllerService.ExportTasksPath, 'get');
    if (params) {
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `exportTasks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  exportTasks(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    filter: UserStatisticsReportFilter;
  }): Observable<void> {

    return this.exportTasks$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation taskStatistics
   */
  static readonly TaskStatisticsPath = '/v1/user-statistics-report/tasks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `taskStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  taskStatistics$Response(params: {
    filter: UserStatisticsReportFilter;
  }): Observable<StrictHttpResponse<RestApiResponseListUsersTaskStaticsReportResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UsersStatisticsReportControllerService.TaskStatisticsPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListUsersTaskStaticsReportResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `taskStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  taskStatistics(params: {
    filter: UserStatisticsReportFilter;
  }): Observable<RestApiResponseListUsersTaskStaticsReportResponse> {

    return this.taskStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListUsersTaskStaticsReportResponse>) => r.body as RestApiResponseListUsersTaskStaticsReportResponse)
    );
  }

  /**
   * Path part for operation exportIncidents
   */
  static readonly ExportIncidentsPath = '/v1/user-statistics-report/incidents/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `exportIncidents()` instead.
   *
   * This method doesn't expect any request body.
   */
  exportIncidents$Response(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    filter: UserStatisticsReportFilter;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, UsersStatisticsReportControllerService.ExportIncidentsPath, 'get');
    if (params) {
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `exportIncidents$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  exportIncidents(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    filter: UserStatisticsReportFilter;
  }): Observable<void> {

    return this.exportIncidents$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation statistics1
   */
  static readonly Statistics1Path = '/v1/user-statistics-report/incidents';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `statistics1()` instead.
   *
   * This method doesn't expect any request body.
   */
  statistics1$Response(params: {
    filter: UserStatisticsReportFilter;
  }): Observable<StrictHttpResponse<RestApiResponseListUsersIncidentsStatisticsReportResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UsersStatisticsReportControllerService.Statistics1Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListUsersIncidentsStatisticsReportResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `statistics1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  statistics1(params: {
    filter: UserStatisticsReportFilter;
  }): Observable<RestApiResponseListUsersIncidentsStatisticsReportResponse> {

    return this.statistics1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListUsersIncidentsStatisticsReportResponse>) => r.body as RestApiResponseListUsersIncidentsStatisticsReportResponse)
    );
  }

}
