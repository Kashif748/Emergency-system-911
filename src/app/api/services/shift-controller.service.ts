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
import { RestApiResponseListShiftSnapshotResponse } from '../models/rest-api-response-list-shift-snapshot-response';
import { RestApiResponsePageShift } from '../models/rest-api-response-page-shift';
import { RestApiResponseShift } from '../models/rest-api-response-shift';
import { Shift } from '../models/shift';

@Injectable()
export class ShiftControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation update9
   */
  static readonly Update9Path = '/v1/shifts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update9()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update9$Response(params: {
    body: Shift
  }): Observable<StrictHttpResponse<RestApiResponseShift>> {

    const rb = new RequestBuilder(this.rootUrl, ShiftControllerService.Update9Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseShift>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update9$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update9(params: {
    body: Shift
  }): Observable<RestApiResponseShift> {

    return this.update9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseShift>) => r.body as RestApiResponseShift)
    );
  }

  /**
   * Path part for operation create9
   */
  static readonly Create9Path = '/v1/shifts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create9()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create9$Response(params: {
    body: Shift
  }): Observable<StrictHttpResponse<RestApiResponseShift>> {

    const rb = new RequestBuilder(this.rootUrl, ShiftControllerService.Create9Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseShift>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create9$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create9(params: {
    body: Shift
  }): Observable<RestApiResponseShift> {

    return this.create9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseShift>) => r.body as RestApiResponseShift)
    );
  }

  /**
   * Path part for operation getById
   */
  static readonly GetByIdPath = '/v1/shifts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseShift>> {

    const rb = new RequestBuilder(this.rootUrl, ShiftControllerService.GetByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseShift>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById(params: {
    id: number;
  }): Observable<RestApiResponseShift> {

    return this.getById$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseShift>) => r.body as RestApiResponseShift)
    );
  }

  /**
   * Path part for operation getAll3
   */
  static readonly GetAll3Path = '/v1/shifts/{configId}/details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll3()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll3$Response(params: {
    configId: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageShift>> {

    const rb = new RequestBuilder(this.rootUrl, ShiftControllerService.GetAll3Path, 'get');
    if (params) {
      rb.path('configId', params.configId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageShift>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll3(params: {
    configId: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageShift> {

    return this.getAll3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageShift>) => r.body as RestApiResponsePageShift)
    );
  }

  /**
   * Path part for operation snapshot
   */
  static readonly SnapshotPath = '/v1/shifts/snapshot';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `snapshot()` instead.
   *
   * This method doesn't expect any request body.
   */
  snapshot$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListShiftSnapshotResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ShiftControllerService.SnapshotPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListShiftSnapshotResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `snapshot$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  snapshot(params?: {
  }): Observable<RestApiResponseListShiftSnapshotResponse> {

    return this.snapshot$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListShiftSnapshotResponse>) => r.body as RestApiResponseListShiftSnapshotResponse)
    );
  }

}
