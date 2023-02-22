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
   * Path part for operation delete5
   */
  static readonly Delete5Path = '/v1/adcda/availability-report/{id}/inactive';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete5()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete5$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.Delete5Path, 'put');
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
   * To access the full response (for headers, for example), `delete5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete5(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation getAll9
   */
  static readonly GetAll9Path = '/v1/adcda/availability-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll9()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll9$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAdcdaAvailabilityReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.GetAll9Path, 'get');
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
   * To access the full response (for headers, for example), `getAll9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll9(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAdcdaAvailabilityReportProjection> {

    return this.getAll9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAdcdaAvailabilityReportProjection>) => r.body as RestApiResponsePageAdcdaAvailabilityReportProjection)
    );
  }

  /**
   * Path part for operation update81
   */
  static readonly Update81Path = '/v1/adcda/availability-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update81()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update81$Response(params: {
    body: AdcdaAvailabilityReport
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaAvailabilityReport>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.Update81Path, 'put');
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
   * To access the full response (for headers, for example), `update81$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update81(params: {
    body: AdcdaAvailabilityReport
  }): Observable<RestApiResponseAdcdaAvailabilityReport> {

    return this.update81$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaAvailabilityReport>) => r.body as RestApiResponseAdcdaAvailabilityReport)
    );
  }

  /**
   * Path part for operation create76
   */
  static readonly Create76Path = '/v1/adcda/availability-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create76()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create76$Response(params: {
    body: AdcdaAvailabilityReport
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaAvailabilityReport>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.Create76Path, 'post');
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
   * To access the full response (for headers, for example), `create76$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create76(params: {
    body: AdcdaAvailabilityReport
  }): Observable<RestApiResponseAdcdaAvailabilityReport> {

    return this.create76$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaAvailabilityReport>) => r.body as RestApiResponseAdcdaAvailabilityReport)
    );
  }

  /**
   * Path part for operation getById11
   */
  static readonly GetById11Path = '/v1/adcda/availability-report/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById11()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById11$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaAvailabilityReportProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAvailabilityReportControllerService.GetById11Path, 'get');
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
   * To access the full response (for headers, for example), `getById11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById11(params: {
    id: number;
  }): Observable<RestApiResponseAdcdaAvailabilityReportProjection> {

    return this.getById11$Response(params).pipe(
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
