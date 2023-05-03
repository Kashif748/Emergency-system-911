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
import { RestApiResponseBcrto } from '../models/rest-api-response-bcrto';
import { RestApiResponseListBcrto } from '../models/rest-api-response-list-bcrto';

@Injectable()
export class BcrtoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll10
   */
  static readonly GetAll10Path = '/v1/bia/rto';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll10()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll10$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListBcrto>> {

    const rb = new RequestBuilder(this.rootUrl, BcrtoControllerService.GetAll10Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBcrto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll10(params?: {
  }): Observable<RestApiResponseListBcrto> {

    return this.getAll10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcrto>) => r.body as RestApiResponseListBcrto)
    );
  }

  /**
   * Path part for operation update80
   */
  static readonly Update80Path = '/v1/bia/rto';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update80()` instead.
   *
   * This method doesn't expect any request body.
   */
  update80$Response(params: {
    bCRTO: Bcrto;
  }): Observable<StrictHttpResponse<RestApiResponseBcrto>> {

    const rb = new RequestBuilder(this.rootUrl, BcrtoControllerService.Update80Path, 'put');
    if (params) {
      rb.query('bCRTO', params.bCRTO, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcrto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update80$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  update80(params: {
    bCRTO: Bcrto;
  }): Observable<RestApiResponseBcrto> {

    return this.update80$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcrto>) => r.body as RestApiResponseBcrto)
    );
  }

  /**
   * Path part for operation insertOne1
   */
  static readonly InsertOne1Path = '/v1/bia/rto';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne1()` instead.
   *
   * This method doesn't expect any request body.
   */
  insertOne1$Response(params: {
    bCRTO: Bcrto;
  }): Observable<StrictHttpResponse<RestApiResponseBcrto>> {

    const rb = new RequestBuilder(this.rootUrl, BcrtoControllerService.InsertOne1Path, 'post');
    if (params) {
      rb.query('bCRTO', params.bCRTO, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcrto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  insertOne1(params: {
    bCRTO: Bcrto;
  }): Observable<RestApiResponseBcrto> {

    return this.insertOne1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcrto>) => r.body as RestApiResponseBcrto)
    );
  }

  /**
   * Path part for operation getOne1
   */
  static readonly GetOne1Path = '/v1/bia/rto/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcrto>> {

    const rb = new RequestBuilder(this.rootUrl, BcrtoControllerService.GetOne1Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcrto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne1(params: {
    id: number;
  }): Observable<RestApiResponseBcrto> {

    return this.getOne1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcrto>) => r.body as RestApiResponseBcrto)
    );
  }

  /**
   * Path part for operation deleteById1
   */
  static readonly DeleteById1Path = '/v1/bia/rto/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcrtoControllerService.DeleteById1Path, 'delete');
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
   * To access the full response (for headers, for example), `deleteById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById1(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById1$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
