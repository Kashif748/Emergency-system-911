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

import { City } from '../models/city';
import { Pageable } from '../models/pageable';
import { RestApiResponseCity } from '../models/rest-api-response-city';
import { RestApiResponsePageCity } from '../models/rest-api-response-page-city';

@Injectable()
export class CityControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation page10
   */
  static readonly Page10Path = '/v1/cities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page10()` instead.
   *
   * This method doesn't expect any request body.
   */
  page10$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageCity>> {

    const rb = new RequestBuilder(this.rootUrl, CityControllerService.Page10Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageCity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page10(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageCity> {

    return this.page10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageCity>) => r.body as RestApiResponsePageCity)
    );
  }

  /**
   * Path part for operation update72
   */
  static readonly Update72Path = '/v1/cities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update72()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update72$Response(params: {
    body: City
  }): Observable<StrictHttpResponse<RestApiResponseCity>> {

    const rb = new RequestBuilder(this.rootUrl, CityControllerService.Update72Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update72$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update72(params: {
    body: City
  }): Observable<RestApiResponseCity> {

    return this.update72$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCity>) => r.body as RestApiResponseCity)
    );
  }

  /**
   * Path part for operation create67
   */
  static readonly Create67Path = '/v1/cities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create67()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create67$Response(params: {
    body: City
  }): Observable<StrictHttpResponse<RestApiResponseCity>> {

    const rb = new RequestBuilder(this.rootUrl, CityControllerService.Create67Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create67$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create67(params: {
    body: City
  }): Observable<RestApiResponseCity> {

    return this.create67$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCity>) => r.body as RestApiResponseCity)
    );
  }

  /**
   * Path part for operation get26
   */
  static readonly Get26Path = '/v1/cities/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get26()` instead.
   *
   * This method doesn't expect any request body.
   */
  get26$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseCity>> {

    const rb = new RequestBuilder(this.rootUrl, CityControllerService.Get26Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCity>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get26$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get26(params: {
    id: number;
  }): Observable<RestApiResponseCity> {

    return this.get26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCity>) => r.body as RestApiResponseCity)
    );
  }

}
