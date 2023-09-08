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

import { BcResourcesRemoteWork } from '../models/bc-resources-remote-work';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcResourcesRemoteWork } from '../models/rest-api-response-bc-resources-remote-work';
import { RestApiResponsePageBcResourcesRemoteWork } from '../models/rest-api-response-page-bc-resources-remote-work';

@Injectable()
export class BcResourcesRemoteWorkControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById6
   */
  static readonly DeleteById6Path = '/v1/bc/resources/remote-work/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesRemoteWorkControllerService.DeleteById6Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteById6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById6$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update85
   */
  static readonly Update85Path = '/v1/bc/resources/remote-work';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update85()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update85$Response(params: {
    body: BcResourcesRemoteWork
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesRemoteWork>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesRemoteWorkControllerService.Update85Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesRemoteWork>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update85$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update85(params: {
    body: BcResourcesRemoteWork
  }): Observable<RestApiResponseBcResourcesRemoteWork> {

    return this.update85$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesRemoteWork>) => r.body as RestApiResponseBcResourcesRemoteWork)
    );
  }

  /**
   * Path part for operation insertOne6
   */
  static readonly InsertOne6Path = '/v1/bc/resources/remote-work';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne6$Response(params: {
    body: BcResourcesRemoteWork
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesRemoteWork>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesRemoteWorkControllerService.InsertOne6Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesRemoteWork>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne6(params: {
    body: BcResourcesRemoteWork
  }): Observable<RestApiResponseBcResourcesRemoteWork> {

    return this.insertOne6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesRemoteWork>) => r.body as RestApiResponseBcResourcesRemoteWork)
    );
  }

  /**
   * Path part for operation getOne7
   */
  static readonly GetOne7Path = '/v1/bc/resources/remote-work/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne7()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesRemoteWork>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesRemoteWorkControllerService.GetOne7Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesRemoteWork>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne7(params: {
    id: number;
  }): Observable<RestApiResponseBcResourcesRemoteWork> {

    return this.getOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesRemoteWork>) => r.body as RestApiResponseBcResourcesRemoteWork)
    );
  }

  /**
   * Path part for operation search11
   */
  static readonly Search11Path = '/v1/bc/resources/remote-work/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search11()` instead.
   *
   * This method doesn't expect any request body.
   */
  search11$Response(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcResourcesRemoteWork>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesRemoteWorkControllerService.Search11Path, 'get');
    if (params) {
      rb.query('resourceId', params.resourceId, {});
      rb.query('isActive', params.isActive, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcResourcesRemoteWork>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search11(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcResourcesRemoteWork> {

    return this.search11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcResourcesRemoteWork>) => r.body as RestApiResponsePageBcResourcesRemoteWork)
    );
  }

}
