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

import { Bcrto } from '../models/bcrto';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcrto } from '../models/rest-api-response-bcrto';
import { RestApiResponsePageBcrto } from '../models/rest-api-response-page-bcrto';

@Injectable()
export class BcrtoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById4
   */
  static readonly DeleteById4Path = '/v1/bc/rto/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById4()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcrtoControllerService.DeleteById4Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById4(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById4$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll13
   */
  static readonly GetAll13Path = '/v1/bc/rto';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll13()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll13$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcrto>> {

    const rb = new RequestBuilder(this.rootUrl, BcrtoControllerService.GetAll13Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcrto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll13(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcrto> {

    return this.getAll13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcrto>) => r.body as RestApiResponsePageBcrto)
    );
  }

  /**
   * Path part for operation update83
   */
  static readonly Update83Path = '/v1/bc/rto';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update83()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update83$Response(params: {
    body: Bcrto
  }): Observable<StrictHttpResponse<RestApiResponseBcrto>> {

    const rb = new RequestBuilder(this.rootUrl, BcrtoControllerService.Update83Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcrto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update83$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update83(params: {
    body: Bcrto
  }): Observable<RestApiResponseBcrto> {

    return this.update83$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcrto>) => r.body as RestApiResponseBcrto)
    );
  }

  /**
   * Path part for operation insertOne4
   */
  static readonly InsertOne4Path = '/v1/bc/rto';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne4()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne4$Response(params: {
    body: Bcrto
  }): Observable<StrictHttpResponse<RestApiResponseBcrto>> {

    const rb = new RequestBuilder(this.rootUrl, BcrtoControllerService.InsertOne4Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcrto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne4$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne4(params: {
    body: Bcrto
  }): Observable<RestApiResponseBcrto> {

    return this.insertOne4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcrto>) => r.body as RestApiResponseBcrto)
    );
  }

  /**
   * Path part for operation getOne4
   */
  static readonly GetOne4Path = '/v1/bc/rto/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne4()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcrto>> {

    const rb = new RequestBuilder(this.rootUrl, BcrtoControllerService.GetOne4Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcrto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne4(params: {
    id: number;
  }): Observable<RestApiResponseBcrto> {

    return this.getOne4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcrto>) => r.body as RestApiResponseBcrto)
    );
  }

}
