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
import { Kpi } from '../models/kpi';
import { Pageable } from '../models/pageable';
import { Priority } from '../models/priority';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseKpi } from '../models/rest-api-response-kpi';
import { RestApiResponseListKpi } from '../models/rest-api-response-list-kpi';
import { RestApiResponsePageKpi } from '../models/rest-api-response-page-kpi';

@Injectable()
export class KpiControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation page7
   */
  static readonly Page7Path = '/v1/kpis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page7()` instead.
   *
   * This method doesn't expect any request body.
   */
  page7$Response(params: {
    name?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageKpi>> {

    const rb = new RequestBuilder(this.rootUrl, KpiControllerService.Page7Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageKpi>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page7(params: {
    name?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageKpi> {

    return this.page7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageKpi>) => r.body as RestApiResponsePageKpi)
    );
  }

  /**
   * Path part for operation update30
   */
  static readonly Update30Path = '/v1/kpis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update30()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update30$Response(params: {
    body: Kpi
  }): Observable<StrictHttpResponse<RestApiResponseKpi>> {

    const rb = new RequestBuilder(this.rootUrl, KpiControllerService.Update30Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseKpi>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update30$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update30(params: {
    body: Kpi
  }): Observable<RestApiResponseKpi> {

    return this.update30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseKpi>) => r.body as RestApiResponseKpi)
    );
  }

  /**
   * Path part for operation create25
   */
  static readonly Create25Path = '/v1/kpis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create25()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create25$Response(params: {
    body: Kpi
  }): Observable<StrictHttpResponse<RestApiResponseKpi>> {

    const rb = new RequestBuilder(this.rootUrl, KpiControllerService.Create25Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseKpi>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create25$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create25(params: {
    body: Kpi
  }): Observable<RestApiResponseKpi> {

    return this.create25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseKpi>) => r.body as RestApiResponseKpi)
    );
  }

  /**
   * Path part for operation get15
   */
  static readonly Get15Path = '/v1/kpis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get15()` instead.
   *
   * This method doesn't expect any request body.
   */
  get15$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseKpi>> {

    const rb = new RequestBuilder(this.rootUrl, KpiControllerService.Get15Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseKpi>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get15(params: {
    id: number;
  }): Observable<RestApiResponseKpi> {

    return this.get15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseKpi>) => r.body as RestApiResponseKpi)
    );
  }

  /**
   * Path part for operation delete16
   */
  static readonly Delete16Path = '/v1/kpis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete16()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete16$Response(params: {
    id: Kpi;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, KpiControllerService.Delete16Path, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete16(params: {
    id: Kpi;
  }): Observable<RestApiResponseBoolean> {

    return this.delete16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation find2
   */
  static readonly Find2Path = '/v1/kpis/find';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find2()` instead.
   *
   * This method doesn't expect any request body.
   */
  find2$Response(params?: {
    priorityId?: Priority;
    incidentCategory?: IncidentCategory;
    name?: string;
  }): Observable<StrictHttpResponse<RestApiResponseListKpi>> {

    const rb = new RequestBuilder(this.rootUrl, KpiControllerService.Find2Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponseListKpi>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `find2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find2(params?: {
    priorityId?: Priority;
    incidentCategory?: IncidentCategory;
    name?: string;
  }): Observable<RestApiResponseListKpi> {

    return this.find2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListKpi>) => r.body as RestApiResponseListKpi)
    );
  }

}
