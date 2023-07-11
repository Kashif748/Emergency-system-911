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

import { BcActivitySystems } from '../models/bc-activity-systems';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivitySystems } from '../models/rest-api-response-bc-activity-systems';
import { RestApiResponsePageBcActivitySystems } from '../models/rest-api-response-page-bc-activity-systems';

@Injectable()
export class BcActivitySystemsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById17
   */
  static readonly DeleteById17Path = '/v1/bc/activity-systems/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById17()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById17$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.DeleteById17Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById17$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById17(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById17$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll26
   */
  static readonly GetAll26Path = '/v1/bc/activity-systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll26()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll26$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.GetAll26Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('versionId', params.versionId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcActivitySystems>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll26$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll26(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivitySystems> {

    return this.getAll26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivitySystems>) => r.body as RestApiResponsePageBcActivitySystems)
    );
  }

  /**
   * Path part for operation update97
   */
  static readonly Update97Path = '/v1/bc/activity-systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update97()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update97$Response(params: {
    body: BcActivitySystems
  }): Observable<StrictHttpResponse<RestApiResponseBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.Update97Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivitySystems>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update97$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update97(params: {
    body: BcActivitySystems
  }): Observable<RestApiResponseBcActivitySystems> {

    return this.update97$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivitySystems>) => r.body as RestApiResponseBcActivitySystems)
    );
  }

  /**
   * Path part for operation insertOne17
   */
  static readonly InsertOne17Path = '/v1/bc/activity-systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne17()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne17$Response(params: {
    body: BcActivitySystems
  }): Observable<StrictHttpResponse<RestApiResponseBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.InsertOne17Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivitySystems>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne17$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne17(params: {
    body: BcActivitySystems
  }): Observable<RestApiResponseBcActivitySystems> {

    return this.insertOne17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivitySystems>) => r.body as RestApiResponseBcActivitySystems)
    );
  }

  /**
   * Path part for operation getOne17
   */
  static readonly GetOne17Path = '/v1/bc/activity-systems/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne17()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne17$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.GetOne17Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivitySystems>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne17$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne17(params: {
    id: number;
  }): Observable<RestApiResponseBcActivitySystems> {

    return this.getOne17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivitySystems>) => r.body as RestApiResponseBcActivitySystems)
    );
  }

  /**
   * Path part for operation search9
   */
  static readonly Search9Path = '/v1/bc/activity-systems/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search9()` instead.
   *
   * This method doesn't expect any request body.
   */
  search9$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.Search9Path, 'get');
    if (params) {
      rb.query('activityId', params.activityId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('isActive', params.isActive, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcActivitySystems>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search9(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivitySystems> {

    return this.search9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivitySystems>) => r.body as RestApiResponsePageBcActivitySystems)
    );
  }

}
