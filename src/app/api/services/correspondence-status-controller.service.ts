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

import { CorrespondenceStatus } from '../models/correspondence-status';
import { Pageable } from '../models/pageable';
import { RestApiResponseCorrespondenceStatus } from '../models/rest-api-response-correspondence-status';
import { RestApiResponsePageCorrespondenceStatus } from '../models/rest-api-response-page-correspondence-status';

@Injectable()
export class CorrespondenceStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation list5
   */
  static readonly List5Path = '/v1/correspondence-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list5()` instead.
   *
   * This method doesn't expect any request body.
   */
  list5$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageCorrespondenceStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceStatusControllerService.List5Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageCorrespondenceStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list5(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageCorrespondenceStatus> {

    return this.list5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageCorrespondenceStatus>) => r.body as RestApiResponsePageCorrespondenceStatus)
    );
  }

  /**
   * Path part for operation update68
   */
  static readonly Update68Path = '/v1/correspondence-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update68()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update68$Response(params: {
    body: CorrespondenceStatus
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceStatusControllerService.Update68Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCorrespondenceStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update68$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update68(params: {
    body: CorrespondenceStatus
  }): Observable<RestApiResponseCorrespondenceStatus> {

    return this.update68$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceStatus>) => r.body as RestApiResponseCorrespondenceStatus)
    );
  }

  /**
   * Path part for operation create64
   */
  static readonly Create64Path = '/v1/correspondence-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create64()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create64$Response(params: {
    body: CorrespondenceStatus
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceStatusControllerService.Create64Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCorrespondenceStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create64$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create64(params: {
    body: CorrespondenceStatus
  }): Observable<RestApiResponseCorrespondenceStatus> {

    return this.create64$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceStatus>) => r.body as RestApiResponseCorrespondenceStatus)
    );
  }

  /**
   * Path part for operation get24
   */
  static readonly Get24Path = '/v1/correspondence-statuses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get24()` instead.
   *
   * This method doesn't expect any request body.
   */
  get24$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceStatusControllerService.Get24Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCorrespondenceStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get24(params: {
    id: number;
  }): Observable<RestApiResponseCorrespondenceStatus> {

    return this.get24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceStatus>) => r.body as RestApiResponseCorrespondenceStatus)
    );
  }

}
