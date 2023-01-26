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

import { AssetsCategory } from '../models/assets-category';
import { Pageable } from '../models/pageable';
import { RestApiResponseAssetsCategory } from '../models/rest-api-response-assets-category';
import { RestApiResponsePageAssetsCategory } from '../models/rest-api-response-page-assets-category';

@Injectable()
export class AssetsCategoryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPage
   */
  static readonly GetPagePath = '/v1/assets-category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPage$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAssetsCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsCategoryControllerService.GetPagePath, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageAssetsCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPage(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAssetsCategory> {

    return this.getPage$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAssetsCategory>) => r.body as RestApiResponsePageAssetsCategory)
    );
  }

  /**
   * Path part for operation update76
   */
  static readonly Update76Path = '/v1/assets-category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update76()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update76$Response(params: {
    body: AssetsCategory
  }): Observable<StrictHttpResponse<RestApiResponseAssetsCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsCategoryControllerService.Update76Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAssetsCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update76$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update76(params: {
    body: AssetsCategory
  }): Observable<RestApiResponseAssetsCategory> {

    return this.update76$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsCategory>) => r.body as RestApiResponseAssetsCategory)
    );
  }

  /**
   * Path part for operation create72
   */
  static readonly Create72Path = '/v1/assets-category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create72()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create72$Response(params: {
    body: AssetsCategory
  }): Observable<StrictHttpResponse<RestApiResponseAssetsCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsCategoryControllerService.Create72Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAssetsCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create72$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create72(params: {
    body: AssetsCategory
  }): Observable<RestApiResponseAssetsCategory> {

    return this.create72$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsCategory>) => r.body as RestApiResponseAssetsCategory)
    );
  }

  /**
   * Path part for operation get29
   */
  static readonly Get29Path = '/v1/assets-category/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get29()` instead.
   *
   * This method doesn't expect any request body.
   */
  get29$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAssetsCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsCategoryControllerService.Get29Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAssetsCategory>;
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
  }): Observable<RestApiResponseAssetsCategory> {

    return this.get29$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsCategory>) => r.body as RestApiResponseAssetsCategory)
    );
  }

  /**
   * Path part for operation delete37
   */
  static readonly Delete37Path = '/v1/assets-category/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete37()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete37$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAssetsCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsCategoryControllerService.Delete37Path, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAssetsCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete37$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete37(params: {
    id: number;
  }): Observable<RestApiResponseAssetsCategory> {

    return this.delete37$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsCategory>) => r.body as RestApiResponseAssetsCategory)
    );
  }

}
