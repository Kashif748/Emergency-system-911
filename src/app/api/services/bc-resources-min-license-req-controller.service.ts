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

import { BcResourcesMinLicenseReq } from '../models/bc-resources-min-license-req';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcResourcesMinLicenseReq } from '../models/rest-api-response-bc-resources-min-license-req';
import { RestApiResponsePageBcResourcesMinLicenseReq } from '../models/rest-api-response-page-bc-resources-min-license-req';

@Injectable()
export class BcResourcesMinLicenseReqControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById10
   */
  static readonly DeleteById10Path = '/v1/bc/resources/min-license-req/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById10()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById10$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesMinLicenseReqControllerService.DeleteById10Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById10$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById10(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById10$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAsPage1
   */
  static readonly GetAsPage1Path = '/v1/bc/resources/min-license-req';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAsPage1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAsPage1$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcResourcesMinLicenseReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesMinLicenseReqControllerService.GetAsPage1Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcResourcesMinLicenseReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAsPage1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAsPage1(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcResourcesMinLicenseReq> {

    return this.getAsPage1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcResourcesMinLicenseReq>) => r.body as RestApiResponsePageBcResourcesMinLicenseReq)
    );
  }

  /**
   * Path part for operation update89
   */
  static readonly Update89Path = '/v1/bc/resources/min-license-req';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update89()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update89$Response(params: {
    body: BcResourcesMinLicenseReq
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesMinLicenseReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesMinLicenseReqControllerService.Update89Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesMinLicenseReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update89$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update89(params: {
    body: BcResourcesMinLicenseReq
  }): Observable<RestApiResponseBcResourcesMinLicenseReq> {

    return this.update89$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesMinLicenseReq>) => r.body as RestApiResponseBcResourcesMinLicenseReq)
    );
  }

  /**
   * Path part for operation insertOne10
   */
  static readonly InsertOne10Path = '/v1/bc/resources/min-license-req';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne10()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne10$Response(params: {
    body: BcResourcesMinLicenseReq
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesMinLicenseReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesMinLicenseReqControllerService.InsertOne10Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesMinLicenseReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne10$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne10(params: {
    body: BcResourcesMinLicenseReq
  }): Observable<RestApiResponseBcResourcesMinLicenseReq> {

    return this.insertOne10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesMinLicenseReq>) => r.body as RestApiResponseBcResourcesMinLicenseReq)
    );
  }

  /**
   * Path part for operation getOne11
   */
  static readonly GetOne11Path = '/v1/bc/resources/min-license-req/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne11()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne11$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesMinLicenseReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesMinLicenseReqControllerService.GetOne11Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesMinLicenseReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne11(params: {
    id: number;
  }): Observable<RestApiResponseBcResourcesMinLicenseReq> {

    return this.getOne11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesMinLicenseReq>) => r.body as RestApiResponseBcResourcesMinLicenseReq)
    );
  }

}
