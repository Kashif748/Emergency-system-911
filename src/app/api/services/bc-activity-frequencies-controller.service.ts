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
   * Path part for operation getAll16
   */
  static readonly GetAll16Path = '/v1/bc/activityFrequency';

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
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.GetAll16Path, 'get');
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
   * To access the full response (for headers, for example), `getAll16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll16(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityFrequencies> {

    return this.getAll16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityFrequencies>) => r.body as RestApiResponsePageBcActivityFrequencies)
    );
  }

  /**
   * Path part for operation update86
   */
  static readonly Update86Path = '/v1/bc/activityFrequency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update86()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86$Response(params: {
    body: BcActivityFrequencies
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.Update86Path, 'put');
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
   * To access the full response (for headers, for example), `update86$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86(params: {
    body: BcActivityFrequencies
  }): Observable<RestApiResponseBcActivityFrequencies> {

    return this.update86$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityFrequencies>) => r.body as RestApiResponseBcActivityFrequencies)
    );
  }

  /**
   * Path part for operation insertOne7
   */
  static readonly InsertOne7Path = '/v1/bc/activityFrequency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne7()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7$Response(params: {
    body: BcActivityFrequencies
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.InsertOne7Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne7$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7(params: {
    body: BcActivityFrequencies
  }): Observable<RestApiResponseBcActivityFrequencies> {

    return this.insertOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityFrequencies>) => r.body as RestApiResponseBcActivityFrequencies)
    );
  }

  /**
   * Path part for operation getOne7
   */
  static readonly GetOne7Path = '/v1/bc/activityFrequency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne7()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityFrequencies>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.GetOne7Path, 'get');
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
   * To access the full response (for headers, for example), `getOne7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne7(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityFrequencies> {

    return this.getOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityFrequencies>) => r.body as RestApiResponseBcActivityFrequencies)
    );
  }

  /**
   * Path part for operation deleteById8
   */
  static readonly DeleteById8Path = '/v1/bc/activityFrequency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById8()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById8$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityFrequenciesControllerService.DeleteById8Path, 'delete');
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
   * To access the full response (for headers, for example), `deleteById8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById8(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById8$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
