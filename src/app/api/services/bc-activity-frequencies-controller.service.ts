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

import { BcActivityFrequencies } from '../models/bc-activity-frequencies';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivityFrequencies } from '../models/rest-api-response-bc-activity-frequencies';
import { RestApiResponsePageBcActivityFrequencies } from '../models/rest-api-response-page-bc-activity-frequencies';

@Injectable()
export class BcActivityFrequenciesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById10
   */
  static readonly DeleteById10Path = '/v1/bc/activityFrequency/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById10()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById10$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.DeleteById10Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById10(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById10$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll18
   */
  static readonly GetAll18Path = '/v1/bc/activityFrequency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll18()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll18$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.GetAll18Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityFrequencies>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll18(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityFrequencies> {

    return this.getAll18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityFrequencies>) => r.body as RestApiResponsePageBcActivityFrequencies)
    );
  }

  /**
   * Path part for operation update89
   */
  static readonly Update89Path = '/v1/bc/activityFrequency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update89()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update89$Response(params: {
    body: BcActivityFrequencies
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.Update89Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityFrequencies>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update89$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update89(params: {
    body: BcActivityFrequencies
  }): Observable<RestApiResponseBcActivityFrequencies> {

    return this.update89$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityFrequencies>) => r.body as RestApiResponseBcActivityFrequencies)
    );
  }

  /**
   * Path part for operation insertOne9
   */
  static readonly InsertOne9Path = '/v1/bc/activityFrequency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne9()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne9$Response(params: {
    body: BcActivityFrequencies
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.InsertOne9Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityFrequencies>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne9$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne9(params: {
    body: BcActivityFrequencies
  }): Observable<RestApiResponseBcActivityFrequencies> {

    return this.insertOne9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityFrequencies>) => r.body as RestApiResponseBcActivityFrequencies)
    );
  }

  /**
   * Path part for operation getOne9
   */
  static readonly GetOne9Path = '/v1/bc/activityFrequency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne9()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne9$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.GetOne9Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityFrequencies>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne9(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityFrequencies> {

    return this.getOne9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityFrequencies>) => r.body as RestApiResponseBcActivityFrequencies)
    );
  }

}
