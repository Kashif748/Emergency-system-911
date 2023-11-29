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

import { AdcdaDailyReport } from '../models/adcda-daily-report';
import { Pageable } from '../models/pageable';
import { RestApiResponseAdcdaDailyReport } from '../models/rest-api-response-adcda-daily-report';
import { RestApiResponseAdcdaDailyReportProjection } from '../models/rest-api-response-adcda-daily-report-projection';
import { RestApiResponseLong } from '../models/rest-api-response-long';
import { RestApiResponseObject } from '../models/rest-api-response-object';
import { RestApiResponsePageAdcdaDailyReportProjection } from '../models/rest-api-response-page-adcda-daily-report-projection';
import { User } from '../models/user';
import { UserInappAuthentication } from '../models/user-inapp-authentication';
import { UserMiddlewareAuth } from '../models/user-middleware-auth';

@Injectable()
export class AdcdaDailyReportControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation approve
   */
  static readonly ApprovePath = '/v1/adcda-daily-report/{id}/approve';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approve()` instead.
   *
   * This method doesn't expect any request body.
   */
  approve$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaDailyReport>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaDailyReportControllerService.ApprovePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaDailyReport>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `approve$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approve(params: {
    id: number;
  }): Observable<RestApiResponseAdcdaDailyReport> {

    return this.approve$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaDailyReport>) => r.body as RestApiResponseAdcdaDailyReport)
    );
  }

  /**
   * Path part for operation findActivePage28
   */
  static readonly FindActivePage28Path = '/v1/adcda-daily-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage28()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage28$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAdcdaDailyReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaDailyReportControllerService.FindActivePage28Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageAdcdaDailyReportProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage28$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage28(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAdcdaDailyReportProjection> {

    return this.findActivePage28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAdcdaDailyReportProjection>) => r.body as RestApiResponsePageAdcdaDailyReportProjection)
    );
  }

  /**
   * Path part for operation update123
   */
  static readonly Update123Path = '/v1/adcda-daily-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update123()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update123$Response(params: {
    body: AdcdaDailyReport
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaDailyReport>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaDailyReportControllerService.Update123Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaDailyReport>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update123$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update123(params: {
    body: AdcdaDailyReport
  }): Observable<RestApiResponseAdcdaDailyReport> {

    return this.update123$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaDailyReport>) => r.body as RestApiResponseAdcdaDailyReport)
    );
  }

  /**
   * Path part for operation create80
   */
  static readonly Create80Path = '/v1/adcda-daily-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create80()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create80$Response(params: {
    body: AdcdaDailyReport
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaDailyReport>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaDailyReportControllerService.Create80Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaDailyReport>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create80$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create80(params: {
    body: AdcdaDailyReport
  }): Observable<RestApiResponseAdcdaDailyReport> {

    return this.create80$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaDailyReport>) => r.body as RestApiResponseAdcdaDailyReport)
    );
  }

  /**
   * Path part for operation send2
   */
  static readonly Send2Path = '/v1/adcda-daily-report/send/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `send2()` instead.
   *
   * This method doesn't expect any request body.
   */
  send2$Response(params: {
    id: number;
    userId: (User | UserInappAuthentication | UserMiddlewareAuth);
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaDailyReportControllerService.Send2Path, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `send2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  send2(params: {
    id: number;
    userId: (User | UserInappAuthentication | UserMiddlewareAuth);
  }): Observable<RestApiResponseObject> {

    return this.send2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

  /**
   * Path part for operation getActiveAdcdaDailyReport
   */
  static readonly GetActiveAdcdaDailyReportPath = '/v1/adcda-daily-report/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveAdcdaDailyReport()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAdcdaDailyReport$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaDailyReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaDailyReportControllerService.GetActiveAdcdaDailyReportPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaDailyReportProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveAdcdaDailyReport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAdcdaDailyReport(params: {
    id: number;
  }): Observable<RestApiResponseAdcdaDailyReportProjection> {

    return this.getActiveAdcdaDailyReport$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaDailyReportProjection>) => r.body as RestApiResponseAdcdaDailyReportProjection)
    );
  }

  /**
   * Path part for operation search30
   */
  static readonly Search30Path = '/v1/adcda-daily-report/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search30()` instead.
   *
   * This method doesn't expect any request body.
   */
  search30$Response(params: {
    filter?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAdcdaDailyReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaDailyReportControllerService.Search30Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageAdcdaDailyReportProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search30$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search30(params: {
    filter?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageAdcdaDailyReportProjection> {

    return this.search30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAdcdaDailyReportProjection>) => r.body as RestApiResponsePageAdcdaDailyReportProjection)
    );
  }

  /**
   * Path part for operation archive4
   */
  static readonly Archive4Path = '/v1/adcda-daily-report/archive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `archive4()` instead.
   *
   * This method doesn't expect any request body.
   */
  archive4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaDailyReportControllerService.Archive4Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `archive4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  archive4(params: {
    id: number;
  }): Observable<RestApiResponseLong> {

    return this.archive4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

}
