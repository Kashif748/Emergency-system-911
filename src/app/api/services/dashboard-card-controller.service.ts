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

import { DashboardCard } from '../models/dashboard-card';
import { Pageable } from '../models/pageable';
import { RestApiResponseDashboardCard } from '../models/rest-api-response-dashboard-card';
import { RestApiResponsePageDashboardCard } from '../models/rest-api-response-page-dashboard-card';

@Injectable()
export class DashboardCardControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage24
   */
  static readonly FindActivePage24Path = '/v1/dashboard-cards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage24()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage24$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageDashboardCard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardCardControllerService.FindActivePage24Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageDashboardCard>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage24(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageDashboardCard> {

    return this.findActivePage24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageDashboardCard>) => r.body as RestApiResponsePageDashboardCard)
    );
  }

  /**
   * Path part for operation update67
   */
  static readonly Update67Path = '/v1/dashboard-cards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update67()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update67$Response(params: {
    body: DashboardCard
  }): Observable<StrictHttpResponse<RestApiResponseDashboardCard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardCardControllerService.Update67Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDashboardCard>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update67$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update67(params: {
    body: DashboardCard
  }): Observable<RestApiResponseDashboardCard> {

    return this.update67$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDashboardCard>) => r.body as RestApiResponseDashboardCard)
    );
  }

  /**
   * Path part for operation create61
   */
  static readonly Create61Path = '/v1/dashboard-cards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create61()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create61$Response(params: {
    body: DashboardCard
  }): Observable<StrictHttpResponse<RestApiResponseDashboardCard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardCardControllerService.Create61Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDashboardCard>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create61$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create61(params: {
    body: DashboardCard
  }): Observable<RestApiResponseDashboardCard> {

    return this.create61$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDashboardCard>) => r.body as RestApiResponseDashboardCard)
    );
  }

  /**
   * Path part for operation delete28
   */
  static readonly Delete28Path = '/v1/dashboard-cards/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete28()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete28$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseDashboardCard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardCardControllerService.Delete28Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDashboardCard>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete28$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete28(params: {
    id: number;
  }): Observable<RestApiResponseDashboardCard> {

    return this.delete28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDashboardCard>) => r.body as RestApiResponseDashboardCard)
    );
  }

  /**
   * Path part for operation getActiveDashboardCard
   */
  static readonly GetActiveDashboardCardPath = '/v1/dashboard-cards/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveDashboardCard()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveDashboardCard$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseDashboardCard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardCardControllerService.GetActiveDashboardCardPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDashboardCard>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveDashboardCard$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveDashboardCard(params: {
    id: number;
  }): Observable<RestApiResponseDashboardCard> {

    return this.getActiveDashboardCard$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDashboardCard>) => r.body as RestApiResponseDashboardCard)
    );
  }

}
