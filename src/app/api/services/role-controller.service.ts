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

import { Pageable } from '../models/pageable';
import { RestApiResponseObject } from '../models/rest-api-response-object';
import { RestApiResponsePageRoleProjection } from '../models/rest-api-response-page-role-projection';
import { RestApiResponseRole } from '../models/rest-api-response-role';
import { RestApiResponseRoleProjection } from '../models/rest-api-response-role-projection';
import { RestApiResponseSetRole } from '../models/rest-api-response-set-role';
import { Role } from '../models/role';

@Injectable()
export class RoleControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findByPage1
   */
  static readonly FindByPage1Path = '/v1/roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByPage1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByPage1$Response(params: {
    orgName?: string;
    roleName?: string;
    status?: boolean;
    inherited?: number;
    orgIds?: Array<number>;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageRoleProjection>> {

    const rb = new RequestBuilder(this.rootUrl, RoleControllerService.FindByPage1Path, 'get');
    if (params) {
      rb.query('orgName', params.orgName, {});
      rb.query('roleName', params.roleName, {});
      rb.query('status', params.status, {});
      rb.query('inherited', params.inherited, {});
      rb.query('orgIds', params.orgIds, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageRoleProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByPage1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByPage1(params: {
    orgName?: string;
    roleName?: string;
    status?: boolean;
    inherited?: number;
    orgIds?: Array<number>;
    pageable: Pageable;
  }): Observable<RestApiResponsePageRoleProjection> {

    return this.findByPage1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageRoleProjection>) => r.body as RestApiResponsePageRoleProjection)
    );
  }

  /**
   * Path part for operation updateRole
   */
  static readonly UpdateRolePath = '/v1/roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRole$Response(params: {
    body: Role
  }): Observable<StrictHttpResponse<RestApiResponseRoleProjection>> {

    const rb = new RequestBuilder(this.rootUrl, RoleControllerService.UpdateRolePath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseRoleProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateRole(params: {
    body: Role
  }): Observable<RestApiResponseRoleProjection> {

    return this.updateRole$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseRoleProjection>) => r.body as RestApiResponseRoleProjection)
    );
  }

  /**
   * Path part for operation createRole
   */
  static readonly CreateRolePath = '/v1/roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRole$Response(params: {
    body: Role
  }): Observable<StrictHttpResponse<RestApiResponseRole>> {

    const rb = new RequestBuilder(this.rootUrl, RoleControllerService.CreateRolePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseRole>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createRole(params: {
    body: Role
  }): Observable<RestApiResponseRole> {

    return this.createRole$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseRole>) => r.body as RestApiResponseRole)
    );
  }

  /**
   * Path part for operation getById2
   */
  static readonly GetById2Path = '/v1/roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseRoleProjection>> {

    const rb = new RequestBuilder(this.rootUrl, RoleControllerService.GetById2Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseRoleProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById2(params: {
    id: number;
  }): Observable<RestApiResponseRoleProjection> {

    return this.getById2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseRoleProjection>) => r.body as RestApiResponseRoleProjection)
    );
  }

  /**
   * Path part for operation deleteRole
   */
  static readonly DeleteRolePath = '/v1/roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRole$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, RoleControllerService.DeleteRolePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteRole(params: {
    id: number;
  }): Observable<RestApiResponseObject> {

    return this.deleteRole$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

  /**
   * Path part for operation getByOrgId
   */
  static readonly GetByOrgIdPath = '/v1/roles/organization/{orgId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByOrgId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByOrgId$Response(params: {
    orgId: number;
  }): Observable<StrictHttpResponse<RestApiResponseSetRole>> {

    const rb = new RequestBuilder(this.rootUrl, RoleControllerService.GetByOrgIdPath, 'get');
    if (params) {
      rb.path('orgId', params.orgId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSetRole>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByOrgId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByOrgId(params: {
    orgId: number;
  }): Observable<RestApiResponseSetRole> {

    return this.getByOrgId$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSetRole>) => r.body as RestApiResponseSetRole)
    );
  }

}
