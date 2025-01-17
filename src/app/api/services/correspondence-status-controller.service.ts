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
   * Path part for operation update74
   */
  static readonly Update74Path = '/v1/correspondence-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update74()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update74$Response(params: {
    body: CorrespondenceStatus
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceStatusControllerService.Update74Path, 'put');
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
   * To access the full response (for headers, for example), `update74$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update74(params: {
    body: CorrespondenceStatus
  }): Observable<RestApiResponseCorrespondenceStatus> {

    return this.update74$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceStatus>) => r.body as RestApiResponseCorrespondenceStatus)
    );
  }

  /**
   * Path part for operation create68
   */
  static readonly Create68Path = '/v1/correspondence-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create68()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create68$Response(params: {
    body: CorrespondenceStatus
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceStatusControllerService.Create68Path, 'post');
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
   * To access the full response (for headers, for example), `create68$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create68(params: {
    body: CorrespondenceStatus
  }): Observable<RestApiResponseCorrespondenceStatus> {

    return this.create68$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceStatus>) => r.body as RestApiResponseCorrespondenceStatus)
    );
  }

  /**
   * Path part for operation get25
   */
  static readonly Get25Path = '/v1/correspondence-statuses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get25()` instead.
   *
   * This method doesn't expect any request body.
   */
  get25$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceStatusControllerService.Get25Path, 'get');
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
   * To access the full response (for headers, for example), `get25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get25(params: {
    id: number;
  }): Observable<RestApiResponseCorrespondenceStatus> {

    return this.get25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceStatus>) => r.body as RestApiResponseCorrespondenceStatus)
    );
  }

}
