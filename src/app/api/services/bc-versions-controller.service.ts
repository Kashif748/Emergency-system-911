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

import { BcVersions } from '../models/bc-versions';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcVersions } from '../models/rest-api-response-bc-versions';
import { RestApiResponsePageBcVersions } from '../models/rest-api-response-page-bc-versions';

@Injectable()
export class BcVersionsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById1
   */
  static readonly DeleteById1Path = '/v1/bc/version/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.DeleteById1Path, 'put');
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
   * Path part for operation search8
   */
  static readonly Search8Path = '/v1/bc/version';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search8()` instead.
   *
   * This method doesn't expect any request body.
   */
  search8$Response(params: {
    isActive?: boolean;
    versionId?: number;
    statusId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcVersions>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.Search8Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('versionId', params.versionId, {});
      rb.query('statusId', params.statusId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcVersions>;
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
    isActive?: boolean;
    versionId?: number;
    statusId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcVersions> {

    return this.search8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcVersions>) => r.body as RestApiResponsePageBcVersions)
    );
  }

  /**
   * Path part for operation update81
   */
  static readonly Update81Path = '/v1/bc/version';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update81()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update81$Response(params: {
    body: BcVersions
  }): Observable<StrictHttpResponse<RestApiResponseBcVersions>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.Update81Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcVersions>;
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
    body: BcVersions
  }): Observable<RestApiResponseBcVersions> {

    return this.update81$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersions>) => r.body as RestApiResponseBcVersions)
    );
  }

  /**
   * Path part for operation insertOne2
   */
  static readonly InsertOne2Path = '/v1/bc/version';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne2$Response(params: {
    body: BcVersions
  }): Observable<StrictHttpResponse<RestApiResponseBcVersions>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.InsertOne2Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcVersions>;
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
    body: BcVersions
  }): Observable<RestApiResponseBcVersions> {

    return this.insertOne2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersions>) => r.body as RestApiResponseBcVersions)
    );
  }

  /**
   * Path part for operation getOne1
   */
  static readonly GetOne1Path = '/v1/bc/version/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcVersions>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.GetOne1Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcVersions>;
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
  }): Observable<RestApiResponseBcVersions> {

    return this.getOne1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersions>) => r.body as RestApiResponseBcVersions)
    );
  }

  /**
   * Path part for operation manageVersionStatus
   */
  static readonly ManageVersionStatusPath = '/v1/bc/version/manage/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `manageVersionStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  manageVersionStatus$Response(params: {
    versionId: number;
    statusId: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcVersions>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.ManageVersionStatusPath, 'get');
    if (params) {
      rb.query('versionId', params.versionId, {});
      rb.query('statusId', params.statusId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcVersions>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `manageVersionStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  manageVersionStatus(params: {
    versionId: number;
    statusId: number;
  }): Observable<RestApiResponseBcVersions> {

    return this.manageVersionStatus$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersions>) => r.body as RestApiResponseBcVersions)
    );
  }

}
