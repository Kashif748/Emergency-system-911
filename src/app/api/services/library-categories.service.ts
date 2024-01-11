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

import { LibraryCategory } from '../models/library-category';
import { RestApiResponseLibraryCategory } from '../models/rest-api-response-library-category';
import { RestApiResponseListLibraryCategory } from '../models/rest-api-response-list-library-category';

@Injectable()
export class LibraryCategoriesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActiveList3
   */
  static readonly FindActiveList3Path = '/v1/library/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActiveList3()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveList3$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListLibraryCategory>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryCategoriesService.FindActiveList3Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListLibraryCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActiveList3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveList3(params?: {
  }): Observable<RestApiResponseListLibraryCategory> {

    return this.findActiveList3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListLibraryCategory>) => r.body as RestApiResponseListLibraryCategory)
    );
  }

  /**
   * Path part for operation update27
   */
  static readonly Update27Path = '/v1/library/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update27()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update27$Response(params: {
    body: LibraryCategory
  }): Observable<StrictHttpResponse<RestApiResponseLibraryCategory>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryCategoriesService.Update27Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLibraryCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update27$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update27(params: {
    body: LibraryCategory
  }): Observable<RestApiResponseLibraryCategory> {

    return this.update27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLibraryCategory>) => r.body as RestApiResponseLibraryCategory)
    );
  }

  /**
   * Path part for operation save
   */
  static readonly SavePath = '/v1/library/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save$Response(params: {
    body: LibraryCategory
  }): Observable<StrictHttpResponse<RestApiResponseLibraryCategory>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryCategoriesService.SavePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLibraryCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `save$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save(params: {
    body: LibraryCategory
  }): Observable<RestApiResponseLibraryCategory> {

    return this.save$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLibraryCategory>) => r.body as RestApiResponseLibraryCategory)
    );
  }

  /**
   * Path part for operation delete37
   */
  static readonly Delete37Path = '/v1/library/categories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete37()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete37$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseLibraryCategory>> {

    const rb = new RequestBuilder(this.rootUrl, LibraryCategoriesService.Delete37Path, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLibraryCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete37$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete37(params: {
    id: number;
  }): Observable<RestApiResponseLibraryCategory> {

    return this.delete37$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLibraryCategory>) => r.body as RestApiResponseLibraryCategory)
    );
  }

}
