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
import { Pageable } from '../models/pageable';
import { RestApiResponseBcRecoveryPriorities } from '../models/rest-api-response-bc-recovery-priorities';
import { RestApiResponsePageBcRecoveryPriorities } from '../models/rest-api-response-page-bc-recovery-priorities';

@Injectable()
export class BcRecoveryPrioritiesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById4
   */
  static readonly DeleteById4Path = '/v1/bc/loopbackPriority/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById4()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.DeleteById4Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById4(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById4$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll13
   */
  static readonly GetAll13Path = '/v1/bc/loopbackPriority';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll13()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll13$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.GetAll13Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcRecoveryPriorities>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll13(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcRecoveryPriorities> {

    return this.getAll13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcRecoveryPriorities>) => r.body as RestApiResponsePageBcRecoveryPriorities)
    );
  }

  /**
   * Path part for operation update83
   */
  static readonly Update83Path = '/v1/bc/loopbackPriority';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update83()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update83$Response(params: {
    body: BcRecoveryPriorities
  }): Observable<StrictHttpResponse<RestApiResponseBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.Update83Path, 'put');
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
   * To access the full response (for headers, for example), `update83$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update83(params: {
    body: BcRecoveryPriorities
  }): Observable<RestApiResponseBcRecoveryPriorities> {

    return this.update83$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcRecoveryPriorities>) => r.body as RestApiResponseBcRecoveryPriorities)
    );
  }

  /**
   * Path part for operation insertOne4
   */
  static readonly InsertOne4Path = '/v1/bc/loopbackPriority';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne4()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne4$Response(params: {
    body: BcRecoveryPriorities
  }): Observable<StrictHttpResponse<RestApiResponseBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.InsertOne4Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne4$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne4(params: {
    body: BcRecoveryPriorities
  }): Observable<RestApiResponseBcRecoveryPriorities> {

    return this.insertOne4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcRecoveryPriorities>) => r.body as RestApiResponseBcRecoveryPriorities)
    );
  }

  /**
   * Path part for operation getOne4
   */
  static readonly GetOne4Path = '/v1/bc/loopbackPriority/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne4()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.GetOne4Path, 'get');
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
   * To access the full response (for headers, for example), `getOne4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne4(params: {
    id: number;
  }): Observable<RestApiResponseBcRecoveryPriorities> {

    return this.getOne4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcRecoveryPriorities>) => r.body as RestApiResponseBcRecoveryPriorities)
    );
  }

}
