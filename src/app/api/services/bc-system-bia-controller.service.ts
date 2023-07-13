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

import { BcSystemBia } from '../models/bc-system-bia';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcSystemBia } from '../models/rest-api-response-bc-system-bia';
import { RestApiResponsePageBcSystemBia } from '../models/rest-api-response-page-bc-system-bia';

@Injectable()
export class BcSystemBiaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById3
   */
  static readonly DeleteById3Path = '/v1/bc/system-bia/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById3()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemBiaControllerService.DeleteById3Path, 'put');
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
   * Path part for operation getAll12
   */
  static readonly GetAll12Path = '/v1/bc/system-bia';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll12()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll12$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcSystemBia>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemBiaControllerService.GetAll12Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcSystemBia>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll12(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcSystemBia> {

    return this.getAll12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcSystemBia>) => r.body as RestApiResponsePageBcSystemBia)
    );
  }

  /**
   * Path part for operation update82
   */
  static readonly Update82Path = '/v1/bc/system-bia';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update82()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update82$Response(params: {
    body: BcSystemBia
  }): Observable<StrictHttpResponse<RestApiResponseBcSystemBia>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemBiaControllerService.Update82Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcSystemBia>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update82$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update82(params: {
    body: BcSystemBia
  }): Observable<RestApiResponseBcSystemBia> {

    return this.update82$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcSystemBia>) => r.body as RestApiResponseBcSystemBia)
    );
  }

  /**
   * Path part for operation insertOne3
   */
  static readonly InsertOne3Path = '/v1/bc/system-bia';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne3$Response(params: {
    body: BcSystemBia
  }): Observable<StrictHttpResponse<RestApiResponseBcSystemBia>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemBiaControllerService.InsertOne3Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcSystemBia>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne3(params: {
    body: BcSystemBia
  }): Observable<RestApiResponseBcSystemBia> {

    return this.insertOne3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcSystemBia>) => r.body as RestApiResponseBcSystemBia)
    );
  }

  /**
   * Path part for operation getOne3
   */
  static readonly GetOne3Path = '/v1/bc/system-bia/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne3()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcSystemBia>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemBiaControllerService.GetOne3Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcSystemBia>;
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
  }): Observable<RestApiResponseBcSystemBia> {

    return this.getOne3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcSystemBia>) => r.body as RestApiResponseBcSystemBia)
    );
  }

}
