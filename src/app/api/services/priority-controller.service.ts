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
import { Priority } from '../models/priority';
import { RestApiResponsePagePriorityProjection } from '../models/rest-api-response-page-priority-projection';
import { RestApiResponsePriorityProjection } from '../models/rest-api-response-priority-projection';

@Injectable()
export class PriorityControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage2
   */
  static readonly FindActivePage2Path = '/v1/priorities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage2$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePagePriorityProjection>> {

    const rb = new RequestBuilder(this.rootUrl, PriorityControllerService.FindActivePage2Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePagePriorityProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage2(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePagePriorityProjection> {

    return this.findActivePage2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePagePriorityProjection>) => r.body as RestApiResponsePagePriorityProjection)
    );
  }

  /**
   * Path part for operation update15
   */
  static readonly Update15Path = '/v1/priorities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update15()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update15$Response(params: {
    body: Priority
  }): Observable<StrictHttpResponse<RestApiResponsePriorityProjection>> {

    const rb = new RequestBuilder(this.rootUrl, PriorityControllerService.Update15Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePriorityProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update15$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update15(params: {
    body: Priority
  }): Observable<RestApiResponsePriorityProjection> {

    return this.update15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePriorityProjection>) => r.body as RestApiResponsePriorityProjection)
    );
  }

  /**
   * Path part for operation create15
   */
  static readonly Create15Path = '/v1/priorities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create15()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create15$Response(params: {
    body: Priority
  }): Observable<StrictHttpResponse<RestApiResponsePriorityProjection>> {

    const rb = new RequestBuilder(this.rootUrl, PriorityControllerService.Create15Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePriorityProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create15$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create15(params: {
    body: Priority
  }): Observable<RestApiResponsePriorityProjection> {

    return this.create15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePriorityProjection>) => r.body as RestApiResponsePriorityProjection)
    );
  }

  /**
   * Path part for operation getActivePriority
   */
  static readonly GetActivePriorityPath = '/v1/priorities/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActivePriority()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivePriority$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponsePriorityProjection>> {

    const rb = new RequestBuilder(this.rootUrl, PriorityControllerService.GetActivePriorityPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePriorityProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActivePriority$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivePriority(params: {
    id: number;
  }): Observable<RestApiResponsePriorityProjection> {

    return this.getActivePriority$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePriorityProjection>) => r.body as RestApiResponsePriorityProjection)
    );
  }

}
