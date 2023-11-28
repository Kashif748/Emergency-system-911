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

import { BcActivityDependencyExternal } from '../models/bc-activity-dependency-external';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivityDependencyExternal } from '../models/rest-api-response-bc-activity-dependency-external';
import { RestApiResponsePageBcActivityDependencyExternal } from '../models/rest-api-response-page-bc-activity-dependency-external';

@Injectable()
export class BcActivityDependencyExternalControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById28
   */
  static readonly DeleteById28Path = '/v1/bc/activity/vendor-dependency/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById28()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById28$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.DeleteById28Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById28$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById28(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById28$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll23
   */
  static readonly GetAll23Path = '/v1/bc/activity/vendor-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll23()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll23$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.GetAll23Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll23$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll23(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyExternal> {

    return this.getAll23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>) => r.body as RestApiResponsePageBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation update107
   */
  static readonly Update107Path = '/v1/bc/activity/vendor-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update107()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update107$Response(params: {
    body: BcActivityDependencyExternal
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.Update107Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update107$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update107(params: {
    body: BcActivityDependencyExternal
  }): Observable<RestApiResponseBcActivityDependencyExternal> {

    return this.update107$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>) => r.body as RestApiResponseBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation insertOne27
   */
  static readonly InsertOne27Path = '/v1/bc/activity/vendor-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne27()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne27$Response(params: {
    body: BcActivityDependencyExternal
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.InsertOne27Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne27$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne27(params: {
    body: BcActivityDependencyExternal
  }): Observable<RestApiResponseBcActivityDependencyExternal> {

    return this.insertOne27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>) => r.body as RestApiResponseBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation getOne27
   */
  static readonly GetOne27Path = '/v1/bc/activity/vendor-dependency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne27()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne27$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.GetOne27Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne27$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne27(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityDependencyExternal> {

    return this.getOne27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyExternal>) => r.body as RestApiResponseBcActivityDependencyExternal)
    );
  }

  /**
   * Path part for operation search18
   */
  static readonly Search18Path = '/v1/bc/activity/vendor-dependency/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search18()` instead.
   *
   * This method doesn't expect any request body.
   */
  search18$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyExternalControllerService.Search18Path, 'get');
    if (params) {
      rb.query('activityId', params.activityId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('isActive', params.isActive, {});
      rb.query('isFound', params.isFound, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search18(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyExternal> {

    return this.search18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyExternal>) => r.body as RestApiResponsePageBcActivityDependencyExternal)
    );
  }

}
