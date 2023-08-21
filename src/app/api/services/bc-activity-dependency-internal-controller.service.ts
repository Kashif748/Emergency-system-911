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
   * Path part for operation deleteById19
   */
  static readonly DeleteById19Path = '/v1/bc/activity/internal-dependency/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById19()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById19$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.DeleteById19Path, 'put');
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
   * Path part for operation getAll25
   */
  static readonly GetAll25Path = '/v1/bc/activity/internal-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll25()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll25$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyInternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.GetAll25Path, 'get');
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
   * To access the full response (for headers, for example), `getAll25$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll25(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyInternal> {

    return this.getAll25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyInternal>) => r.body as RestApiResponsePageBcActivityDependencyInternal)
    );
  }

  /**
   * Path part for operation update99
   */
  static readonly Update99Path = '/v1/bc/activity/internal-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update99()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update99$Response(params: {
    body: BcActivityDependencyInternal
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.Update99Path, 'put');
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
   * To access the full response (for headers, for example), `update99$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update99(params: {
    body: BcActivityDependencyInternal
  }): Observable<RestApiResponseBcActivityDependencyInternal> {

    return this.update99$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>) => r.body as RestApiResponseBcActivityDependencyInternal)
    );
  }

  /**
   * Path part for operation insertOne19
   */
  static readonly InsertOne19Path = '/v1/bc/activity/internal-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne19()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne19$Response(params: {
    body: BcActivityDependencyInternal
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.InsertOne19Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne19$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne19(params: {
    body: BcActivityDependencyInternal
  }): Observable<RestApiResponseBcActivityDependencyInternal> {

    return this.insertOne19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>) => r.body as RestApiResponseBcActivityDependencyInternal)
    );
  }

  /**
   * Path part for operation getOne19
   */
  static readonly GetOne19Path = '/v1/bc/activity/internal-dependency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne19()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne19$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.GetOne19Path, 'get');
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
   * To access the full response (for headers, for example), `getOne19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne19(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityDependencyInternal> {

    return this.getOne19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyInternal>) => r.body as RestApiResponseBcActivityDependencyInternal)
    );
  }

  /**
   * Path part for operation search13
   */
  static readonly Search13Path = '/v1/bc/activity/internal-dependency/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search13()` instead.
   *
   * This method doesn't expect any request body.
   */
  search13$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyInternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyInternalControllerService.Search13Path, 'get');
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
   * To access the full response (for headers, for example), `search13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search13(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyInternal> {

    return this.search13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyInternal>) => r.body as RestApiResponsePageBcActivityDependencyInternal)
    );
  }

}
