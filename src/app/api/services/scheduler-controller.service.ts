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
import { RestApiResponsePageScheduler } from '../models/rest-api-response-page-scheduler';
import { RestApiResponseScheduler } from '../models/rest-api-response-scheduler';
import { Scheduler } from '../models/scheduler';

@Injectable()
export class SchedulerControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation page9
   */
  static readonly Page9Path = '/v1/ext/schedulers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page9()` instead.
   *
   * This method doesn't expect any request body.
   */
  page9$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageScheduler>> {

    const rb = new RequestBuilder(this.rootUrl, SchedulerControllerService.Page9Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageScheduler>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page9(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageScheduler> {

    return this.page9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageScheduler>) => r.body as RestApiResponsePageScheduler)
    );
  }

  /**
   * Path part for operation update52
   */
  static readonly Update52Path = '/v1/ext/schedulers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update52()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update52$Response(params: {
    body: Scheduler
  }): Observable<StrictHttpResponse<RestApiResponseScheduler>> {

    const rb = new RequestBuilder(this.rootUrl, SchedulerControllerService.Update52Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseScheduler>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update52$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update52(params: {
    body: Scheduler
  }): Observable<RestApiResponseScheduler> {

    return this.update52$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseScheduler>) => r.body as RestApiResponseScheduler)
    );
  }

  /**
   * Path part for operation create48
   */
  static readonly Create48Path = '/v1/ext/schedulers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create48()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create48$Response(params: {
    body: Scheduler
  }): Observable<StrictHttpResponse<RestApiResponseScheduler>> {

    const rb = new RequestBuilder(this.rootUrl, SchedulerControllerService.Create48Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseScheduler>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create48$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create48(params: {
    body: Scheduler
  }): Observable<RestApiResponseScheduler> {

    return this.create48$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseScheduler>) => r.body as RestApiResponseScheduler)
    );
  }

  /**
   * Path part for operation get21
   */
  static readonly Get21Path = '/v1/ext/schedulers/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get21()` instead.
   *
   * This method doesn't expect any request body.
   */
  get21$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseScheduler>> {

    const rb = new RequestBuilder(this.rootUrl, SchedulerControllerService.Get21Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseScheduler>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get21$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get21(params: {
    id: number;
  }): Observable<RestApiResponseScheduler> {

    return this.get21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseScheduler>) => r.body as RestApiResponseScheduler)
    );
  }

}
