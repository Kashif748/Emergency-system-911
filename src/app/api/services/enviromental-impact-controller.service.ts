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

import { EnviromentalImpact } from '../models/enviromental-impact';
import { Pageable } from '../models/pageable';
import { RestApiResponseEnviromentalImpact } from '../models/rest-api-response-enviromental-impact';
import { RestApiResponsePageEnviromentalImpact } from '../models/rest-api-response-page-enviromental-impact';

@Injectable()
export class EnviromentalImpactControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage22
   */
  static readonly FindActivePage22Path = '/v1/enviromental-impacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage22()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage22$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageEnviromentalImpact>> {

    const rb = new RequestBuilder(this.rootUrl, EnviromentalImpactControllerService.FindActivePage22Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageEnviromentalImpact>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage22(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageEnviromentalImpact> {

    return this.findActivePage22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageEnviromentalImpact>) => r.body as RestApiResponsePageEnviromentalImpact)
    );
  }

  /**
   * Path part for operation update64
   */
  static readonly Update64Path = '/v1/enviromental-impacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update64()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update64$Response(params: {
    body: EnviromentalImpact
  }): Observable<StrictHttpResponse<RestApiResponseEnviromentalImpact>> {

    const rb = new RequestBuilder(this.rootUrl, EnviromentalImpactControllerService.Update64Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseEnviromentalImpact>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update64$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update64(params: {
    body: EnviromentalImpact
  }): Observable<RestApiResponseEnviromentalImpact> {

    return this.update64$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseEnviromentalImpact>) => r.body as RestApiResponseEnviromentalImpact)
    );
  }

  /**
   * Path part for operation create58
   */
  static readonly Create58Path = '/v1/enviromental-impacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create58()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create58$Response(params: {
    body: EnviromentalImpact
  }): Observable<StrictHttpResponse<RestApiResponseEnviromentalImpact>> {

    const rb = new RequestBuilder(this.rootUrl, EnviromentalImpactControllerService.Create58Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseEnviromentalImpact>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create58$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create58(params: {
    body: EnviromentalImpact
  }): Observable<RestApiResponseEnviromentalImpact> {

    return this.create58$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseEnviromentalImpact>) => r.body as RestApiResponseEnviromentalImpact)
    );
  }

  /**
   * Path part for operation getActiveEnviromentalImpact
   */
  static readonly GetActiveEnviromentalImpactPath = '/v1/enviromental-impacts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveEnviromentalImpact()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveEnviromentalImpact$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseEnviromentalImpact>> {

    const rb = new RequestBuilder(this.rootUrl, EnviromentalImpactControllerService.GetActiveEnviromentalImpactPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseEnviromentalImpact>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveEnviromentalImpact$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveEnviromentalImpact(params: {
    id: number;
  }): Observable<RestApiResponseEnviromentalImpact> {

    return this.getActiveEnviromentalImpact$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseEnviromentalImpact>) => r.body as RestApiResponseEnviromentalImpact)
    );
  }

}
