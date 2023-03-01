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

import { NewsType } from '../models/news-type';
import { Pageable } from '../models/pageable';
import { RestApiResponseNewsType } from '../models/rest-api-response-news-type';
import { RestApiResponsePageNewsType } from '../models/rest-api-response-page-news-type';

@Injectable()
export class NewsTypeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage5
   */
  static readonly FindActivePage5Path = '/v1/news-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage5()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage5$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageNewsType>> {

    const rb = new RequestBuilder(this.rootUrl, NewsTypeControllerService.FindActivePage5Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageNewsType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage5(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageNewsType> {

    return this.findActivePage5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageNewsType>) => r.body as RestApiResponsePageNewsType)
    );
  }

  /**
   * Path part for operation update21
   */
  static readonly Update21Path = '/v1/news-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update21()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update21$Response(params: {
    body: NewsType
  }): Observable<StrictHttpResponse<RestApiResponseNewsType>> {

    const rb = new RequestBuilder(this.rootUrl, NewsTypeControllerService.Update21Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseNewsType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update21$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update21(params: {
    body: NewsType
  }): Observable<RestApiResponseNewsType> {

    return this.update21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseNewsType>) => r.body as RestApiResponseNewsType)
    );
  }

  /**
   * Path part for operation create20
   */
  static readonly Create20Path = '/v1/news-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create20()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create20$Response(params: {
    body: NewsType
  }): Observable<StrictHttpResponse<RestApiResponseNewsType>> {

    const rb = new RequestBuilder(this.rootUrl, NewsTypeControllerService.Create20Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseNewsType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create20$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create20(params: {
    body: NewsType
  }): Observable<RestApiResponseNewsType> {

    return this.create20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseNewsType>) => r.body as RestApiResponseNewsType)
    );
  }

  /**
   * Path part for operation getActiveNewsType
   */
  static readonly GetActiveNewsTypePath = '/v1/news-type/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveNewsType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveNewsType$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseNewsType>> {

    const rb = new RequestBuilder(this.rootUrl, NewsTypeControllerService.GetActiveNewsTypePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseNewsType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveNewsType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveNewsType(params: {
    id: number;
  }): Observable<RestApiResponseNewsType> {

    return this.getActiveNewsType$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseNewsType>) => r.body as RestApiResponseNewsType)
    );
  }

  /**
   * Path part for operation delete11
   */
  static readonly Delete11Path = '/v1/news-type/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete11()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete11$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseNewsType>> {

    const rb = new RequestBuilder(this.rootUrl, NewsTypeControllerService.Delete11Path, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseNewsType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete11(params: {
    id: number;
  }): Observable<RestApiResponseNewsType> {

    return this.delete11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseNewsType>) => r.body as RestApiResponseNewsType)
    );
  }

}
