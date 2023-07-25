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
   * Path part for operation deleteById15
   */
  static readonly DeleteById15Path = '/v1/bc/activityFrequency/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById15()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById15$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.DeleteById15Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById15(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById15$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll24
   */
  static readonly GetAll24Path = '/v1/bc/activityFrequency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll24()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll24$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.GetAll24Path, 'get');
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
   * To access the full response (for headers, for example), `getAll24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll24(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityFrequencies> {

    return this.getAll24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityFrequencies>) => r.body as RestApiResponsePageBcActivityFrequencies)
    );
  }

  /**
   * Path part for operation update95
   */
  static readonly Update95Path = '/v1/bc/activityFrequency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update95()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update95$Response(params: {
    body: BcActivityFrequencies
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.Update95Path, 'put');
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
   * To access the full response (for headers, for example), `update95$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update95(params: {
    body: BcActivityFrequencies
  }): Observable<RestApiResponseBcActivityFrequencies> {

    return this.update95$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityFrequencies>) => r.body as RestApiResponseBcActivityFrequencies)
    );
  }

  /**
   * Path part for operation insertOne15
   */
  static readonly InsertOne15Path = '/v1/bc/activityFrequency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne15()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne15$Response(params: {
    body: BcActivityFrequencies
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.InsertOne15Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne15$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne15(params: {
    body: BcActivityFrequencies
  }): Observable<RestApiResponseBcActivityFrequencies> {

    return this.insertOne15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityFrequencies>) => r.body as RestApiResponseBcActivityFrequencies)
    );
  }

  /**
   * Path part for operation getOne15
   */
  static readonly GetOne15Path = '/v1/bc/activityFrequency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne15()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne15$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.GetOne15Path, 'get');
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
   * To access the full response (for headers, for example), `getOne15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne15(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityFrequencies> {

    return this.getOne15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityFrequencies>) => r.body as RestApiResponseBcActivityFrequencies)
    );
  }

}
