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
import { ReportingVia } from '../models/reporting-via';
import { RestApiResponsePageReportingVia } from '../models/rest-api-response-page-reporting-via';
import { RestApiResponseReportingVia } from '../models/rest-api-response-reporting-via';

@Injectable()
export class ReportingViaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage
   */
  static readonly FindActivePagePath = '/v1/reporting-via';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageReportingVia>> {

    const rb = new RequestBuilder(this.rootUrl, ReportingViaControllerService.FindActivePagePath, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageReportingVia>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageReportingVia> {

    return this.findActivePage$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageReportingVia>) => r.body as RestApiResponsePageReportingVia)
    );
  }

  /**
   * Path part for operation update10
   */
  static readonly Update10Path = '/v1/reporting-via';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update10()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update10$Response(params: {
    body: ReportingVia
  }): Observable<StrictHttpResponse<RestApiResponseReportingVia>> {

    const rb = new RequestBuilder(this.rootUrl, ReportingViaControllerService.Update10Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseReportingVia>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update10$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update10(params: {
    body: ReportingVia
  }): Observable<RestApiResponseReportingVia> {

    return this.update10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseReportingVia>) => r.body as RestApiResponseReportingVia)
    );
  }

  /**
   * Path part for operation create10
   */
  static readonly Create10Path = '/v1/reporting-via';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create10()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create10$Response(params: {
    body: ReportingVia
  }): Observable<StrictHttpResponse<RestApiResponseReportingVia>> {

    const rb = new RequestBuilder(this.rootUrl, ReportingViaControllerService.Create10Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseReportingVia>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create10$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create10(params: {
    body: ReportingVia
  }): Observable<RestApiResponseReportingVia> {

    return this.create10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseReportingVia>) => r.body as RestApiResponseReportingVia)
    );
  }

  /**
   * Path part for operation getActiveReportingVia
   */
  static readonly GetActiveReportingViaPath = '/v1/reporting-via/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveReportingVia()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveReportingVia$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseReportingVia>> {

    const rb = new RequestBuilder(this.rootUrl, ReportingViaControllerService.GetActiveReportingViaPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseReportingVia>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveReportingVia$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveReportingVia(params: {
    id: number;
  }): Observable<RestApiResponseReportingVia> {

    return this.getActiveReportingVia$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseReportingVia>) => r.body as RestApiResponseReportingVia)
    );
  }

}
