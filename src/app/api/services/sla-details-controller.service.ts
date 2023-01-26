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
import { RestApiResponseListSlaDetails } from '../models/rest-api-response-list-sla-details';
import { RestApiResponsePageSlaDetails } from '../models/rest-api-response-page-sla-details';
import { RestApiResponseSlaDetails } from '../models/rest-api-response-sla-details';
import { SlaDetails } from '../models/sla-details';

@Injectable()
export class SlaDetailsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation page1
   */
  static readonly Page1Path = '/v1/sla-details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page1()` instead.
   *
   * This method doesn't expect any request body.
   */
  page1$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageSlaDetails>> {

    const rb = new RequestBuilder(this.rootUrl, SlaDetailsControllerService.Page1Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageSlaDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page1(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageSlaDetails> {

    return this.page1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageSlaDetails>) => r.body as RestApiResponsePageSlaDetails)
    );
  }

  /**
   * Path part for operation update7
   */
  static readonly Update7Path = '/v1/sla-details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update7()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update7$Response(params: {
    body: SlaDetails
  }): Observable<StrictHttpResponse<RestApiResponseSlaDetails>> {

    const rb = new RequestBuilder(this.rootUrl, SlaDetailsControllerService.Update7Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSlaDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update7$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update7(params: {
    body: SlaDetails
  }): Observable<RestApiResponseSlaDetails> {

    return this.update7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSlaDetails>) => r.body as RestApiResponseSlaDetails)
    );
  }

  /**
   * Path part for operation create7
   */
  static readonly Create7Path = '/v1/sla-details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create7()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create7$Response(params: {
    body: SlaDetails
  }): Observable<StrictHttpResponse<RestApiResponseSlaDetails>> {

    const rb = new RequestBuilder(this.rootUrl, SlaDetailsControllerService.Create7Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSlaDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create7$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create7(params: {
    body: SlaDetails
  }): Observable<RestApiResponseSlaDetails> {

    return this.create7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSlaDetails>) => r.body as RestApiResponseSlaDetails)
    );
  }

  /**
   * Path part for operation updateAll
   */
  static readonly UpdateAllPath = '/v1/sla-details/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateAll()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAll$Response(params: {
    body: Array<SlaDetails>
  }): Observable<StrictHttpResponse<RestApiResponseListSlaDetails>> {

    const rb = new RequestBuilder(this.rootUrl, SlaDetailsControllerService.UpdateAllPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListSlaDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateAll$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateAll(params: {
    body: Array<SlaDetails>
  }): Observable<RestApiResponseListSlaDetails> {

    return this.updateAll$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListSlaDetails>) => r.body as RestApiResponseListSlaDetails)
    );
  }

  /**
   * Path part for operation createAll
   */
  static readonly CreateAllPath = '/v1/sla-details/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAll()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAll$Response(params: {
    body: Array<SlaDetails>
  }): Observable<StrictHttpResponse<RestApiResponseListSlaDetails>> {

    const rb = new RequestBuilder(this.rootUrl, SlaDetailsControllerService.CreateAllPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListSlaDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAll$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAll(params: {
    body: Array<SlaDetails>
  }): Observable<RestApiResponseListSlaDetails> {

    return this.createAll$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListSlaDetails>) => r.body as RestApiResponseListSlaDetails)
    );
  }

  /**
   * Path part for operation get4
   */
  static readonly Get4Path = '/v1/sla-details/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get4()` instead.
   *
   * This method doesn't expect any request body.
   */
  get4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseSlaDetails>> {

    const rb = new RequestBuilder(this.rootUrl, SlaDetailsControllerService.Get4Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSlaDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get4(params: {
    id: number;
  }): Observable<RestApiResponseSlaDetails> {

    return this.get4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSlaDetails>) => r.body as RestApiResponseSlaDetails)
    );
  }

}
