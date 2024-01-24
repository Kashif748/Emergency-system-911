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

import { BcWorkLogTypes } from '../models/bc-work-log-types';
import { RestApiResponseBcWorkLogTypes } from '../models/rest-api-response-bc-work-log-types';
import { RestApiResponseListBcWorkLogTypes } from '../models/rest-api-response-list-bc-work-log-types';

@Injectable()
export class BcWorkLogTypesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById
   */
  static readonly DeleteByIdPath = '/v1/bc/work-log/types/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkLogTypesControllerService.DeleteByIdPath, 'put');
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
   * To access the full response (for headers, for example), `deleteById$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation list7
   */
  static readonly List7Path = '/v1/bc/work-log/types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list7()` instead.
   *
   * This method doesn't expect any request body.
   */
  list7$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListBcWorkLogTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkLogTypesControllerService.List7Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBcWorkLogTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list7(params?: {
  }): Observable<RestApiResponseListBcWorkLogTypes> {

    return this.list7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcWorkLogTypes>) => r.body as RestApiResponseListBcWorkLogTypes)
    );
  }

  /**
   * Path part for operation update81
   */
  static readonly Update81Path = '/v1/bc/work-log/types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update81()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update81$Response(params: {
    body: BcWorkLogTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcWorkLogTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkLogTypesControllerService.Update81Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcWorkLogTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update81$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update81(params: {
    body: BcWorkLogTypes
  }): Observable<RestApiResponseBcWorkLogTypes> {

    return this.update81$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcWorkLogTypes>) => r.body as RestApiResponseBcWorkLogTypes)
    );
  }

  /**
   * Path part for operation insertOne
   */
  static readonly InsertOnePath = '/v1/bc/work-log/types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne$Response(params: {
    body: BcWorkLogTypes
  }): Observable<StrictHttpResponse<RestApiResponseBcWorkLogTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkLogTypesControllerService.InsertOnePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcWorkLogTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne(params: {
    body: BcWorkLogTypes
  }): Observable<RestApiResponseBcWorkLogTypes> {

    return this.insertOne$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcWorkLogTypes>) => r.body as RestApiResponseBcWorkLogTypes)
    );
  }

  /**
   * Path part for operation getOne
   */
  static readonly GetOnePath = '/v1/bc/work-log/types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcWorkLogTypes>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkLogTypesControllerService.GetOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcWorkLogTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne(params: {
    id: number;
  }): Observable<RestApiResponseBcWorkLogTypes> {

    return this.getOne$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcWorkLogTypes>) => r.body as RestApiResponseBcWorkLogTypes)
    );
  }

}
