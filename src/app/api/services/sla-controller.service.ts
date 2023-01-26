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
export class SlaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getActivePage1
   */
  static readonly GetActivePage1Path = '/v1/sla';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActivePage1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivePage1$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageSla>> {

    const rb = new RequestBuilder(this.rootUrl, SlaControllerService.GetActivePage1Path, 'get');
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
   * To access the full response (for headers, for example), `getActivePage1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActivePage1(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageSla> {

    return this.getActivePage1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageSla>) => r.body as RestApiResponsePageSla)
    );
  }

  /**
   * Path part for operation update6
   */
  static readonly Update6Path = '/v1/sla';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update6$Response(params: {
    body: Sla
  }): Observable<StrictHttpResponse<RestApiResponseSla>> {

    const rb = new RequestBuilder(this.rootUrl, SlaControllerService.Update6Path, 'put');
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
   * To access the full response (for headers, for example), `update6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update6(params: {
    body: Sla
  }): Observable<RestApiResponseSla> {

    return this.update6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSla>) => r.body as RestApiResponseSla)
    );
  }

  /**
   * Path part for operation create6
   */
  static readonly Create6Path = '/v1/sla';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create6$Response(params: {
    body: Sla
  }): Observable<StrictHttpResponse<RestApiResponseSla>> {

    const rb = new RequestBuilder(this.rootUrl, SlaControllerService.Create6Path, 'post');
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
   * To access the full response (for headers, for example), `create6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create6(params: {
    body: Sla
  }): Observable<RestApiResponseSla> {

    return this.create6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSla>) => r.body as RestApiResponseSla)
    );
  }

  /**
   * Path part for operation get3
   */
  static readonly Get3Path = '/v1/sla/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get3()` instead.
   *
   * This method doesn't expect any request body.
   */
  get3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseSla>> {

    const rb = new RequestBuilder(this.rootUrl, SlaControllerService.Get3Path, 'get');
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
   * To access the full response (for headers, for example), `get3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get3(params: {
    id: number;
  }): Observable<RestApiResponseSla> {

    return this.get3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSla>) => r.body as RestApiResponseSla)
    );
  }

  /**
   * Path part for operation delete7
   */
  static readonly Delete7Path = '/v1/sla/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete7()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, SlaControllerService.Delete7Path, 'delete');
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
   * To access the full response (for headers, for example), `delete7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete7(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation getBySla1
   */
  static readonly GetBySla1Path = '/v1/sla/{id}/details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBySla1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBySla1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseListSlaDetails>> {

    const rb = new RequestBuilder(this.rootUrl, SlaControllerService.GetBySla1Path, 'get');
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
   * To access the full response (for headers, for example), `getBySla1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBySla1(params: {
    id: number;
  }): Observable<RestApiResponseListSlaDetails> {

    return this.getBySla1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListSlaDetails>) => r.body as RestApiResponseListSlaDetails)
    );
  }

  /**
   * Path part for operation find1
   */
  static readonly Find1Path = '/v1/sla/find';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `find1()` instead.
   *
   * This method doesn't expect any request body.
   */
  find1$Response(params: {
    kpi: Kpi;
    districtName: string;
    communityName: string;
  }): Observable<StrictHttpResponse<RestApiResponseListSla>> {

    const rb = new RequestBuilder(this.rootUrl, SlaControllerService.Find1Path, 'get');
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
   * To access the full response (for headers, for example), `find1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  find1(params: {
    kpi: Kpi;
    districtName: string;
    communityName: string;
  }): Observable<RestApiResponseListSla> {

    return this.find1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListSla>) => r.body as RestApiResponseListSla)
    );
  }

}
