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
   * Path part for operation findActivePage29
   */
  static readonly FindActivePage29Path = '/v1/adcda-classification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage29()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage29$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAdcdaClassification>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaClassificationControllerService.FindActivePage29Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage29$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage29(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageAdcdaClassification> {

    return this.findActivePage29$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAdcdaClassification>) => r.body as RestApiResponsePageAdcdaClassification)
    );
  }

  /**
   * Path part for operation update109
   */
  static readonly Update109Path = '/v1/adcda-classification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update109()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update109$Response(params: {
    body: AdcdaClassification
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaClassification>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaClassificationControllerService.Update109Path, 'put');
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
   * To access the full response (for headers, for example), `update109$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update109(params: {
    body: AdcdaClassification
  }): Observable<RestApiResponseAdcdaClassification> {

    return this.update109$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcdaClassification>) => r.body as RestApiResponseAdcdaClassification)
    );
  }

  /**
   * Path part for operation create81
   */
  static readonly Create81Path = '/v1/adcda-classification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create81()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create81$Response(params: {
    body: AdcdaClassification
  }): Observable<StrictHttpResponse<RestApiResponseAdcdaClassification>> {

    const rb = new RequestBuilder(this.rootUrl, AdcdaClassificationControllerService.Create81Path, 'post');
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
   * To access the full response (for headers, for example), `create81$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create81(params: {
    body: AdcdaClassification
  }): Observable<RestApiResponseAdcdaClassification> {

    return this.create81$Response(params).pipe(
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
