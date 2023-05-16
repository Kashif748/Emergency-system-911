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
   * Path part for operation deleteById7
   */
  static readonly DeleteById7Path = '/v1/bc/impactTypeMatrix/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById7()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.DeleteById7Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById7(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById7$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll16
   */
  static readonly GetAll16Path = '/v1/bc/impactTypeMatrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll16()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll16$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcImpactTypesMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.GetAll16Path, 'get');
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
   * To access the full response (for headers, for example), `getAll16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll16(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcImpactTypesMatrix> {

    return this.getAll16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcImpactTypesMatrix>) => r.body as RestApiResponsePageBcImpactTypesMatrix)
    );
  }

  /**
   * Path part for operation update86
   */
  static readonly Update86Path = '/v1/bc/impactTypeMatrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update86()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86$Response(params: {
    body: BcImpactTypesMatrix
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.Update86Path, 'put');
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
   * To access the full response (for headers, for example), `update86$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update86(params: {
    body: BcImpactTypesMatrix
  }): Observable<RestApiResponseBcImpactTypesMatrix> {

    return this.update86$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>) => r.body as RestApiResponseBcImpactTypesMatrix)
    );
  }

  /**
   * Path part for operation insertOne7
   */
  static readonly InsertOne7Path = '/v1/bc/impactTypeMatrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne7()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7$Response(params: {
    body: BcImpactTypesMatrix
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.InsertOne7Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne7$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7(params: {
    body: BcImpactTypesMatrix
  }): Observable<RestApiResponseBcImpactTypesMatrix> {

    return this.insertOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>) => r.body as RestApiResponseBcImpactTypesMatrix)
    );
  }

  /**
   * Path part for operation getOne7
   */
  static readonly GetOne7Path = '/v1/bc/impactTypeMatrix/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne7()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.GetOne7Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `getOne7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne7(params: {
    id: number;
  }): Observable<RestApiResponseBcImpactTypesMatrix> {

    return this.getOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypesMatrix>) => r.body as RestApiResponseBcImpactTypesMatrix)
    );
  }

}
