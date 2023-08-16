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

import { BcOrgHierarchyType } from '../models/bc-org-hierarchy-type';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcOrgHierarchyType } from '../models/rest-api-response-bc-org-hierarchy-type';
import { RestApiResponsePageBcOrgHierarchyType } from '../models/rest-api-response-page-bc-org-hierarchy-type';

@Injectable()
export class BcOrgHierarchyTypeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById5
   */
  static readonly DeleteById5Path = '/v1/bc/org-hir-type/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById5()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById5$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.DeleteById5Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById5(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById5$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll14
   */
  static readonly GetAll14Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll14()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll14$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.GetAll14Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcOrgHierarchyType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll14(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcOrgHierarchyType> {

    return this.getAll14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcOrgHierarchyType>) => r.body as RestApiResponsePageBcOrgHierarchyType)
    );
  }

  /**
   * Path part for operation update84
   */
  static readonly Update84Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update84()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update84$Response(params: {
    body: BcOrgHierarchyType
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.Update84Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHierarchyType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update84$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update84(params: {
    body: BcOrgHierarchyType
  }): Observable<RestApiResponseBcOrgHierarchyType> {

    return this.update84$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchyType>) => r.body as RestApiResponseBcOrgHierarchyType)
    );
  }

  /**
   * Path part for operation insertOne5
   */
  static readonly InsertOne5Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne5$Response(params: {
    body: BcOrgHierarchyType
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.InsertOne5Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHierarchyType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne5(params: {
    body: BcOrgHierarchyType
  }): Observable<RestApiResponseBcOrgHierarchyType> {

    return this.insertOne5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchyType>) => r.body as RestApiResponseBcOrgHierarchyType)
    );
  }

  /**
   * Path part for operation getOne6
   */
  static readonly GetOne6Path = '/v1/bc/org-hir-type/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne6()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.GetOne6Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHierarchyType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne6(params: {
    id: number;
  }): Observable<RestApiResponseBcOrgHierarchyType> {

    return this.getOne6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchyType>) => r.body as RestApiResponseBcOrgHierarchyType)
    );
  }

}
