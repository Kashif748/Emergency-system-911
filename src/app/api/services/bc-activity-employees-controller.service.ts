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

import { BcActivityEmployees } from '../models/bc-activity-employees';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivityEmployees } from '../models/rest-api-response-bc-activity-employees';
import { RestApiResponsePageBcActivityEmployees } from '../models/rest-api-response-page-bc-activity-employees';

@Injectable()
export class BcActivityEmployeesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById21
   */
  static readonly DeleteById21Path = '/v1/bc/activity-employees/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById21()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById21$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.DeleteById21Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById21$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById21(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById21$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll31
   */
  static readonly GetAll31Path = '/v1/bc/activity-employees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll31()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll31$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityEmployees>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.GetAll31Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityEmployees>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll31$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll31(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityEmployees> {

    return this.getAll31$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityEmployees>) => r.body as RestApiResponsePageBcActivityEmployees)
    );
  }

  /**
   * Path part for operation update101
   */
  static readonly Update101Path = '/v1/bc/activity-employees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update101()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update101$Response(params: {
    body: BcActivityEmployees
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityEmployees>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.Update101Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityEmployees>;
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
    body: BcActivityEmployees
  }): Observable<RestApiResponseBcActivityEmployees> {

    return this.update101$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityEmployees>) => r.body as RestApiResponseBcActivityEmployees)
    );
  }

  /**
   * Path part for operation insertOne22
   */
  static readonly InsertOne22Path = '/v1/bc/activity-employees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne22()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne22$Response(params: {
    body: BcActivityEmployees
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityEmployees>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.InsertOne22Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityEmployees>;
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
    body: BcActivityEmployees
  }): Observable<RestApiResponseBcActivityEmployees> {

    return this.insertOne22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityEmployees>) => r.body as RestApiResponseBcActivityEmployees)
    );
  }

  /**
   * Path part for operation getOne22
   */
  static readonly GetOne22Path = '/v1/bc/activity-employees/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne22()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne22$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityEmployees>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.GetOne22Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityEmployees>;
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
  }): Observable<RestApiResponseBcActivityEmployees> {

    return this.getOne22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityEmployees>) => r.body as RestApiResponseBcActivityEmployees)
    );
  }

  /**
   * Path part for operation search15
   */
  static readonly Search15Path = '/v1/bc/activity-employees/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search15()` instead.
   *
   * This method doesn't expect any request body.
   */
  search15$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityEmployees>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.Search15Path, 'get');
    if (params) {
      rb.query('activityId', params.activityId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('isActive', params.isActive, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcActivityEmployees>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search15(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityEmployees> {

    return this.search15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityEmployees>) => r.body as RestApiResponsePageBcActivityEmployees)
    );
  }

}
