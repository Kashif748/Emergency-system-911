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

import { BcResourcesItInfrastructure } from '../models/bc-resources-it-infrastructure';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcResourcesItInfrastructure } from '../models/rest-api-response-bc-resources-it-infrastructure';
import { RestApiResponsePageBcResourcesItInfrastructure } from '../models/rest-api-response-page-bc-resources-it-infrastructure';

@Injectable()
export class BcResourcesItInfrastructureControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById11
   */
  static readonly DeleteById11Path = '/v1/bc/resources/it-infrastructure/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById11()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById11$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesItInfrastructureControllerService.DeleteById11Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById11(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById11$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update90
   */
  static readonly Update90Path = '/v1/bc/resources/it-infrastructure';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update90()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update90$Response(params: {
    body: BcResourcesItInfrastructure
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesItInfrastructure>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesItInfrastructureControllerService.Update90Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesItInfrastructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update90$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update90(params: {
    body: BcResourcesItInfrastructure
  }): Observable<RestApiResponseBcResourcesItInfrastructure> {

    return this.update90$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesItInfrastructure>) => r.body as RestApiResponseBcResourcesItInfrastructure)
    );
  }

  /**
   * Path part for operation insertOne11
   */
  static readonly InsertOne11Path = '/v1/bc/resources/it-infrastructure';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne11()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne11$Response(params: {
    body: BcResourcesItInfrastructure
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesItInfrastructure>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesItInfrastructureControllerService.InsertOne11Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesItInfrastructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne11$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne11(params: {
    body: BcResourcesItInfrastructure
  }): Observable<RestApiResponseBcResourcesItInfrastructure> {

    return this.insertOne11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesItInfrastructure>) => r.body as RestApiResponseBcResourcesItInfrastructure)
    );
  }

  /**
   * Path part for operation getOne12
   */
  static readonly GetOne12Path = '/v1/bc/resources/it-infrastructure/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne12()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne12$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesItInfrastructure>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesItInfrastructureControllerService.GetOne12Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesItInfrastructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne12(params: {
    id: number;
  }): Observable<RestApiResponseBcResourcesItInfrastructure> {

    return this.getOne12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesItInfrastructure>) => r.body as RestApiResponseBcResourcesItInfrastructure)
    );
  }

  /**
   * Path part for operation search14
   */
  static readonly Search14Path = '/v1/bc/resources/it-infrastructure/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search14()` instead.
   *
   * This method doesn't expect any request body.
   */
  search14$Response(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcResourcesItInfrastructure>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesItInfrastructureControllerService.Search14Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcResourcesItInfrastructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search14(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcResourcesItInfrastructure> {

    return this.search14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcResourcesItInfrastructure>) => r.body as RestApiResponsePageBcResourcesItInfrastructure)
    );
  }

}
