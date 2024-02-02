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

import { BcActivityLocations } from '../models/bc-activity-locations';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivityLocations } from '../models/rest-api-response-bc-activity-locations';
import { RestApiResponsePageBcActivityLocations } from '../models/rest-api-response-page-bc-activity-locations';
import { RestApiResponseSetLong } from '../models/rest-api-response-set-long';

@Injectable()
export class BcActivityLocationsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById32
   */
  static readonly DeleteById32Path = '/v1/bc/activity-locations/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById32()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById32$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.DeleteById32Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById32$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById32(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById32$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll28
   */
  static readonly GetAll28Path = '/v1/bc/activity-locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll28()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll28$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.GetAll28Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityLocations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll28$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll28(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityLocations> {

    return this.getAll28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityLocations>) => r.body as RestApiResponsePageBcActivityLocations)
    );
  }

  /**
   * Path part for operation update113
   */
  static readonly Update113Path = '/v1/bc/activity-locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update113()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update113$Response(params: {
    body: BcActivityLocations
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.Update113Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityLocations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update113$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update113(params: {
    body: BcActivityLocations
  }): Observable<RestApiResponseBcActivityLocations> {

    return this.update113$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityLocations>) => r.body as RestApiResponseBcActivityLocations)
    );
  }

  /**
   * Path part for operation insertOne31
   */
  static readonly InsertOne31Path = '/v1/bc/activity-locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne31()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne31$Response(params: {
    body: BcActivityLocations
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.InsertOne31Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityLocations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne31$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne31(params: {
    body: BcActivityLocations
  }): Observable<RestApiResponseBcActivityLocations> {

    return this.insertOne31$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityLocations>) => r.body as RestApiResponseBcActivityLocations)
    );
  }

  /**
   * Path part for operation getOne31
   */
  static readonly GetOne31Path = '/v1/bc/activity-locations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne31()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne31$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.GetOne31Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityLocations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne31$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne31(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityLocations> {

    return this.getOne31$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityLocations>) => r.body as RestApiResponseBcActivityLocations)
    );
  }

  /**
   * Path part for operation search22
   */
  static readonly Search22Path = '/v1/bc/activity-locations/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search22()` instead.
   *
   * This method doesn't expect any request body.
   */
  search22$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.Search22Path, 'get');
    if (params) {
      rb.query('activityId', params.activityId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('isActive', params.isActive, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcActivityLocations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search22(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityLocations> {

    return this.search22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityLocations>) => r.body as RestApiResponsePageBcActivityLocations)
    );
  }

  /**
   * Path part for operation list9
   */
  static readonly List9Path = '/v1/bc/activity-locations/list-ids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list9()` instead.
   *
   * This method doesn't expect any request body.
   */
  list9$Response(params: {
    cycleId: number;
    activityId: number;
  }): Observable<StrictHttpResponse<RestApiResponseSetLong>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.List9Path, 'get');
    if (params) {
      rb.query('cycleId', params.cycleId, {});
      rb.query('activityId', params.activityId, {});
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
    activityId: number;
  }): Observable<RestApiResponseSetLong> {

    return this.list9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSetLong>) => r.body as RestApiResponseSetLong)
    );
  }

}
