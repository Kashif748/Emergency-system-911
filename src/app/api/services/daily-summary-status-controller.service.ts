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

import { DailySummaryReportStatus } from '../models/daily-summary-report-status';
import { Pageable } from '../models/pageable';
import { RestApiResponseDailySummaryReportStatus } from '../models/rest-api-response-daily-summary-report-status';
import { RestApiResponsePageDailySummaryReportStatus } from '../models/rest-api-response-page-daily-summary-report-status';

@Injectable()
export class DailySummaryStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage26
   */
  static readonly FindActivePage26Path = '/v1/dailysummary-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage26()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage26$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageDailySummaryReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryStatusControllerService.FindActivePage26Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageDailySummaryReportStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage26$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage26(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageDailySummaryReportStatus> {

    return this.findActivePage26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageDailySummaryReportStatus>) => r.body as RestApiResponsePageDailySummaryReportStatus)
    );
  }

  /**
   * Path part for operation update69
   */
  static readonly Update69Path = '/v1/dailysummary-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update69()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update69$Response(params: {
    body: DailySummaryReportStatus
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryStatusControllerService.Update69Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDailySummaryReportStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update69$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update69(params: {
    body: DailySummaryReportStatus
  }): Observable<RestApiResponseDailySummaryReportStatus> {

    return this.update69$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportStatus>) => r.body as RestApiResponseDailySummaryReportStatus)
    );
  }

  /**
   * Path part for operation create63
   */
  static readonly Create63Path = '/v1/dailysummary-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create63()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create63$Response(params: {
    body: DailySummaryReportStatus
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryStatusControllerService.Create63Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDailySummaryReportStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create63$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create63(params: {
    body: DailySummaryReportStatus
  }): Observable<RestApiResponseDailySummaryReportStatus> {

    return this.create63$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportStatus>) => r.body as RestApiResponseDailySummaryReportStatus)
    );
  }

  /**
   * Path part for operation getActiveStatus3
   */
  static readonly GetActiveStatus3Path = '/v1/dailysummary-status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveStatus3()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveStatus3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryStatusControllerService.GetActiveStatus3Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDailySummaryReportStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveStatus3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveStatus3(params: {
    id: number;
  }): Observable<RestApiResponseDailySummaryReportStatus> {

    return this.getActiveStatus3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportStatus>) => r.body as RestApiResponseDailySummaryReportStatus)
    );
  }

}
