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

import { EventsConfig } from '../models/events-config';
import { Pageable } from '../models/pageable';
import { RestApiResponseEventsConfig } from '../models/rest-api-response-events-config';
import { RestApiResponsePageEventsConfig } from '../models/rest-api-response-page-events-config';

@Injectable()
export class EventsConfigControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation update60
   */
  static readonly Update60Path = '/v1/events-config/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update60()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update60$Response(params: {
    id: number;
    body: EventsConfig
  }): Observable<StrictHttpResponse<RestApiResponseEventsConfig>> {

    const rb = new RequestBuilder(this.rootUrl, EventsConfigControllerService.Update60Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseEventsConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update60$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update60(params: {
    id: number;
    body: EventsConfig
  }): Observable<RestApiResponseEventsConfig> {

    return this.update60$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseEventsConfig>) => r.body as RestApiResponseEventsConfig)
    );
  }

  /**
   * Path part for operation testEndpointForEtisalat
   */
  static readonly TestEndpointForEtisalatPath = '/v1/events-config/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `testEndpointForEtisalat()` instead.
   *
   * This method doesn't expect any request body.
   */
  testEndpointForEtisalat$Response(params?: {
  }): Observable<StrictHttpResponse<boolean>> {

    const rb = new RequestBuilder(this.rootUrl, EventsConfigControllerService.TestEndpointForEtisalatPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: String((r as HttpResponse<any>).body) === 'true' }) as StrictHttpResponse<boolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `testEndpointForEtisalat$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  testEndpointForEtisalat(params?: {
  }): Observable<boolean> {

    return this.testEndpointForEtisalat$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation getAll9
   */
  static readonly GetAll9Path = '/v1/events-config';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll9()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll9$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageEventsConfig>> {

    const rb = new RequestBuilder(this.rootUrl, EventsConfigControllerService.GetAll9Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageEventsConfig>;
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
  }): Observable<RestApiResponsePageEventsConfig> {

    return this.getAll9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageEventsConfig>) => r.body as RestApiResponsePageEventsConfig)
    );
  }

}
