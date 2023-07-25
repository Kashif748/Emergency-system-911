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

import { BcActivityDependencyExternal } from '../models/bc-activity-dependency-external';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivityDependencyExternal } from '../models/rest-api-response-bc-activity-dependency-external';
import { RestApiResponsePageBcActivityDependencyExternal } from '../models/rest-api-response-page-bc-activity-dependency-external';

@Injectable()
export class BcActivityDependencyExternalControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById18
   */
  static readonly DeleteById18Path = '/v1/bc/activity/external-dependency/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById18()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById18$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.DeleteById18Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById18(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById18$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll27
   */
  static readonly GetAll27Path = '/v1/bc/activity/external-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll27()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll27$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.GetAll27Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll27$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll27(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyExternal> {

    return this.getAll27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>) => r.body as RestApiResponsePageBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation update98
   */
  static readonly Update98Path = '/v1/bc/activity/external-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update98()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update98$Response(params: {
    body: BcActivityDependencyExternal
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.Update98Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update98$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update98(params: {
    body: BcActivityDependencyExternal
  }): Observable<RestApiResponseBcActivityDependencyExternal> {

    return this.update98$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>) => r.body as RestApiResponseBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation insertOne18
   */
  static readonly InsertOne18Path = '/v1/bc/activity/external-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne18()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne18$Response(params: {
    body: BcActivityDependencyExternal
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.InsertOne18Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne18$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne18(params: {
    body: BcActivityDependencyExternal
  }): Observable<RestApiResponseBcActivityDependencyExternal> {

    return this.insertOne18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>) => r.body as RestApiResponseBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation getOne18
   */
  static readonly GetOne18Path = '/v1/bc/activity/external-dependency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne18()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne18$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.GetOne18Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne18(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityDependencyExternal> {

    return this.getOne18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>) => r.body as RestApiResponseBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation search11
   */
  static readonly Search11Path = '/v1/bc/activity/external-dependency/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search11()` instead.
   *
   * This method doesn't expect any request body.
   */
  search11$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.Search11Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search11(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyExternal> {

    return this.search11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>) => r.body as RestApiResponsePageBcActivityDependencyExternal)
    );
  }

}
