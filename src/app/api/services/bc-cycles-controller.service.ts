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
   * Path part for operation deleteById25
   */
  static readonly DeleteById25Path = '/v1/bc/cycles/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById25()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById25$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcCyclesControllerService.DeleteById25Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById25(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById25$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll20
   */
  static readonly GetAll20Path = '/v1/bc/cycles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll20()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll20$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcCycles>> {

    const rb = new RequestBuilder(this.rootUrl, BcCyclesControllerService.GetAll20Path, 'get');
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
   * To access the full response (for headers, for example), `getAll20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll20(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcCycles> {

    return this.getAll20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcCycles>) => r.body as RestApiResponsePageBcCycles)
    );
  }

  /**
   * Path part for operation update104
   */
  static readonly Update104Path = '/v1/bc/cycles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update104()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update104$Response(params: {
    body: BcCycles
  }): Observable<StrictHttpResponse<RestApiResponseBcCycles>> {

    const rb = new RequestBuilder(this.rootUrl, BcCyclesControllerService.Update104Path, 'put');
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
   * To access the full response (for headers, for example), `update104$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update104(params: {
    body: BcCycles
  }): Observable<RestApiResponseBcCycles> {

    return this.update104$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycles>) => r.body as RestApiResponseBcCycles)
    );
  }

  /**
   * Path part for operation insertOne24
   */
  static readonly InsertOne24Path = '/v1/bc/cycles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne24()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne24$Response(params: {
    body: BcCycles
  }): Observable<StrictHttpResponse<RestApiResponseBcCycles>> {

    const rb = new RequestBuilder(this.rootUrl, BcCyclesControllerService.InsertOne24Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne24$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne24(params: {
    body: BcCycles
  }): Observable<RestApiResponseBcCycles> {

    return this.insertOne24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycles>) => r.body as RestApiResponseBcCycles)
    );
  }

  /**
   * Path part for operation getOne24
   */
  static readonly GetOne24Path = '/v1/bc/cycles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne24()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne24$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcCycles>> {

    const rb = new RequestBuilder(this.rootUrl, BcCyclesControllerService.GetOne24Path, 'get');
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
   * To access the full response (for headers, for example), `getOne24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne24(params: {
    id: number;
  }): Observable<RestApiResponseBcCycles> {

    return this.getOne24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcCycles>) => r.body as RestApiResponseBcCycles)
    );
  }

}
