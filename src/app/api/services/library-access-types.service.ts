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

import { LibraryAccessType } from '../models/library-access-type';
import { RestApiResponseLibraryAccessType } from '../models/rest-api-response-library-access-type';
import { RestApiResponseListLibraryAccessType } from '../models/rest-api-response-list-library-access-type';

@Injectable()
export class LibraryAccessTypesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll6
   */
  static readonly GetAll6Path = '/v1/library/accesstypes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll6()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll6$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListLibraryAccessType>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryAccessTypesService.GetAll6Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListLibraryAccessType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll6(params?: {
  }): Observable<RestApiResponseListLibraryAccessType> {

    return this.getAll6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListLibraryAccessType>) => r.body as RestApiResponseListLibraryAccessType)
    );
  }

  /**
   * Path part for operation update26
   */
  static readonly Update26Path = '/v1/library/accesstypes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update26()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update26$Response(params: {
    body: LibraryAccessType
  }): Observable<StrictHttpResponse<RestApiResponseLibraryAccessType>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryAccessTypesService.Update26Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLibraryAccessType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update26$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update26(params: {
    body: LibraryAccessType
  }): Observable<RestApiResponseLibraryAccessType> {

    return this.update26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLibraryAccessType>) => r.body as RestApiResponseLibraryAccessType)
    );
  }

  /**
   * Path part for operation save1
   */
  static readonly Save1Path = '/v1/library/accesstypes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save1$Response(params: {
    body: LibraryAccessType
  }): Observable<StrictHttpResponse<RestApiResponseLibraryAccessType>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryAccessTypesService.Save1Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLibraryAccessType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `save1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save1(params: {
    body: LibraryAccessType
  }): Observable<RestApiResponseLibraryAccessType> {

    return this.save1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLibraryAccessType>) => r.body as RestApiResponseLibraryAccessType)
    );
  }

  /**
   * Path part for operation delete14
   */
  static readonly Delete14Path = '/v1/library/accesstypes/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete14()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete14$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseLibraryAccessType>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryAccessTypesService.Delete14Path, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLibraryAccessType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete14(params: {
    id: number;
  }): Observable<RestApiResponseLibraryAccessType> {

    return this.delete14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLibraryAccessType>) => r.body as RestApiResponseLibraryAccessType)
    );
  }

}
