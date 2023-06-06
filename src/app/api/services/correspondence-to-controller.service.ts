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
   * Path part for operation update71
   */
  static readonly Update71Path = '/v1/correspondence/{correspondenceId}/to';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update71()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update71$Response(params: {
    correspondenceId: Correspondence;
    body: CorrespondenceTo
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceTo>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceToControllerService.Update71Path, 'put');
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
   * To access the full response (for headers, for example), `update71$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update71(params: {
    correspondenceId: Correspondence;
    body: CorrespondenceTo
  }): Observable<RestApiResponseCorrespondenceTo> {

    return this.update71$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceTo>) => r.body as RestApiResponseCorrespondenceTo)
    );
  }

  /**
   * Path part for operation create66
   */
  static readonly Create66Path = '/v1/correspondence/{correspondenceId}/to';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create66()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create66$Response(params: {
    correspondenceId: Correspondence;
    body: CorrespondenceTo
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceTo>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceToControllerService.Create66Path, 'post');
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
   * To access the full response (for headers, for example), `create66$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create66(params: {
    correspondenceId: Correspondence;
    body: CorrespondenceTo
  }): Observable<RestApiResponseCorrespondenceTo> {

    return this.create66$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceTo>) => r.body as RestApiResponseCorrespondenceTo)
    );
  }

  /**
   * Path part for operation get24
   */
  static readonly Get24Path = '/v1/correspondence/{correspondenceId}/to/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get24()` instead.
   *
   * This method doesn't expect any request body.
   */
  get24$Response(params: {
    correspondenceId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceTo>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceToControllerService.Get24Path, 'get');
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
   * To access the full response (for headers, for example), `get24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get24(params: {
    correspondenceId: number;
    id: number;
  }): Observable<RestApiResponseCorrespondenceTo> {

    return this.get24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceTo>) => r.body as RestApiResponseCorrespondenceTo)
    );
  }

}
