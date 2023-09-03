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

import { BcResourcesRecords } from '../models/bc-resources-records';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcResourcesRecords } from '../models/rest-api-response-bc-resources-records';
import { RestApiResponsePageBcResourcesRecords } from '../models/rest-api-response-page-bc-resources-records';

@Injectable()
export class BcResourcesRecordsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById7
   */
  static readonly DeleteById7Path = '/v1/bc/resources/records/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById7()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesRecordsControllerService.DeleteById7Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById7(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById7$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update86
   */
  static readonly Update86Path = '/v1/bc/resources/records';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update86()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86$Response(params: {
    body: BcResourcesRecords
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesRecords>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesRecordsControllerService.Update86Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesRecords>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update86$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86(params: {
    body: BcResourcesRecords
  }): Observable<RestApiResponseBcResourcesRecords> {

    return this.update86$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesRecords>) => r.body as RestApiResponseBcResourcesRecords)
    );
  }

  /**
   * Path part for operation insertOne7
   */
  static readonly InsertOne7Path = '/v1/bc/resources/records';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne7()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7$Response(params: {
    body: BcResourcesRecords
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesRecords>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesRecordsControllerService.InsertOne7Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesRecords>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne7$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7(params: {
    body: BcResourcesRecords
  }): Observable<RestApiResponseBcResourcesRecords> {

    return this.insertOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesRecords>) => r.body as RestApiResponseBcResourcesRecords)
    );
  }

  /**
   * Path part for operation getOne8
   */
  static readonly GetOne8Path = '/v1/bc/resources/records/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne8()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne8$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesRecords>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesRecordsControllerService.GetOne8Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesRecords>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne8(params: {
    id: number;
  }): Observable<RestApiResponseBcResourcesRecords> {

    return this.getOne8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesRecords>) => r.body as RestApiResponseBcResourcesRecords)
    );
  }

  /**
   * Path part for operation search12
   */
  static readonly Search12Path = '/v1/bc/resources/records/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search12()` instead.
   *
   * This method doesn't expect any request body.
   */
  search12$Response(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcResourcesRecords>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesRecordsControllerService.Search12Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcResourcesRecords>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search12(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcResourcesRecords> {

    return this.search12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcResourcesRecords>) => r.body as RestApiResponsePageBcResourcesRecords)
    );
  }

}
