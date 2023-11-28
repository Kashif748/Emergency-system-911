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

import { AdcdaAvailabilityReport } from '../models/adcda-availability-report';
import { Pageable } from '../models/pageable';
import { RestApiResponseAdcdaAvailabilityReport } from '../models/rest-api-response-adcda-availability-report';
import { RestApiResponseAdcdaAvailabilityReportProjection } from '../models/rest-api-response-adcda-availability-report-projection';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseLong } from '../models/rest-api-response-long';
import { RestApiResponsePageAdcdaAvailabilityReportProjection } from '../models/rest-api-response-page-adcda-availability-report-projection';

@Injectable()
export class AdcdaAvailabilityReportControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete35
   */
  static readonly Delete35Path = '/v1/adcda/availability-report/{id}/inactive';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete35()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete35$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.Delete35Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete35$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete35(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete35$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation getAll32
   */
  static readonly GetAll32Path = '/v1/adcda/availability-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll32()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll32$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAdcdaAvailabilityReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.GetAll32Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageAdcdaAvailabilityReportProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll32$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll32(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAdcdaAvailabilityReportProjection> {

    return this.getAll32$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAdcdaAvailabilityReportProjection>) => r.body as RestApiResponsePageAdcdaAvailabilityReportProjection)
    );
  }

  /**
   * Path part for operation update121
   */
  static readonly Update121Path = '/v1/adcda/availability-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update121()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update121$Response(params: {
    body: AdcdaAvailabilityReport
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaAvailabilityReport>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.Update121Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaAvailabilityReport>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update121$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update121(params: {
    body: AdcdaAvailabilityReport
  }): Observable<RestApiResponseAdcdaAvailabilityReport> {

    return this.update121$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaAvailabilityReport>) => r.body as RestApiResponseAdcdaAvailabilityReport)
    );
  }

  /**
   * Path part for operation create78
   */
  static readonly Create78Path = '/v1/adcda/availability-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create78()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create78$Response(params: {
    body: AdcdaAvailabilityReport
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaAvailabilityReport>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.Create78Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaAvailabilityReport>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create78$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create78(params: {
    body: AdcdaAvailabilityReport
  }): Observable<RestApiResponseAdcdaAvailabilityReport> {

    return this.create78$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaAvailabilityReport>) => r.body as RestApiResponseAdcdaAvailabilityReport)
    );
  }

  /**
   * Path part for operation getById14
   */
  static readonly GetById14Path = '/v1/adcda/availability-report/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById14()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById14$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaAvailabilityReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.GetById14Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaAvailabilityReportProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById14(params: {
    id: number;
  }): Observable<RestApiResponseAdcdaAvailabilityReportProjection> {

    return this.getById14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaAvailabilityReportProjection>) => r.body as RestApiResponseAdcdaAvailabilityReportProjection)
    );
  }

  /**
   * Path part for operation archive3
   */
  static readonly Archive3Path = '/v1/adcda/availability-report/archive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `archive3()` instead.
   *
   * This method doesn't expect any request body.
   */
  archive3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.Archive3Path, 'get');
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
   * To access the full response (for headers, for example), `archive3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  archive3(params: {
    id: number;
  }): Observable<RestApiResponseLong> {

    return this.archive3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

}
