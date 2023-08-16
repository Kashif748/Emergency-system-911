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

@Injectable()
export class BcActivityLocationsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById20
   */
  static readonly DeleteById20Path = '/v1/bc/activity-locations/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById20()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById20$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.DeleteById20Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById20(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById20$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll29
   */
  static readonly GetAll29Path = '/v1/bc/activity-locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll29()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll29$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.GetAll29Path, 'get');
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
   * To access the full response (for headers, for example), `getAll29$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll29(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityLocations> {

    return this.getAll29$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityLocations>) => r.body as RestApiResponsePageBcActivityLocations)
    );
  }

  /**
   * Path part for operation update100
   */
  static readonly Update100Path = '/v1/bc/activity-locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update100()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update100$Response(params: {
    body: BcActivityLocations
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.Update100Path, 'put');
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
   * To access the full response (for headers, for example), `update100$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update100(params: {
    body: BcActivityLocations
  }): Observable<RestApiResponseBcActivityLocations> {

    return this.update100$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityLocations>) => r.body as RestApiResponseBcActivityLocations)
    );
  }

  /**
   * Path part for operation insertOne20
   */
  static readonly InsertOne20Path = '/v1/bc/activity-locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne20()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne20$Response(params: {
    body: BcActivityLocations
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.InsertOne20Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne20$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne20(params: {
    body: BcActivityLocations
  }): Observable<RestApiResponseBcActivityLocations> {

    return this.insertOne20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityLocations>) => r.body as RestApiResponseBcActivityLocations)
    );
  }

  /**
   * Path part for operation getOne20
   */
  static readonly GetOne20Path = '/v1/bc/activity-locations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne20()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne20$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.GetOne20Path, 'get');
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
   * To access the full response (for headers, for example), `getOne20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne20(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityLocations> {

    return this.getOne20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityLocations>) => r.body as RestApiResponseBcActivityLocations)
    );
  }

  /**
   * Path part for operation search13
   */
  static readonly Search13Path = '/v1/bc/activity-locations/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search13()` instead.
   *
   * This method doesn't expect any request body.
   */
  search13$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.Search13Path, 'get');
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
   * To access the full response (for headers, for example), `search13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search13(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityLocations> {

    return this.search13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityLocations>) => r.body as RestApiResponsePageBcActivityLocations)
    );
  }

}
