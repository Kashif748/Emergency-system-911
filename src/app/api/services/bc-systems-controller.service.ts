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

import { BcSystems } from '../models/bc-systems';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcSystems } from '../models/rest-api-response-bc-systems';
import { RestApiResponsePageBcSystems } from '../models/rest-api-response-page-bc-systems';

@Injectable()
export class BcSystemsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById3
   */
  static readonly DeleteById3Path = '/v1/bc/systems/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById3()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemsControllerService.DeleteById3Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById3(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById3$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll10
   */
  static readonly GetAll10Path = '/v1/bc/systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll10()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll10$Response(params: {
    isActive?: boolean;
    orgHierarchyId?: Array<number>;
    name?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcSystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemsControllerService.GetAll10Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('name', params.name, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcSystems>;
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
    orgHierarchyId?: Array<number>;
    name?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcSystems> {

    return this.getAll10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcSystems>) => r.body as RestApiResponsePageBcSystems)
    );
  }

  /**
   * Path part for operation update82
   */
  static readonly Update82Path = '/v1/bc/systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update82()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update82$Response(params: {
    body: BcSystems
  }): Observable<StrictHttpResponse<RestApiResponseBcSystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemsControllerService.Update82Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcSystems>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update82$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update82(params: {
    body: BcSystems
  }): Observable<RestApiResponseBcSystems> {

    return this.update82$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcSystems>) => r.body as RestApiResponseBcSystems)
    );
  }

  /**
   * Path part for operation insertOne3
   */
  static readonly InsertOne3Path = '/v1/bc/systems';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne3$Response(params: {
    body: BcSystems
  }): Observable<StrictHttpResponse<RestApiResponseBcSystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemsControllerService.InsertOne3Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcSystems>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne3(params: {
    body: BcSystems
  }): Observable<RestApiResponseBcSystems> {

    return this.insertOne3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcSystems>) => r.body as RestApiResponseBcSystems)
    );
  }

  /**
   * Path part for operation getOne3
   */
  static readonly GetOne3Path = '/v1/bc/systems/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne3()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcSystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemsControllerService.GetOne3Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcSystems>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne3(params: {
    id: number;
  }): Observable<RestApiResponseBcSystems> {

    return this.getOne3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcSystems>) => r.body as RestApiResponseBcSystems)
    );
  }

  /**
   * Path part for operation searchByCurrentAndParentOrgIds
   */
  static readonly SearchByCurrentAndParentOrgIdsPath = '/v1/bc/systems/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchByCurrentAndParentOrgIds()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchByCurrentAndParentOrgIds$Response(params: {
    isActive: boolean;
    orgHierarchyId?: Array<number>;
    name?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcSystems>> {

    const rb = new RequestBuilder(this.rootUrl, BcSystemsControllerService.SearchByCurrentAndParentOrgIdsPath, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('name', params.name, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcSystems>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `searchByCurrentAndParentOrgIds$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchByCurrentAndParentOrgIds(params: {
    isActive: boolean;
    orgHierarchyId?: Array<number>;
    name?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcSystems> {

    return this.searchByCurrentAndParentOrgIds$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcSystems>) => r.body as RestApiResponsePageBcSystems)
    );
  }

}
