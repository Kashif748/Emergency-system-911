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

import { BcResourcesDesignation } from '../models/bc-resources-designation';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcResourcesDesignation } from '../models/rest-api-response-bc-resources-designation';
import { RestApiResponsePageBcResourcesDesignation } from '../models/rest-api-response-page-bc-resources-designation';

@Injectable()
export class BcResourcesDesignationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById12
   */
  static readonly DeleteById12Path = '/v1/bc/resources/designation/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById12()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById12$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesDesignationControllerService.DeleteById12Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById12$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById12(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById12$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAsPage2
   */
  static readonly GetAsPage2Path = '/v1/bc/resources/designation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAsPage2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAsPage2$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcResourcesDesignation>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesDesignationControllerService.GetAsPage2Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcResourcesDesignation>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAsPage2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAsPage2(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcResourcesDesignation> {

    return this.getAsPage2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcResourcesDesignation>) => r.body as RestApiResponsePageBcResourcesDesignation)
    );
  }

  /**
   * Path part for operation update91
   */
  static readonly Update91Path = '/v1/bc/resources/designation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update91()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update91$Response(params: {
    body: BcResourcesDesignation
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesDesignation>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesDesignationControllerService.Update91Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesDesignation>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update91$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update91(params: {
    body: BcResourcesDesignation
  }): Observable<RestApiResponseBcResourcesDesignation> {

    return this.update91$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesDesignation>) => r.body as RestApiResponseBcResourcesDesignation)
    );
  }

  /**
   * Path part for operation insertOne12
   */
  static readonly InsertOne12Path = '/v1/bc/resources/designation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne12()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne12$Response(params: {
    body: BcResourcesDesignation
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesDesignation>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesDesignationControllerService.InsertOne12Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesDesignation>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne12$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne12(params: {
    body: BcResourcesDesignation
  }): Observable<RestApiResponseBcResourcesDesignation> {

    return this.insertOne12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesDesignation>) => r.body as RestApiResponseBcResourcesDesignation)
    );
  }

  /**
   * Path part for operation getOne13
   */
  static readonly GetOne13Path = '/v1/bc/resources/designation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne13()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne13$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesDesignation>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesDesignationControllerService.GetOne13Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesDesignation>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne13(params: {
    id: number;
  }): Observable<RestApiResponseBcResourcesDesignation> {

    return this.getOne13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesDesignation>) => r.body as RestApiResponseBcResourcesDesignation)
    );
  }

}
