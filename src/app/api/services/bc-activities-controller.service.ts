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
import { RestApiResponseSetLong } from '../models/rest-api-response-set-long';

@Injectable()
export class BcActivitiesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById37
   */
  static readonly DeleteById37Path = '/v1/bc/activities/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById37()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById37$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.DeleteById37Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById37$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById37(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById37$Response(params).pipe(
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
   *
   * @deprecated
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
   *
   * @deprecated
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
   * Path part for operation update116
   */
  static readonly Update116Path = '/v1/bc/activities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update116()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update116$Response(params: {
    body: BcActivities
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.Update116Path, 'put');
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
   * To access the full response (for headers, for example), `update116$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update116(params: {
    body: BcActivities
  }): Observable<RestApiResponseBcActivities> {

    return this.update116$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation insertOne36
   */
  static readonly InsertOne36Path = '/v1/bc/activities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne36()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne36$Response(params: {
    body: BcActivities
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.InsertOne36Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne36$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne36(params: {
    body: BcActivities
  }): Observable<RestApiResponseBcActivities> {

    return this.insertOne36$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation getOne37
   */
  static readonly GetOne37Path = '/v1/bc/activities/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne37()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne37$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.GetOne37Path, 'get');
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
   * To access the full response (for headers, for example), `getOne37$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne37(params: {
    id: number;
  }): Observable<RestApiResponseBcActivities> {

    return this.getOne37$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation search28
   */
  static readonly Search28Path = '/v1/bc/activities/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search28()` instead.
   *
   * This method doesn't expect any request body.
   */
  search28$Response(params: {
    isActive?: boolean;
    orgHierarchyId?: number;
    name?: string;
    activityFrequencyId?: number;
    activityArea?: string;
    refrenceNumber?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.Search28Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('name', params.name, {});
      rb.query('activityFrequencyId', params.activityFrequencyId, {});
      rb.query('activityArea', params.activityArea, {});
      rb.query('refrenceNumber', params.refrenceNumber, {});
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
   * To access the full response (for headers, for example), `search28$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search28(params: {
    isActive?: boolean;
    orgHierarchyId?: number;
    name?: string;
    activityFrequencyId?: number;
    activityArea?: string;
    refrenceNumber?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivities> {

    return this.search28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivities>) => r.body as RestApiResponsePageBcActivities)
    );
  }

  /**
   * Path part for operation list11
   */
  static readonly List11Path = '/v1/bc/activities/list-ids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list11()` instead.
   *
   * This method doesn't expect any request body.
   */
  list11$Response(params: {
    cycleId: number;
    orgHierarchyId: number;
  }): Observable<StrictHttpResponse<RestApiResponseSetLong>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.List11Path, 'get');
    if (params) {
      rb.query('cycleId', params.cycleId, {});
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSetLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list11(params: {
    cycleId: number;
    orgHierarchyId: number;
  }): Observable<RestApiResponseSetLong> {

    return this.list11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSetLong>) => r.body as RestApiResponseSetLong)
    );
  }

}
