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

import { AdcdaSector } from '../models/adcda-sector';
import { Pageable } from '../models/pageable';
import { RestApiResponseAdcdaSector } from '../models/rest-api-response-adcda-sector';
import { RestApiResponsePageAdcdaSector } from '../models/rest-api-response-page-adcda-sector';

@Injectable()
export class AdcdaSectorControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage27
   */
  static readonly FindActivePage27Path = '/v1/adcda-sector';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage27()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage27$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAdcdaSector>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaSectorControllerService.FindActivePage27Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageAdcdaSector>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage27$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage27(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAdcdaSector> {

    return this.findActivePage27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAdcdaSector>) => r.body as RestApiResponsePageAdcdaSector)
    );
  }

  /**
   * Path part for operation update92
   */
  static readonly Update92Path = '/v1/adcda-sector';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update92()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update92$Response(params: {
    body: AdcdaSector
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaSector>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaSectorControllerService.Update92Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaSector>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update92$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update92(params: {
    body: AdcdaSector
  }): Observable<RestApiResponseAdcdaSector> {

    return this.update92$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaSector>) => r.body as RestApiResponseAdcdaSector)
    );
  }

  /**
   * Path part for operation create78
   */
  static readonly Create78Path = '/v1/adcda-sector';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create78()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create78$Response(params: {
    body: AdcdaSector
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaSector>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaSectorControllerService.Create78Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaSector>;
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
    body: AdcdaSector
  }): Observable<RestApiResponseAdcdaSector> {

    return this.create78$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaSector>) => r.body as RestApiResponseAdcdaSector)
    );
  }

  /**
   * Path part for operation getActiveAdcdaSector
   */
  static readonly GetActiveAdcdaSectorPath = '/v1/adcda-sector/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveAdcdaSector()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAdcdaSector$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaSector>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaSectorControllerService.GetActiveAdcdaSectorPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaSector>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveAdcdaSector$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAdcdaSector(params: {
    id: number;
  }): Observable<RestApiResponseAdcdaSector> {

    return this.getActiveAdcdaSector$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaSector>) => r.body as RestApiResponseAdcdaSector)
    );
  }

}
