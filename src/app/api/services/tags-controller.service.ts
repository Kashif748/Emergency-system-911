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

import { RestApiResponseListTag } from '../models/rest-api-response-list-tag';
import { RestApiResponseTag } from '../models/rest-api-response-tag';
import { Tag } from '../models/tag';

@Injectable()
export class TagsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActiveList1
   */
  static readonly FindActiveList1Path = '/v1/tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActiveList1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveList1$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListTag>> {

    const rb = new RequestBuilder(this.rootUrl, TagsControllerService.FindActiveList1Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListTag>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActiveList1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveList1(params?: {
  }): Observable<RestApiResponseListTag> {

    return this.findActiveList1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListTag>) => r.body as RestApiResponseListTag)
    );
  }

  /**
   * Path part for operation updateTag
   */
  static readonly UpdateTagPath = '/v1/tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTag()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTag$Response(params: {
    body: Tag
  }): Observable<StrictHttpResponse<RestApiResponseTag>> {

    const rb = new RequestBuilder(this.rootUrl, TagsControllerService.UpdateTagPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTag>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateTag$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTag(params: {
    body: Tag
  }): Observable<RestApiResponseTag> {

    return this.updateTag$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTag>) => r.body as RestApiResponseTag)
    );
  }

  /**
   * Path part for operation createTag
   */
  static readonly CreateTagPath = '/v1/tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createTag()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag$Response(params: {
    body: Tag
  }): Observable<StrictHttpResponse<RestApiResponseTag>> {

    const rb = new RequestBuilder(this.rootUrl, TagsControllerService.CreateTagPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTag>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createTag$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createTag(params: {
    body: Tag
  }): Observable<RestApiResponseTag> {

    return this.createTag$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTag>) => r.body as RestApiResponseTag)
    );
  }

  /**
   * Path part for operation findActiveListByModuleName
   */
  static readonly FindActiveListByModuleNamePath = '/v1/tags/{module}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActiveListByModuleName()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveListByModuleName$Response(params: {
    module: string;
  }): Observable<StrictHttpResponse<RestApiResponseListTag>> {

    const rb = new RequestBuilder(this.rootUrl, TagsControllerService.FindActiveListByModuleNamePath, 'get');
    if (params) {
      rb.path('module', params.module, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListTag>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActiveListByModuleName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveListByModuleName(params: {
    module: string;
  }): Observable<RestApiResponseListTag> {

    return this.findActiveListByModuleName$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListTag>) => r.body as RestApiResponseListTag)
    );
  }

}
