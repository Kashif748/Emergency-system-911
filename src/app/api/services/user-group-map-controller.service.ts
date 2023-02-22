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

import { GroupUser } from '../models/group-user';
import { Pageable } from '../models/pageable';
import { RestApiResponseGroupUser } from '../models/rest-api-response-group-user';
import { RestApiResponseListGroupUser } from '../models/rest-api-response-list-group-user';
import { RestApiResponsePageUserGroupProjection } from '../models/rest-api-response-page-user-group-projection';

@Injectable()
export class UserGroupMapControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateUserGroupManagerMap
   */
  static readonly UpdateUserGroupManagerMapPath = '/v1/groups/{groupId}/users/manager';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserGroupManagerMap()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserGroupManagerMap$Response(params: {
    groupId: number;
    body: GroupUser
  }): Observable<StrictHttpResponse<RestApiResponseGroupUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserGroupMapControllerService.UpdateUserGroupManagerMapPath, 'put');
    if (params) {
      rb.path('groupId', params.groupId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseGroupUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUserGroupManagerMap$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserGroupManagerMap(params: {
    groupId: number;
    body: GroupUser
  }): Observable<RestApiResponseGroupUser> {

    return this.updateUserGroupManagerMap$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroupUser>) => r.body as RestApiResponseGroupUser)
    );
  }

  /**
   * Path part for operation findByActiveGroup1
   */
  static readonly FindByActiveGroup1Path = '/v1/groups/{groupId}/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByActiveGroup1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByActiveGroup1$Response(params: {
    groupId: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageUserGroupProjection>> {

    const rb = new RequestBuilder(this.rootUrl, UserGroupMapControllerService.FindByActiveGroup1Path, 'get');
    if (params) {
      rb.path('groupId', params.groupId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageUserGroupProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByActiveGroup1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByActiveGroup1(params: {
    groupId: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageUserGroupProjection> {

    return this.findByActiveGroup1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageUserGroupProjection>) => r.body as RestApiResponsePageUserGroupProjection)
    );
  }

  /**
   * Path part for operation updateUserGroupMemberMap
   */
  static readonly UpdateUserGroupMemberMapPath = '/v1/groups/{groupId}/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserGroupMemberMap()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserGroupMemberMap$Response(params: {
    groupId: number;
    body: Array<GroupUser>
  }): Observable<StrictHttpResponse<RestApiResponseListGroupUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserGroupMapControllerService.UpdateUserGroupMemberMapPath, 'put');
    if (params) {
      rb.path('groupId', params.groupId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListGroupUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateUserGroupMemberMap$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateUserGroupMemberMap(params: {
    groupId: number;
    body: Array<GroupUser>
  }): Observable<RestApiResponseListGroupUser> {

    return this.updateUserGroupMemberMap$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroupUser>) => r.body as RestApiResponseListGroupUser)
    );
  }

  /**
   * Path part for operation createUserGroupMap
   */
  static readonly CreateUserGroupMapPath = '/v1/groups/{groupId}/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createUserGroupMap()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUserGroupMap$Response(params: {
    groupId: number;
    body: Array<GroupUser>
  }): Observable<StrictHttpResponse<RestApiResponseListGroupUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserGroupMapControllerService.CreateUserGroupMapPath, 'post');
    if (params) {
      rb.path('groupId', params.groupId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListGroupUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createUserGroupMap$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createUserGroupMap(params: {
    groupId: number;
    body: Array<GroupUser>
  }): Observable<RestApiResponseListGroupUser> {

    return this.createUserGroupMap$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroupUser>) => r.body as RestApiResponseListGroupUser)
    );
  }

}
