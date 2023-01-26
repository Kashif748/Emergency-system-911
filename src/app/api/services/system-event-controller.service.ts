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
import { RestApiResponsePageSystemEventConfig } from '../models/rest-api-response-page-system-event-config';
import { RestApiResponseSystemEventConfig } from '../models/rest-api-response-system-event-config';
import { SystemEventConfig } from '../models/system-event-config';

@Injectable()
export class SystemEventControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation page
   */
  static readonly PagePath = '/v1/system-events';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page()` instead.
   *
   * This method doesn't expect any request body.
   */
  page$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageSystemEventConfig>> {

    const rb = new RequestBuilder(this.rootUrl, SystemEventControllerService.PagePath, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageSystemEventConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageSystemEventConfig> {

    return this.page$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageSystemEventConfig>) => r.body as RestApiResponsePageSystemEventConfig)
    );
  }

  /**
   * Path part for operation update5
   */
  static readonly Update5Path = '/v1/system-events';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update5$Response(params: {
    body: SystemEventConfig
  }): Observable<StrictHttpResponse<RestApiResponseSystemEventConfig>> {

    const rb = new RequestBuilder(this.rootUrl, SystemEventControllerService.Update5Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSystemEventConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update5(params: {
    body: SystemEventConfig
  }): Observable<RestApiResponseSystemEventConfig> {

    return this.update5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSystemEventConfig>) => r.body as RestApiResponseSystemEventConfig)
    );
  }

  /**
   * Path part for operation create5
   */
  static readonly Create5Path = '/v1/system-events';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create5$Response(params: {
    body: SystemEventConfig
  }): Observable<StrictHttpResponse<RestApiResponseSystemEventConfig>> {

    const rb = new RequestBuilder(this.rootUrl, SystemEventControllerService.Create5Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSystemEventConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create5(params: {
    body: SystemEventConfig
  }): Observable<RestApiResponseSystemEventConfig> {

    return this.create5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSystemEventConfig>) => r.body as RestApiResponseSystemEventConfig)
    );
  }

  /**
   * Path part for operation get2
   */
  static readonly Get2Path = '/v1/system-events/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get2()` instead.
   *
   * This method doesn't expect any request body.
   */
  get2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseSystemEventConfig>> {

    const rb = new RequestBuilder(this.rootUrl, SystemEventControllerService.Get2Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSystemEventConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get2(params: {
    id: number;
  }): Observable<RestApiResponseSystemEventConfig> {

    return this.get2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSystemEventConfig>) => r.body as RestApiResponseSystemEventConfig)
    );
  }

}
