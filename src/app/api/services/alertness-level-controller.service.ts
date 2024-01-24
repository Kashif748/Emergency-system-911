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

import { AlertnessLevel } from '../models/alertness-level';
import { Pageable } from '../models/pageable';
import { RestApiResponseAlertnessLevel } from '../models/rest-api-response-alertness-level';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponsePageAlertnessLevel } from '../models/rest-api-response-page-alertness-level';

@Injectable()
export class AlertnessLevelControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete35
   */
  static readonly Delete35Path = '/v1/alertness-level/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete35()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete35$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, AlertnessLevelControllerService.Delete35Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete35$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete35(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete35$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation getByActivePage
   */
  static readonly GetByActivePagePath = '/v1/alertness-level';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByActivePage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByActivePage$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAlertnessLevel>> {

    const rb = new RequestBuilder(this.rootUrl, AlertnessLevelControllerService.GetByActivePagePath, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageAlertnessLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByActivePage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByActivePage(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAlertnessLevel> {

    return this.getByActivePage$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAlertnessLevel>) => r.body as RestApiResponsePageAlertnessLevel)
    );
  }

  /**
   * Path part for operation update122
   */
  static readonly Update122Path = '/v1/alertness-level';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update122()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update122$Response(params: {
    body: AlertnessLevel
  }): Observable<StrictHttpResponse<RestApiResponseAlertnessLevel>> {

    const rb = new RequestBuilder(this.rootUrl, AlertnessLevelControllerService.Update122Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAlertnessLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update122$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update122(params: {
    body: AlertnessLevel
  }): Observable<RestApiResponseAlertnessLevel> {

    return this.update122$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAlertnessLevel>) => r.body as RestApiResponseAlertnessLevel)
    );
  }

  /**
   * Path part for operation create78
   */
  static readonly Create78Path = '/v1/alertness-level';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create78()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create78$Response(params: {
    body: AlertnessLevel
  }): Observable<StrictHttpResponse<RestApiResponseAlertnessLevel>> {

    const rb = new RequestBuilder(this.rootUrl, AlertnessLevelControllerService.Create78Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAlertnessLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create78$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create78(params: {
    body: AlertnessLevel
  }): Observable<RestApiResponseAlertnessLevel> {

    return this.create78$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAlertnessLevel>) => r.body as RestApiResponseAlertnessLevel)
    );
  }

  /**
   * Path part for operation getById13
   */
  static readonly GetById13Path = '/v1/alertness-level/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById13()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById13$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAlertnessLevel>> {

    const rb = new RequestBuilder(this.rootUrl, AlertnessLevelControllerService.GetById13Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAlertnessLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById13(params: {
    id: number;
  }): Observable<RestApiResponseAlertnessLevel> {

    return this.getById13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAlertnessLevel>) => r.body as RestApiResponseAlertnessLevel)
    );
  }

}
