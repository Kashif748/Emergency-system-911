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
import { RestApiResponseBcImpactLevel } from '../models/rest-api-response-bc-impact-level';
import { RestApiResponseListBcImpactLevel } from '../models/rest-api-response-list-bc-impact-level';

@Injectable()
export class BcImpactLevelControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation update84
   */
  static readonly Update84Path = '/v1/bia/impactLevel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update84()` instead.
   *
   * This method doesn't expect any request body.
   */
  update84$Response(params: {
    bcImpactLevel: BcImpactLevel;
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.Update84Path, 'put');
    if (params) {
      rb.query('bcImpactLevel', params.bcImpactLevel, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update84$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  update84(params: {
    bcImpactLevel: BcImpactLevel;
  }): Observable<RestApiResponseBcImpactLevel> {

    return this.update84$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactLevel>) => r.body as RestApiResponseBcImpactLevel)
    );
  }

  /**
   * Path part for operation insertOne5
   */
  static readonly InsertOne5Path = '/v1/bia/impactLevel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne5()` instead.
   *
   * This method doesn't expect any request body.
   */
  insertOne5$Response(params: {
    bcImpactLevel: BcImpactLevel;
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.InsertOne5Path, 'post');
    if (params) {
      rb.query('bcImpactLevel', params.bcImpactLevel, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  insertOne5(params: {
    bcImpactLevel: BcImpactLevel;
  }): Observable<RestApiResponseBcImpactLevel> {

    return this.insertOne5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactLevel>) => r.body as RestApiResponseBcImpactLevel)
    );
  }

  /**
   * Path part for operation getOne5
   */
  static readonly GetOne5Path = '/v1/bia/impactLevel/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne5()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne5$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.GetOne5Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne5(params: {
    id: number;
  }): Observable<RestApiResponseBcImpactLevel> {

    return this.getOne5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactLevel>) => r.body as RestApiResponseBcImpactLevel)
    );
  }

  /**
   * Path part for operation deleteById6
   */
  static readonly DeleteById6Path = '/v1/bia/impactLevel/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.DeleteById6Path, 'delete');
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
   * Path part for operation getAll14
   */
  static readonly GetAll14Path = '/v1/bia/impactLevel/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll14()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll14$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListBcImpactLevel>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactLevelControllerService.GetAll14Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBcImpactLevel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll14(params?: {
  }): Observable<RestApiResponseListBcImpactLevel> {

    return this.getAll14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcImpactLevel>) => r.body as RestApiResponseListBcImpactLevel)
    );
  }

}
