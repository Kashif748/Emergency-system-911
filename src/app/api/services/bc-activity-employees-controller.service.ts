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
   * Path part for operation deleteById32
   */
  static readonly DeleteById32Path = '/v1/bc/activity-employees/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById32()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById32$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.DeleteById32Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById32$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById32(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById32$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll29
   */
  static readonly GetAll29Path = '/v1/bc/activity-employees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll29()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll29$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityEmployees>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.GetAll29Path, 'get');
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
   * To access the full response (for headers, for example), `getAll29$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll29(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityEmployees> {

    return this.getAll29$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityEmployees>) => r.body as RestApiResponsePageBcActivityEmployees)
    );
  }

  /**
   * Path part for operation update112
   */
  static readonly Update112Path = '/v1/bc/activity-employees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update112()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update112$Response(params: {
    body: BcActivityEmployees
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityEmployees>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.Update112Path, 'put');
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
   * To access the full response (for headers, for example), `update112$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update112(params: {
    body: BcActivityEmployees
  }): Observable<RestApiResponseBcActivityEmployees> {

    return this.update112$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityEmployees>) => r.body as RestApiResponseBcActivityEmployees)
    );
  }

  /**
   * Path part for operation insertOne33
   */
  static readonly InsertOne33Path = '/v1/bc/activity-employees';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne33()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne33$Response(params: {
    body: BcActivityEmployees
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityEmployees>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.InsertOne33Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne33$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne33(params: {
    body: BcActivityEmployees
  }): Observable<RestApiResponseBcActivityEmployees> {

    return this.insertOne33$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityEmployees>) => r.body as RestApiResponseBcActivityEmployees)
    );
  }

  /**
   * Path part for operation getOne33
   */
  static readonly GetOne33Path = '/v1/bc/activity-employees/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne33()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne33$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityEmployees>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.GetOne33Path, 'get');
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
   * To access the full response (for headers, for example), `getOne33$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne33(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityEmployees> {

    return this.getOne33$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityEmployees>) => r.body as RestApiResponseBcActivityEmployees)
    );
  }

  /**
   * Path part for operation search24
   */
  static readonly Search24Path = '/v1/bc/activity-employees/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search24()` instead.
   *
   * This method doesn't expect any request body.
   */
  search24$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityEmployees>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityEmployeesControllerService.Search24Path, 'get');
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
   * To access the full response (for headers, for example), `search24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search24(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityEmployees> {

    return this.search24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityEmployees>) => r.body as RestApiResponsePageBcActivityEmployees)
    );
  }

}
