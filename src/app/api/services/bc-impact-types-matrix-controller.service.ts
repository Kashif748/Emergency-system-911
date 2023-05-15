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

import { BcImpactTypesMatrix } from '../models/bc-impact-types-matrix';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcImpactTypesMatrix } from '../models/rest-api-response-bc-impact-types-matrix';
import { RestApiResponsePageBcImpactTypesMatrix } from '../models/rest-api-response-page-bc-impact-types-matrix';

@Injectable()
export class BcImpactTypesMatrixControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById6
   */
  static readonly DeleteById6Path = '/v1/bc/impactTypeMatrix/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.DeleteById6Path, 'put');
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
  static readonly GetAll14Path = '/v1/bc/impactTypeMatrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll14()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll14$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcImpactTypesMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.GetAll14Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcImpactTypesMatrix>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll14(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcImpactTypesMatrix> {

    return this.getAll14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcImpactTypesMatrix>) => r.body as RestApiResponsePageBcImpactTypesMatrix)
    );
  }

  /**
   * Path part for operation update84
   */
  static readonly Update84Path = '/v1/bc/impactTypeMatrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update84()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update84$Response(params: {
    body: BcImpactTypesMatrix
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.Update84Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update84$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update84(params: {
    body: BcImpactTypesMatrix
  }): Observable<RestApiResponseBcImpactTypesMatrix> {

    return this.update84$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>) => r.body as RestApiResponseBcImpactTypesMatrix)
    );
  }

  /**
   * Path part for operation insertOne5
   */
  static readonly InsertOne5Path = '/v1/bc/impactTypeMatrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne5()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne5$Response(params: {
    body: BcImpactTypesMatrix
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.InsertOne5Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>;
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
    body: BcImpactTypesMatrix
  }): Observable<RestApiResponseBcImpactTypesMatrix> {

    return this.insertOne5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>) => r.body as RestApiResponseBcImpactTypesMatrix)
    );
  }

  /**
   * Path part for operation getOne5
   */
  static readonly GetOne5Path = '/v1/bc/impactTypeMatrix/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne5()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne5$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.GetOne5Path, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>;
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
  }): Observable<RestApiResponseBcImpactTypesMatrix> {

    return this.getOne5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>) => r.body as RestApiResponseBcImpactTypesMatrix)
    );
  }

}
