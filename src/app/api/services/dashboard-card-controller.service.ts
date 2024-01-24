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
   * Path part for operation findActivePage25
   */
  static readonly FindActivePage25Path = '/v1/dashboard-cards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage25()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage25$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageDashboardCard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardCardControllerService.FindActivePage25Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage25(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageDashboardCard> {

    return this.findActivePage25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageDashboardCard>) => r.body as RestApiResponsePageDashboardCard)
    );
  }

  /**
   * Path part for operation update69
   */
  static readonly Update69Path = '/v1/dashboard-cards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update69()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update69$Response(params: {
    body: DashboardCard
  }): Observable<StrictHttpResponse<RestApiResponseDashboardCard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardCardControllerService.Update69Path, 'put');
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
   * To access the full response (for headers, for example), `update69$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update69(params: {
    body: DashboardCard
  }): Observable<RestApiResponseDashboardCard> {

    return this.update69$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDashboardCard>) => r.body as RestApiResponseDashboardCard)
    );
  }

  /**
   * Path part for operation create62
   */
  static readonly Create62Path = '/v1/dashboard-cards';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create62()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create62$Response(params: {
    body: DashboardCard
  }): Observable<StrictHttpResponse<RestApiResponseDashboardCard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardCardControllerService.Create62Path, 'post');
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
   * To access the full response (for headers, for example), `create62$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create62(params: {
    body: DashboardCard
  }): Observable<RestApiResponseDashboardCard> {

    return this.create62$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDashboardCard>) => r.body as RestApiResponseDashboardCard)
    );
  }

  /**
   * Path part for operation delete29
   */
  static readonly Delete29Path = '/v1/dashboard-cards/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete29()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete29$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseDashboardCard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardCardControllerService.Delete29Path, 'put');
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
   * To access the full response (for headers, for example), `delete29$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete29(params: {
    id: number;
  }): Observable<RestApiResponseDashboardCard> {

    return this.delete29$Response(params).pipe(
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
