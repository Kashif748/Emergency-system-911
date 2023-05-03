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
   * Path part for operation update30
   */
  static readonly Update30Path = '/v1/leave-calendar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update30()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update30$Response(params: {
    body: LeaveCalendar
  }): Observable<StrictHttpResponse<RestApiResponseLeaveCalendar>> {

    const rb = new RequestBuilder(this.rootUrl, LeaveCalendarControllerService.Update30Path, 'put');
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
   * To access the full response (for headers, for example), `update30$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update30(params: {
    body: LeaveCalendar
  }): Observable<RestApiResponseLeaveCalendar> {

    return this.update30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLeaveCalendar>) => r.body as RestApiResponseLeaveCalendar)
    );
  }

  /**
   * Path part for operation create25
   */
  static readonly Create25Path = '/v1/leave-calendar';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create25()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create25$Response(params: {
    body: LeaveCalendar
  }): Observable<StrictHttpResponse<RestApiResponseLeaveCalendar>> {

    const rb = new RequestBuilder(this.rootUrl, LeaveCalendarControllerService.Create25Path, 'post');
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
   * To access the full response (for headers, for example), `create25$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create25(params: {
    body: LeaveCalendar
  }): Observable<RestApiResponseLeaveCalendar> {

    return this.create25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLeaveCalendar>) => r.body as RestApiResponseLeaveCalendar)
    );
  }

  /**
   * Path part for operation getById6
   */
  static readonly GetById6Path = '/v1/leave-calendar/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseLeaveCalendar>> {

    const rb = new RequestBuilder(this.rootUrl, LeaveCalendarControllerService.GetById6Path, 'get');
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
   * To access the full response (for headers, for example), `getById6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById6(params: {
    id: number;
  }): Observable<RestApiResponseLeaveCalendar> {

    return this.getById6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLeaveCalendar>) => r.body as RestApiResponseLeaveCalendar)
    );
  }

}
