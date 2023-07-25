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

import { BcActivityDependencyOrg } from '../models/bc-activity-dependency-org';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivityDependencyOrg } from '../models/rest-api-response-bc-activity-dependency-org';
import { RestApiResponsePageBcActivityDependencyOrg } from '../models/rest-api-response-page-bc-activity-dependency-org';

@Injectable()
export class BcActivityDependencyOrgControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById16
   */
  static readonly DeleteById16Path = '/v1/bc/activity/org-dependency/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById16()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById16$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.DeleteById16Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById16(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById16$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll25
   */
  static readonly GetAll25Path = '/v1/bc/activity/org-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll25()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll25$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyOrg>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.GetAll25Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityDependencyOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll25$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll25(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyOrg> {

    return this.getAll25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyOrg>) => r.body as RestApiResponsePageBcActivityDependencyOrg)
    );
  }

  /**
   * Path part for operation update96
   */
  static readonly Update96Path = '/v1/bc/activity/org-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update96()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update96$Response(params: {
    body: BcActivityDependencyOrg
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.Update96Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update96$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update96(params: {
    body: BcActivityDependencyOrg
  }): Observable<RestApiResponseBcActivityDependencyOrg> {

    return this.update96$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>) => r.body as RestApiResponseBcActivityDependencyOrg)
    );
  }

  /**
   * Path part for operation insertOne16
   */
  static readonly InsertOne16Path = '/v1/bc/activity/org-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne16()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne16$Response(params: {
    body: BcActivityDependencyOrg
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.InsertOne16Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne16$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne16(params: {
    body: BcActivityDependencyOrg
  }): Observable<RestApiResponseBcActivityDependencyOrg> {

    return this.insertOne16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>) => r.body as RestApiResponseBcActivityDependencyOrg)
    );
  }

  /**
   * Path part for operation getOne16
   */
  static readonly GetOne16Path = '/v1/bc/activity/org-dependency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne16()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne16$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.GetOne16Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne16(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityDependencyOrg> {

    return this.getOne16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>) => r.body as RestApiResponseBcActivityDependencyOrg)
    );
  }

  /**
   * Path part for operation search9
   */
  static readonly Search9Path = '/v1/bc/activity/org-dependency/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search9()` instead.
   *
   * This method doesn't expect any request body.
   */
  search9$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyOrg>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.Search9Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityDependencyOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search9(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyOrg> {

    return this.search9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyOrg>) => r.body as RestApiResponsePageBcActivityDependencyOrg)
    );
  }

}
