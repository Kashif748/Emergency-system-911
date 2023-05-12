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

import { Module } from '../models/module';
import { RestApiResponseListModule } from '../models/rest-api-response-list-module';
import { RestApiResponseModule } from '../models/rest-api-response-module';

@Injectable()
export class ModuleControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation list1
   */
  static readonly List1Path = '/v1/modules';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list1()` instead.
   *
   * This method doesn't expect any request body.
   */
  list1$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListModule>> {

    const rb = new RequestBuilder(this.rootUrl, ModuleControllerService.List1Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListModule>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list1(params?: {
  }): Observable<RestApiResponseListModule> {

    return this.list1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListModule>) => r.body as RestApiResponseListModule)
    );
  }

  /**
   * Path part for operation update25
   */
  static readonly Update25Path = '/v1/modules';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update25()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update25$Response(params: {
    body: Module
  }): Observable<StrictHttpResponse<RestApiResponseModule>> {

    const rb = new RequestBuilder(this.rootUrl, ModuleControllerService.Update25Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseModule>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update25$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update25(params: {
    body: Module
  }): Observable<RestApiResponseModule> {

    return this.update25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseModule>) => r.body as RestApiResponseModule)
    );
  }

  /**
   * Path part for operation create23
   */
  static readonly Create23Path = '/v1/modules';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create23()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create23$Response(params: {
    body: Module
  }): Observable<StrictHttpResponse<RestApiResponseModule>> {

    const rb = new RequestBuilder(this.rootUrl, ModuleControllerService.Create23Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseModule>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create23$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create23(params: {
    body: Module
  }): Observable<RestApiResponseModule> {

    return this.create23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseModule>) => r.body as RestApiResponseModule)
    );
  }

  /**
   * Path part for operation get13
   */
  static readonly Get13Path = '/v1/modules/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get13()` instead.
   *
   * This method doesn't expect any request body.
   */
  get13$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseModule>> {

    const rb = new RequestBuilder(this.rootUrl, ModuleControllerService.Get13Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseModule>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get13(params: {
    id: number;
  }): Observable<RestApiResponseModule> {

    return this.get13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseModule>) => r.body as RestApiResponseModule)
    );
  }

}
