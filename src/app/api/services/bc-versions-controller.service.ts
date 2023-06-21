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
   * Path part for operation deleteById
   */
  static readonly DeleteByIdPath = '/v1/bc/version/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.DeleteByIdPath, 'put');
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
   * To access the full response (for headers, for example), `deleteById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll10
   */
  static readonly GetAll10Path = '/v1/bc/version';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll10()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll10$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcVersions>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.GetAll10Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcVersions>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll10(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcVersions> {

    return this.getAll10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcVersions>) => r.body as RestApiResponsePageBcVersions)
    );
  }

  /**
   * Path part for operation update80
   */
  static readonly Update80Path = '/v1/bc/version';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update80()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update80$Response(params: {
    body: BcVersions
  }): Observable<StrictHttpResponse<RestApiResponseBcVersions>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.Update80Path, 'put');
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
   * To access the full response (for headers, for example), `update80$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update80(params: {
    body: BcVersions
  }): Observable<RestApiResponseBcVersions> {

    return this.update80$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersions>) => r.body as RestApiResponseBcVersions)
    );
  }

  /**
   * Path part for operation insertOne1
   */
  static readonly InsertOne1Path = '/v1/bc/version';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne1$Response(params: {
    body: BcVersions
  }): Observable<StrictHttpResponse<RestApiResponseBcVersions>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.InsertOne1Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne1(params: {
    body: BcVersions
  }): Observable<RestApiResponseBcVersions> {

    return this.insertOne1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcVersions>) => r.body as RestApiResponseBcVersions)
    );
  }

  /**
   * Path part for operation getOne
   */
  static readonly GetOnePath = '/v1/bc/version/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcVersions>> {

    const rb = new RequestBuilder(this.rootUrl, BcVersionsControllerService.GetOnePath, 'get');
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
   * To access the full response (for headers, for example), `getOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne(params: {
    id: number;
  }): Observable<RestApiResponseBcVersions> {

    return this.getOne$Response(params).pipe(
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
