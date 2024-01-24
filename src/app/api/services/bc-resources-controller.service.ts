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

import { BcResources } from '../models/bc-resources';
import { BcResourcesChangeStatusDto } from '../models/bc-resources-change-status-dto';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcResources } from '../models/rest-api-response-bc-resources';
import { RestApiResponsePageBcResources } from '../models/rest-api-response-page-bc-resources';

@Injectable()
export class BcResourcesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById13
   */
  static readonly DeleteById13Path = '/v1/bc/resources/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById13()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById13$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesControllerService.DeleteById13Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById13(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById13$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation changeStatus
   */
  static readonly ChangeStatusPath = '/v1/bc/resources/change-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStatus$Response(params: {
    body: BcResourcesChangeStatusDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesControllerService.ChangeStatusPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `changeStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStatus(params: {
    body: BcResourcesChangeStatusDto
  }): Observable<void> {

    return this.changeStatus$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update95
   */
  static readonly Update95Path = '/v1/bc/resources';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update95()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update95$Response(params: {
    body: BcResources
  }): Observable<StrictHttpResponse<RestApiResponseBcResources>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesControllerService.Update95Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResources>;
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
    body: BcResources
  }): Observable<RestApiResponseBcResources> {

    return this.update95$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResources>) => r.body as RestApiResponseBcResources)
    );
  }

  /**
   * Path part for operation insertOne14
   */
  static readonly InsertOne14Path = '/v1/bc/resources';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne14()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne14$Response(params: {
    body: BcResources
  }): Observable<StrictHttpResponse<RestApiResponseBcResources>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesControllerService.InsertOne14Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResources>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne14$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne14(params: {
    body: BcResources
  }): Observable<RestApiResponseBcResources> {

    return this.insertOne14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResources>) => r.body as RestApiResponseBcResources)
    );
  }

  /**
   * Path part for operation getOne5
   */
  static readonly GetOne5Path = '/v1/bc/resources/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne5()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne5$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcResources>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesControllerService.GetOne5Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResources>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne5(params: {
    id: number;
  }): Observable<RestApiResponseBcResources> {

    return this.getOne5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResources>) => r.body as RestApiResponseBcResources)
    );
  }

  /**
   * Path part for operation search10
   */
  static readonly Search10Path = '/v1/bc/resources/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search10()` instead.
   *
   * This method doesn't expect any request body.
   */
  search10$Response(params: {
    cycleId?: number;
    isActive: boolean;
    orgHierarchyId?: number;
    statusId?: Array<number>;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcResources>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesControllerService.Search10Path, 'get');
    if (params) {
      rb.query('cycleId', params.cycleId, {});
      rb.query('isActive', params.isActive, {});
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('statusId', params.statusId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcResources>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search10(params: {
    cycleId?: number;
    isActive: boolean;
    orgHierarchyId?: number;
    statusId?: Array<number>;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcResources> {

    return this.search10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcResources>) => r.body as RestApiResponsePageBcResources)
    );
  }

}
