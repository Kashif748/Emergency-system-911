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
   * Path part for operation deleteById18
   */
  static readonly DeleteById18Path = '/v1/bc/activity-locations/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById18()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById18$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.DeleteById18Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById18(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById18$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll27
   */
  static readonly GetAll27Path = '/v1/bc/activity-locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll27()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll27$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.GetAll27Path, 'get');
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
   * To access the full response (for headers, for example), `getAll27$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll27(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityLocations> {

    return this.getAll27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityLocations>) => r.body as RestApiResponsePageBcActivityLocations)
    );
  }

  /**
   * Path part for operation update98
   */
  static readonly Update98Path = '/v1/bc/activity-locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update98()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update98$Response(params: {
    body: BcActivityLocations
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.Update98Path, 'put');
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
   * To access the full response (for headers, for example), `update98$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update98(params: {
    body: BcActivityLocations
  }): Observable<RestApiResponseBcActivityLocations> {

    return this.update98$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityLocations>) => r.body as RestApiResponseBcActivityLocations)
    );
  }

  /**
   * Path part for operation insertOne18
   */
  static readonly InsertOne18Path = '/v1/bc/activity-locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne18()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne18$Response(params: {
    body: BcActivityLocations
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.InsertOne18Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne18$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne18(params: {
    body: BcActivityLocations
  }): Observable<RestApiResponseBcActivityLocations> {

    return this.insertOne18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityLocations>) => r.body as RestApiResponseBcActivityLocations)
    );
  }

  /**
   * Path part for operation getOne18
   */
  static readonly GetOne18Path = '/v1/bc/activity-locations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne18()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne18$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.GetOne18Path, 'get');
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
   * To access the full response (for headers, for example), `getOne18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne18(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityLocations> {

    return this.getOne18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityLocations>) => r.body as RestApiResponseBcActivityLocations)
    );
  }

  /**
   * Path part for operation search10
   */
  static readonly Search10Path = '/v1/bc/activity-locations/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search10()` instead.
   *
   * This method doesn't expect any request body.
   */
  search10$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityLocationsControllerService.Search10Path, 'get');
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
   * To access the full response (for headers, for example), `search10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search10(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityLocations> {

    return this.search10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityLocations>) => r.body as RestApiResponsePageBcActivityLocations)
    );
  }

}
