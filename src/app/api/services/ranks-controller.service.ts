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

import { Ranks } from '../models/ranks';
import { RestApiResponseListRanks } from '../models/rest-api-response-list-ranks';
import { RestApiResponseRanks } from '../models/rest-api-response-ranks';

@Injectable()
export class RanksControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActiveList1
   */
  static readonly FindActiveList1Path = '/v1/ranks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActiveList1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveList1$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListRanks>> {

    const rb = new RequestBuilder(this.rootUrl, RanksControllerService.FindActiveList1Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListRanks>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActiveList1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveList1(params?: {
  }): Observable<RestApiResponseListRanks> {

    return this.findActiveList1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListRanks>) => r.body as RestApiResponseListRanks)
    );
  }

  /**
   * Path part for operation update12
   */
  static readonly Update12Path = '/v1/ranks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update12()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update12$Response(params: {
    body: Ranks
  }): Observable<StrictHttpResponse<RestApiResponseRanks>> {

    const rb = new RequestBuilder(this.rootUrl, RanksControllerService.Update12Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseRanks>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update12$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update12(params: {
    body: Ranks
  }): Observable<RestApiResponseRanks> {

    return this.update12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseRanks>) => r.body as RestApiResponseRanks)
    );
  }

  /**
   * Path part for operation create12
   */
  static readonly Create12Path = '/v1/ranks';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create12()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create12$Response(params: {
    body: Ranks
  }): Observable<StrictHttpResponse<RestApiResponseRanks>> {

    const rb = new RequestBuilder(this.rootUrl, RanksControllerService.Create12Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseRanks>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create12$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create12(params: {
    body: Ranks
  }): Observable<RestApiResponseRanks> {

    return this.create12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseRanks>) => r.body as RestApiResponseRanks)
    );
  }

  /**
   * Path part for operation getActiveRanks
   */
  static readonly GetActiveRanksPath = '/v1/ranks/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveRanks()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveRanks$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseRanks>> {

    const rb = new RequestBuilder(this.rootUrl, RanksControllerService.GetActiveRanksPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseRanks>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveRanks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveRanks(params: {
    id: number;
  }): Observable<RestApiResponseRanks> {

    return this.getActiveRanks$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseRanks>) => r.body as RestApiResponseRanks)
    );
  }

}
