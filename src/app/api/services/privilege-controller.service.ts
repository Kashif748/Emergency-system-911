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
import { RestApiResponseListPrivilege } from '../models/rest-api-response-list-privilege';
import { RestApiResponseListUserProjection } from '../models/rest-api-response-list-user-projection';
import { RestApiResponseMapLongListPrivilege } from '../models/rest-api-response-map-long-list-privilege';
import { RestApiResponseSetString } from '../models/rest-api-response-set-string';
import { Role } from '../models/role';

@Injectable()
export class PrivilegeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getOrgUsers
   */
  static readonly GetOrgUsersPath = '/v1/privileges/{code}/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrgUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrgUsers$Response(params: {
    code: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponseListUserProjection>> {

    const rb = new RequestBuilder(this.rootUrl, PrivilegeControllerService.GetOrgUsersPath, 'get');
    if (params) {
      rb.path('code', params.code, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListUserProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrgUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrgUsers(params: {
    code: string;
    pageable: Pageable;
  }): Observable<RestApiResponseListUserProjection> {

    return this.getOrgUsers$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListUserProjection>) => r.body as RestApiResponseListUserProjection)
    );
  }

  /**
   * Path part for operation getByRole
   */
  static readonly GetByRolePath = '/v1/privileges/role/{roleId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByRole$Response(params: {
    roleId: Role;
  }): Observable<StrictHttpResponse<RestApiResponseListPrivilege>> {

    const rb = new RequestBuilder(this.rootUrl, PrivilegeControllerService.GetByRolePath, 'get');
    if (params) {
      rb.path('roleId', params.roleId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListPrivilege>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByRole(params: {
    roleId: Role;
  }): Observable<RestApiResponseListPrivilege> {

    return this.getByRole$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListPrivilege>) => r.body as RestApiResponseListPrivilege)
    );
  }

  /**
   * Path part for operation getLoggedInUserPrivileges
   */
  static readonly GetLoggedInUserPrivilegesPath = '/v1/privileges/currentuser';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLoggedInUserPrivileges()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoggedInUserPrivileges$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseSetString>> {

    const rb = new RequestBuilder(this.rootUrl, PrivilegeControllerService.GetLoggedInUserPrivilegesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSetString>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getLoggedInUserPrivileges$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLoggedInUserPrivileges(params?: {
  }): Observable<RestApiResponseSetString> {

    return this.getLoggedInUserPrivileges$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSetString>) => r.body as RestApiResponseSetString)
    );
  }

  /**
   * Path part for operation get8
   */
  static readonly Get8Path = '/v1/privileges';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get8()` instead.
   *
   * This method doesn't expect any request body.
   */
  get8$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseMapLongListPrivilege>> {

    const rb = new RequestBuilder(this.rootUrl, PrivilegeControllerService.Get8Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseMapLongListPrivilege>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get8(params?: {
  }): Observable<RestApiResponseMapLongListPrivilege> {

    return this.get8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseMapLongListPrivilege>) => r.body as RestApiResponseMapLongListPrivilege)
    );
  }

}
