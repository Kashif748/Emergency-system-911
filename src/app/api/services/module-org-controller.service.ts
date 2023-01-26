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

import { ModuleOrg } from '../models/module-org';
import { Pageable } from '../models/pageable';
import { RestApiResponseListModuleOrg } from '../models/rest-api-response-list-module-org';
import { RestApiResponseListUserModulePrivilegeProjection } from '../models/rest-api-response-list-user-module-privilege-projection';
import { RestApiResponseModuleOrg } from '../models/rest-api-response-module-org';
import { RestApiResponseModuleOrgProjection } from '../models/rest-api-response-module-org-projection';
import { RestApiResponsePageModuleOrgProjection } from '../models/rest-api-response-page-module-org-projection';

@Injectable()
export class ModuleOrgControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation list2
   */
  static readonly List2Path = '/v1/module-org';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list2()` instead.
   *
   * This method doesn't expect any request body.
   */
  list2$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageModuleOrgProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ModuleOrgControllerService.List2Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageModuleOrgProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list2(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageModuleOrgProjection> {

    return this.list2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageModuleOrgProjection>) => r.body as RestApiResponsePageModuleOrgProjection)
    );
  }

  /**
   * Path part for operation update24
   */
  static readonly Update24Path = '/v1/module-org';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update24()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update24$Response(params: {
    body: Array<ModuleOrg>
  }): Observable<StrictHttpResponse<RestApiResponseListModuleOrg>> {

    const rb = new RequestBuilder(this.rootUrl, ModuleOrgControllerService.Update24Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListModuleOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update24$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update24(params: {
    body: Array<ModuleOrg>
  }): Observable<RestApiResponseListModuleOrg> {

    return this.update24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListModuleOrg>) => r.body as RestApiResponseListModuleOrg)
    );
  }

  /**
   * Path part for operation create22
   */
  static readonly Create22Path = '/v1/module-org';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create22()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create22$Response(params: {
    body: Array<ModuleOrg>
  }): Observable<StrictHttpResponse<RestApiResponseListModuleOrg>> {

    const rb = new RequestBuilder(this.rootUrl, ModuleOrgControllerService.Create22Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListModuleOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create22$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create22(params: {
    body: Array<ModuleOrg>
  }): Observable<RestApiResponseListModuleOrg> {

    return this.create22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListModuleOrg>) => r.body as RestApiResponseListModuleOrg)
    );
  }

  /**
   * Path part for operation test
   */
  static readonly TestPath = '/v1/module-org/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `test()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  test$Response(params: {
    body: ModuleOrg
  }): Observable<StrictHttpResponse<RestApiResponseModuleOrg>> {

    const rb = new RequestBuilder(this.rootUrl, ModuleOrgControllerService.TestPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseModuleOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `test$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  test(params: {
    body: ModuleOrg
  }): Observable<RestApiResponseModuleOrg> {

    return this.test$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseModuleOrg>) => r.body as RestApiResponseModuleOrg)
    );
  }

  /**
   * Path part for operation get14
   */
  static readonly Get14Path = '/v1/module-org/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get14()` instead.
   *
   * This method doesn't expect any request body.
   */
  get14$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseModuleOrgProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ModuleOrgControllerService.Get14Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseModuleOrgProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get14(params: {
    id: number;
  }): Observable<RestApiResponseModuleOrgProjection> {

    return this.get14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseModuleOrgProjection>) => r.body as RestApiResponseModuleOrgProjection)
    );
  }

  /**
   * Path part for operation getByOrgId1
   */
  static readonly GetByOrgId1Path = '/v1/module-org/organization/{orgId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByOrgId1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByOrgId1$Response(params: {
    orgId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListUserModulePrivilegeProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ModuleOrgControllerService.GetByOrgId1Path, 'get');
    if (params) {
      rb.path('orgId', params.orgId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListUserModulePrivilegeProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByOrgId1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByOrgId1(params: {
    orgId: number;
  }): Observable<RestApiResponseListUserModulePrivilegeProjection> {

    return this.getByOrgId1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListUserModulePrivilegeProjection>) => r.body as RestApiResponseListUserModulePrivilegeProjection)
    );
  }

}
