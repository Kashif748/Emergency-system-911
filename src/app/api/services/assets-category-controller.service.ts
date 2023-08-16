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
   * Path part for operation delete33
   */
  static readonly Delete33Path = '/v1/assets-category/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete33()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete33$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAssetsCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsCategoryControllerService.Delete33Path, 'put');
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
   * To access the full response (for headers, for example), `delete33$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete33(params: {
    id: number;
  }): Observable<RestApiResponseAssetsCategory> {

    return this.delete33$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsCategory>) => r.body as RestApiResponseAssetsCategory)
    );
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
   * Path part for operation update107
   */
  static readonly Update107Path = '/v1/assets-category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update107()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update107$Response(params: {
    body: AssetsCategory
  }): Observable<StrictHttpResponse<RestApiResponseAssetsCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsCategoryControllerService.Update107Path, 'put');
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
   * To access the full response (for headers, for example), `update107$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update107(params: {
    body: AssetsCategory
  }): Observable<RestApiResponseAssetsCategory> {

    return this.update107$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsCategory>) => r.body as RestApiResponseAssetsCategory)
    );
  }

  /**
   * Path part for operation create75
   */
  static readonly Create75Path = '/v1/assets-category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create75()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create75$Response(params: {
    body: AssetsCategory
  }): Observable<StrictHttpResponse<RestApiResponseAssetsCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsCategoryControllerService.Create75Path, 'post');
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
   * To access the full response (for headers, for example), `create75$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create75(params: {
    body: AssetsCategory
  }): Observable<RestApiResponseAssetsCategory> {

    return this.create75$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsCategory>) => r.body as RestApiResponseAssetsCategory)
    );
  }

  /**
   * Path part for operation get30
   */
  static readonly Get30Path = '/v1/assets-category/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get30()` instead.
   *
   * This method doesn't expect any request body.
   */
  get30$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAssetsCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AssetsCategoryControllerService.Get30Path, 'get');
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
   * To access the full response (for headers, for example), `get30$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get30(params: {
    id: number;
  }): Observable<RestApiResponseAssetsCategory> {

    return this.get30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAssetsCategory>) => r.body as RestApiResponseAssetsCategory)
    );
  }

}
