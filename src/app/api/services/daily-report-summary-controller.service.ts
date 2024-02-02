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

import { DailySummaryReport } from '../models/daily-summary-report';
import { Pageable } from '../models/pageable';
import { RestApiResponseDailySummaryReportProjection } from '../models/rest-api-response-daily-summary-report-projection';
import { RestApiResponseLong } from '../models/rest-api-response-long';
import { RestApiResponsePageDailySummaryReportProjMinimum } from '../models/rest-api-response-page-daily-summary-report-proj-minimum';

@Injectable()
export class DailyReportSummaryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getdailySummariesReport
   */
  static readonly GetdailySummariesReportPath = '/v1/dailysummaries';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getdailySummariesReport()` instead.
   *
   * This method doesn't expect any request body.
   */
  getdailySummariesReport$Response(params: {
    fromDate?: string;
    toDate?: string;
    name?: string;
    status?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageDailySummaryReportProjMinimum>> {

    const rb = new RequestBuilder(this.rootUrl, DailyReportSummaryControllerService.GetdailySummariesReportPath, 'get');
    if (params) {
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('name', params.name, {});
      rb.query('status', params.status, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageDailySummaryReportProjMinimum>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getdailySummariesReport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getdailySummariesReport(params: {
    fromDate?: string;
    toDate?: string;
    name?: string;
    status?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageDailySummaryReportProjMinimum> {

    return this.getdailySummariesReport$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageDailySummaryReportProjMinimum>) => r.body as RestApiResponsePageDailySummaryReportProjMinimum)
    );
  }

  /**
   * Path part for operation update72
   */
  static readonly Update72Path = '/v1/dailysummaries';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update72()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update72$Response(params: {
    body: DailySummaryReport
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, DailyReportSummaryControllerService.Update72Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDailySummaryReportProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update72$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update72(params: {
    body: DailySummaryReport
  }): Observable<RestApiResponseDailySummaryReportProjection> {

    return this.update72$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportProjection>) => r.body as RestApiResponseDailySummaryReportProjection)
    );
  }

  /**
   * Path part for operation create65
   */
  static readonly Create65Path = '/v1/dailysummaries';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create65()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create65$Response(params: {
    body: DailySummaryReport
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, DailyReportSummaryControllerService.Create65Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDailySummaryReportProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create65$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create65(params: {
    body: DailySummaryReport
  }): Observable<RestApiResponseDailySummaryReportProjection> {

    return this.create65$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportProjection>) => r.body as RestApiResponseDailySummaryReportProjection)
    );
  }

  /**
   * Path part for operation get22
   */
  static readonly Get22Path = '/v1/dailysummaries/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get22()` instead.
   *
   * This method doesn't expect any request body.
   */
  get22$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, DailyReportSummaryControllerService.Get22Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDailySummaryReportProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get22(params: {
    id: number;
  }): Observable<RestApiResponseDailySummaryReportProjection> {

    return this.get22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportProjection>) => r.body as RestApiResponseDailySummaryReportProjection)
    );
  }

  /**
   * Path part for operation generate3
   */
  static readonly Generate3Path = '/v1/dailysummaries/review/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generate3()` instead.
   *
   * This method doesn't expect any request body.
   */
  generate3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, DailyReportSummaryControllerService.Generate3Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `generate3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generate3(params: {
    id: number;
  }): Observable<void> {

    return this.generate3$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation archive1
   */
  static readonly Archive1Path = '/v1/dailysummaries/archive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `archive1()` instead.
   *
   * This method doesn't expect any request body.
   */
  archive1$Response(params: {
    id: DailySummaryReport;
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, DailyReportSummaryControllerService.Archive1Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `archive1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  archive1(params: {
    id: DailySummaryReport;
  }): Observable<RestApiResponseLong> {

    return this.archive1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

}
