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
   * Path part for operation deleteById16
   */
  static readonly DeleteById16Path = '/v1/bc/activity/vendor-dependency/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById16()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById16$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.DeleteById16Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById16(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById16$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll24
   */
  static readonly GetAll24Path = '/v1/bc/activity/vendor-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll24()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll24$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.GetAll24Path, 'get');
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
   * To access the full response (for headers, for example), `getAll24$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll24(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyExternal> {

    return this.getAll24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>) => r.body as RestApiResponsePageBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation update96
   */
  static readonly Update96Path = '/v1/bc/activity/vendor-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update96()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update96$Response(params: {
    body: BcActivityDependencyExternal
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.Update96Path, 'put');
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
   * To access the full response (for headers, for example), `update96$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update96(params: {
    body: BcActivityDependencyExternal
  }): Observable<RestApiResponseBcActivityDependencyExternal> {

    return this.update96$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>) => r.body as RestApiResponseBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation insertOne16
   */
  static readonly InsertOne16Path = '/v1/bc/activity/vendor-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne16()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne16$Response(params: {
    body: BcActivityDependencyExternal
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.InsertOne16Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne16$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne16(params: {
    body: BcActivityDependencyExternal
  }): Observable<RestApiResponseBcActivityDependencyExternal> {

    return this.insertOne16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>) => r.body as RestApiResponseBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation getOne16
   */
  static readonly GetOne16Path = '/v1/bc/activity/vendor-dependency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne16()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne16$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.GetOne16Path, 'get');
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
   * To access the full response (for headers, for example), `getOne16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne16(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityDependencyExternal> {

    return this.getOne16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>) => r.body as RestApiResponseBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation search10
   */
  static readonly Search10Path = '/v1/bc/activity/vendor-dependency/search';

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
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.Search10Path, 'get');
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
  }): Observable<RestApiResponsePageBcActivityDependencyExternal> {

    return this.search10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>) => r.body as RestApiResponsePageBcActivityDependencyExternal)
    );
  }

}
