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

import { BcResourcesNonItInfrastructure } from '../models/bc-resources-non-it-infrastructure';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcResourcesNonItInfrastructure } from '../models/rest-api-response-bc-resources-non-it-infrastructure';
import { RestApiResponsePageBcResourcesNonItInfrastructure } from '../models/rest-api-response-page-bc-resources-non-it-infrastructure';

@Injectable()
export class BcResourcesNonItInfrastructureControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById8
   */
  static readonly DeleteById8Path = '/v1/bc/resources/non/it-infrastructure/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById8()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById8$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesNonItInfrastructureControllerService.DeleteById8Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById8(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById8$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update89
   */
  static readonly Update89Path = '/v1/bc/resources/non/it-infrastructure';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update89()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update89$Response(params: {
    body: BcResourcesNonItInfrastructure
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesNonItInfrastructure>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesNonItInfrastructureControllerService.Update89Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesNonItInfrastructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update89$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update89(params: {
    body: BcResourcesNonItInfrastructure
  }): Observable<RestApiResponseBcResourcesNonItInfrastructure> {

    return this.update89$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesNonItInfrastructure>) => r.body as RestApiResponseBcResourcesNonItInfrastructure)
    );
  }

  /**
   * Path part for operation insertOne8
   */
  static readonly InsertOne8Path = '/v1/bc/resources/non/it-infrastructure';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne8()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne8$Response(params: {
    body: BcResourcesNonItInfrastructure
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesNonItInfrastructure>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesNonItInfrastructureControllerService.InsertOne8Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesNonItInfrastructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne8$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne8(params: {
    body: BcResourcesNonItInfrastructure
  }): Observable<RestApiResponseBcResourcesNonItInfrastructure> {

    return this.insertOne8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesNonItInfrastructure>) => r.body as RestApiResponseBcResourcesNonItInfrastructure)
    );
  }

  /**
   * Path part for operation getOne9
   */
  static readonly GetOne9Path = '/v1/bc/resources/non/it-infrastructure/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne9()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne9$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesNonItInfrastructure>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesNonItInfrastructureControllerService.GetOne9Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesNonItInfrastructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne9(params: {
    id: number;
  }): Observable<RestApiResponseBcResourcesNonItInfrastructure> {

    return this.getOne9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesNonItInfrastructure>) => r.body as RestApiResponseBcResourcesNonItInfrastructure)
    );
  }

  /**
   * Path part for operation search13
   */
  static readonly Search13Path = '/v1/bc/resources/non/it-infrastructure/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search13()` instead.
   *
   * This method doesn't expect any request body.
   */
  search13$Response(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcResourcesNonItInfrastructure>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesNonItInfrastructureControllerService.Search13Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcResourcesNonItInfrastructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search13(params: {
    resourceId: number;
    isActive: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcResourcesNonItInfrastructure> {

    return this.search13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcResourcesNonItInfrastructure>) => r.body as RestApiResponsePageBcResourcesNonItInfrastructure)
    );
  }

}
