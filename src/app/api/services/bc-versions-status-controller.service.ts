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

import { BcVersionsStatus } from '../models/bc-versions-status';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcVersionsStatus } from '../models/rest-api-response-bc-versions-status';
import { RestApiResponsePageBcVersionsStatus } from '../models/rest-api-response-page-bc-versions-status';

@Injectable()
export class BcVersionsStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById2
   */
  static readonly DeleteById2Path = '/v1/bc/version-status/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsStatusControllerService.DeleteById2Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById2(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById2$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll9
   */
  static readonly GetAll9Path = '/v1/bc/version-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll9()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll9$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcVersionsStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsStatusControllerService.GetAll9Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcVersionsStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll9(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcVersionsStatus> {

    return this.getAll9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcVersionsStatus>) => r.body as RestApiResponsePageBcVersionsStatus)
    );
  }

  /**
   * Path part for operation update80
   */
  static readonly Update80Path = '/v1/bc/version-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update80()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update80$Response(params: {
    body: BcVersionsStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcVersionsStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsStatusControllerService.Update80Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcVersionsStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update80$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update80(params: {
    body: BcVersionsStatus
  }): Observable<RestApiResponseBcVersionsStatus> {

    return this.update80$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersionsStatus>) => r.body as RestApiResponseBcVersionsStatus)
    );
  }

  /**
   * Path part for operation insertOne1
   */
  static readonly InsertOne1Path = '/v1/bc/version-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne1$Response(params: {
    body: BcVersionsStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcVersionsStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsStatusControllerService.InsertOne1Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcVersionsStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne1(params: {
    body: BcVersionsStatus
  }): Observable<RestApiResponseBcVersionsStatus> {

    return this.insertOne1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersionsStatus>) => r.body as RestApiResponseBcVersionsStatus)
    );
  }

  /**
   * Path part for operation getOne2
   */
  static readonly GetOne2Path = '/v1/bc/version-status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcVersionsStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsStatusControllerService.GetOne2Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcVersionsStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne2(params: {
    id: number;
  }): Observable<RestApiResponseBcVersionsStatus> {

    return this.getOne2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersionsStatus>) => r.body as RestApiResponseBcVersionsStatus)
    );
  }

}
