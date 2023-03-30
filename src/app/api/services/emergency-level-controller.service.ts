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
   * Path part for operation findActivePage23
   */
  static readonly FindActivePage23Path = '/v1/emergency-levels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage23()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage23$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageEmergencyLevel>> {

    const rb = new RequestBuilder(this.rootUrl, EmergencyLevelControllerService.FindActivePage23Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage23(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageEmergencyLevel> {

    return this.findActivePage23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageEmergencyLevel>) => r.body as RestApiResponsePageEmergencyLevel)
    );
  }

  /**
   * Path part for operation update65
   */
  static readonly Update65Path = '/v1/emergency-levels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update65()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update65$Response(params: {
    body: EmergencyLevel
  }): Observable<StrictHttpResponse<RestApiResponseEmergencyLevel>> {

    const rb = new RequestBuilder(this.rootUrl, EmergencyLevelControllerService.Update65Path, 'put');
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
   * To access the full response (for headers, for example), `update65$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update65(params: {
    body: EmergencyLevel
  }): Observable<RestApiResponseEmergencyLevel> {

    return this.update65$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseEmergencyLevel>) => r.body as RestApiResponseEmergencyLevel)
    );
  }

  /**
   * Path part for operation create59
   */
  static readonly Create59Path = '/v1/emergency-levels';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create59()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create59$Response(params: {
    body: EmergencyLevel
  }): Observable<StrictHttpResponse<RestApiResponseEmergencyLevel>> {

    const rb = new RequestBuilder(this.rootUrl, EmergencyLevelControllerService.Create59Path, 'post');
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
   * To access the full response (for headers, for example), `create59$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create59(params: {
    body: EmergencyLevel
  }): Observable<RestApiResponseEmergencyLevel> {

    return this.create59$Response(params).pipe(
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
