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
   * Path part for operation deleteById6
   */
  static readonly DeleteById6Path = '/v1/bc/loopbackPriority/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.DeleteById6Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById6$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll16
   */
  static readonly GetAll16Path = '/v1/bc/loopbackPriority';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll16()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll16$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.GetAll16Path, 'get');
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
   * To access the full response (for headers, for example), `getAll16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll16(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcRecoveryPriorities> {

    return this.getAll16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcRecoveryPriorities>) => r.body as RestApiResponsePageBcRecoveryPriorities)
    );
  }

  /**
   * Path part for operation update86
   */
  static readonly Update86Path = '/v1/bc/loopbackPriority';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update86()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86$Response(params: {
    body: BcRecoveryPriorities
  }): Observable<StrictHttpResponse<RestApiResponseBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.Update86Path, 'put');
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
   * To access the full response (for headers, for example), `update86$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86(params: {
    body: BcRecoveryPriorities
  }): Observable<RestApiResponseBcRecoveryPriorities> {

    return this.update86$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcRecoveryPriorities>) => r.body as RestApiResponseBcRecoveryPriorities)
    );
  }

  /**
   * Path part for operation insertOne7
   */
  static readonly InsertOne7Path = '/v1/bc/loopbackPriority';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne7()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7$Response(params: {
    body: BcRecoveryPriorities
  }): Observable<StrictHttpResponse<RestApiResponseBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.InsertOne7Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne7$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7(params: {
    body: BcRecoveryPriorities
  }): Observable<RestApiResponseBcRecoveryPriorities> {

    return this.insertOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcRecoveryPriorities>) => r.body as RestApiResponseBcRecoveryPriorities)
    );
  }

  /**
   * Path part for operation getOne7
   */
  static readonly GetOne7Path = '/v1/bc/loopbackPriority/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne7()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcRecoveryPriorities>> {

    const rb = new RequestBuilder(this.rootUrl, BcRecoveryPrioritiesControllerService.GetOne7Path, 'get');
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
   * To access the full response (for headers, for example), `getOne7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne7(params: {
    id: number;
  }): Observable<RestApiResponseBcRecoveryPriorities> {

    return this.getOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcRecoveryPriorities>) => r.body as RestApiResponseBcRecoveryPriorities)
    );
  }

}
