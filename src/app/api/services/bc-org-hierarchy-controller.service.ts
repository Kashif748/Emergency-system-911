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

@Injectable()
export class BcOrgHierarchyControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById5
   */
  static readonly DeleteById5Path = '/v1/bc/org-hir/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById5()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById5$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.DeleteById5Path, 'put');
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
   * Path part for operation getAll16
   */
  static readonly GetAll16Path = '/v1/bc/org-hir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll16()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll16$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcOrgHierarchy>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.GetAll16Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcOrgHierarchy>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll16(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcOrgHierarchy> {

    return this.getAll16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcOrgHierarchy>) => r.body as RestApiResponsePageBcOrgHierarchy)
    );
  }

  /**
   * Path part for operation update86
   */
  static readonly Update86Path = '/v1/bc/org-hir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update86()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86$Response(params: {
    body: BcOrgHierarchy
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchy>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.Update86Path, 'put');
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
   * To access the full response (for headers, for example), `update86$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86(params: {
    body: BcOrgHierarchy
  }): Observable<RestApiResponseBcOrgHierarchy> {

    return this.update86$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchy>) => r.body as RestApiResponseBcOrgHierarchy)
    );
  }

  /**
   * Path part for operation insertOne7
   */
  static readonly InsertOne7Path = '/v1/bc/org-hir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne7()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7$Response(params: {
    body: BcOrgHierarchy
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchy>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.InsertOne7Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne7$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7(params: {
    body: BcOrgHierarchy
  }): Observable<RestApiResponseBcOrgHierarchy> {

    return this.insertOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchy>) => r.body as RestApiResponseBcOrgHierarchy)
    );
  }

  /**
   * Path part for operation getOne6
   */
  static readonly GetOne6Path = '/v1/bc/org-hir/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne6()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchy>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyControllerService.GetOne6Path, 'get');
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
   * To access the full response (for headers, for example), `getOne6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne6(params: {
    id: number;
  }): Observable<RestApiResponseBcOrgHierarchy> {

    return this.getOne6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchy>) => r.body as RestApiResponseBcOrgHierarchy)
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
