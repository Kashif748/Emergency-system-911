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
   * Path part for operation deleteById6
   */
  static readonly DeleteById6Path = '/v1/bc/org-hir-type/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.DeleteById6Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById6$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll15
   */
  static readonly GetAll15Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll15()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll15$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.GetAll15Path, 'get');
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
   * To access the full response (for headers, for example), `getAll15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll15(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcOrgHierarchyType> {

    return this.getAll15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcOrgHierarchyType>) => r.body as RestApiResponsePageBcOrgHierarchyType)
    );
  }

  /**
   * Path part for operation update85
   */
  static readonly Update85Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update85()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update85$Response(params: {
    body: BcOrgHierarchyType
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.Update85Path, 'put');
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
   * To access the full response (for headers, for example), `update85$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update85(params: {
    body: BcOrgHierarchyType
  }): Observable<RestApiResponseBcOrgHierarchyType> {

    return this.update85$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchyType>) => r.body as RestApiResponseBcOrgHierarchyType)
    );
  }

  /**
   * Path part for operation insertOne6
   */
  static readonly InsertOne6Path = '/v1/bc/org-hir-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne6$Response(params: {
    body: BcOrgHierarchyType
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.InsertOne6Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne6(params: {
    body: BcOrgHierarchyType
  }): Observable<RestApiResponseBcOrgHierarchyType> {

    return this.insertOne6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchyType>) => r.body as RestApiResponseBcOrgHierarchyType)
    );
  }

  /**
   * Path part for operation getOne7
   */
  static readonly GetOne7Path = '/v1/bc/org-hir-type/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne7()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHierarchyType>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHierarchyTypeControllerService.GetOne7Path, 'get');
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
   * To access the full response (for headers, for example), `getOne7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne7(params: {
    id: number;
  }): Observable<RestApiResponseBcOrgHierarchyType> {

    return this.getOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHierarchyType>) => r.body as RestApiResponseBcOrgHierarchyType)
    );
  }

}
