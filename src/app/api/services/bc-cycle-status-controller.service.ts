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

import { BcCycleStatus } from '../models/bc-cycle-status';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcCycleStatus } from '../models/rest-api-response-bc-cycle-status';
import { RestApiResponsePageBcCycleStatus } from '../models/rest-api-response-page-bc-cycle-status';

@Injectable()
export class BcCycleStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById14
   */
  static readonly DeleteById14Path = '/v1/bc/cycle-status/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById14()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById14$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcCycleStatusControllerService.DeleteById14Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById14(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById14$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll23
   */
  static readonly GetAll23Path = '/v1/bc/cycle-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll23()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll23$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcCycleStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcCycleStatusControllerService.GetAll23Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcCycleStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll23(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcCycleStatus> {

    return this.getAll23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcCycleStatus>) => r.body as RestApiResponsePageBcCycleStatus)
    );
  }

  /**
   * Path part for operation update94
   */
  static readonly Update94Path = '/v1/bc/cycle-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update94()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update94$Response(params: {
    body: BcCycleStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcCycleStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcCycleStatusControllerService.Update94Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcCycleStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update94$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update94(params: {
    body: BcCycleStatus
  }): Observable<RestApiResponseBcCycleStatus> {

    return this.update94$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycleStatus>) => r.body as RestApiResponseBcCycleStatus)
    );
  }

  /**
   * Path part for operation insertOne14
   */
  static readonly InsertOne14Path = '/v1/bc/cycle-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne14()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne14$Response(params: {
    body: BcCycleStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcCycleStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcCycleStatusControllerService.InsertOne14Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcCycleStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne14$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne14(params: {
    body: BcCycleStatus
  }): Observable<RestApiResponseBcCycleStatus> {

    return this.insertOne14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycleStatus>) => r.body as RestApiResponseBcCycleStatus)
    );
  }

  /**
   * Path part for operation getOne14
   */
  static readonly GetOne14Path = '/v1/bc/cycle-status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne14()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne14$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcCycleStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcCycleStatusControllerService.GetOne14Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcCycleStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne14(params: {
    id: number;
  }): Observable<RestApiResponseBcCycleStatus> {

    return this.getOne14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycleStatus>) => r.body as RestApiResponseBcCycleStatus)
    );
  }

}
