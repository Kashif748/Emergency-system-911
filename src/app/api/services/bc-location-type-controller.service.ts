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

import { BcLocationTypes } from '../models/bc-location-types';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcLocationTypes } from '../models/rest-api-response-bc-location-types';
import { RestApiResponsePageBcLocationTypes } from '../models/rest-api-response-page-bc-location-types';

@Injectable()
export class BcLocationTypeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById20
   */
  static readonly DeleteById20Path = '/v1/bc/locationType/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById20()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById20$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.DeleteById20Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById20(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById20$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll17
   */
  static readonly GetAll17Path = '/v1/bc/locationType';

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
  }): Observable<StrictHttpResponse<RestApiResponsePageBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.GetAll17Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcLocationTypes>;
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
  }): Observable<RestApiResponsePageBcLocationTypes> {

    return this.getAll17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcLocationTypes>) => r.body as RestApiResponsePageBcLocationTypes)
    );
  }

  /**
   * Path part for operation update101
   */
  static readonly Update101Path = '/v1/bc/locationType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update101()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update101$Response(params: {
    body: BcLocationTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.Update101Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcLocationTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update101$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update101(params: {
    body: BcLocationTypes
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.update101$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

  /**
   * Path part for operation insertOne20
   */
  static readonly InsertOne20Path = '/v1/bc/locationType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne20()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne20$Response(params: {
    body: BcLocationTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.InsertOne20Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcLocationTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne20$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne20(params: {
    body: BcLocationTypes
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.insertOne20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

  /**
   * Path part for operation getOne20
   */
  static readonly GetOne20Path = '/v1/bc/locationType/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne20()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne20$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.GetOne20Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcLocationTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne20(params: {
    id: number;
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.getOne20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

}
