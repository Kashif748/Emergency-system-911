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
   * Path part for operation list7
   */
  static readonly List7Path = '/v1/assets-group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list7()` instead.
   *
   * This method doesn't expect any request body.
   */
  list7$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAssetsGroup>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsGroupControllerService.List7Path, 'get');
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
   * To access the full response (for headers, for example), `list7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list7(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAssetsGroup> {

    return this.list7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAssetsGroup>) => r.body as RestApiResponsePageAssetsGroup)
    );
  }

  /**
   * Path part for operation update90
   */
  static readonly Update90Path = '/v1/assets-group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update90()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update90$Response(params: {
    body: AssetsGroup
  }): Observable<StrictHttpResponse<RestApiResponseAssetsGroup>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsGroupControllerService.Update90Path, 'put');
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
   * To access the full response (for headers, for example), `update90$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update90(params: {
    body: AssetsGroup
  }): Observable<RestApiResponseAssetsGroup> {

    return this.update90$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsGroup>) => r.body as RestApiResponseAssetsGroup)
    );
  }

  /**
   * Path part for operation create74
   */
  static readonly Create74Path = '/v1/assets-group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create74()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create74$Response(params: {
    body: AssetsGroup
  }): Observable<StrictHttpResponse<RestApiResponseAssetsGroup>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsGroupControllerService.Create74Path, 'post');
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
   * To access the full response (for headers, for example), `create74$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create74(params: {
    body: AssetsGroup
  }): Observable<RestApiResponseAssetsGroup> {

    return this.create74$Response(params).pipe(
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
