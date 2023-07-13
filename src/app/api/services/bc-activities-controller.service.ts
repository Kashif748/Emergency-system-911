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

import { BcActivities } from '../models/bc-activities';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivities } from '../models/rest-api-response-bc-activities';
import { RestApiResponsePageBcActivities } from '../models/rest-api-response-page-bc-activities';

@Injectable()
export class BcActivitiesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById21
   */
  static readonly DeleteById21Path = '/v1/bc/activities/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById21()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById21$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.DeleteById21Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById21$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById21(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById21$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll31
   */
  static readonly GetAll31Path = '/v1/bc/activities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll31()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll31$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.GetAll31Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivities>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll31$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll31(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivities> {

    return this.getAll31$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivities>) => r.body as RestApiResponsePageBcActivities)
    );
  }

  /**
   * Path part for operation update101
   */
  static readonly Update101Path = '/v1/bc/activities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update101()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update101$Response(params: {
    body: BcActivities
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.Update101Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivities>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update101$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update101(params: {
    body: BcActivities
  }): Observable<RestApiResponseBcActivities> {

    return this.update101$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation insertOne21
   */
  static readonly InsertOne21Path = '/v1/bc/activities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne21()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne21$Response(params: {
    body: BcActivities
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.InsertOne21Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivities>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne21$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne21(params: {
    body: BcActivities
  }): Observable<RestApiResponseBcActivities> {

    return this.insertOne21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation getOne22
   */
  static readonly GetOne22Path = '/v1/bc/activities/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne22()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne22$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.GetOne22Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivities>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne22(params: {
    id: number;
  }): Observable<RestApiResponseBcActivities> {

    return this.getOne22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation search14
   */
  static readonly Search14Path = '/v1/bc/activities/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search14()` instead.
   *
   * This method doesn't expect any request body.
   */
  search14$Response(params: {
    isActive?: boolean;
    orgHierarchyId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.Search14Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcActivities>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search14(params: {
    isActive?: boolean;
    orgHierarchyId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivities> {

    return this.search14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivities>) => r.body as RestApiResponsePageBcActivities)
    );
  }

}
