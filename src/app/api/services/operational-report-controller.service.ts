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

import { Incident } from '../models/incident';
import { OperationalReport } from '../models/operational-report';
import { Pageable } from '../models/pageable';
import { RestApiResponseLong } from '../models/rest-api-response-long';
import { RestApiResponseObject } from '../models/rest-api-response-object';
import { RestApiResponseOperationalReport } from '../models/rest-api-response-operational-report';
import { RestApiResponseOperationalReportProjection } from '../models/rest-api-response-operational-report-projection';
import { RestApiResponsePageOperationalReportProjection } from '../models/rest-api-response-page-operational-report-projection';
import { RestApiResponsePageOperationalReportStatus } from '../models/rest-api-response-page-operational-report-status';
import { User } from '../models/user';
import { UserInappAuthentication } from '../models/user-inapp-authentication';
import { UserMiddlewareAuth } from '../models/user-middleware-auth';

@Injectable()
export class OperationalReportControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation page5
   */
  static readonly Page5Path = '/v1/operational-reports';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page5()` instead.
   *
   * This method doesn't expect any request body.
   */
  page5$Response(params: {
    pageable: Pageable;
    incidentId: Incident;
  }): Observable<StrictHttpResponse<RestApiResponsePageOperationalReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportControllerService.Page5Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
      rb.query('incidentId', params.incidentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageOperationalReportProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page5(params: {
    pageable: Pageable;
    incidentId: Incident;
  }): Observable<RestApiResponsePageOperationalReportProjection> {

    return this.page5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageOperationalReportProjection>) => r.body as RestApiResponsePageOperationalReportProjection)
    );
  }

  /**
   * Path part for operation update20
   */
  static readonly Update20Path = '/v1/operational-reports';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update20()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update20$Response(params: {
    body: OperationalReport
  }): Observable<StrictHttpResponse<RestApiResponseOperationalReport>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportControllerService.Update20Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOperationalReport>;
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
    body: OperationalReport
  }): Observable<RestApiResponseOperationalReport> {

    return this.update20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOperationalReport>) => r.body as RestApiResponseOperationalReport)
    );
  }

  /**
   * Path part for operation create20
   */
  static readonly Create20Path = '/v1/operational-reports';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create20()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create20$Response(params: {
    body: OperationalReport
  }): Observable<StrictHttpResponse<RestApiResponseOperationalReport>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportControllerService.Create20Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOperationalReport>;
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
    body: OperationalReport
  }): Observable<RestApiResponseOperationalReport> {

    return this.create20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOperationalReport>) => r.body as RestApiResponseOperationalReport)
    );
  }

  /**
   * Path part for operation send
   */
  static readonly SendPath = '/v1/operational-reports/send/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `send()` instead.
   *
   * This method doesn't expect any request body.
   */
  send$Response(params: {
    id: OperationalReport;
    userId: (User | UserInappAuthentication | UserMiddlewareAuth);
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportControllerService.SendPath, 'post');
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
   * To access the full response (for headers, for example), `send$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  send(params: {
    id: OperationalReport;
    userId: (User | UserInappAuthentication | UserMiddlewareAuth);
  }): Observable<RestApiResponseObject> {

    return this.send$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

  /**
   * Path part for operation get9
   */
  static readonly Get9Path = '/v1/operational-reports/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get9()` instead.
   *
   * This method doesn't expect any request body.
   */
  get9$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseOperationalReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportControllerService.Get9Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOperationalReportProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get9(params: {
    id: number;
  }): Observable<RestApiResponseOperationalReportProjection> {

    return this.get9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOperationalReportProjection>) => r.body as RestApiResponseOperationalReportProjection)
    );
  }

  /**
   * Path part for operation getStatus
   */
  static readonly GetStatusPath = '/v1/operational-reports/statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatus$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageOperationalReportStatus>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportControllerService.GetStatusPath, 'get');
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
   * To access the full response (for headers, for example), `getStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getStatus(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageOperationalReportStatus> {

    return this.getStatus$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageOperationalReportStatus>) => r.body as RestApiResponsePageOperationalReportStatus)
    );
  }

  /**
   * Path part for operation newUpdateSerialNumber
   */
  static readonly NewUpdateSerialNumberPath = '/v1/operational-reports/serial/{incidentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `newUpdateSerialNumber()` instead.
   *
   * This method doesn't expect any request body.
   */
  newUpdateSerialNumber$Response(params: {
    incidentId: number;
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportControllerService.NewUpdateSerialNumberPath, 'get');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
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
   * To access the full response (for headers, for example), `newUpdateSerialNumber$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  newUpdateSerialNumber(params: {
    incidentId: number;
  }): Observable<RestApiResponseLong> {

    return this.newUpdateSerialNumber$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

  /**
   * Path part for operation generate2
   */
  static readonly Generate2Path = '/v1/operational-reports/review/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generate2()` instead.
   *
   * This method doesn't expect any request body.
   */
  generate2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportControllerService.Generate2Path, 'get');
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
   * To access the full response (for headers, for example), `generate2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generate2(params: {
    id: number;
  }): Observable<void> {

    return this.generate2$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation archive
   */
  static readonly ArchivePath = '/v1/operational-reports/archive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `archive()` instead.
   *
   * This method doesn't expect any request body.
   */
  archive$Response(params: {
    id: OperationalReport;
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, OperationalReportControllerService.ArchivePath, 'get');
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
   * To access the full response (for headers, for example), `archive$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  archive(params: {
    id: OperationalReport;
  }): Observable<RestApiResponseLong> {

    return this.archive$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

}
