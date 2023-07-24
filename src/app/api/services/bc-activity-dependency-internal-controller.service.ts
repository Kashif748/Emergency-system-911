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

import { BcActivityDependencyInternal } from '../models/bc-activity-dependency-internal';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivityDependencyInternal } from '../models/rest-api-response-bc-activity-dependency-internal';
import { RestApiResponsePageBcActivityDependencyInternal } from '../models/rest-api-response-page-bc-activity-dependency-internal';

@Injectable()
export class BcActivityDependencyInternalControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById17
   */
  static readonly DeleteById17Path = '/v1/bc/activity/internal-dependency/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById17()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById17$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.DeleteById17Path, 'put');
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
  static readonly GetAll26Path = '/v1/bc/activity/internal-dependency';

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
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyInternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.GetAll26Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityDependencyInternal>;
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
  }): Observable<RestApiResponsePageBcActivityDependencyInternal> {

    return this.getAll26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyInternal>) => r.body as RestApiResponsePageBcActivityDependencyInternal)
    );
  }

  /**
   * Path part for operation update97
   */
  static readonly Update97Path = '/v1/bc/activity/internal-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update97()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update97$Response(params: {
    body: BcActivityDependencyInternal
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.Update97Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>;
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
    body: BcActivityDependencyInternal
  }): Observable<RestApiResponseBcActivityDependencyInternal> {

    return this.update97$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>) => r.body as RestApiResponseBcActivityDependencyInternal)
    );
  }

  /**
   * Path part for operation insertOne17
   */
  static readonly InsertOne17Path = '/v1/bc/activity/internal-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne17()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne17$Response(params: {
    body: BcActivityDependencyInternal
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.InsertOne17Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>;
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
    body: BcActivityDependencyInternal
  }): Observable<RestApiResponseBcActivityDependencyInternal> {

    return this.insertOne17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>) => r.body as RestApiResponseBcActivityDependencyInternal)
    );
  }

  /**
   * Path part for operation getOne17
   */
  static readonly GetOne17Path = '/v1/bc/activity/internal-dependency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne17()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne17$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.GetOne17Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>;
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
  }): Observable<RestApiResponseBcActivityDependencyInternal> {

    return this.getOne17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>) => r.body as RestApiResponseBcActivityDependencyInternal)
    );
  }

  /**
   * Path part for operation search10
   */
  static readonly Search10Path = '/v1/bc/activity/internal-dependency/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search10()` instead.
   *
   * This method doesn't expect any request body.
   */
  search10$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyInternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.Search10Path, 'get');
    if (params) {
      rb.query('activityId', params.activityId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('isActive', params.isActive, {});
      rb.query('isFound', params.isFound, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcActivityDependencyInternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search10(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyInternal> {

    return this.search10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyInternal>) => r.body as RestApiResponsePageBcActivityDependencyInternal)
    );
  }

}
