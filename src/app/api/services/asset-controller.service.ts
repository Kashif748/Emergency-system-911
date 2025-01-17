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

import { OrgAsset } from '../models/org-asset';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseListMapStringObject } from '../models/rest-api-response-list-map-string-object';
import { RestApiResponseListOrgAssetsProjection } from '../models/rest-api-response-list-org-assets-projection';
import { RestApiResponseOrgAsset } from '../models/rest-api-response-org-asset';
import { RestApiResponseOrgAssetsProjection } from '../models/rest-api-response-org-assets-projection';
import { RestApiResponsePageOrgAssetsProjection } from '../models/rest-api-response-page-org-assets-projection';

@Injectable()
export class AssetControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete33
   */
  static readonly Delete33Path = '/v1/assets/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete33()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete33$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.Delete33Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
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
  }): Observable<RestApiResponseBoolean> {

    return this.delete33$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation findActiveAssets
   */
  static readonly FindActiveAssetsPath = '/v1/assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActiveAssets()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveAssets$Response(params?: {
    orgId?: number;
    categoryId?: number;
    details?: string;
  }): Observable<StrictHttpResponse<RestApiResponseListOrgAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.FindActiveAssetsPath, 'get');
    if (params) {
      rb.query('orgId', params.orgId, {});
      rb.query('categoryId', params.categoryId, {});
      rb.query('details', params.details, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListOrgAssetsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActiveAssets$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveAssets(params?: {
    orgId?: number;
    categoryId?: number;
    details?: string;
  }): Observable<RestApiResponseListOrgAssetsProjection> {

    return this.findActiveAssets$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListOrgAssetsProjection>) => r.body as RestApiResponseListOrgAssetsProjection)
    );
  }

  /**
   * Path part for operation update121
   */
  static readonly Update121Path = '/v1/assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update121()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update121$Response(params: {
    body: OrgAsset
  }): Observable<StrictHttpResponse<RestApiResponseOrgAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.Update121Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgAssetsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update121$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update121(params: {
    body: OrgAsset
  }): Observable<RestApiResponseOrgAssetsProjection> {

    return this.update121$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgAssetsProjection>) => r.body as RestApiResponseOrgAssetsProjection)
    );
  }

  /**
   * Path part for operation create77
   */
  static readonly Create77Path = '/v1/assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create77()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create77$Response(params: {
    body: OrgAsset
  }): Observable<StrictHttpResponse<RestApiResponseOrgAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.Create77Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgAssetsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create77$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create77(params: {
    body: OrgAsset
  }): Observable<RestApiResponseOrgAssetsProjection> {

    return this.create77$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgAssetsProjection>) => r.body as RestApiResponseOrgAssetsProjection)
    );
  }

  /**
   * Path part for operation getActiveAssets
   */
  static readonly GetActiveAssetsPath = '/v1/assets/{assetId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveAssets()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAssets$Response(params: {
    assetId: number;
  }): Observable<StrictHttpResponse<RestApiResponseOrgAsset>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.GetActiveAssetsPath, 'get');
    if (params) {
      rb.path('assetId', params.assetId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgAsset>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveAssets$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAssets(params: {
    assetId: number;
  }): Observable<RestApiResponseOrgAsset> {

    return this.getActiveAssets$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgAsset>) => r.body as RestApiResponseOrgAsset)
    );
  }

  /**
   * Path part for operation assetStatistics
   */
  static readonly AssetStatisticsPath = '/v1/assets/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `assetStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  assetStatistics$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListMapStringObject>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.AssetStatisticsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListMapStringObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `assetStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  assetStatistics(params?: {
  }): Observable<RestApiResponseListMapStringObject> {

    return this.assetStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListMapStringObject>) => r.body as RestApiResponseListMapStringObject)
    );
  }

  /**
   * Path part for operation search29
   */
  static readonly Search29Path = '/v1/assets/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search29()` instead.
   *
   * This method doesn't expect any request body.
   */
  search29$Response(params: {
    orgId?: number;
    categoryId?: number;
    details?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageOrgAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.Search29Path, 'get');
    if (params) {
      rb.query('orgId', params.orgId, {});
      rb.query('categoryId', params.categoryId, {});
      rb.query('details', params.details, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageOrgAssetsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search29$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search29(params: {
    orgId?: number;
    categoryId?: number;
    details?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageOrgAssetsProjection> {

    return this.search29$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageOrgAssetsProjection>) => r.body as RestApiResponsePageOrgAssetsProjection)
    );
  }

  /**
   * Path part for operation export12
   */
  static readonly Export12Path = '/v1/assets/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export12()` instead.
   *
   * This method doesn't expect any request body.
   */
  export12$Response(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    orgId?: number;
    categoryId?: number;
    details?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.Export12Path, 'get');
    if (params) {
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
      rb.query('orgId', params.orgId, {});
      rb.query('categoryId', params.categoryId, {});
      rb.query('details', params.details, {});
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
   * To access the full response (for headers, for example), `export12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export12(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    orgId?: number;
    categoryId?: number;
    details?: string;
  }): Observable<void> {

    return this.export12$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
