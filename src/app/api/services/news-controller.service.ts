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

import { News } from '../models/news';
import { NewsCriteria } from '../models/news-criteria';
import { Pageable } from '../models/pageable';
import { RestApiResponseNews } from '../models/rest-api-response-news';
import { RestApiResponsePageNewsProjection } from '../models/rest-api-response-page-news-projection';

@Injectable()
export class NewsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage6
   */
  static readonly FindActivePage6Path = '/v1/news';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage6()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage6$Response(params: {
    filter: NewsCriteria;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageNewsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.FindActivePage6Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageNewsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage6(params: {
    filter: NewsCriteria;
    pageable: Pageable;
  }): Observable<RestApiResponsePageNewsProjection> {

    return this.findActivePage6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageNewsProjection>) => r.body as RestApiResponsePageNewsProjection)
    );
  }

  /**
   * Path part for operation update22
   */
  static readonly Update22Path = '/v1/news';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update22()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update22$Response(params: {
    body: News
  }): Observable<StrictHttpResponse<RestApiResponseNews>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.Update22Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseNews>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update22$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update22(params: {
    body: News
  }): Observable<RestApiResponseNews> {

    return this.update22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseNews>) => r.body as RestApiResponseNews)
    );
  }

  /**
   * Path part for operation addNews
   */
  static readonly AddNewsPath = '/v1/news';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addNews()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNews$Response(params: {
    body: News
  }): Observable<StrictHttpResponse<RestApiResponseNews>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.AddNewsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseNews>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addNews$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNews(params: {
    body: News
  }): Observable<RestApiResponseNews> {

    return this.addNews$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseNews>) => r.body as RestApiResponseNews)
    );
  }

  /**
   * Path part for operation getActiveNews
   */
  static readonly GetActiveNewsPath = '/v1/news/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveNews()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveNews$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseNews>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.GetActiveNewsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseNews>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveNews$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveNews(params: {
    id: number;
  }): Observable<RestApiResponseNews> {

    return this.getActiveNews$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseNews>) => r.body as RestApiResponseNews)
    );
  }

  /**
   * Path part for operation delete10
   */
  static readonly Delete10Path = '/v1/news/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete10()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete10$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseNews>> {

    const rb = new RequestBuilder(this.rootUrl, NewsControllerService.Delete10Path, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseNews>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete10(params: {
    id: number;
  }): Observable<RestApiResponseNews> {

    return this.delete10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseNews>) => r.body as RestApiResponseNews)
    );
  }

}
