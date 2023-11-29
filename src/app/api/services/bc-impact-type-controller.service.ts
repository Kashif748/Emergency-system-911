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
   * Path part for operation deleteById23
   */
  static readonly DeleteById23Path = '/v1/bc/impactType/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById23()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById23$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypeControllerService.DeleteById23Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById23(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById23$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll18
   */
  static readonly GetAll18Path = '/v1/bc/impactType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll18()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll18$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcImpactTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypeControllerService.GetAll18Path, 'get');
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
   * To access the full response (for headers, for example), `getAll18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll18(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcImpactTypes> {

    return this.getAll18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcImpactTypes>) => r.body as RestApiResponsePageBcImpactTypes)
    );
  }

  /**
   * Path part for operation update102
   */
  static readonly Update102Path = '/v1/bc/impactType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update102()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update102$Response(params: {
    body: BcImpactTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypeControllerService.Update102Path, 'put');
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
   * To access the full response (for headers, for example), `update102$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update102(params: {
    body: BcImpactTypes
  }): Observable<RestApiResponseBcImpactTypes> {

    return this.update102$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypes>) => r.body as RestApiResponseBcImpactTypes)
    );
  }

  /**
   * Path part for operation insertOne22
   */
  static readonly InsertOne22Path = '/v1/bc/impactType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne22()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne22$Response(params: {
    body: BcImpactTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypeControllerService.InsertOne22Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne22$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne22(params: {
    body: BcImpactTypes
  }): Observable<RestApiResponseBcImpactTypes> {

    return this.insertOne22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypes>) => r.body as RestApiResponseBcImpactTypes)
    );
  }

  /**
   * Path part for operation getOne22
   */
  static readonly GetOne22Path = '/v1/bc/impactType/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne22()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne22$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypeControllerService.GetOne22Path, 'get');
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
   * To access the full response (for headers, for example), `getOne22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne22(params: {
    id: number;
  }): Observable<RestApiResponseBcImpactTypes> {

    return this.getOne22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactTypes>) => r.body as RestApiResponseBcImpactTypes)
    );
  }

}
