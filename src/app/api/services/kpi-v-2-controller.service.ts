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
import { KpiV2Request } from '../models/kpi-v-2-request';
import { Pageable } from '../models/pageable';
import { Priority } from '../models/priority';
import { RestApiResponseKpiV2Response } from '../models/rest-api-response-kpi-v-2-response';
import { RestApiResponseListKpiV2Response } from '../models/rest-api-response-list-kpi-v-2-response';
import { RestApiResponsePageKpiV2Response } from '../models/rest-api-response-page-kpi-v-2-response';

@Injectable()
export class KpiV2ControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation pageV2
   */
  static readonly PageV2Path = '/v2/kpis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `pageV2()` instead.
   *
   * This method doesn't expect any request body.
   */
  pageV2$Response(params: {
    name?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageKpiV2Response>> {

    const rb = new RequestBuilder(this.rootUrl, KpiV2ControllerService.PageV2Path, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageKpiV2Response>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `pageV2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  pageV2(params: {
    name?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageKpiV2Response> {

    return this.pageV2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageKpiV2Response>) => r.body as RestApiResponsePageKpiV2Response)
    );
  }

  /**
   * Path part for operation update1
   */
  static readonly Update1Path = '/v2/kpis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1$Response(params: {
    body: KpiV2Request
  }): Observable<StrictHttpResponse<RestApiResponseKpiV2Response>> {

    const rb = new RequestBuilder(this.rootUrl, KpiV2ControllerService.Update1Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseKpiV2Response>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update1(params: {
    body: KpiV2Request
  }): Observable<RestApiResponseKpiV2Response> {

    return this.update1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseKpiV2Response>) => r.body as RestApiResponseKpiV2Response)
    );
  }

  /**
   * Path part for operation create1
   */
  static readonly Create1Path = '/v2/kpis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create1$Response(params: {
    body: KpiV2Request
  }): Observable<StrictHttpResponse<RestApiResponseKpiV2Response>> {

    const rb = new RequestBuilder(this.rootUrl, KpiV2ControllerService.Create1Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseKpiV2Response>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create1(params: {
    body: KpiV2Request
  }): Observable<RestApiResponseKpiV2Response> {

    return this.create1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseKpiV2Response>) => r.body as RestApiResponseKpiV2Response)
    );
  }

  /**
   * Path part for operation getV2
   */
  static readonly GetV2Path = '/v2/kpis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getV2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getV2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseKpiV2Response>> {

    const rb = new RequestBuilder(this.rootUrl, KpiV2ControllerService.GetV2Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseKpiV2Response>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getV2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getV2(params: {
    id: number;
  }): Observable<RestApiResponseKpiV2Response> {

    return this.getV2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseKpiV2Response>) => r.body as RestApiResponseKpiV2Response)
    );
  }

  /**
   * Path part for operation findV2
   */
  static readonly FindV2Path = '/v2/kpis/find';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findV2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findV2$Response(params?: {
    priorityId?: Priority;
    incidentCategory?: IncidentCategory;
    name?: string;
  }): Observable<StrictHttpResponse<RestApiResponseListKpiV2Response>> {

    const rb = new RequestBuilder(this.rootUrl, KpiV2ControllerService.FindV2Path, 'get');
    if (params) {
      rb.query('priorityId', params.priorityId, {});
      rb.query('incidentCategory', params.incidentCategory, {});
      rb.query('name', params.name, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListKpiV2Response>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findV2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findV2(params?: {
    priorityId?: Priority;
    incidentCategory?: IncidentCategory;
    name?: string;
  }): Observable<RestApiResponseListKpiV2Response> {

    return this.findV2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListKpiV2Response>) => r.body as RestApiResponseListKpiV2Response)
    );
  }

}
