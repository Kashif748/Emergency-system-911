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

import { BcRecoveryPriorities } from '../models/bc-recovery-priorities';
import { RestApiResponseBcRecoveryPriorities } from '../models/rest-api-response-bc-recovery-priorities';
import { RestApiResponseListBcRecoveryPriorities } from '../models/rest-api-response-list-bc-recovery-priorities';

@Injectable()
export class BcRecoveryPrioritiesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll11
   */
  static readonly GetAll11Path = '/v1/bc/loopbackPriority';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll11()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll11$Response(params?: {
    isActive?: boolean;
    versionId?: number;
  }): Observable<StrictHttpResponse<RestApiResponseListBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.GetAll11Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('versionId', params.versionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBcRecoveryPriorities>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll11(params?: {
    isActive?: boolean;
    versionId?: number;
  }): Observable<RestApiResponseListBcRecoveryPriorities> {

    return this.getAll11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcRecoveryPriorities>) => r.body as RestApiResponseListBcRecoveryPriorities)
    );
  }

  /**
   * Path part for operation update81
   */
  static readonly Update81Path = '/v1/bc/loopbackPriority';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update81()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update81$Response(params: {
    body: BcRecoveryPriorities
  }): Observable<StrictHttpResponse<RestApiResponseBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.Update81Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcRecoveryPriorities>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update81$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update81(params: {
    body: BcRecoveryPriorities
  }): Observable<RestApiResponseBcRecoveryPriorities> {

    return this.update81$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcRecoveryPriorities>) => r.body as RestApiResponseBcRecoveryPriorities)
    );
  }

  /**
   * Path part for operation insertOne2
   */
  static readonly InsertOne2Path = '/v1/bc/loopbackPriority';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne2$Response(params: {
    body: BcRecoveryPriorities
  }): Observable<StrictHttpResponse<RestApiResponseBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.InsertOne2Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcRecoveryPriorities>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne2(params: {
    body: BcRecoveryPriorities
  }): Observable<RestApiResponseBcRecoveryPriorities> {

    return this.insertOne2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcRecoveryPriorities>) => r.body as RestApiResponseBcRecoveryPriorities)
    );
  }

  /**
   * Path part for operation getOne2
   */
  static readonly GetOne2Path = '/v1/bc/loopbackPriority/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.GetOne2Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcRecoveryPriorities>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne2(params: {
    id: number;
  }): Observable<RestApiResponseBcRecoveryPriorities> {

    return this.getOne2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcRecoveryPriorities>) => r.body as RestApiResponseBcRecoveryPriorities)
    );
  }

  /**
   * Path part for operation deleteById3
   */
  static readonly DeleteById3Path = '/v1/bc/loopbackPriority/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById3()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.DeleteById3Path, 'delete');
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
   * To access the full response (for headers, for example), `deleteById3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById3(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById3$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
