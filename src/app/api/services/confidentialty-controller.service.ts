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

import { Confidentialty } from '../models/confidentialty';
import { Pageable } from '../models/pageable';
import { RestApiResponseConfidentialty } from '../models/rest-api-response-confidentialty';
import { RestApiResponsePageConfidentialty } from '../models/rest-api-response-page-confidentialty';

@Injectable()
export class ConfidentialtyControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation page11
   */
  static readonly Page11Path = '/v1/circular-confidentialties';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page11()` instead.
   *
   * This method doesn't expect any request body.
   */
  page11$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageConfidentialty>> {

    const rb = new RequestBuilder(this.rootUrl, ConfidentialtyControllerService.Page11Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageConfidentialty>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page11(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageConfidentialty> {

    return this.page11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageConfidentialty>) => r.body as RestApiResponsePageConfidentialty)
    );
  }

  /**
   * Path part for operation update77
   */
  static readonly Update77Path = '/v1/circular-confidentialties';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update77()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update77$Response(params: {
    body: Confidentialty
  }): Observable<StrictHttpResponse<RestApiResponseConfidentialty>> {

    const rb = new RequestBuilder(this.rootUrl, ConfidentialtyControllerService.Update77Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseConfidentialty>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update77$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update77(params: {
    body: Confidentialty
  }): Observable<RestApiResponseConfidentialty> {

    return this.update77$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseConfidentialty>) => r.body as RestApiResponseConfidentialty)
    );
  }

  /**
   * Path part for operation create72
   */
  static readonly Create72Path = '/v1/circular-confidentialties';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create72()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create72$Response(params: {
    body: Confidentialty
  }): Observable<StrictHttpResponse<RestApiResponseConfidentialty>> {

    const rb = new RequestBuilder(this.rootUrl, ConfidentialtyControllerService.Create72Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseConfidentialty>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create72$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create72(params: {
    body: Confidentialty
  }): Observable<RestApiResponseConfidentialty> {

    return this.create72$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseConfidentialty>) => r.body as RestApiResponseConfidentialty)
    );
  }

  /**
   * Path part for operation get28
   */
  static readonly Get28Path = '/v1/circular-confidentialties/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get28()` instead.
   *
   * This method doesn't expect any request body.
   */
  get28$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseConfidentialty>> {

    const rb = new RequestBuilder(this.rootUrl, ConfidentialtyControllerService.Get28Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseConfidentialty>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get28$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get28(params: {
    id: number;
  }): Observable<RestApiResponseConfidentialty> {

    return this.get28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseConfidentialty>) => r.body as RestApiResponseConfidentialty)
    );
  }

}
