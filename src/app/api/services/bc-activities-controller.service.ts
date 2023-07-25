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
   * Path part for operation deleteById24
   */
  static readonly DeleteById24Path = '/v1/bc/activities/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById24()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById24$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.DeleteById24Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById24(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById24$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll33
   */
  static readonly GetAll33Path = '/v1/bc/activities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll33()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll33$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.GetAll33Path, 'get');
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
   * To access the full response (for headers, for example), `getAll33$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll33(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivities> {

    return this.getAll33$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivities>) => r.body as RestApiResponsePageBcActivities)
    );
  }

  /**
   * Path part for operation update104
   */
  static readonly Update104Path = '/v1/bc/activities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update104()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update104$Response(params: {
    body: BcActivities
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.Update104Path, 'put');
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
   * To access the full response (for headers, for example), `update104$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update104(params: {
    body: BcActivities
  }): Observable<RestApiResponseBcActivities> {

    return this.update104$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation insertOne24
   */
  static readonly InsertOne24Path = '/v1/bc/activities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne24()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne24$Response(params: {
    body: BcActivities
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.InsertOne24Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne24$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne24(params: {
    body: BcActivities
  }): Observable<RestApiResponseBcActivities> {

    return this.insertOne24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation getOne26
   */
  static readonly GetOne26Path = '/v1/bc/activities/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne26()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne26$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.GetOne26Path, 'get');
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
   * To access the full response (for headers, for example), `getOne26$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne26(params: {
    id: number;
  }): Observable<RestApiResponseBcActivities> {

    return this.getOne26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivities>) => r.body as RestApiResponseBcActivities)
    );
  }

  /**
   * Path part for operation search19
   */
  static readonly Search19Path = '/v1/bc/activities/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search19()` instead.
   *
   * This method doesn't expect any request body.
   */
  search19$Response(params: {
    isActive?: boolean;
    orgHierarchyId?: number;
    name?: string;
    activityFrequencyId?: number;
    activityArea?: string;
    refrenceNumber?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivities>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivitiesControllerService.Search19Path, 'get');
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
   * To access the full response (for headers, for example), `search19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search19(params: {
    isActive?: boolean;
    orgHierarchyId?: number;
    name?: string;
    activityFrequencyId?: number;
    activityArea?: string;
    refrenceNumber?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivities> {

    return this.search19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivities>) => r.body as RestApiResponsePageBcActivities)
    );
  }

}
