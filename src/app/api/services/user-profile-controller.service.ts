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
import { ResetPasswordRequest } from '../models/reset-password-request';
import { RestApiResponseListUserMinimunProjection } from '../models/rest-api-response-list-user-minimun-projection';
import { RestApiResponseListUserModulePrivilegeProjection } from '../models/rest-api-response-list-user-module-privilege-projection';
import { RestApiResponseListUserWithoutPhotoMinimunProjection } from '../models/rest-api-response-list-user-without-photo-minimun-projection';
import { RestApiResponseObject } from '../models/rest-api-response-object';
import { RestApiResponsePageUserAndRoleProjection } from '../models/rest-api-response-page-user-and-role-projection';
import { RestApiResponseResponse } from '../models/rest-api-response-response';
import { RestApiResponseUser } from '../models/rest-api-response-user';
import { UpdateUserRequest } from '../models/update-user-request';
import { User } from '../models/user';
import { UserInappAuthentication } from '../models/user-inapp-authentication';
import { UserMiddlewareAuth } from '../models/user-middleware-auth';
import { UserProfileRequest } from '../models/user-profile-request';

@Injectable()
export class UserProfileControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v2Update
   */
  static readonly V2UpdatePath = '/v1/users/{userId}/new';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v2Update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v2Update$Response(params: {
    userId: number;
    body: (User | UserInappAuthentication | UserMiddlewareAuth)
  }): Observable<StrictHttpResponse<RestApiResponseUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.V2UpdatePath, 'put');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v2Update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v2Update(params: {
    userId: number;
    body: (User | UserInappAuthentication | UserMiddlewareAuth)
  }): Observable<RestApiResponseUser> {

    return this.v2Update$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseUser>) => r.body as RestApiResponseUser)
    );
  }

  /**
   * Path part for operation update2
   */
  static readonly Update2Path = '/v1/users/update-user/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update2$Response(params: {
    userId: number;
    body: UpdateUserRequest
  }): Observable<StrictHttpResponse<RestApiResponseUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.Update2Path, 'put');
    if (params) {
      rb.path('userId', params.userId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update2(params: {
    userId: number;
    body: UpdateUserRequest
  }): Observable<RestApiResponseUser> {

    return this.update2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseUser>) => r.body as RestApiResponseUser)
    );
  }

  /**
   * Path part for operation updateUserToActive
   */
  static readonly UpdateUserToActivePath = '/v1/users/activate-user/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateUserToActive()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUserToActive$Response(params: {
    userId: number;
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.UpdateUserToActivePath, 'put');
    if (params) {
      rb.path('userId', params.userId, {});
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
   * To access the full response (for headers, for example), `updateUserToActive$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateUserToActive(params: {
    userId: number;
  }): Observable<RestApiResponseObject> {

    return this.updateUserToActive$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

  /**
   * Path part for operation v2Create
   */
  static readonly V2CreatePath = '/v1/users/new';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v2Create()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v2Create$Response(params: {
    body: (User | UserInappAuthentication | UserMiddlewareAuth)
  }): Observable<StrictHttpResponse<RestApiResponseUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.V2CreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v2Create$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v2Create(params: {
    body: (User | UserInappAuthentication | UserMiddlewareAuth)
  }): Observable<RestApiResponseUser> {

    return this.v2Create$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseUser>) => r.body as RestApiResponseUser)
    );
  }

  /**
   * Path part for operation importData
   */
  static readonly ImportDataPath = '/v1/users/import';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `importData()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  importData$Response(params?: {
    body?: { 'file': Blob }
  }): Observable<StrictHttpResponse<RestApiResponseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.ImportDataPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `importData$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  importData(params?: {
    body?: { 'file': Blob }
  }): Observable<RestApiResponseResponse> {

    return this.importData$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseResponse>) => r.body as RestApiResponseResponse)
    );
  }

  /**
   * Path part for operation resetPassword
   */
  static readonly ResetPasswordPath = '/v1/users/ext/reset-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resetPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPassword$Response(params: {
    body: ResetPasswordRequest
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.ResetPasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `resetPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  resetPassword(params: {
    body: ResetPasswordRequest
  }): Observable<RestApiResponseObject> {

    return this.resetPassword$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

  /**
   * Path part for operation getAllForOrg
   */
  static readonly GetAllForOrgPath = '/v1/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllForOrg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllForOrg$Response(params: {
    name?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageUserAndRoleProjection>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.GetAllForOrgPath, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageUserAndRoleProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllForOrg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllForOrg(params: {
    name?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageUserAndRoleProjection> {

    return this.getAllForOrg$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageUserAndRoleProjection>) => r.body as RestApiResponsePageUserAndRoleProjection)
    );
  }

  /**
   * Path part for operation create3
   */
  static readonly Create3Path = '/v1/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create3$Response(params: {
    body: UserInappAuthentication
  }): Observable<StrictHttpResponse<RestApiResponseUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.Create3Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create3(params: {
    body: UserInappAuthentication
  }): Observable<RestApiResponseUser> {

    return this.create3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseUser>) => r.body as RestApiResponseUser)
    );
  }

  /**
   * Path part for operation get1
   */
  static readonly Get1Path = '/v1/users/{userId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get1()` instead.
   *
   * This method doesn't expect any request body.
   */
  get1$Response(params: {
    userId: number;
  }): Observable<StrictHttpResponse<RestApiResponseUser>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.Get1Path, 'get');
    if (params) {
      rb.path('userId', params.userId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseUser>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get1(params: {
    userId: number;
  }): Observable<RestApiResponseUser> {

    return this.get1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseUser>) => r.body as RestApiResponseUser)
    );
  }

  /**
   * Path part for operation findModulesAndPrivileges
   */
  static readonly FindModulesAndPrivilegesPath = '/v1/users/modules-privileges';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findModulesAndPrivileges()` instead.
   *
   * This method doesn't expect any request body.
   */
  findModulesAndPrivileges$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListUserModulePrivilegeProjection>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.FindModulesAndPrivilegesPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `findModulesAndPrivileges$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findModulesAndPrivileges(params?: {
  }): Observable<RestApiResponseListUserModulePrivilegeProjection> {

    return this.findModulesAndPrivileges$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListUserModulePrivilegeProjection>) => r.body as RestApiResponseListUserModulePrivilegeProjection)
    );
  }

  /**
   * Path part for operation getUsers
   */
  static readonly GetUsersPath = '/v1/users/managers/{privilegeId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers$Response(params: {
    privilegeId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListUserMinimunProjection>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.GetUsersPath, 'get');
    if (params) {
      rb.path('privilegeId', params.privilegeId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListUserMinimunProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUsers(params: {
    privilegeId: number;
  }): Observable<RestApiResponseListUserMinimunProjection> {

    return this.getUsers$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListUserMinimunProjection>) => r.body as RestApiResponseListUserMinimunProjection)
    );
  }

  /**
   * Path part for operation forgetPassword
   */
  static readonly ForgetPasswordPath = '/v1/users/ext/forget-password';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `forgetPassword()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgetPassword$Response(params: {
    email: string;
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.ForgetPasswordPath, 'get');
    if (params) {
      rb.query('email', params.email, {});
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
   * To access the full response (for headers, for example), `forgetPassword$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  forgetPassword(params: {
    email: string;
  }): Observable<RestApiResponseObject> {

    return this.forgetPassword$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

  /**
   * Path part for operation export1
   */
  static readonly Export1Path = '/v1/users/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export1()` instead.
   *
   * This method doesn't expect any request body.
   */
  export1$Response(params: {
    request: UserProfileRequest;
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.Export1Path, 'get');
    if (params) {
      rb.query('request', params.request, {});
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `export1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export1(params: {
    request: UserProfileRequest;
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<any> {

    return this.export1$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getAllUsers
   */
  static readonly GetAllUsersPath = '/v1/users/all-users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers$Response(params: {
    name?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponseListUserWithoutPhotoMinimunProjection>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.GetAllUsersPath, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListUserWithoutPhotoMinimunProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers(params: {
    name?: string;
    pageable: Pageable;
  }): Observable<RestApiResponseListUserWithoutPhotoMinimunProjection> {

    return this.getAllUsers$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListUserWithoutPhotoMinimunProjection>) => r.body as RestApiResponseListUserWithoutPhotoMinimunProjection)
    );
  }

  /**
   * Path part for operation getAllUsers1
   */
  static readonly GetAllUsers1Path = '/v1/users/all-user-profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllUsers1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers1$Response(params: {
    request: UserProfileRequest;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageUserAndRoleProjection>> {

    const rb = new RequestBuilder(this.rootUrl, UserProfileControllerService.GetAllUsers1Path, 'get');
    if (params) {
      rb.query('request', params.request, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageUserAndRoleProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllUsers1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllUsers1(params: {
    request: UserProfileRequest;
    pageable: Pageable;
  }): Observable<RestApiResponsePageUserAndRoleProjection> {

    return this.getAllUsers1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageUserAndRoleProjection>) => r.body as RestApiResponsePageUserAndRoleProjection)
    );
  }

}
