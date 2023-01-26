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
import { RestApiResponsePageSuggestionProjection } from '../models/rest-api-response-page-suggestion-projection';
import { RestApiResponseSuggestion } from '../models/rest-api-response-suggestion';
import { RestApiResponseSuggestionProjection } from '../models/rest-api-response-suggestion-projection';
import { SuggestionRequest } from '../models/suggestion-request';

@Injectable()
export class SuggestionControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findPage
   */
  static readonly FindPagePath = '/v1/suggestion';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPage$Response(params: {
    title?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageSuggestionProjection>> {

    const rb = new RequestBuilder(this.rootUrl, SuggestionControllerService.FindPagePath, 'get');
    if (params) {
      rb.query('title', params.title, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageSuggestionProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findPage(params: {
    title?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageSuggestionProjection> {

    return this.findPage$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageSuggestionProjection>) => r.body as RestApiResponsePageSuggestionProjection)
    );
  }

  /**
   * Path part for operation updateStatus2
   */
  static readonly UpdateStatus2Path = '/v1/suggestion';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStatus2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatus2$Response(params: {
    body: SuggestionRequest
  }): Observable<StrictHttpResponse<RestApiResponseSuggestionProjection>> {

    const rb = new RequestBuilder(this.rootUrl, SuggestionControllerService.UpdateStatus2Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSuggestionProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateStatus2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatus2(params: {
    body: SuggestionRequest
  }): Observable<RestApiResponseSuggestionProjection> {

    return this.updateStatus2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSuggestionProjection>) => r.body as RestApiResponseSuggestionProjection)
    );
  }

  /**
   * Path part for operation createSuggestion1
   */
  static readonly CreateSuggestion1Path = '/v1/suggestion';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createSuggestion1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSuggestion1$Response(params: {
    body: SuggestionRequest
  }): Observable<StrictHttpResponse<RestApiResponseSuggestion>> {

    const rb = new RequestBuilder(this.rootUrl, SuggestionControllerService.CreateSuggestion1Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSuggestion>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createSuggestion1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSuggestion1(params: {
    body: SuggestionRequest
  }): Observable<RestApiResponseSuggestion> {

    return this.createSuggestion1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSuggestion>) => r.body as RestApiResponseSuggestion)
    );
  }

  /**
   * Path part for operation getSuggestion
   */
  static readonly GetSuggestionPath = '/v1/suggestion/{suggestionId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSuggestion()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSuggestion$Response(params: {
    suggestionId: number;
  }): Observable<StrictHttpResponse<RestApiResponseSuggestionProjection>> {

    const rb = new RequestBuilder(this.rootUrl, SuggestionControllerService.GetSuggestionPath, 'get');
    if (params) {
      rb.path('suggestionId', params.suggestionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSuggestionProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSuggestion$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSuggestion(params: {
    suggestionId: number;
  }): Observable<RestApiResponseSuggestionProjection> {

    return this.getSuggestion$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSuggestionProjection>) => r.body as RestApiResponseSuggestionProjection)
    );
  }

}
