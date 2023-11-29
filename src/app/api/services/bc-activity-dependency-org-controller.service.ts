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
   * Path part for operation deleteById29
   */
  static readonly DeleteById29Path = '/v1/bc/activity/org-dependency/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById29()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById29$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.DeleteById29Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById29$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById29(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById29$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll24
   */
  static readonly GetAll24Path = '/v1/bc/activity/org-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll24()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll24$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyOrg>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.GetAll24Path, 'get');
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
   * To access the full response (for headers, for example), `getAll24$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll24(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyOrg> {

    return this.getAll24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyOrg>) => r.body as RestApiResponsePageBcActivityDependencyOrg)
    );
  }

  /**
   * Path part for operation update108
   */
  static readonly Update108Path = '/v1/bc/activity/org-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update108()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update108$Response(params: {
    body: BcActivityDependencyOrg
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.Update108Path, 'put');
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
   * To access the full response (for headers, for example), `update108$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update108(params: {
    body: BcActivityDependencyOrg
  }): Observable<RestApiResponseBcActivityDependencyOrg> {

    return this.update108$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>) => r.body as RestApiResponseBcActivityDependencyOrg)
    );
  }

  /**
   * Path part for operation insertOne28
   */
  static readonly InsertOne28Path = '/v1/bc/activity/org-dependency';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne28()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne28$Response(params: {
    body: BcActivityDependencyOrg
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.InsertOne28Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne28$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne28(params: {
    body: BcActivityDependencyOrg
  }): Observable<RestApiResponseBcActivityDependencyOrg> {

    return this.insertOne28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>) => r.body as RestApiResponseBcActivityDependencyOrg)
    );
  }

  /**
   * Path part for operation getOne28
   */
  static readonly GetOne28Path = '/v1/bc/activity/org-dependency/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne28()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne28$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.GetOne28Path, 'get');
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
   * To access the full response (for headers, for example), `getOne28$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne28(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityDependencyOrg> {

    return this.getOne28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityDependencyOrg>) => r.body as RestApiResponseBcActivityDependencyOrg)
    );
  }

  /**
   * Path part for operation search19
   */
  static readonly Search19Path = '/v1/bc/activity/org-dependency/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search19()` instead.
   *
   * This method doesn't expect any request body.
   */
  search19$Response(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityDependencyOrg>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityDependencyOrgControllerService.Search19Path, 'get');
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
   * To access the full response (for headers, for example), `search19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search19(params: {
    activityId: number;
    cycleId: number;
    isActive?: boolean;
    isFound?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityDependencyOrg> {

    return this.search19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityDependencyOrg>) => r.body as RestApiResponsePageBcActivityDependencyOrg)
    );
  }

}
