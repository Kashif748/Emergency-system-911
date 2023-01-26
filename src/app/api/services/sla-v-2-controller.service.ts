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

import { Kpi } from '../models/kpi';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseListSla } from '../models/rest-api-response-list-sla';
import { RestApiResponseListSlaDetails } from '../models/rest-api-response-list-sla-details';
import { RestApiResponsePageSla } from '../models/rest-api-response-page-sla';
import { RestApiResponseSla } from '../models/rest-api-response-sla';
import { Sla } from '../models/sla';

@Injectable()
export class SlaV2ControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getActivePage
   */
  static readonly GetActivePagePath = '/v2/sla';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActivePage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivePage$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageSla>> {

    const rb = new RequestBuilder(this.rootUrl, SlaV2ControllerService.GetActivePagePath, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageSla>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActivePage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivePage(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageSla> {

    return this.getActivePage$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageSla>) => r.body as RestApiResponsePageSla)
    );
  }

  /**
   * Path part for operation update
   */
  static readonly UpdatePath = '/v2/sla';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update$Response(params: {
    body: Sla
  }): Observable<StrictHttpResponse<RestApiResponseSla>> {

    const rb = new RequestBuilder(this.rootUrl, SlaV2ControllerService.UpdatePath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSla>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update(params: {
    body: Sla
  }): Observable<RestApiResponseSla> {

    return this.update$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSla>) => r.body as RestApiResponseSla)
    );
  }

  /**
   * Path part for operation create
   */
  static readonly CreatePath = '/v2/sla';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create$Response(params: {
    body: Sla
  }): Observable<StrictHttpResponse<RestApiResponseSla>> {

    const rb = new RequestBuilder(this.rootUrl, SlaV2ControllerService.CreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSla>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create(params: {
    body: Sla
  }): Observable<RestApiResponseSla> {

    return this.create$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSla>) => r.body as RestApiResponseSla)
    );
  }

  /**
   * Path part for operation get
   */
  static readonly GetPath = '/v2/sla/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get()` instead.
   *
   * This method doesn't expect any request body.
   */
  get$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseSla>> {

    const rb = new RequestBuilder(this.rootUrl, SlaV2ControllerService.GetPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSla>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get(params: {
    id: number;
  }): Observable<RestApiResponseSla> {

    return this.get$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSla>) => r.body as RestApiResponseSla)
    );
  }

  /**
   * Path part for operation delete6
   */
  static readonly Delete6Path = '/v2/sla/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete6()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, SlaV2ControllerService.Delete6Path, 'delete');
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
   * To access the full response (for headers, for example), `delete6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete6(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation getBySla
   */
  static readonly GetBySlaPath = '/v2/sla/{id}/details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBySla()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBySla$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseListSlaDetails>> {

    const rb = new RequestBuilder(this.rootUrl, SlaV2ControllerService.GetBySlaPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListSlaDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBySla$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBySla(params: {
    id: number;
  }): Observable<RestApiResponseListSlaDetails> {

    return this.getBySla$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListSlaDetails>) => r.body as RestApiResponseListSlaDetails)
    );
  }

  /**
   * Path part for operation find
   */
  static readonly FindPath = '/v2/sla/find';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find()` instead.
   *
   * This method doesn't expect any request body.
   */
  find$Response(params: {
    kpi: Kpi;
    districtName: string;
    communityName: string;
  }): Observable<StrictHttpResponse<RestApiResponseListSla>> {

    const rb = new RequestBuilder(this.rootUrl, SlaV2ControllerService.FindPath, 'get');
    if (params) {
      rb.query('kpi', params.kpi, {});
      rb.query('districtName', params.districtName, {});
      rb.query('communityName', params.communityName, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListSla>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `find$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find(params: {
    kpi: Kpi;
    districtName: string;
    communityName: string;
  }): Observable<RestApiResponseListSla> {

    return this.find$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListSla>) => r.body as RestApiResponseListSla)
    );
  }

}
