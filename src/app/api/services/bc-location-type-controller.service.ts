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
import { RestApiResponseBcLocationTypes } from '../models/rest-api-response-bc-location-types';
import { RestApiResponseListBcLocationTypes } from '../models/rest-api-response-list-bc-location-types';

@Injectable()
export class BcLocationTypeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll12
   */
  static readonly GetAll12Path = '/v1/bia/locationType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll12()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll12$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.GetAll12Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBcLocationTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll12(params?: {
  }): Observable<RestApiResponseListBcLocationTypes> {

    return this.getAll12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcLocationTypes>) => r.body as RestApiResponseListBcLocationTypes)
    );
  }

  /**
   * Path part for operation update82
   */
  static readonly Update82Path = '/v1/bia/locationType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update82()` instead.
   *
   * This method doesn't expect any request body.
   */
  update82$Response(params: {
    bCLocationTypes: BcLocationTypes;
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.Update82Path, 'put');
    if (params) {
      rb.query('bCLocationTypes', params.bCLocationTypes, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcLocationTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update82$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  update82(params: {
    bCLocationTypes: BcLocationTypes;
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.update82$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

  /**
   * Path part for operation insertOne3
   */
  static readonly InsertOne3Path = '/v1/bia/locationType';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne3()` instead.
   *
   * This method doesn't expect any request body.
   */
  insertOne3$Response(params: {
    bCLocationTypes: BcLocationTypes;
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.InsertOne3Path, 'post');
    if (params) {
      rb.query('bCLocationTypes', params.bCLocationTypes, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcLocationTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  insertOne3(params: {
    bCLocationTypes: BcLocationTypes;
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.insertOne3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

  /**
   * Path part for operation getOne3
   */
  static readonly GetOne3Path = '/v1/bia/locationType/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne3()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcLocationTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.GetOne3Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcLocationTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne3(params: {
    id: number;
  }): Observable<RestApiResponseBcLocationTypes> {

    return this.getOne3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocationTypes>) => r.body as RestApiResponseBcLocationTypes)
    );
  }

  /**
   * Path part for operation deleteById4
   */
  static readonly DeleteById4Path = '/v1/bia/locationType/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById4()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationTypeControllerService.DeleteById4Path, 'delete');
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
   * To access the full response (for headers, for example), `deleteById4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById4(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById4$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
