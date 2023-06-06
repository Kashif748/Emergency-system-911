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
   * Path part for operation deleteById9
   */
  static readonly DeleteById9Path = '/v1/bc/impactLevel/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById9()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById9$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.DeleteById9Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById9(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById9$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll17
   */
  static readonly GetAll17Path = '/v1/bc/impactLevel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll17()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll17$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.GetAll17Path, 'get');
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
   * To access the full response (for headers, for example), `getAll17$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll17(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcImpactLevel> {

    return this.getAll17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcImpactLevel>) => r.body as RestApiResponsePageBcImpactLevel)
    );
  }

  /**
   * Path part for operation update88
   */
  static readonly Update88Path = '/v1/bc/impactLevel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update88()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update88$Response(params: {
    body: BcImpactLevel
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.Update88Path, 'put');
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
   * To access the full response (for headers, for example), `update88$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update88(params: {
    body: BcImpactLevel
  }): Observable<RestApiResponseBcImpactLevel> {

    return this.update88$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactLevel>) => r.body as RestApiResponseBcImpactLevel)
    );
  }

  /**
   * Path part for operation insertOne8
   */
  static readonly InsertOne8Path = '/v1/bc/impactLevel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne8()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne8$Response(params: {
    body: BcImpactLevel
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.InsertOne8Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne8$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne8(params: {
    body: BcImpactLevel
  }): Observable<RestApiResponseBcImpactLevel> {

    return this.insertOne8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactLevel>) => r.body as RestApiResponseBcImpactLevel)
    );
  }

  /**
   * Path part for operation getOne8
   */
  static readonly GetOne8Path = '/v1/bc/impactLevel/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne8()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne8$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.GetOne8Path, 'get');
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
   * To access the full response (for headers, for example), `getOne8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne8(params: {
    id: number;
  }): Observable<RestApiResponseBcImpactLevel> {

    return this.getOne8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactLevel>) => r.body as RestApiResponseBcImpactLevel)
    );
  }

}
