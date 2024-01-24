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

import { DailySummaryReportOptType } from '../models/daily-summary-report-opt-type';
import { Pageable } from '../models/pageable';
import { RestApiResponseDailySummaryReportOptType } from '../models/rest-api-response-daily-summary-report-opt-type';
import { RestApiResponsePageDailySummaryReportOptType } from '../models/rest-api-response-page-daily-summary-report-opt-type';

@Injectable()
export class DailySummaryOptTypeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete30
   */
  static readonly Delete30Path = '/v1/dailysummary-type/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete30()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete30$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportOptType>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryOptTypeControllerService.Delete30Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDailySummaryReportOptType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete30$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete30(params: {
    id: number;
  }): Observable<RestApiResponseDailySummaryReportOptType> {

    return this.delete30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportOptType>) => r.body as RestApiResponseDailySummaryReportOptType)
    );
  }

  /**
   * Path part for operation findActivePage26
   */
  static readonly FindActivePage26Path = '/v1/dailysummary-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage26()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage26$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageDailySummaryReportOptType>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryOptTypeControllerService.FindActivePage26Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageDailySummaryReportOptType>;
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
  }): Observable<RestApiResponsePageDailySummaryReportOptType> {

    return this.findActivePage26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageDailySummaryReportOptType>) => r.body as RestApiResponsePageDailySummaryReportOptType)
    );
  }

  /**
   * Path part for operation update70
   */
  static readonly Update70Path = '/v1/dailysummary-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update70()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update70$Response(params: {
    body: DailySummaryReportOptType
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportOptType>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryOptTypeControllerService.Update70Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDailySummaryReportOptType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update70$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update70(params: {
    body: DailySummaryReportOptType
  }): Observable<RestApiResponseDailySummaryReportOptType> {

    return this.update70$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportOptType>) => r.body as RestApiResponseDailySummaryReportOptType)
    );
  }

  /**
   * Path part for operation create63
   */
  static readonly Create63Path = '/v1/dailysummary-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create63()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create63$Response(params: {
    body: DailySummaryReportOptType
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportOptType>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryOptTypeControllerService.Create63Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDailySummaryReportOptType>;
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
    body: DailySummaryReportOptType
  }): Observable<RestApiResponseDailySummaryReportOptType> {

    return this.create63$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportOptType>) => r.body as RestApiResponseDailySummaryReportOptType)
    );
  }

  /**
   * Path part for operation getActiveStatus2
   */
  static readonly GetActiveStatus2Path = '/v1/dailysummary-type/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveStatus2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveStatus2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportOptType>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryOptTypeControllerService.GetActiveStatus2Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDailySummaryReportOptType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveStatus2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveStatus2(params: {
    id: number;
  }): Observable<RestApiResponseDailySummaryReportOptType> {

    return this.getActiveStatus2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportOptType>) => r.body as RestApiResponseDailySummaryReportOptType)
    );
  }

}
