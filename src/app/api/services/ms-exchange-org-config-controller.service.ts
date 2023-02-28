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

import { MsExchangeOrgConfig } from '../models/ms-exchange-org-config';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseMsExchangeOrgConfig } from '../models/rest-api-response-ms-exchange-org-config';
import { RestApiResponsePageMsExchangeOrgConfig } from '../models/rest-api-response-page-ms-exchange-org-config';

@Injectable()
export class MsExchangeOrgConfigControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation page6
   */
  static readonly Page6Path = '/v1/ms-exchange-orgs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page6()` instead.
   *
   * This method doesn't expect any request body.
   */
  page6$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageMsExchangeOrgConfig>> {

    const rb = new RequestBuilder(this.rootUrl, MsExchangeOrgConfigControllerService.Page6Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageMsExchangeOrgConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page6(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageMsExchangeOrgConfig> {

    return this.page6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageMsExchangeOrgConfig>) => r.body as RestApiResponsePageMsExchangeOrgConfig)
    );
  }

  /**
   * Path part for operation update23
   */
  static readonly Update23Path = '/v1/ms-exchange-orgs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update23()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update23$Response(params: {
    body: MsExchangeOrgConfig
  }): Observable<StrictHttpResponse<RestApiResponseMsExchangeOrgConfig>> {

    const rb = new RequestBuilder(this.rootUrl, MsExchangeOrgConfigControllerService.Update23Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseMsExchangeOrgConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update23$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update23(params: {
    body: MsExchangeOrgConfig
  }): Observable<RestApiResponseMsExchangeOrgConfig> {

    return this.update23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseMsExchangeOrgConfig>) => r.body as RestApiResponseMsExchangeOrgConfig)
    );
  }

  /**
   * Path part for operation create21
   */
  static readonly Create21Path = '/v1/ms-exchange-orgs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create21()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create21$Response(params: {
    body: MsExchangeOrgConfig
  }): Observable<StrictHttpResponse<RestApiResponseMsExchangeOrgConfig>> {

    const rb = new RequestBuilder(this.rootUrl, MsExchangeOrgConfigControllerService.Create21Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseMsExchangeOrgConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create21$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create21(params: {
    body: MsExchangeOrgConfig
  }): Observable<RestApiResponseMsExchangeOrgConfig> {

    return this.create21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseMsExchangeOrgConfig>) => r.body as RestApiResponseMsExchangeOrgConfig)
    );
  }

  /**
   * Path part for operation get12
   */
  static readonly Get12Path = '/v1/ms-exchange-orgs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get12()` instead.
   *
   * This method doesn't expect any request body.
   */
  get12$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseMsExchangeOrgConfig>> {

    const rb = new RequestBuilder(this.rootUrl, MsExchangeOrgConfigControllerService.Get12Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseMsExchangeOrgConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get12(params: {
    id: number;
  }): Observable<RestApiResponseMsExchangeOrgConfig> {

    return this.get12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseMsExchangeOrgConfig>) => r.body as RestApiResponseMsExchangeOrgConfig)
    );
  }

  /**
   * Path part for operation delete12
   */
  static readonly Delete12Path = '/v1/ms-exchange-orgs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete12()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete12$Response(params: {
    id: MsExchangeOrgConfig;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, MsExchangeOrgConfigControllerService.Delete12Path, 'delete');
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
   * To access the full response (for headers, for example), `delete12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete12(params: {
    id: MsExchangeOrgConfig;
  }): Observable<RestApiResponseBoolean> {

    return this.delete12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

}
