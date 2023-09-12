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
   * Path part for operation deleteById16
   */
  static readonly DeleteById16Path = '/v1/bc/org-hir-type/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById16()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById16$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.DeleteById16Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById16(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById16$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll13
   */
  static readonly GetAll13Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll13()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll13$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.GetAll13Path, 'get');
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
   * To access the full response (for headers, for example), `getAll13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll13(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcOrgHierarchyType> {

    return this.getAll13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcOrgHierarchyType>) => r.body as RestApiResponsePageBcOrgHierarchyType)
    );
  }

  /**
   * Path part for operation update95
   */
  static readonly Update95Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update95()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update95$Response(params: {
    body: BcOrgHierarchyType
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.Update95Path, 'put');
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
   * To access the full response (for headers, for example), `update95$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update95(params: {
    body: BcOrgHierarchyType
  }): Observable<RestApiResponseBcOrgHierarchyType> {

    return this.update95$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchyType>) => r.body as RestApiResponseBcOrgHierarchyType)
    );
  }

  /**
   * Path part for operation insertOne16
   */
  static readonly InsertOne16Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne16()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne16$Response(params: {
    body: BcOrgHierarchyType
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.InsertOne16Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne16$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne16(params: {
    body: BcOrgHierarchyType
  }): Observable<RestApiResponseBcOrgHierarchyType> {

    return this.insertOne16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchyType>) => r.body as RestApiResponseBcOrgHierarchyType)
    );
  }

  /**
   * Path part for operation getOne17
   */
  static readonly GetOne17Path = '/v1/bc/org-hir-type/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne17()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne17$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.GetOne17Path, 'get');
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
   * To access the full response (for headers, for example), `getOne17$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne17(params: {
    id: number;
  }): Observable<RestApiResponseBcOrgHierarchyType> {

    return this.getOne17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchyType>) => r.body as RestApiResponseBcOrgHierarchyType)
    );
  }

}
