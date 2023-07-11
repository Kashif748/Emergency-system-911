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
   * Path part for operation findActivePage30
   */
  static readonly FindActivePage30Path = '/v1/adcda-area';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage30()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage30$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAdcdaArea>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAreaControllerService.FindActivePage30Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage30$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage30(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAdcdaArea> {

    return this.findActivePage30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAdcdaArea>) => r.body as RestApiResponsePageAdcdaArea)
    );
  }

  /**
   * Path part for operation update110
   */
  static readonly Update110Path = '/v1/adcda-area';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update110()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update110$Response(params: {
    body: AdcdaArea
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaArea>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAreaControllerService.Update110Path, 'put');
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
   * To access the full response (for headers, for example), `update110$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update110(params: {
    body: AdcdaArea
  }): Observable<RestApiResponseAdcdaArea> {

    return this.update110$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaArea>) => r.body as RestApiResponseAdcdaArea)
    );
  }

  /**
   * Path part for operation create82
   */
  static readonly Create82Path = '/v1/adcda-area';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create82()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create82$Response(params: {
    body: AdcdaArea
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaArea>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaAreaControllerService.Create82Path, 'post');
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
   * To access the full response (for headers, for example), `create82$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create82(params: {
    body: AdcdaArea
  }): Observable<RestApiResponseAdcdaArea> {

    return this.create82$Response(params).pipe(
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
