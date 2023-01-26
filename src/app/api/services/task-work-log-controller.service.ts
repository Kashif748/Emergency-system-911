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

import { IncidentTask } from '../models/incident-task';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponsePageTaskWorkLogForDashboardProjection } from '../models/rest-api-response-page-task-work-log-for-dashboard-projection';
import { RestApiResponsePageTaskWorkLogProjection } from '../models/rest-api-response-page-task-work-log-projection';
import { RestApiResponseTaskWorkLogProjection } from '../models/rest-api-response-task-work-log-projection';
import { TaskWorkLog } from '../models/task-work-log';

@Injectable()
export class TaskWorkLogControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getActiveTaskWorkLog
   */
  static readonly GetActiveTaskWorkLogPath = '/v1/tasks/{taskId}/logs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveTaskWorkLog()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveTaskWorkLog$Response(params: {
    taskId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseTaskWorkLogProjection>> {

    const rb = new RequestBuilder(this.rootUrl, TaskWorkLogControllerService.GetActiveTaskWorkLogPath, 'get');
    if (params) {
      rb.path('taskId', params.taskId, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTaskWorkLogProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveTaskWorkLog$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveTaskWorkLog(params: {
    taskId: number;
    id: number;
  }): Observable<RestApiResponseTaskWorkLogProjection> {

    return this.getActiveTaskWorkLog$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTaskWorkLogProjection>) => r.body as RestApiResponseTaskWorkLogProjection)
    );
  }

  /**
   * Path part for operation update4
   */
  static readonly Update4Path = '/v1/tasks/{taskId}/logs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update4()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update4$Response(params: {
    taskId: number;
    id: number;
    body: TaskWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseTaskWorkLogProjection>> {

    const rb = new RequestBuilder(this.rootUrl, TaskWorkLogControllerService.Update4Path, 'put');
    if (params) {
      rb.path('taskId', params.taskId, {});
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTaskWorkLogProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update4$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update4(params: {
    taskId: number;
    id: number;
    body: TaskWorkLog
  }): Observable<RestApiResponseTaskWorkLogProjection> {

    return this.update4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTaskWorkLogProjection>) => r.body as RestApiResponseTaskWorkLogProjection)
    );
  }

  /**
   * Path part for operation delete
   */
  static readonly DeletePath = '/v1/tasks/{taskId}/logs/inactive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: {
    taskId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, TaskWorkLogControllerService.DeletePath, 'put');
    if (params) {
      rb.path('taskId', params.taskId, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: {
    taskId: number;
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation findByPage
   */
  static readonly FindByPagePath = '/v1/tasks/{taskId}/logs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByPage$Response(params: {
    taskId: IncidentTask;
    hasAttachment?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageTaskWorkLogProjection>> {

    const rb = new RequestBuilder(this.rootUrl, TaskWorkLogControllerService.FindByPagePath, 'get');
    if (params) {
      rb.path('taskId', params.taskId, {});
      rb.query('hasAttachment', params.hasAttachment, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageTaskWorkLogProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByPage(params: {
    taskId: IncidentTask;
    hasAttachment?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageTaskWorkLogProjection> {

    return this.findByPage$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageTaskWorkLogProjection>) => r.body as RestApiResponsePageTaskWorkLogProjection)
    );
  }

  /**
   * Path part for operation create4
   */
  static readonly Create4Path = '/v1/tasks/{taskId}/logs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create4()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create4$Response(params: {
    taskId: number;
    body: TaskWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseTaskWorkLogProjection>> {

    const rb = new RequestBuilder(this.rootUrl, TaskWorkLogControllerService.Create4Path, 'post');
    if (params) {
      rb.path('taskId', params.taskId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTaskWorkLogProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create4$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create4(params: {
    taskId: number;
    body: TaskWorkLog
  }): Observable<RestApiResponseTaskWorkLogProjection> {

    return this.create4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTaskWorkLogProjection>) => r.body as RestApiResponseTaskWorkLogProjection)
    );
  }

  /**
   * Path part for operation getTaskWorkLogForDashboard
   */
  static readonly GetTaskWorkLogForDashboardPath = '/v1/tasks/dashboard/logs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskWorkLogForDashboard()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskWorkLogForDashboard$Response(params: {
    isAutoWorkLog?: boolean;
    taskIds: Array<number>;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageTaskWorkLogForDashboardProjection>> {

    const rb = new RequestBuilder(this.rootUrl, TaskWorkLogControllerService.GetTaskWorkLogForDashboardPath, 'get');
    if (params) {
      rb.query('isAutoWorkLog', params.isAutoWorkLog, {});
      rb.query('taskIds', params.taskIds, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageTaskWorkLogForDashboardProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskWorkLogForDashboard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskWorkLogForDashboard(params: {
    isAutoWorkLog?: boolean;
    taskIds: Array<number>;
    pageable: Pageable;
  }): Observable<RestApiResponsePageTaskWorkLogForDashboardProjection> {

    return this.getTaskWorkLogForDashboard$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageTaskWorkLogForDashboardProjection>) => r.body as RestApiResponsePageTaskWorkLogForDashboardProjection)
    );
  }

}
