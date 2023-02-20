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

import { Correspondence } from '../models/correspondence';
import { CorrespondenceTo } from '../models/correspondence-to';
import { Pageable } from '../models/pageable';
import { RestApiResponseCorrespondenceTo } from '../models/rest-api-response-correspondence-to';
import { RestApiResponsePageCorrespondenceTo } from '../models/rest-api-response-page-correspondence-to';

@Injectable()
export class CorrespondenceToControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation list4
   */
  static readonly List4Path = '/v1/correspondence/{correspondenceId}/to';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list4()` instead.
   *
   * This method doesn't expect any request body.
   */
  list4$Response(params: {
    correspondenceId: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageCorrespondenceTo>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceToControllerService.List4Path, 'get');
    if (params) {
      rb.path('correspondenceId', params.correspondenceId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageCorrespondenceTo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list4(params: {
    correspondenceId: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageCorrespondenceTo> {

    return this.list4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageCorrespondenceTo>) => r.body as RestApiResponsePageCorrespondenceTo)
    );
  }

  /**
   * Path part for operation update69
   */
  static readonly Update69Path = '/v1/correspondence/{correspondenceId}/to';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update69()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update69$Response(params: {
    correspondenceId: Correspondence;
    body: CorrespondenceTo
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceTo>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceToControllerService.Update69Path, 'put');
    if (params) {
      rb.path('correspondenceId', params.correspondenceId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCorrespondenceTo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update69$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update69(params: {
    correspondenceId: Correspondence;
    body: CorrespondenceTo
  }): Observable<RestApiResponseCorrespondenceTo> {

    return this.update69$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceTo>) => r.body as RestApiResponseCorrespondenceTo)
    );
  }

  /**
   * Path part for operation create64
   */
  static readonly Create64Path = '/v1/correspondence/{correspondenceId}/to';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create64()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create64$Response(params: {
    correspondenceId: Correspondence;
    body: CorrespondenceTo
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceTo>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceToControllerService.Create64Path, 'post');
    if (params) {
      rb.path('correspondenceId', params.correspondenceId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCorrespondenceTo>;
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
    correspondenceId: Correspondence;
    body: CorrespondenceTo
  }): Observable<RestApiResponseCorrespondenceTo> {

    return this.create64$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceTo>) => r.body as RestApiResponseCorrespondenceTo)
    );
  }

  /**
   * Path part for operation get23
   */
  static readonly Get23Path = '/v1/correspondence/{correspondenceId}/to/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get23()` instead.
   *
   * This method doesn't expect any request body.
   */
  get23$Response(params: {
    correspondenceId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceTo>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceToControllerService.Get23Path, 'get');
    if (params) {
      rb.path('correspondenceId', params.correspondenceId, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCorrespondenceTo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get23(params: {
    correspondenceId: number;
    id: number;
  }): Observable<RestApiResponseCorrespondenceTo> {

    return this.get23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceTo>) => r.body as RestApiResponseCorrespondenceTo)
    );
  }

}
