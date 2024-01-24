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
   * Path part for operation findActivePage27
   */
  static readonly FindActivePage27Path = '/v1/dailysummary-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage27()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage27$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageDailySummaryReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryStatusControllerService.FindActivePage27Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage27$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage27(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageDailySummaryReportStatus> {

    return this.findActivePage27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageDailySummaryReportStatus>) => r.body as RestApiResponsePageDailySummaryReportStatus)
    );
  }

  /**
   * Path part for operation update71
   */
  static readonly Update71Path = '/v1/dailysummary-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update71()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update71$Response(params: {
    body: DailySummaryReportStatus
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryStatusControllerService.Update71Path, 'put');
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
   * To access the full response (for headers, for example), `update71$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update71(params: {
    body: DailySummaryReportStatus
  }): Observable<RestApiResponseDailySummaryReportStatus> {

    return this.update71$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportStatus>) => r.body as RestApiResponseDailySummaryReportStatus)
    );
  }

  /**
   * Path part for operation create64
   */
  static readonly Create64Path = '/v1/dailysummary-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create64()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create64$Response(params: {
    body: DailySummaryReportStatus
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryStatusControllerService.Create64Path, 'post');
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
   * To access the full response (for headers, for example), `create64$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create64(params: {
    body: DailySummaryReportStatus
  }): Observable<RestApiResponseDailySummaryReportStatus> {

    return this.create64$Response(params).pipe(
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
