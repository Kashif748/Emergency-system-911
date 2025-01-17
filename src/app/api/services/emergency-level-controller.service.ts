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

import { EmergencyLevel } from '../models/emergency-level';
import { Pageable } from '../models/pageable';
import { RestApiResponseEmergencyLevel } from '../models/rest-api-response-emergency-level';
import { RestApiResponsePageEmergencyLevel } from '../models/rest-api-response-page-emergency-level';

@Injectable()
export class EmergencyLevelControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage24
   */
  static readonly FindActivePage24Path = '/v1/emergency-levels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage24()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage24$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageEmergencyLevel>> {

    const rb = new RequestBuilder(this.rootUrl, EmergencyLevelControllerService.FindActivePage24Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageEmergencyLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage24(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageEmergencyLevel> {

    return this.findActivePage24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageEmergencyLevel>) => r.body as RestApiResponsePageEmergencyLevel)
    );
  }

  /**
   * Path part for operation update68
   */
  static readonly Update68Path = '/v1/emergency-levels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update68()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update68$Response(params: {
    body: EmergencyLevel
  }): Observable<StrictHttpResponse<RestApiResponseEmergencyLevel>> {

    const rb = new RequestBuilder(this.rootUrl, EmergencyLevelControllerService.Update68Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseEmergencyLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update68$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update68(params: {
    body: EmergencyLevel
  }): Observable<RestApiResponseEmergencyLevel> {

    return this.update68$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseEmergencyLevel>) => r.body as RestApiResponseEmergencyLevel)
    );
  }

  /**
   * Path part for operation create61
   */
  static readonly Create61Path = '/v1/emergency-levels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create61()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create61$Response(params: {
    body: EmergencyLevel
  }): Observable<StrictHttpResponse<RestApiResponseEmergencyLevel>> {

    const rb = new RequestBuilder(this.rootUrl, EmergencyLevelControllerService.Create61Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseEmergencyLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create61$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create61(params: {
    body: EmergencyLevel
  }): Observable<RestApiResponseEmergencyLevel> {

    return this.create61$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseEmergencyLevel>) => r.body as RestApiResponseEmergencyLevel)
    );
  }

  /**
   * Path part for operation getActiveEmergencyLevel
   */
  static readonly GetActiveEmergencyLevelPath = '/v1/emergency-levels/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveEmergencyLevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveEmergencyLevel$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseEmergencyLevel>> {

    const rb = new RequestBuilder(this.rootUrl, EmergencyLevelControllerService.GetActiveEmergencyLevelPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseEmergencyLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveEmergencyLevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveEmergencyLevel(params: {
    id: number;
  }): Observable<RestApiResponseEmergencyLevel> {

    return this.getActiveEmergencyLevel$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseEmergencyLevel>) => r.body as RestApiResponseEmergencyLevel)
    );
  }

}
