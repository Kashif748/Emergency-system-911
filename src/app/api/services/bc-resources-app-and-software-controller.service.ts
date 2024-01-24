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

import { BcResourcesAppAndSoftware } from '../models/bc-resources-app-and-software';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcResourcesAppAndSoftware } from '../models/rest-api-response-bc-resources-app-and-software';
import { RestApiResponsePageBcResourcesAppAndSoftware } from '../models/rest-api-response-page-bc-resources-app-and-software';

@Injectable()
export class BcResourcesAppAndSoftwareControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById14
   */
  static readonly DeleteById14Path = '/v1/bc/resources/app-and-sw/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById14()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById14$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesAppAndSoftwareControllerService.DeleteById14Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById14(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById14$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update94
   */
  static readonly Update94Path = '/v1/bc/resources/app-and-sw';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update94()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update94$Response(params: {
    body: BcResourcesAppAndSoftware
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesAppAndSoftware>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesAppAndSoftwareControllerService.Update94Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesAppAndSoftware>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update94$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update94(params: {
    body: BcResourcesAppAndSoftware
  }): Observable<RestApiResponseBcResourcesAppAndSoftware> {

    return this.update94$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesAppAndSoftware>) => r.body as RestApiResponseBcResourcesAppAndSoftware)
    );
  }

  /**
   * Path part for operation insertOne13
   */
  static readonly InsertOne13Path = '/v1/bc/resources/app-and-sw';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne13()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne13$Response(params: {
    body: BcResourcesAppAndSoftware
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesAppAndSoftware>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesAppAndSoftwareControllerService.InsertOne13Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesAppAndSoftware>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne13$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne13(params: {
    body: BcResourcesAppAndSoftware
  }): Observable<RestApiResponseBcResourcesAppAndSoftware> {

    return this.insertOne13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesAppAndSoftware>) => r.body as RestApiResponseBcResourcesAppAndSoftware)
    );
  }

  /**
   * Path part for operation getOne14
   */
  static readonly GetOne14Path = '/v1/bc/resources/app-and-sw/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne14()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne14$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesAppAndSoftware>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesAppAndSoftwareControllerService.GetOne14Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesAppAndSoftware>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne14(params: {
    id: number;
  }): Observable<RestApiResponseBcResourcesAppAndSoftware> {

    return this.getOne14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesAppAndSoftware>) => r.body as RestApiResponseBcResourcesAppAndSoftware)
    );
  }

  /**
   * Path part for operation search15
   */
  static readonly Search15Path = '/v1/bc/resources/app-and-sw/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search15()` instead.
   *
   * This method doesn't expect any request body.
   */
  search15$Response(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcResourcesAppAndSoftware>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesAppAndSoftwareControllerService.Search15Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcResourcesAppAndSoftware>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search15(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcResourcesAppAndSoftware> {

    return this.search15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcResourcesAppAndSoftware>) => r.body as RestApiResponsePageBcResourcesAppAndSoftware)
    );
  }

}
