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
import { RestApiResponseListIdNameProjection } from '../models/rest-api-response-list-id-name-projection';
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
   * Path part for operation update62
   */
  static readonly Update62Path = '/v1/events-config/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update62()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update62$Response(params: {
    id: number;
    body: EventsConfig
  }): Observable<StrictHttpResponse<RestApiResponseEventsConfig>> {

    const rb = new RequestBuilder(this.rootUrl, EventsConfigControllerService.Update62Path, 'put');
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
   * To access the full response (for headers, for example), `update62$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update62(params: {
    id: number;
    body: EventsConfig
  }): Observable<RestApiResponseEventsConfig> {

    return this.update62$Response(params).pipe(
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
   * Path part for operation getAllEventModules
   */
  static readonly GetAllEventModulesPath = '/v1/events-config/modules';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllEventModules()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEventModules$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListIdNameProjection>> {

    const rb = new RequestBuilder(this.rootUrl, EventsConfigControllerService.GetAllEventModulesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIdNameProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllEventModules$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEventModules(params?: {
  }): Observable<RestApiResponseListIdNameProjection> {

    return this.getAllEventModules$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIdNameProjection>) => r.body as RestApiResponseListIdNameProjection)
    );
  }

  /**
   * Path part for operation search6
   */
  static readonly Search6Path = '/v1/events-config';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search6()` instead.
   *
   * This method doesn't expect any request body.
   */
  search6$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageEventsConfig>> {

    const rb = new RequestBuilder(this.rootUrl, EventsConfigControllerService.Search6Path, 'get');
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
   * To access the full response (for headers, for example), `search6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search6(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageEventsConfig> {

    return this.search6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageEventsConfig>) => r.body as RestApiResponsePageEventsConfig)
    );
  }

}
