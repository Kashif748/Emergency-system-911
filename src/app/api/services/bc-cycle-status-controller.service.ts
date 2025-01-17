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
   * Path part for operation deleteById26
   */
  static readonly DeleteById26Path = '/v1/bc/cycle-status/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById26()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById26$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcCycleStatusControllerService.DeleteById26Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById26$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById26(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById26$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll22
   */
  static readonly GetAll22Path = '/v1/bc/cycle-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll22()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll22$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcCycleStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcCycleStatusControllerService.GetAll22Path, 'get');
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
   * To access the full response (for headers, for example), `getAll22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll22(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcCycleStatus> {

    return this.getAll22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcCycleStatus>) => r.body as RestApiResponsePageBcCycleStatus)
    );
  }

  /**
   * Path part for operation update107
   */
  static readonly Update107Path = '/v1/bc/cycle-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update107()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update107$Response(params: {
    body: BcCycleStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcCycleStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcCycleStatusControllerService.Update107Path, 'put');
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
   * To access the full response (for headers, for example), `update107$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update107(params: {
    body: BcCycleStatus
  }): Observable<RestApiResponseBcCycleStatus> {

    return this.update107$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycleStatus>) => r.body as RestApiResponseBcCycleStatus)
    );
  }

  /**
   * Path part for operation insertOne25
   */
  static readonly InsertOne25Path = '/v1/bc/cycle-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne25()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne25$Response(params: {
    body: BcCycleStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcCycleStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcCycleStatusControllerService.InsertOne25Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne25$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne25(params: {
    body: BcCycleStatus
  }): Observable<RestApiResponseBcCycleStatus> {

    return this.insertOne25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycleStatus>) => r.body as RestApiResponseBcCycleStatus)
    );
  }

  /**
   * Path part for operation getOne25
   */
  static readonly GetOne25Path = '/v1/bc/cycle-status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne25()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne25$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcCycleStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcCycleStatusControllerService.GetOne25Path, 'get');
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
   * To access the full response (for headers, for example), `getOne25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne25(params: {
    id: number;
  }): Observable<RestApiResponseBcCycleStatus> {

    return this.getOne25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycleStatus>) => r.body as RestApiResponseBcCycleStatus)
    );
  }

}
