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

import { BcImpactTypes } from '../models/bc-impact-types';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcImpactTypes } from '../models/rest-api-response-bc-impact-types';
import { RestApiResponsePageBcImpactTypes } from '../models/rest-api-response-page-bc-impact-types';

@Injectable()
export class BcImpactTypeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById8
   */
  static readonly DeleteById8Path = '/v1/bc/impactType/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById8()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById8$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypeControllerService.DeleteById8Path, 'put');
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
   * Path part for operation getAll16
   */
  static readonly GetAll16Path = '/v1/bc/impactType';

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
  }): Observable<StrictHttpResponse<RestApiResponsePageBcImpactTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypeControllerService.GetAll16Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcImpactTypes>;
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
  }): Observable<RestApiResponsePageBcImpactTypes> {

    return this.getAll16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcImpactTypes>) => r.body as RestApiResponsePageBcImpactTypes)
    );
  }

  /**
   * Path part for operation update87
   */
  static readonly Update87Path = '/v1/bc/impactType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update87()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update87$Response(params: {
    body: BcImpactTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypeControllerService.Update87Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update87$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update87(params: {
    body: BcImpactTypes
  }): Observable<RestApiResponseBcImpactTypes> {

    return this.update87$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypes>) => r.body as RestApiResponseBcImpactTypes)
    );
  }

  /**
   * Path part for operation insertOne7
   */
  static readonly InsertOne7Path = '/v1/bc/impactType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne7()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne7$Response(params: {
    body: BcImpactTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypeControllerService.InsertOne7Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactTypes>;
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
    body: BcImpactTypes
  }): Observable<RestApiResponseBcImpactTypes> {

    return this.insertOne7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypes>) => r.body as RestApiResponseBcImpactTypes)
    );
  }

  /**
   * Path part for operation getOne8
   */
  static readonly GetOne8Path = '/v1/bc/impactType/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne8()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne8$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypeControllerService.GetOne8Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactTypes>;
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
  }): Observable<RestApiResponseBcImpactTypes> {

    return this.getOne8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypes>) => r.body as RestApiResponseBcImpactTypes)
    );
  }

}
