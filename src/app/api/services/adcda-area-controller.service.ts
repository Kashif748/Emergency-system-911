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

import { AdcdaArea } from '../models/adcda-area';
import { Pageable } from '../models/pageable';
import { RestApiResponseAdcdaArea } from '../models/rest-api-response-adcda-area';
import { RestApiResponsePageAdcdaArea } from '../models/rest-api-response-page-adcda-area';

@Injectable()
export class AdcdaAreaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage31
   */
  static readonly FindActivePage31Path = '/v1/adcda-area';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage31()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage31$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAdcdaArea>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAreaControllerService.FindActivePage31Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageAdcdaArea>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage31$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage31(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAdcdaArea> {

    return this.findActivePage31$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAdcdaArea>) => r.body as RestApiResponsePageAdcdaArea)
    );
  }

  /**
   * Path part for operation update127
   */
  static readonly Update127Path = '/v1/adcda-area';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update127()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update127$Response(params: {
    body: AdcdaArea
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaArea>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAreaControllerService.Update127Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaArea>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update127$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update127(params: {
    body: AdcdaArea
  }): Observable<RestApiResponseAdcdaArea> {

    return this.update127$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaArea>) => r.body as RestApiResponseAdcdaArea)
    );
  }

  /**
   * Path part for operation create83
   */
  static readonly Create83Path = '/v1/adcda-area';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create83()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create83$Response(params: {
    body: AdcdaArea
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaArea>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAreaControllerService.Create83Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaArea>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create83$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create83(params: {
    body: AdcdaArea
  }): Observable<RestApiResponseAdcdaArea> {

    return this.create83$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaArea>) => r.body as RestApiResponseAdcdaArea)
    );
  }

  /**
   * Path part for operation getActiveAdcdaArea
   */
  static readonly GetActiveAdcdaAreaPath = '/v1/adcda-area/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveAdcdaArea()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAdcdaArea$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaArea>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAreaControllerService.GetActiveAdcdaAreaPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaArea>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveAdcdaArea$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAdcdaArea(params: {
    id: number;
  }): Observable<RestApiResponseAdcdaArea> {

    return this.getActiveAdcdaArea$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaArea>) => r.body as RestApiResponseAdcdaArea)
    );
  }

}
