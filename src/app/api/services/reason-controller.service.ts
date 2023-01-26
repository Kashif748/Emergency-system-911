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

import { Pageable } from '../models/pageable';
import { Reason } from '../models/reason';
import { RestApiResponsePageReason } from '../models/rest-api-response-page-reason';
import { RestApiResponseReason } from '../models/rest-api-response-reason';

@Injectable()
export class ReasonControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage1
   */
  static readonly FindActivePage1Path = '/v1/reasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage1$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageReason>> {

    const rb = new RequestBuilder(this.rootUrl, ReasonControllerService.FindActivePage1Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageReason>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage1(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageReason> {

    return this.findActivePage1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageReason>) => r.body as RestApiResponsePageReason)
    );
  }

  /**
   * Path part for operation update11
   */
  static readonly Update11Path = '/v1/reasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update11()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update11$Response(params: {
    body: Reason
  }): Observable<StrictHttpResponse<RestApiResponseReason>> {

    const rb = new RequestBuilder(this.rootUrl, ReasonControllerService.Update11Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseReason>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update11$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update11(params: {
    body: Reason
  }): Observable<RestApiResponseReason> {

    return this.update11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseReason>) => r.body as RestApiResponseReason)
    );
  }

  /**
   * Path part for operation create11
   */
  static readonly Create11Path = '/v1/reasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create11()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create11$Response(params: {
    body: Reason
  }): Observable<StrictHttpResponse<RestApiResponseReason>> {

    const rb = new RequestBuilder(this.rootUrl, ReasonControllerService.Create11Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseReason>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create11$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create11(params: {
    body: Reason
  }): Observable<RestApiResponseReason> {

    return this.create11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseReason>) => r.body as RestApiResponseReason)
    );
  }

  /**
   * Path part for operation getActiveReason
   */
  static readonly GetActiveReasonPath = '/v1/reasons/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveReason()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveReason$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseReason>> {

    const rb = new RequestBuilder(this.rootUrl, ReasonControllerService.GetActiveReasonPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseReason>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveReason$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveReason(params: {
    id: number;
  }): Observable<RestApiResponseReason> {

    return this.getActiveReason$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseReason>) => r.body as RestApiResponseReason)
    );
  }

}
