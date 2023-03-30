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

import { LeaveCalendar } from '../models/leave-calendar';
import { Pageable } from '../models/pageable';
import { RestApiResponseLeaveCalendar } from '../models/rest-api-response-leave-calendar';
import { RestApiResponsePageLeaveCalendar } from '../models/rest-api-response-page-leave-calendar';

@Injectable()
export class LeaveCalendarControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll7
   */
  static readonly GetAll7Path = '/v1/leave-calendar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll7()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll7$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageLeaveCalendar>> {

    const rb = new RequestBuilder(this.rootUrl, LeaveCalendarControllerService.GetAll7Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageLeaveCalendar>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll7(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageLeaveCalendar> {

    return this.getAll7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageLeaveCalendar>) => r.body as RestApiResponsePageLeaveCalendar)
    );
  }

  /**
   * Path part for operation update29
   */
  static readonly Update29Path = '/v1/leave-calendar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update29()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update29$Response(params: {
    body: LeaveCalendar
  }): Observable<StrictHttpResponse<RestApiResponseLeaveCalendar>> {

    const rb = new RequestBuilder(this.rootUrl, LeaveCalendarControllerService.Update29Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLeaveCalendar>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update29$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update29(params: {
    body: LeaveCalendar
  }): Observable<RestApiResponseLeaveCalendar> {

    return this.update29$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLeaveCalendar>) => r.body as RestApiResponseLeaveCalendar)
    );
  }

  /**
   * Path part for operation create24
   */
  static readonly Create24Path = '/v1/leave-calendar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create24()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create24$Response(params: {
    body: LeaveCalendar
  }): Observable<StrictHttpResponse<RestApiResponseLeaveCalendar>> {

    const rb = new RequestBuilder(this.rootUrl, LeaveCalendarControllerService.Create24Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLeaveCalendar>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create24$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create24(params: {
    body: LeaveCalendar
  }): Observable<RestApiResponseLeaveCalendar> {

    return this.create24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLeaveCalendar>) => r.body as RestApiResponseLeaveCalendar)
    );
  }

  /**
   * Path part for operation getById5
   */
  static readonly GetById5Path = '/v1/leave-calendar/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById5()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById5$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseLeaveCalendar>> {

    const rb = new RequestBuilder(this.rootUrl, LeaveCalendarControllerService.GetById5Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLeaveCalendar>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById5(params: {
    id: number;
  }): Observable<RestApiResponseLeaveCalendar> {

    return this.getById5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLeaveCalendar>) => r.body as RestApiResponseLeaveCalendar)
    );
  }

}
