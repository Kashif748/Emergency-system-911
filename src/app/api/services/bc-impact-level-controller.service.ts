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

import { BcImpactLevel } from '../models/bc-impact-level';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcImpactLevel } from '../models/rest-api-response-bc-impact-level';
import { RestApiResponsePageBcImpactLevel } from '../models/rest-api-response-page-bc-impact-level';

@Injectable()
export class BcImpactLevelControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById24
   */
  static readonly DeleteById24Path = '/v1/bc/impactLevel/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById24()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById24$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.DeleteById24Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById24(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById24$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll20
   */
  static readonly GetAll20Path = '/v1/bc/impactLevel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll20()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll20$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.GetAll20Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('versionId', params.versionId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcImpactLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll20(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcImpactLevel> {

    return this.getAll20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcImpactLevel>) => r.body as RestApiResponsePageBcImpactLevel)
    );
  }

  /**
   * Path part for operation update105
   */
  static readonly Update105Path = '/v1/bc/impactLevel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update105()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update105$Response(params: {
    body: BcImpactLevel
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.Update105Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update105$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update105(params: {
    body: BcImpactLevel
  }): Observable<RestApiResponseBcImpactLevel> {

    return this.update105$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactLevel>) => r.body as RestApiResponseBcImpactLevel)
    );
  }

  /**
   * Path part for operation insertOne23
   */
  static readonly InsertOne23Path = '/v1/bc/impactLevel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne23()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne23$Response(params: {
    body: BcImpactLevel
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.InsertOne23Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne23$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne23(params: {
    body: BcImpactLevel
  }): Observable<RestApiResponseBcImpactLevel> {

    return this.insertOne23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactLevel>) => r.body as RestApiResponseBcImpactLevel)
    );
  }

  /**
   * Path part for operation getOne23
   */
  static readonly GetOne23Path = '/v1/bc/impactLevel/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne23()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne23$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.GetOne23Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne23(params: {
    id: number;
  }): Observable<RestApiResponseBcImpactLevel> {

    return this.getOne23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactLevel>) => r.body as RestApiResponseBcImpactLevel)
    );
  }

}
