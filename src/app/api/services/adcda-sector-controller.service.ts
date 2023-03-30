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
   * Path part for operation update82
   */
  static readonly Update82Path = '/v1/adcda-sector';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update82()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update82$Response(params: {
    body: AdcdaSector
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaSector>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaSectorControllerService.Update82Path, 'put');
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
   * To access the full response (for headers, for example), `update82$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update82(params: {
    body: AdcdaSector
  }): Observable<RestApiResponseAdcdaSector> {

    return this.update82$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaSector>) => r.body as RestApiResponseAdcdaSector)
    );
  }

  /**
   * Path part for operation create77
   */
  static readonly Create77Path = '/v1/adcda-sector';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create77()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create77$Response(params: {
    body: AdcdaSector
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaSector>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaSectorControllerService.Create77Path, 'post');
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
   * To access the full response (for headers, for example), `create77$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create77(params: {
    body: AdcdaSector
  }): Observable<RestApiResponseAdcdaSector> {

    return this.create77$Response(params).pipe(
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
