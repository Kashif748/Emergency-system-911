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

import { OperationalReportStatus } from '../models/operational-report-status';
import { Pageable } from '../models/pageable';
import { RestApiResponseOperationalReportStatus } from '../models/rest-api-response-operational-report-status';
import { RestApiResponsePageOperationalReportStatus } from '../models/rest-api-response-page-operational-report-status';

@Injectable()
export class OperationalReportStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage4
   */
  static readonly FindActivePage4Path = '/v1/operational-report-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage4()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage4$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageOperationalReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportStatusControllerService.FindActivePage4Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageOperationalReportStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage4(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageOperationalReportStatus> {

    return this.findActivePage4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageOperationalReportStatus>) => r.body as RestApiResponsePageOperationalReportStatus)
    );
  }

  /**
   * Path part for operation update20
   */
  static readonly Update20Path = '/v1/operational-report-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update20()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update20$Response(params: {
    body: OperationalReportStatus
  }): Observable<StrictHttpResponse<RestApiResponseOperationalReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportStatusControllerService.Update20Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOperationalReportStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update20$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update20(params: {
    body: OperationalReportStatus
  }): Observable<RestApiResponseOperationalReportStatus> {

    return this.update20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOperationalReportStatus>) => r.body as RestApiResponseOperationalReportStatus)
    );
  }

  /**
   * Path part for operation create20
   */
  static readonly Create20Path = '/v1/operational-report-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create20()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create20$Response(params: {
    body: OperationalReportStatus
  }): Observable<StrictHttpResponse<RestApiResponseOperationalReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportStatusControllerService.Create20Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOperationalReportStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create20$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create20(params: {
    body: OperationalReportStatus
  }): Observable<RestApiResponseOperationalReportStatus> {

    return this.create20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOperationalReportStatus>) => r.body as RestApiResponseOperationalReportStatus)
    );
  }

  /**
   * Path part for operation getActiveStatus
   */
  static readonly GetActiveStatusPath = '/v1/operational-report-status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveStatus$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseOperationalReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportStatusControllerService.GetActiveStatusPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOperationalReportStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveStatus(params: {
    id: number;
  }): Observable<RestApiResponseOperationalReportStatus> {

    return this.getActiveStatus$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOperationalReportStatus>) => r.body as RestApiResponseOperationalReportStatus)
    );
  }

}
