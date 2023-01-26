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

import { Pageable } from '../models/pageable';
import { RestApiResponsePageShiftConfiguration } from '../models/rest-api-response-page-shift-configuration';
import { RestApiResponseShiftConfiguration } from '../models/rest-api-response-shift-configuration';
import { ShiftConfiguration } from '../models/shift-configuration';

@Injectable()
export class ShiftConfigurationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll4
   */
  static readonly GetAll4Path = '/v1/shifts/configuration';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll4()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll4$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageShiftConfiguration>> {

    const rb = new RequestBuilder(this.rootUrl, ShiftConfigurationControllerService.GetAll4Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageShiftConfiguration>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll4(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageShiftConfiguration> {

    return this.getAll4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageShiftConfiguration>) => r.body as RestApiResponsePageShiftConfiguration)
    );
  }

  /**
   * Path part for operation update8
   */
  static readonly Update8Path = '/v1/shifts/configuration';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update8()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update8$Response(params: {
    body: ShiftConfiguration
  }): Observable<StrictHttpResponse<RestApiResponseShiftConfiguration>> {

    const rb = new RequestBuilder(this.rootUrl, ShiftConfigurationControllerService.Update8Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseShiftConfiguration>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update8$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update8(params: {
    body: ShiftConfiguration
  }): Observable<RestApiResponseShiftConfiguration> {

    return this.update8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseShiftConfiguration>) => r.body as RestApiResponseShiftConfiguration)
    );
  }

  /**
   * Path part for operation create8
   */
  static readonly Create8Path = '/v1/shifts/configuration';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create8()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create8$Response(params: {
    body: ShiftConfiguration
  }): Observable<StrictHttpResponse<RestApiResponseShiftConfiguration>> {

    const rb = new RequestBuilder(this.rootUrl, ShiftConfigurationControllerService.Create8Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseShiftConfiguration>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create8$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create8(params: {
    body: ShiftConfiguration
  }): Observable<RestApiResponseShiftConfiguration> {

    return this.create8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseShiftConfiguration>) => r.body as RestApiResponseShiftConfiguration)
    );
  }

  /**
   * Path part for operation getById1
   */
  static readonly GetById1Path = '/v1/shifts/configuration/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseShiftConfiguration>> {

    const rb = new RequestBuilder(this.rootUrl, ShiftConfigurationControllerService.GetById1Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseShiftConfiguration>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById1(params: {
    id: number;
  }): Observable<RestApiResponseShiftConfiguration> {

    return this.getById1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseShiftConfiguration>) => r.body as RestApiResponseShiftConfiguration)
    );
  }

}
