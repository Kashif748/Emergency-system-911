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
   * Path part for operation update69
   */
  static readonly Update69Path = '/v1/cities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update69()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update69$Response(params: {
    body: City
  }): Observable<StrictHttpResponse<RestApiResponseCity>> {

    const rb = new RequestBuilder(this.rootUrl, CityControllerService.Update69Path, 'put');
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
   * To access the full response (for headers, for example), `update69$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update69(params: {
    body: City
  }): Observable<RestApiResponseCity> {

    return this.update69$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCity>) => r.body as RestApiResponseCity)
    );
  }

  /**
   * Path part for operation create65
   */
  static readonly Create65Path = '/v1/cities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create65()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create65$Response(params: {
    body: City
  }): Observable<StrictHttpResponse<RestApiResponseCity>> {

    const rb = new RequestBuilder(this.rootUrl, CityControllerService.Create65Path, 'post');
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
   * To access the full response (for headers, for example), `create65$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create65(params: {
    body: City
  }): Observable<RestApiResponseCity> {

    return this.create65$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCity>) => r.body as RestApiResponseCity)
    );
  }

  /**
   * Path part for operation get25
   */
  static readonly Get25Path = '/v1/cities/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get25()` instead.
   *
   * This method doesn't expect any request body.
   */
  get25$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseCity>> {

    const rb = new RequestBuilder(this.rootUrl, CityControllerService.Get25Path, 'get');
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
   * To access the full response (for headers, for example), `get25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get25(params: {
    id: number;
  }): Observable<RestApiResponseCity> {

    return this.get25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCity>) => r.body as RestApiResponseCity)
    );
  }

}
