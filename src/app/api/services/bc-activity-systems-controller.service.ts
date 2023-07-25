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
   * Path part for operation deleteById19
   */
  static readonly DeleteById19Path = '/v1/bc/activity-systems/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById19()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById19$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.DeleteById19Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById19(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById19$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll28
   */
  static readonly GetAll28Path = '/v1/bc/activity-systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll28()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll28$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.GetAll28Path, 'get');
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
   * To access the full response (for headers, for example), `getAll28$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll28(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivitySystems> {

    return this.getAll28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivitySystems>) => r.body as RestApiResponsePageBcActivitySystems)
    );
  }

  /**
   * Path part for operation update99
   */
  static readonly Update99Path = '/v1/bc/activity-systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update99()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update99$Response(params: {
    body: BcActivitySystems
  }): Observable<StrictHttpResponse<RestApiResponseBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.Update99Path, 'put');
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
   * To access the full response (for headers, for example), `update99$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update99(params: {
    body: BcActivitySystems
  }): Observable<RestApiResponseBcActivitySystems> {

    return this.update99$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivitySystems>) => r.body as RestApiResponseBcActivitySystems)
    );
  }

  /**
   * Path part for operation insertOne19
   */
  static readonly InsertOne19Path = '/v1/bc/activity-systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne19()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne19$Response(params: {
    body: BcActivitySystems
  }): Observable<StrictHttpResponse<RestApiResponseBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.InsertOne19Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne19$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne19(params: {
    body: BcActivitySystems
  }): Observable<RestApiResponseBcActivitySystems> {

    return this.insertOne19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivitySystems>) => r.body as RestApiResponseBcActivitySystems)
    );
  }

  /**
   * Path part for operation getOne19
   */
  static readonly GetOne19Path = '/v1/bc/activity-systems/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne19()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne19$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.GetOne19Path, 'get');
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
   * To access the full response (for headers, for example), `getOne19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne19(params: {
    id: number;
  }): Observable<RestApiResponseBcActivitySystems> {

    return this.getOne19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivitySystems>) => r.body as RestApiResponseBcActivitySystems)
    );
  }

  /**
   * Path part for operation search12
   */
  static readonly Search12Path = '/v1/bc/activity-systems/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search12()` instead.
   *
   * This method doesn't expect any request body.
   */
  search12$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.Search12Path, 'get');
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
   * To access the full response (for headers, for example), `search12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search12(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivitySystems> {

    return this.search12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivitySystems>) => r.body as RestApiResponsePageBcActivitySystems)
    );
  }

}
