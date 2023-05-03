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
   * Path part for operation delete32
   */
  static readonly Delete32Path = '/v1/assets/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete32()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete32$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.Delete32Path, 'put');
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
   * To access the full response (for headers, for example), `delete32$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete32(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete32$Response(params).pipe(
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
   * Path part for operation update88
   */
  static readonly Update88Path = '/v1/assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update88()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update88$Response(params: {
    body: OrgAsset
  }): Observable<StrictHttpResponse<RestApiResponseOrgAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.Update88Path, 'put');
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
   * To access the full response (for headers, for example), `update88$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update88(params: {
    body: OrgAsset
  }): Observable<RestApiResponseOrgAssetsProjection> {

    return this.update88$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgAssetsProjection>) => r.body as RestApiResponseOrgAssetsProjection)
    );
  }

  /**
   * Path part for operation create76
   */
  static readonly Create76Path = '/v1/assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create76()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create76$Response(params: {
    body: OrgAsset
  }): Observable<StrictHttpResponse<RestApiResponseOrgAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.Create76Path, 'post');
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
   * To access the full response (for headers, for example), `create76$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create76(params: {
    body: OrgAsset
  }): Observable<RestApiResponseOrgAssetsProjection> {

    return this.create76$Response(params).pipe(
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
   * Path part for operation search8
   */
  static readonly Search8Path = '/v1/assets/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search8()` instead.
   *
   * This method doesn't expect any request body.
   */
  search8$Response(params: {
    orgId?: number;
    categoryId?: number;
    details?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageOrgAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.Search8Path, 'get');
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
   * To access the full response (for headers, for example), `search8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search8(params: {
    orgId?: number;
    categoryId?: number;
    details?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageOrgAssetsProjection> {

    return this.search8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageOrgAssetsProjection>) => r.body as RestApiResponsePageOrgAssetsProjection)
    );
  }

  /**
   * Path part for operation export7
   */
  static readonly Export7Path = '/v1/assets/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export7()` instead.
   *
   * This method doesn't expect any request body.
   */
  export7$Response(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    orgId?: number;
    categoryId?: number;
    details?: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AssetControllerService.Export7Path, 'get');
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
   * To access the full response (for headers, for example), `export7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export7(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    orgId?: number;
    categoryId?: number;
    details?: string;
  }): Observable<void> {

    return this.export7$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
