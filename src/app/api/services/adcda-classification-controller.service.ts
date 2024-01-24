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

import { AdcdaClassification } from '../models/adcda-classification';
import { Pageable } from '../models/pageable';
import { RestApiResponseAdcdaClassification } from '../models/rest-api-response-adcda-classification';
import { RestApiResponsePageAdcdaClassification } from '../models/rest-api-response-page-adcda-classification';

@Injectable()
export class AdcdaClassificationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage30
   */
  static readonly FindActivePage30Path = '/v1/adcda-classification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage30()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage30$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAdcdaClassification>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaClassificationControllerService.FindActivePage30Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageAdcdaClassification>;
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
  }): Observable<RestApiResponsePageAdcdaClassification> {

    return this.findActivePage30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAdcdaClassification>) => r.body as RestApiResponsePageAdcdaClassification)
    );
  }

  /**
   * Path part for operation update126
   */
  static readonly Update126Path = '/v1/adcda-classification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update126()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update126$Response(params: {
    body: AdcdaClassification
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaClassification>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaClassificationControllerService.Update126Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaClassification>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update126$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update126(params: {
    body: AdcdaClassification
  }): Observable<RestApiResponseAdcdaClassification> {

    return this.update126$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaClassification>) => r.body as RestApiResponseAdcdaClassification)
    );
  }

  /**
   * Path part for operation create82
   */
  static readonly Create82Path = '/v1/adcda-classification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create82()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create82$Response(params: {
    body: AdcdaClassification
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaClassification>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaClassificationControllerService.Create82Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaClassification>;
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
    body: AdcdaClassification
  }): Observable<RestApiResponseAdcdaClassification> {

    return this.create82$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaClassification>) => r.body as RestApiResponseAdcdaClassification)
    );
  }

  /**
   * Path part for operation getActiveAdcdaClassification
   */
  static readonly GetActiveAdcdaClassificationPath = '/v1/adcda-classification/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveAdcdaClassification()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAdcdaClassification$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaClassification>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaClassificationControllerService.GetActiveAdcdaClassificationPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcdaClassification>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveAdcdaClassification$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveAdcdaClassification(params: {
    id: number;
  }): Observable<RestApiResponseAdcdaClassification> {

    return this.getActiveAdcdaClassification$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaClassification>) => r.body as RestApiResponseAdcdaClassification)
    );
  }

}
