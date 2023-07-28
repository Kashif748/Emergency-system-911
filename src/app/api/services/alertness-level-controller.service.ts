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
   * Path part for operation delete34
   */
  static readonly Delete34Path = '/v1/alertness-level/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete34()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete34$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, AlertnessLevelControllerService.Delete34Path, 'put');
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
   * To access the full response (for headers, for example), `delete34$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete34(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete34$Response(params).pipe(
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
   * Path part for operation update108
   */
  static readonly Update108Path = '/v1/alertness-level';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update108()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update108$Response(params: {
    body: AlertnessLevel
  }): Observable<StrictHttpResponse<RestApiResponseAlertnessLevel>> {

    const rb = new RequestBuilder(this.rootUrl, AlertnessLevelControllerService.Update108Path, 'put');
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
   * To access the full response (for headers, for example), `update108$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update108(params: {
    body: AlertnessLevel
  }): Observable<RestApiResponseAlertnessLevel> {

    return this.update108$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAlertnessLevel>) => r.body as RestApiResponseAlertnessLevel)
    );
  }

  /**
   * Path part for operation create77
   */
  static readonly Create77Path = '/v1/alertness-level';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create77()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create77$Response(params: {
    body: AlertnessLevel
  }): Observable<StrictHttpResponse<RestApiResponseAlertnessLevel>> {

    const rb = new RequestBuilder(this.rootUrl, AlertnessLevelControllerService.Create77Path, 'post');
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
   * To access the full response (for headers, for example), `create77$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create77(params: {
    body: AlertnessLevel
  }): Observable<RestApiResponseAlertnessLevel> {

    return this.create77$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAlertnessLevel>) => r.body as RestApiResponseAlertnessLevel)
    );
  }

  /**
   * Path part for operation getById12
   */
  static readonly GetById12Path = '/v1/alertness-level/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById12()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById12$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAlertnessLevel>> {

    const rb = new RequestBuilder(this.rootUrl, AlertnessLevelControllerService.GetById12Path, 'get');
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
   * To access the full response (for headers, for example), `getById12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById12(params: {
    id: number;
  }): Observable<RestApiResponseAlertnessLevel> {

    return this.getById12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAlertnessLevel>) => r.body as RestApiResponseAlertnessLevel)
    );
  }

}
