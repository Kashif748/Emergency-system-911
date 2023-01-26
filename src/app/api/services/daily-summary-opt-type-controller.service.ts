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
   * Path part for operation findActivePage25
   */
  static readonly FindActivePage25Path = '/v1/dailysummary-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage25()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage25$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageDailySummaryReportOptType>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryOptTypeControllerService.FindActivePage25Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage25(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageDailySummaryReportOptType> {

    return this.findActivePage25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageDailySummaryReportOptType>) => r.body as RestApiResponsePageDailySummaryReportOptType)
    );
  }

  /**
   * Path part for operation update64
   */
  static readonly Update64Path = '/v1/dailysummary-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update64()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update64$Response(params: {
    body: DailySummaryReportOptType
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportOptType>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryOptTypeControllerService.Update64Path, 'put');
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
   * To access the full response (for headers, for example), `update64$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update64(params: {
    body: DailySummaryReportOptType
  }): Observable<RestApiResponseDailySummaryReportOptType> {

    return this.update64$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportOptType>) => r.body as RestApiResponseDailySummaryReportOptType)
    );
  }

  /**
   * Path part for operation create59
   */
  static readonly Create59Path = '/v1/dailysummary-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create59()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create59$Response(params: {
    body: DailySummaryReportOptType
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportOptType>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryOptTypeControllerService.Create59Path, 'post');
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
   * To access the full response (for headers, for example), `create59$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create59(params: {
    body: DailySummaryReportOptType
  }): Observable<RestApiResponseDailySummaryReportOptType> {

    return this.create59$Response(params).pipe(
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

  /**
   * Path part for operation delete34
   */
  static readonly Delete34Path = '/v1/dailysummary-type/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete34()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete34$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseDailySummaryReportOptType>> {

    const rb = new RequestBuilder(this.rootUrl, DailySummaryOptTypeControllerService.Delete34Path, 'delete');
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
   * To access the full response (for headers, for example), `delete34$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete34(params: {
    id: number;
  }): Observable<RestApiResponseDailySummaryReportOptType> {

    return this.delete34$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDailySummaryReportOptType>) => r.body as RestApiResponseDailySummaryReportOptType)
    );
  }

}
