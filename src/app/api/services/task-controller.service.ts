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

import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseListIncidentTask } from '../models/rest-api-response-list-incident-task';
import { RestApiResponseListLong } from '../models/rest-api-response-list-long';
import { RestApiResponseListTaskType } from '../models/rest-api-response-list-task-type';
import { RestApiResponseLong } from '../models/rest-api-response-long';
import { RestApiResponsePageIncidentTask } from '../models/rest-api-response-page-incident-task';
import { RestApiResponsePageIncidentTaskProjection } from '../models/rest-api-response-page-incident-task-projection';
import { RestApiResponseString } from '../models/rest-api-response-string';
import { RestApiResponseTaskDetails } from '../models/rest-api-response-task-details';
import { RestApiResponseTaskMetricsDetails } from '../models/rest-api-response-task-metrics-details';
import { TaskCriteria } from '../models/task-criteria';
import { TaskDetails } from '../models/task-details';
import { TaskFilter } from '../models/task-filter';
import { TaskStatus } from '../models/task-status';

@Injectable()
export class TaskControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateStatus
   */
  static readonly UpdateStatusPath = '/v1/tasks/{taskId}/status/{statusId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStatus$Response(params: {
    taskId: number;
    statusId: TaskStatus;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.UpdateStatusPath, 'put');
    if (params) {
      rb.path('taskId', params.taskId, {});
      rb.path('statusId', params.statusId, {});
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
   * To access the full response (for headers, for example), `updateStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateStatus(params: {
    taskId: number;
    statusId: TaskStatus;
  }): Observable<RestApiResponseBoolean> {

    return this.updateStatus$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation getTaskDetails
   */
  static readonly GetTaskDetailsPath = '/v1/tasks/{taskId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskDetails$Response(params: {
    taskId: number;
  }): Observable<StrictHttpResponse<RestApiResponseTaskDetails>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetTaskDetailsPath, 'get');
    if (params) {
      rb.path('taskId', params.taskId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTaskDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskDetails(params: {
    taskId: number;
  }): Observable<RestApiResponseTaskDetails> {

    return this.getTaskDetails$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTaskDetails>) => r.body as RestApiResponseTaskDetails)
    );
  }

  /**
   * Path part for operation updateTask
   */
  static readonly UpdateTaskPath = '/v1/tasks/{taskId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTask()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTask$Response(params: {
    taskId: number;
    body: TaskDetails
  }): Observable<StrictHttpResponse<RestApiResponseTaskDetails>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.UpdateTaskPath, 'put');
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
        return r as StrictHttpResponse<RestApiResponseTaskDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateTask$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTask(params: {
    taskId: number;
    body: TaskDetails
  }): Observable<RestApiResponseTaskDetails> {

    return this.updateTask$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTaskDetails>) => r.body as RestApiResponseTaskDetails)
    );
  }

  /**
   * Path part for operation changeIncident
   */
  static readonly ChangeIncidentPath = '/v1/tasks/changeTaskStatus/{taskId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeIncident()` instead.
   *
   * This method doesn't expect any request body.
   */
  changeIncident$Response(params: {
    taskId: number;
    language: boolean;
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.ChangeIncidentPath, 'put');
    if (params) {
      rb.path('taskId', params.taskId, {});
      rb.query('language', params.language, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseString>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changeIncident$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changeIncident(params: {
    taskId: number;
    language: boolean;
  }): Observable<RestApiResponseString> {

    return this.changeIncident$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation getAllForOrg1
   */
  static readonly GetAllForOrg1Path = '/v1/tasks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllForOrg1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllForOrg1$Response(params: {
    filter: TaskFilter;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentTaskProjection>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetAllForOrg1Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentTaskProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllForOrg1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllForOrg1(params: {
    filter: TaskFilter;
    page: Pageable;
  }): Observable<RestApiResponsePageIncidentTaskProjection> {

    return this.getAllForOrg1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentTaskProjection>) => r.body as RestApiResponsePageIncidentTaskProjection)
    );
  }

  /**
   * Path part for operation createTask
   */
  static readonly CreateTaskPath = '/v1/tasks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTask()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTask$Response(params: {
    body: TaskDetails
  }): Observable<StrictHttpResponse<RestApiResponseTaskDetails>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.CreateTaskPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTaskDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTask$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTask(params: {
    body: TaskDetails
  }): Observable<RestApiResponseTaskDetails> {

    return this.createTask$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTaskDetails>) => r.body as RestApiResponseTaskDetails)
    );
  }

  /**
   * Path part for operation getTaskTypes
   */
  static readonly GetTaskTypesPath = '/v1/tasks/types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskTypes$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListTaskType>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetTaskTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListTaskType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskTypes(params?: {
  }): Observable<RestApiResponseListTaskType> {

    return this.getTaskTypes$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListTaskType>) => r.body as RestApiResponseListTaskType)
    );
  }

  /**
   * Path part for operation getTaskCountByOrgStructureAndStatusIdAndIncidentId
   */
  static readonly GetTaskCountByOrgStructureAndStatusIdAndIncidentIdPath = '/v1/tasks/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskCountByOrgStructureAndStatusIdAndIncidentId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskCountByOrgStructureAndStatusIdAndIncidentId$Response(params: {
    statusId: number;
    incidentId?: number;
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetTaskCountByOrgStructureAndStatusIdAndIncidentIdPath, 'get');
    if (params) {
      rb.query('statusId', params.statusId, {});
      rb.query('incidentId', params.incidentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskCountByOrgStructureAndStatusIdAndIncidentId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskCountByOrgStructureAndStatusIdAndIncidentId(params: {
    statusId: number;
    incidentId?: number;
  }): Observable<RestApiResponseLong> {

    return this.getTaskCountByOrgStructureAndStatusIdAndIncidentId$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

  /**
   * Path part for operation getTaskMetrics
   */
  static readonly GetTaskMetricsPath = '/v1/tasks/metrics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskMetrics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskMetrics$Response(params: {
    filter: TaskFilter;
  }): Observable<StrictHttpResponse<RestApiResponseTaskMetricsDetails>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetTaskMetricsPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTaskMetricsDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskMetrics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskMetrics(params: {
    filter: TaskFilter;
  }): Observable<RestApiResponseTaskMetricsDetails> {

    return this.getTaskMetrics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTaskMetricsDetails>) => r.body as RestApiResponseTaskMetricsDetails)
    );
  }

  /**
   * Path part for operation getTasksForIncident
   */
  static readonly GetTasksForIncidentPath = '/v1/tasks/incident/{incidentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTasksForIncident()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTasksForIncident$Response(params: {
    incidentId: number;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentTask>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetTasksForIncidentPath, 'get');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentTask>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTasksForIncident$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTasksForIncident(params: {
    incidentId: number;
    page: Pageable;
  }): Observable<RestApiResponsePageIncidentTask> {

    return this.getTasksForIncident$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentTask>) => r.body as RestApiResponsePageIncidentTask)
    );
  }

  /**
   * Path part for operation getCreatedForOrgTasks
   */
  static readonly GetCreatedForOrgTasksPath = '/v1/tasks/for-my-org/list-ids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCreatedForOrgTasks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCreatedForOrgTasks$Response(params: {
    filter: TaskCriteria;
  }): Observable<StrictHttpResponse<RestApiResponseListLong>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetCreatedForOrgTasksPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCreatedForOrgTasks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCreatedForOrgTasks(params: {
    filter: TaskCriteria;
  }): Observable<RestApiResponseListLong> {

    return this.getCreatedForOrgTasks$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListLong>) => r.body as RestApiResponseListLong)
    );
  }

  /**
   * Path part for operation getCreatedForOrg
   */
  static readonly GetCreatedForOrgPath = '/v1/tasks/for-my-org';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCreatedForOrg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCreatedForOrg$Response(params: {
    filter: TaskCriteria;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentTaskProjection>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetCreatedForOrgPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentTaskProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCreatedForOrg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCreatedForOrg(params: {
    filter: TaskCriteria;
    page: Pageable;
  }): Observable<RestApiResponsePageIncidentTaskProjection> {

    return this.getCreatedForOrg$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentTaskProjection>) => r.body as RestApiResponsePageIncidentTaskProjection)
    );
  }

  /**
   * Path part for operation export2
   */
  static readonly Export2Path = '/v1/tasks/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export2()` instead.
   *
   * This method doesn't expect any request body.
   */
  export2$Response(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    filter: TaskFilter;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.Export2Path, 'get');
    if (params) {
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
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
   * To access the full response (for headers, for example), `export2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export2(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    filter: TaskFilter;
  }): Observable<void> {

    return this.export2$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getTaskByOrgStructureAndDueDateAndIncidentId
   */
  static readonly GetTaskByOrgStructureAndDueDateAndIncidentIdPath = '/v1/tasks/due-date';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskByOrgStructureAndDueDateAndIncidentId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskByOrgStructureAndDueDateAndIncidentId$Response(params: {
    startDate: string;
    endDate: string;
    incidentId?: number;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentTask>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetTaskByOrgStructureAndDueDateAndIncidentIdPath, 'get');
    if (params) {
      rb.query('startDate', params.startDate, {});
      rb.query('endDate', params.endDate, {});
      rb.query('incidentId', params.incidentId, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentTask>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskByOrgStructureAndDueDateAndIncidentId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskByOrgStructureAndDueDateAndIncidentId(params: {
    startDate: string;
    endDate: string;
    incidentId?: number;
    page: Pageable;
  }): Observable<RestApiResponseListIncidentTask> {

    return this.getTaskByOrgStructureAndDueDateAndIncidentId$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentTask>) => r.body as RestApiResponseListIncidentTask)
    );
  }

  /**
   * Path part for operation getCreatedByOrgTasks
   */
  static readonly GetCreatedByOrgTasksPath = '/v1/tasks/by-my-org/list-ids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCreatedByOrgTasks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCreatedByOrgTasks$Response(params: {
    filter: TaskCriteria;
  }): Observable<StrictHttpResponse<RestApiResponseListLong>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetCreatedByOrgTasksPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCreatedByOrgTasks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCreatedByOrgTasks(params: {
    filter: TaskCriteria;
  }): Observable<RestApiResponseListLong> {

    return this.getCreatedByOrgTasks$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListLong>) => r.body as RestApiResponseListLong)
    );
  }

  /**
   * Path part for operation getCreatedByOrg
   */
  static readonly GetCreatedByOrgPath = '/v1/tasks/by-my-org';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCreatedByOrg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCreatedByOrg$Response(params: {
    filter: TaskCriteria;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentTaskProjection>> {

    const rb = new RequestBuilder(this.rootUrl, TaskControllerService.GetCreatedByOrgPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentTaskProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCreatedByOrg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCreatedByOrg(params: {
    filter: TaskCriteria;
    page: Pageable;
  }): Observable<RestApiResponsePageIncidentTaskProjection> {

    return this.getCreatedByOrg$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentTaskProjection>) => r.body as RestApiResponsePageIncidentTaskProjection)
    );
  }

}
