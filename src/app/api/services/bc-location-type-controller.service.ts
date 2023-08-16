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
   * Path part for operation deleteById8
   */
  static readonly DeleteById8Path = '/v1/bc/locationType/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById8()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById8$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.DeleteById8Path, 'put');
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
   * Path part for operation getAll18
   */
  static readonly GetAll18Path = '/v1/bc/locationType';

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
  }): Observable<StrictHttpResponse<RestApiResponsePageBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.GetAll18Path, 'get');
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
   * To access the full response (for headers, for example), `getAll18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll18(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcLocationTypes> {

    return this.getAll18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcLocationTypes>) => r.body as RestApiResponsePageBcLocationTypes)
    );
  }

  /**
   * Path part for operation update88
   */
  static readonly Update88Path = '/v1/bc/locationType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update88()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update88$Response(params: {
    body: BcLocationTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.Update88Path, 'put');
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
   * To access the full response (for headers, for example), `update88$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update88(params: {
    body: BcLocationTypes
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.update88$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

  /**
   * Path part for operation insertOne9
   */
  static readonly InsertOne9Path = '/v1/bc/locationType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne9()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne9$Response(params: {
    body: BcLocationTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.InsertOne9Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne9$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne9(params: {
    body: BcLocationTypes
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.insertOne9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

  /**
   * Path part for operation getOne9
   */
  static readonly GetOne9Path = '/v1/bc/locationType/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne9()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne9$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.GetOne9Path, 'get');
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
   * To access the full response (for headers, for example), `getOne9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne9(params: {
    id: number;
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.getOne9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

}
