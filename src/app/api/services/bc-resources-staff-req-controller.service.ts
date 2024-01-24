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

import { BcResourcesStaffReq } from '../models/bc-resources-staff-req';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcResourcesStaffReq } from '../models/rest-api-response-bc-resources-staff-req';
import { RestApiResponsePageBcResourcesStaffReq } from '../models/rest-api-response-page-bc-resources-staff-req';

@Injectable()
export class BcResourcesStaffReqControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById5
   */
  static readonly DeleteById5Path = '/v1/bc/resources/staff-req/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById5()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById5$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesStaffReqControllerService.DeleteById5Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById5(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById5$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update86
   */
  static readonly Update86Path = '/v1/bc/resources/staff-req';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update86()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86$Response(params: {
    body: BcResourcesStaffReq
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesStaffReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesStaffReqControllerService.Update86Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesStaffReq>;
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
    body: BcResourcesStaffReq
  }): Observable<RestApiResponseBcResourcesStaffReq> {

    return this.update86$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesStaffReq>) => r.body as RestApiResponseBcResourcesStaffReq)
    );
  }

  /**
   * Path part for operation insertOne5
   */
  static readonly InsertOne5Path = '/v1/bc/resources/staff-req';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne5$Response(params: {
    body: BcResourcesStaffReq
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesStaffReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesStaffReqControllerService.InsertOne5Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesStaffReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne5$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne5(params: {
    body: BcResourcesStaffReq
  }): Observable<RestApiResponseBcResourcesStaffReq> {

    return this.insertOne5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesStaffReq>) => r.body as RestApiResponseBcResourcesStaffReq)
    );
  }

  /**
   * Path part for operation getOne6
   */
  static readonly GetOne6Path = '/v1/bc/resources/staff-req/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne6()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesStaffReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesStaffReqControllerService.GetOne6Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesStaffReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne6(params: {
    id: number;
  }): Observable<RestApiResponseBcResourcesStaffReq> {

    return this.getOne6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesStaffReq>) => r.body as RestApiResponseBcResourcesStaffReq)
    );
  }

  /**
   * Path part for operation search9
   */
  static readonly Search9Path = '/v1/bc/resources/staff-req/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search9()` instead.
   *
   * This method doesn't expect any request body.
   */
  search9$Response(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcResourcesStaffReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesStaffReqControllerService.Search9Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcResourcesStaffReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search9(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcResourcesStaffReq> {

    return this.search9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcResourcesStaffReq>) => r.body as RestApiResponsePageBcResourcesStaffReq)
    );
  }

}
