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
   * Path part for operation deleteById1
   */
  static readonly DeleteById1Path = '/v1/bc/version-status/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsStatusControllerService.DeleteById1Path, 'put');
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
   * Path part for operation update79
   */
  static readonly Update79Path = '/v1/bc/version-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update79()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update79$Response(params: {
    body: BcVersionsStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcVersionsStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsStatusControllerService.Update79Path, 'put');
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
   * To access the full response (for headers, for example), `update79$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update79(params: {
    body: BcVersionsStatus
  }): Observable<RestApiResponseBcVersionsStatus> {

    return this.update79$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersionsStatus>) => r.body as RestApiResponseBcVersionsStatus)
    );
  }

  /**
   * Path part for operation insertOne
   */
  static readonly InsertOnePath = '/v1/bc/version-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne$Response(params: {
    body: BcVersionsStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcVersionsStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsStatusControllerService.InsertOnePath, 'post');
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
   * To access the full response (for headers, for example), `insertOne$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne(params: {
    body: BcVersionsStatus
  }): Observable<RestApiResponseBcVersionsStatus> {

    return this.insertOne$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersionsStatus>) => r.body as RestApiResponseBcVersionsStatus)
    );
  }

  /**
   * Path part for operation getOne1
   */
  static readonly GetOne1Path = '/v1/bc/version-status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcVersionsStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsStatusControllerService.GetOne1Path, 'get');
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
   * To access the full response (for headers, for example), `getOne1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne1(params: {
    id: number;
  }): Observable<RestApiResponseBcVersionsStatus> {

    return this.getOne1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersionsStatus>) => r.body as RestApiResponseBcVersionsStatus)
    );
  }

}
