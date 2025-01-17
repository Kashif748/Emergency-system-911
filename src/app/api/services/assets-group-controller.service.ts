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

import { AssetsGroup } from '../models/assets-group';
import { Pageable } from '../models/pageable';
import { RestApiResponseAssetsGroup } from '../models/rest-api-response-assets-group';
import { RestApiResponsePageAssetsGroup } from '../models/rest-api-response-page-assets-group';

@Injectable()
export class AssetsGroupControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation list12
   */
  static readonly List12Path = '/v1/assets-group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list12()` instead.
   *
   * This method doesn't expect any request body.
   */
  list12$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAssetsGroup>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsGroupControllerService.List12Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageAssetsGroup>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list12(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAssetsGroup> {

    return this.list12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAssetsGroup>) => r.body as RestApiResponsePageAssetsGroup)
    );
  }

  /**
   * Path part for operation update119
   */
  static readonly Update119Path = '/v1/assets-group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update119()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update119$Response(params: {
    body: AssetsGroup
  }): Observable<StrictHttpResponse<RestApiResponseAssetsGroup>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsGroupControllerService.Update119Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAssetsGroup>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update119$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update119(params: {
    body: AssetsGroup
  }): Observable<RestApiResponseAssetsGroup> {

    return this.update119$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsGroup>) => r.body as RestApiResponseAssetsGroup)
    );
  }

  /**
   * Path part for operation create75
   */
  static readonly Create75Path = '/v1/assets-group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create75()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create75$Response(params: {
    body: AssetsGroup
  }): Observable<StrictHttpResponse<RestApiResponseAssetsGroup>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsGroupControllerService.Create75Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAssetsGroup>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create75$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create75(params: {
    body: AssetsGroup
  }): Observable<RestApiResponseAssetsGroup> {

    return this.create75$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsGroup>) => r.body as RestApiResponseAssetsGroup)
    );
  }

  /**
   * Path part for operation get29
   */
  static readonly Get29Path = '/v1/assets-group/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get29()` instead.
   *
   * This method doesn't expect any request body.
   */
  get29$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAssetsGroup>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsGroupControllerService.Get29Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAssetsGroup>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get29$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get29(params: {
    id: number;
  }): Observable<RestApiResponseAssetsGroup> {

    return this.get29$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsGroup>) => r.body as RestApiResponseAssetsGroup)
    );
  }

}
