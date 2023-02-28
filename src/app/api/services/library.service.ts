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

import { BaseLibrary } from '../models/base-library';
import { Pageable } from '../models/pageable';
import { RestApiResponseBaseLibrary } from '../models/rest-api-response-base-library';
import { RestApiResponseObject } from '../models/rest-api-response-object';
import { RestApiResponsePageBaseLibraryProjection } from '../models/rest-api-response-page-base-library-projection';

@Injectable()
export class LibraryService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getLibrary1
   */
  static readonly GetLibrary1Path = '/v1/library';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLibrary1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLibrary1$Response(params: {
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBaseLibraryProjection>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryService.GetLibrary1Path, 'get');
    if (params) {
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBaseLibraryProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLibrary1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLibrary1(params: {
    page: Pageable;
  }): Observable<RestApiResponsePageBaseLibraryProjection> {

    return this.getLibrary1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBaseLibraryProjection>) => r.body as RestApiResponsePageBaseLibraryProjection)
    );
  }

  /**
   * Path part for operation update28
   */
  static readonly Update28Path = '/v1/library';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update28()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update28$Response(params: {
    body: BaseLibrary
  }): Observable<StrictHttpResponse<RestApiResponseBaseLibrary>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryService.Update28Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBaseLibrary>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update28$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update28(params: {
    body: BaseLibrary
  }): Observable<RestApiResponseBaseLibrary> {

    return this.update28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBaseLibrary>) => r.body as RestApiResponseBaseLibrary)
    );
  }

  /**
   * Path part for operation save2
   */
  static readonly Save2Path = '/v1/library';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save2$Response(params: {
    body: BaseLibrary
  }): Observable<StrictHttpResponse<RestApiResponseBaseLibrary>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryService.Save2Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBaseLibrary>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `save2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save2(params: {
    body: BaseLibrary
  }): Observable<RestApiResponseBaseLibrary> {

    return this.save2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBaseLibrary>) => r.body as RestApiResponseBaseLibrary)
    );
  }

  /**
   * Path part for operation searchLibrary
   */
  static readonly SearchLibraryPath = '/v1/library/search/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchLibrary()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchLibrary$Response(params: {
    id: number;
    name: string;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBaseLibraryProjection>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryService.SearchLibraryPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('name', params.name, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBaseLibraryProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `searchLibrary$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchLibrary(params: {
    id: number;
    name: string;
    page: Pageable;
  }): Observable<RestApiResponsePageBaseLibraryProjection> {

    return this.searchLibrary$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBaseLibraryProjection>) => r.body as RestApiResponsePageBaseLibraryProjection)
    );
  }

  /**
   * Path part for operation getLibrary
   */
  static readonly GetLibraryPath = '/v1/library/parent/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLibrary()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLibrary$Response(params: {
    id: number;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBaseLibraryProjection>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryService.GetLibraryPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBaseLibraryProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLibrary$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLibrary(params: {
    id: number;
    page: Pageable;
  }): Observable<RestApiResponsePageBaseLibraryProjection> {

    return this.getLibrary$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBaseLibraryProjection>) => r.body as RestApiResponsePageBaseLibraryProjection)
    );
  }

  /**
   * Path part for operation delete13
   */
  static readonly Delete13Path = '/v1/library/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete13()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete13$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryService.Delete13Path, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete13(params: {
    id: number;
  }): Observable<RestApiResponseObject> {

    return this.delete13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

}
