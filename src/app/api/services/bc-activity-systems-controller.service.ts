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
import { RestApiResponseSetLong } from '../models/rest-api-response-set-long';

@Injectable()
export class BcActivitySystemsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById31
   */
  static readonly DeleteById31Path = '/v1/bc/activity-systems/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById31()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById31$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.DeleteById31Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById31$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById31(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById31$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll26
   */
  static readonly GetAll26Path = '/v1/bc/activity-systems';

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
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.GetAll26Path, 'get');
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
  }): Observable<RestApiResponsePageBcActivitySystems> {

    return this.getAll26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivitySystems>) => r.body as RestApiResponsePageBcActivitySystems)
    );
  }

  /**
   * Path part for operation update110
   */
  static readonly Update110Path = '/v1/bc/activity-systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update110()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update110$Response(params: {
    body: BcActivitySystems
  }): Observable<StrictHttpResponse<RestApiResponseBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.Update110Path, 'put');
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
   * To access the full response (for headers, for example), `update110$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update110(params: {
    body: BcActivitySystems
  }): Observable<RestApiResponseBcActivitySystems> {

    return this.update110$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivitySystems>) => r.body as RestApiResponseBcActivitySystems)
    );
  }

  /**
   * Path part for operation insertOne30
   */
  static readonly InsertOne30Path = '/v1/bc/activity-systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne30()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne30$Response(params: {
    body: BcActivitySystems
  }): Observable<StrictHttpResponse<RestApiResponseBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.InsertOne30Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne30$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne30(params: {
    body: BcActivitySystems
  }): Observable<RestApiResponseBcActivitySystems> {

    return this.insertOne30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivitySystems>) => r.body as RestApiResponseBcActivitySystems)
    );
  }

  /**
   * Path part for operation getOne30
   */
  static readonly GetOne30Path = '/v1/bc/activity-systems/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne30()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne30$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.GetOne30Path, 'get');
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
   * To access the full response (for headers, for example), `getOne30$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne30(params: {
    id: number;
  }): Observable<RestApiResponseBcActivitySystems> {

    return this.getOne30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivitySystems>) => r.body as RestApiResponseBcActivitySystems)
    );
  }

  /**
   * Path part for operation search21
   */
  static readonly Search21Path = '/v1/bc/activity-systems/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search21()` instead.
   *
   * This method doesn't expect any request body.
   */
  search21$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivitySystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.Search21Path, 'get');
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
   * To access the full response (for headers, for example), `search21$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search21(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivitySystems> {

    return this.search21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivitySystems>) => r.body as RestApiResponsePageBcActivitySystems)
    );
  }

  /**
   * Path part for operation list8
   */
  static readonly List8Path = '/v1/bc/activity-systems/list-ids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list8()` instead.
   *
   * This method doesn't expect any request body.
   */
  list8$Response(params: {
    cycleId: number;
    activityId: number;
  }): Observable<StrictHttpResponse<RestApiResponseSetLong>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitySystemsControllerService.List8Path, 'get');
    if (params) {
      rb.query('cycleId', params.cycleId, {});
      rb.query('activityId', params.activityId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSetLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list8(params: {
    cycleId: number;
    activityId: number;
  }): Observable<RestApiResponseSetLong> {

    return this.list8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSetLong>) => r.body as RestApiResponseSetLong)
    );
  }

}
