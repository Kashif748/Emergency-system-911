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

import { BcOrgHirType } from '../models/bc-org-hir-type';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcOrgHirType } from '../models/rest-api-response-bc-org-hir-type';
import { RestApiResponsePageBcOrgHirType } from '../models/rest-api-response-page-bc-org-hir-type';

@Injectable()
export class BcOrgHirTypeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById3
   */
  static readonly DeleteById3Path = '/v1/bc/org-hir-type/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById3()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHirTypeControllerService.DeleteById3Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById3(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById3$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll11
   */
  static readonly GetAll11Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll11()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll11$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcOrgHirType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHirTypeControllerService.GetAll11Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcOrgHirType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll11(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcOrgHirType> {

    return this.getAll11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcOrgHirType>) => r.body as RestApiResponsePageBcOrgHirType)
    );
  }

  /**
   * Path part for operation update81
   */
  static readonly Update81Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update81()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update81$Response(params: {
    body: BcOrgHirType
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHirType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHirTypeControllerService.Update81Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHirType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update81$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update81(params: {
    body: BcOrgHirType
  }): Observable<RestApiResponseBcOrgHirType> {

    return this.update81$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHirType>) => r.body as RestApiResponseBcOrgHirType)
    );
  }

  /**
   * Path part for operation insertOne2
   */
  static readonly InsertOne2Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne2$Response(params: {
    body: BcOrgHirType
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHirType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHirTypeControllerService.InsertOne2Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHirType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne2(params: {
    body: BcOrgHirType
  }): Observable<RestApiResponseBcOrgHirType> {

    return this.insertOne2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHirType>) => r.body as RestApiResponseBcOrgHirType)
    );
  }

  /**
   * Path part for operation getOne3
   */
  static readonly GetOne3Path = '/v1/bc/org-hir-type/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne3()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHirType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHirTypeControllerService.GetOne3Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHirType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne3(params: {
    id: number;
  }): Observable<RestApiResponseBcOrgHirType> {

    return this.getOne3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHirType>) => r.body as RestApiResponseBcOrgHirType)
    );
  }

}