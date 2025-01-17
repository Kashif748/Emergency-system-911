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

import { IncidentCategory } from '../models/incident-category';
import { RestApiResponseIncidentCategoryProjaction } from '../models/rest-api-response-incident-category-projaction';
import { RestApiResponseListIncidentCategoryProjaction } from '../models/rest-api-response-list-incident-category-projaction';

@Injectable()
export class IncidentCategoryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActiveList4
   */
  static readonly FindActiveList4Path = '/v1/incident-categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActiveList4()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveList4$Response(params?: {
    enableChatBoot?: boolean;
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentCategoryProjaction>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentCategoryControllerService.FindActiveList4Path, 'get');
    if (params) {
      rb.query('enableChatBoot', params.enableChatBoot, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentCategoryProjaction>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActiveList4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveList4(params?: {
    enableChatBoot?: boolean;
  }): Observable<RestApiResponseListIncidentCategoryProjaction> {

    return this.findActiveList4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentCategoryProjaction>) => r.body as RestApiResponseListIncidentCategoryProjaction)
    );
  }

  /**
   * Path part for operation update46
   */
  static readonly Update46Path = '/v1/incident-categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update46()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update46$Response(params: {
    body: IncidentCategory
  }): Observable<StrictHttpResponse<RestApiResponseIncidentCategoryProjaction>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentCategoryControllerService.Update46Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentCategoryProjaction>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update46$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update46(params: {
    body: IncidentCategory
  }): Observable<RestApiResponseIncidentCategoryProjaction> {

    return this.update46$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentCategoryProjaction>) => r.body as RestApiResponseIncidentCategoryProjaction)
    );
  }

  /**
   * Path part for operation create41
   */
  static readonly Create41Path = '/v1/incident-categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create41()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create41$Response(params: {
    body: IncidentCategory
  }): Observable<StrictHttpResponse<RestApiResponseIncidentCategoryProjaction>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentCategoryControllerService.Create41Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentCategoryProjaction>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create41$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create41(params: {
    body: IncidentCategory
  }): Observable<RestApiResponseIncidentCategoryProjaction> {

    return this.create41$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentCategoryProjaction>) => r.body as RestApiResponseIncidentCategoryProjaction)
    );
  }

  /**
   * Path part for operation list3
   */
  static readonly List3Path = '/v1/incident-categories/{parentId}/children';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list3()` instead.
   *
   * This method doesn't expect any request body.
   */
  list3$Response(params: {
    enableChatBoot?: boolean;
    parentId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentCategoryProjaction>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentCategoryControllerService.List3Path, 'get');
    if (params) {
      rb.query('enableChatBoot', params.enableChatBoot, {});
      rb.path('parentId', params.parentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentCategoryProjaction>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list3(params: {
    enableChatBoot?: boolean;
    parentId: number;
  }): Observable<RestApiResponseListIncidentCategoryProjaction> {

    return this.list3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentCategoryProjaction>) => r.body as RestApiResponseListIncidentCategoryProjaction)
    );
  }

  /**
   * Path part for operation getActiveIncidentCategory
   */
  static readonly GetActiveIncidentCategoryPath = '/v1/incident-categories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveIncidentCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveIncidentCategory$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentCategoryProjaction>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentCategoryControllerService.GetActiveIncidentCategoryPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentCategoryProjaction>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveIncidentCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveIncidentCategory(params: {
    id: number;
  }): Observable<RestApiResponseIncidentCategoryProjaction> {

    return this.getActiveIncidentCategory$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentCategoryProjaction>) => r.body as RestApiResponseIncidentCategoryProjaction)
    );
  }

  /**
   * Path part for operation export5
   */
  static readonly Export5Path = '/v1/incident-categories/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export5()` instead.
   *
   * This method doesn't expect any request body.
   */
  export5$Response(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentCategoryControllerService.Export5Path, 'get');
    if (params) {
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `export5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export5(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<void> {

    return this.export5$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
