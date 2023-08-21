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
   * Path part for operation deleteById26
   */
  static readonly DeleteById26Path = '/v1/bc/activities/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById26()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById26$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.DeleteById26Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById26$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById26(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById26$Response(params).pipe(
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
   * Path part for operation update106
   */
  static readonly Update106Path = '/v1/bc/activities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update106()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update106$Response(params: {
    body: BcActivities
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.Update106Path, 'put');
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
   * To access the full response (for headers, for example), `update106$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update106(params: {
    body: BcActivities
  }): Observable<RestApiResponseBcActivities> {

    return this.update106$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation insertOne26
   */
  static readonly InsertOne26Path = '/v1/bc/activities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne26()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne26$Response(params: {
    body: BcActivities
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.InsertOne26Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne26$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne26(params: {
    body: BcActivities
  }): Observable<RestApiResponseBcActivities> {

    return this.insertOne26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation getOne28
   */
  static readonly GetOne28Path = '/v1/bc/activities/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne28()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne28$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.GetOne28Path, 'get');
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
   * To access the full response (for headers, for example), `getOne28$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne28(params: {
    id: number;
  }): Observable<RestApiResponseBcActivities> {

    return this.getOne28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation search21
   */
  static readonly Search21Path = '/v1/bc/activities/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search21()` instead.
   *
   * This method doesn't expect any request body.
   */
  search21$Response(params: {
    isActive?: boolean;
    orgHierarchyId?: number;
    name?: string;
    activityFrequencyId?: number;
    activityArea?: string;
    refrenceNumber?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.Search21Path, 'get');
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
   * To access the full response (for headers, for example), `search21$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search21(params: {
    isActive?: boolean;
    orgHierarchyId?: number;
    name?: string;
    activityFrequencyId?: number;
    activityArea?: string;
    refrenceNumber?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivities> {

    return this.search21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivities>) => r.body as RestApiResponsePageBcActivities)
    );
  }

  /**
   * Path part for operation list9
   */
  static readonly List9Path = '/v1/bc/activities/list-ids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list9()` instead.
   *
   * This method doesn't expect any request body.
   */
  list9$Response(params: {
    cycleId: number;
  }): Observable<StrictHttpResponse<RestApiResponseSetLong>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.List9Path, 'get');
    if (params) {
      rb.query('cycleId', params.cycleId, {});
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
   * To access the full response (for headers, for example), `list9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list9(params: {
    cycleId: number;
  }): Observable<RestApiResponseSetLong> {

    return this.list9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSetLong>) => r.body as RestApiResponseSetLong)
    );
  }

}
