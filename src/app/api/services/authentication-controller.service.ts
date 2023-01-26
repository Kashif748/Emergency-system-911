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

import { AuthenticationRequest } from '../models/authentication-request';
import { Note } from '../models/note';
import { RefreshTokenRequest } from '../models/refresh-token-request';
import { RegisterFirebaseTokenRequest } from '../models/register-firebase-token-request';
import { RestApiResponseAuthenticationResponse } from '../models/rest-api-response-authentication-response';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseString } from '../models/rest-api-response-string';
import { UaePassAuthRequest } from '../models/uae-pass-auth-request';
import { UpdatePasswordRequest } from '../models/update-password-request';

@Injectable()
export class AuthenticationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation refreshAccessToken
   */
  static readonly RefreshAccessTokenPath = '/v1/refresh';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshAccessToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshAccessToken$Response(params: {
    body: RefreshTokenRequest
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationControllerService.RefreshAccessTokenPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseString>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `refreshAccessToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  refreshAccessToken(params: {
    body: RefreshTokenRequest
  }): Observable<RestApiResponseString> {

    return this.refreshAccessToken$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation register
   */
  static readonly RegisterPath = '/v1/firebase';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `register()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register$Response(params: {
    body: RegisterFirebaseTokenRequest
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationControllerService.RegisterPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `register$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  register(params: {
    body: RegisterFirebaseTokenRequest
  }): Observable<RestApiResponseBoolean> {

    return this.register$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation updatePassword
   */
  static readonly UpdatePasswordPath = '/v1/update-pwd';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePassword$Response(params: {
    body: UpdatePasswordRequest
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationControllerService.UpdatePasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePassword(params: {
    body: UpdatePasswordRequest
  }): Observable<RestApiResponseBoolean> {

    return this.updatePassword$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation uaepassAuthentication
   */
  static readonly UaepassAuthenticationPath = '/v1/ext/uaepass/auth';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uaepassAuthentication()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uaepassAuthentication$Response(params: {
    body: UaePassAuthRequest
  }): Observable<StrictHttpResponse<RestApiResponseAuthenticationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationControllerService.UaepassAuthenticationPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAuthenticationResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uaepassAuthentication$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uaepassAuthentication(params: {
    body: UaePassAuthRequest
  }): Observable<RestApiResponseAuthenticationResponse> {

    return this.uaepassAuthentication$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAuthenticationResponse>) => r.body as RestApiResponseAuthenticationResponse)
    );
  }

  /**
   * Path part for operation uaepassAuthenticationAsync
   */
  static readonly UaepassAuthenticationAsyncPath = '/v1/ext/uaepass/auth/async';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uaepassAuthenticationAsync()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uaepassAuthenticationAsync$Response(params: {
    body: UaePassAuthRequest
  }): Observable<StrictHttpResponse<RestApiResponseAuthenticationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationControllerService.UaepassAuthenticationAsyncPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAuthenticationResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uaepassAuthenticationAsync$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uaepassAuthenticationAsync(params: {
    body: UaePassAuthRequest
  }): Observable<RestApiResponseAuthenticationResponse> {

    return this.uaepassAuthenticationAsync$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAuthenticationResponse>) => r.body as RestApiResponseAuthenticationResponse)
    );
  }

  /**
   * Path part for operation test1
   */
  static readonly Test1Path = '/v1/ext/firebase/test';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `test1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  test1$Response(params: {
    token: string;
    body: Note
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationControllerService.Test1Path, 'post');
    if (params) {
      rb.query('token', params.token, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `test1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  test1(params: {
    token: string;
    body: Note
  }): Observable<RestApiResponseBoolean> {

    return this.test1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation createAuthenticationToken
   */
  static readonly CreateAuthenticationTokenPath = '/v1/ext/authenticate';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createAuthenticationToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAuthenticationToken$Response(params: {
    body: AuthenticationRequest
  }): Observable<StrictHttpResponse<RestApiResponseAuthenticationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationControllerService.CreateAuthenticationTokenPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAuthenticationResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createAuthenticationToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createAuthenticationToken(params: {
    body: AuthenticationRequest
  }): Observable<RestApiResponseAuthenticationResponse> {

    return this.createAuthenticationToken$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAuthenticationResponse>) => r.body as RestApiResponseAuthenticationResponse)
    );
  }

  /**
   * Path part for operation invalidateToken
   */
  static readonly InvalidateTokenPath = '/v1/a_logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `invalidateToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  invalidateToken$Response(params?: {
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, AuthenticationControllerService.InvalidateTokenPath, 'post');
    if (params) {
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
   * To access the full response (for headers, for example), `invalidateToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  invalidateToken(params?: {
  }): Observable<void> {

    return this.invalidateToken$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
