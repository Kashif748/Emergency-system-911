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

import { BcOrgHierarchy } from '../models/bc-org-hierarchy';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcOrgHierarchy } from '../models/rest-api-response-bc-org-hierarchy';
import { RestApiResponseListBcOrgHierarchy } from '../models/rest-api-response-list-bc-org-hierarchy';
import { RestApiResponsePageBcOrgHierarchy } from '../models/rest-api-response-page-bc-org-hierarchy';
import { RestApiResponsePageBcOrgHierarchyProjection } from '../models/rest-api-response-page-bc-org-hierarchy-projection';

@Injectable()
export class BcOrgHierarchyControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById15
   */
  static readonly DeleteById15Path = '/v1/bc/org-hir/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById15()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById15$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.DeleteById15Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById15(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById15$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation search16
   */
  static readonly Search16Path = '/v1/bc/org-hir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search16()` instead.
   *
   * This method doesn't expect any request body.
   */
  search16$Response(params: {
    isActive: boolean;
    name?: string;
    parentId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcOrgHierarchyProjection>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.Search16Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('name', params.name, {});
      rb.query('parentId', params.parentId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcOrgHierarchyProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search16(params: {
    isActive: boolean;
    name?: string;
    parentId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcOrgHierarchyProjection> {

    return this.search16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcOrgHierarchyProjection>) => r.body as RestApiResponsePageBcOrgHierarchyProjection)
    );
  }

  /**
   * Path part for operation update96
   */
  static readonly Update96Path = '/v1/bc/org-hir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update96()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update96$Response(params: {
    body: BcOrgHierarchy
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchy>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.Update96Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHierarchy>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update96$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update96(params: {
    body: BcOrgHierarchy
  }): Observable<RestApiResponseBcOrgHierarchy> {

    return this.update96$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchy>) => r.body as RestApiResponseBcOrgHierarchy)
    );
  }

  /**
   * Path part for operation insertOne17
   */
  static readonly InsertOne17Path = '/v1/bc/org-hir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne17()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne17$Response(params: {
    body: BcOrgHierarchy
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchy>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.InsertOne17Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHierarchy>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne17$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne17(params: {
    body: BcOrgHierarchy
  }): Observable<RestApiResponseBcOrgHierarchy> {

    return this.insertOne17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchy>) => r.body as RestApiResponseBcOrgHierarchy)
    );
  }

  /**
   * Path part for operation getOne16
   */
  static readonly GetOne16Path = '/v1/bc/org-hir/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne16()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne16$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchy>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.GetOne16Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHierarchy>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne16(params: {
    id: number;
  }): Observable<RestApiResponseBcOrgHierarchy> {

    return this.getOne16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchy>) => r.body as RestApiResponseBcOrgHierarchy)
    );
  }

  /**
   * Path part for operation orgHierarchyForFilteration
   */
  static readonly OrgHierarchyForFilterationPath = '/v1/bc/org-hir/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `orgHierarchyForFilteration()` instead.
   *
   * This method doesn't expect any request body.
   */
  orgHierarchyForFilteration$Response(params: {
    isActive: boolean;
    name?: string;
    parentId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcOrgHierarchy>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.OrgHierarchyForFilterationPath, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('name', params.name, {});
      rb.query('parentId', params.parentId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcOrgHierarchy>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `orgHierarchyForFilteration$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  orgHierarchyForFilteration(params: {
    isActive: boolean;
    name?: string;
    parentId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcOrgHierarchy> {

    return this.orgHierarchyForFilteration$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcOrgHierarchy>) => r.body as RestApiResponsePageBcOrgHierarchy)
    );
  }

  /**
   * Path part for operation filterById
   */
  static readonly FilterByIdPath = '/v1/bc/org-hir/filter/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `filterById()` instead.
   *
   * This method doesn't expect any request body.
   */
  filterById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseListBcOrgHierarchy>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.FilterByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBcOrgHierarchy>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `filterById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  filterById(params: {
    id: number;
  }): Observable<RestApiResponseListBcOrgHierarchy> {

    return this.filterById$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcOrgHierarchy>) => r.body as RestApiResponseListBcOrgHierarchy)
    );
  }

}
