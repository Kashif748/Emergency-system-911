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

import { BcCycles } from '../models/bc-cycles';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcCycles } from '../models/rest-api-response-bc-cycles';
import { RestApiResponsePageBcCycles } from '../models/rest-api-response-page-bc-cycles';

@Injectable()
export class BcCyclesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById13
   */
  static readonly DeleteById13Path = '/v1/bc/cycles/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById13()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById13$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcCyclesControllerService.DeleteById13Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById13(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById13$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll22
   */
  static readonly GetAll22Path = '/v1/bc/cycles';

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
  }): Observable<StrictHttpResponse<RestApiResponsePageBcCycles>> {

    const rb = new RequestBuilder(this.rootUrl, BcCyclesControllerService.GetAll22Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcCycles>;
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
  }): Observable<RestApiResponsePageBcCycles> {

    return this.getAll22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcCycles>) => r.body as RestApiResponsePageBcCycles)
    );
  }

  /**
   * Path part for operation update93
   */
  static readonly Update93Path = '/v1/bc/cycles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update93()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update93$Response(params: {
    body: BcCycles
  }): Observable<StrictHttpResponse<RestApiResponseBcCycles>> {

    const rb = new RequestBuilder(this.rootUrl, BcCyclesControllerService.Update93Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcCycles>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update93$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update93(params: {
    body: BcCycles
  }): Observable<RestApiResponseBcCycles> {

    return this.update93$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycles>) => r.body as RestApiResponseBcCycles)
    );
  }

  /**
   * Path part for operation insertOne13
   */
  static readonly InsertOne13Path = '/v1/bc/cycles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne13()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne13$Response(params: {
    body: BcCycles
  }): Observable<StrictHttpResponse<RestApiResponseBcCycles>> {

    const rb = new RequestBuilder(this.rootUrl, BcCyclesControllerService.InsertOne13Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcCycles>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne13$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne13(params: {
    body: BcCycles
  }): Observable<RestApiResponseBcCycles> {

    return this.insertOne13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycles>) => r.body as RestApiResponseBcCycles)
    );
  }

  /**
   * Path part for operation getOne13
   */
  static readonly GetOne13Path = '/v1/bc/cycles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne13()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne13$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcCycles>> {

    const rb = new RequestBuilder(this.rootUrl, BcCyclesControllerService.GetOne13Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcCycles>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne13(params: {
    id: number;
  }): Observable<RestApiResponseBcCycles> {

    return this.getOne13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycles>) => r.body as RestApiResponseBcCycles)
    );
  }

}
