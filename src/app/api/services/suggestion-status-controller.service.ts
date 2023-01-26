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

import { RestApiResponseListSuggestionStatus } from '../models/rest-api-response-list-suggestion-status';
import { RestApiResponseSuggestionStatus } from '../models/rest-api-response-suggestion-status';
import { SuggestionStatus } from '../models/suggestion-status';

@Injectable()
export class SuggestionStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateStatus1
   */
  static readonly UpdateStatus1Path = '/v1/suggestionStatus/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStatus1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatus1$Response(params: {
    body: SuggestionStatus
  }): Observable<StrictHttpResponse<RestApiResponseSuggestionStatus>> {

    const rb = new RequestBuilder(this.rootUrl, SuggestionStatusControllerService.UpdateStatus1Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSuggestionStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateStatus1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatus1(params: {
    body: SuggestionStatus
  }): Observable<RestApiResponseSuggestionStatus> {

    return this.updateStatus1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSuggestionStatus>) => r.body as RestApiResponseSuggestionStatus)
    );
  }

  /**
   * Path part for operation createSuggestion
   */
  static readonly CreateSuggestionPath = '/v1/suggestionStatus/create';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createSuggestion()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSuggestion$Response(params: {
    body: SuggestionStatus
  }): Observable<StrictHttpResponse<RestApiResponseSuggestionStatus>> {

    const rb = new RequestBuilder(this.rootUrl, SuggestionStatusControllerService.CreateSuggestionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSuggestionStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createSuggestion$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createSuggestion(params: {
    body: SuggestionStatus
  }): Observable<RestApiResponseSuggestionStatus> {

    return this.createSuggestion$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSuggestionStatus>) => r.body as RestApiResponseSuggestionStatus)
    );
  }

  /**
   * Path part for operation getSuggestions
   */
  static readonly GetSuggestionsPath = '/v1/suggestionStatus/getAll';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSuggestions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSuggestions$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListSuggestionStatus>> {

    const rb = new RequestBuilder(this.rootUrl, SuggestionStatusControllerService.GetSuggestionsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListSuggestionStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSuggestions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSuggestions(params?: {
  }): Observable<RestApiResponseListSuggestionStatus> {

    return this.getSuggestions$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListSuggestionStatus>) => r.body as RestApiResponseListSuggestionStatus)
    );
  }

  /**
   * Path part for operation getSuggestionStatus
   */
  static readonly GetSuggestionStatusPath = '/v1/suggestionStatus/get/{suggestionId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSuggestionStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSuggestionStatus$Response(params: {
    suggestionId: number;
  }): Observable<StrictHttpResponse<RestApiResponseSuggestionStatus>> {

    const rb = new RequestBuilder(this.rootUrl, SuggestionStatusControllerService.GetSuggestionStatusPath, 'get');
    if (params) {
      rb.path('suggestionId', params.suggestionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSuggestionStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSuggestionStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSuggestionStatus(params: {
    suggestionId: number;
  }): Observable<RestApiResponseSuggestionStatus> {

    return this.getSuggestionStatus$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSuggestionStatus>) => r.body as RestApiResponseSuggestionStatus)
    );
  }

}
