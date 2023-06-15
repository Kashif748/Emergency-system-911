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
   * Path part for operation deleteById6
   */
  static readonly DeleteById6Path = '/v1/bc/locationType/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.DeleteById6Path, 'put');
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
   * Path part for operation getAll15
   */
  static readonly GetAll15Path = '/v1/bc/locationType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll15()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll15$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.GetAll15Path, 'get');
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
   * To access the full response (for headers, for example), `getAll15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll15(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcLocationTypes> {

    return this.getAll15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcLocationTypes>) => r.body as RestApiResponsePageBcLocationTypes)
    );
  }

  /**
   * Path part for operation update85
   */
  static readonly Update85Path = '/v1/bc/locationType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update85()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update85$Response(params: {
    body: BcLocationTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.Update85Path, 'put');
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
   * To access the full response (for headers, for example), `update85$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update85(params: {
    body: BcLocationTypes
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.update85$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

  /**
   * Path part for operation insertOne6
   */
  static readonly InsertOne6Path = '/v1/bc/locationType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne6$Response(params: {
    body: BcLocationTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.InsertOne6Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne6(params: {
    body: BcLocationTypes
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.insertOne6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

  /**
   * Path part for operation getOne6
   */
  static readonly GetOne6Path = '/v1/bc/locationType/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne6()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.GetOne6Path, 'get');
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
   * To access the full response (for headers, for example), `getOne6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne6(params: {
    id: number;
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.getOne6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

}
