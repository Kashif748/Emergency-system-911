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

import { RestApiResponseString } from '../models/rest-api-response-string';
import { RestApiResponseUaePassUserResponse } from '../models/rest-api-response-uae-pass-user-response';
import { UaePassExtRequest } from '../models/uae-pass-ext-request';

@Injectable()
export class UaePassControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation verifyEnc
   */
  static readonly VerifyEncPath = '/v1/ext/uaepass/auth/temp/user-info-enc';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyEnc()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyEnc$Response(params: {
    body: UaePassExtRequest
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, UaePassControllerService.VerifyEncPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseString>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `verifyEnc$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyEnc(params: {
    body: UaePassExtRequest
  }): Observable<RestApiResponseString> {

    return this.verifyEnc$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation verifyDecrypt
   */
  static readonly VerifyDecryptPath = '/v1/ext/uaepass/auth/temp/user-info-decrypt';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verifyDecrypt()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyDecrypt$Response(params: {
    body: string
  }): Observable<StrictHttpResponse<RestApiResponseUaePassUserResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UaePassControllerService.VerifyDecryptPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseUaePassUserResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `verifyDecrypt$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verifyDecrypt(params: {
    body: string
  }): Observable<RestApiResponseUaePassUserResponse> {

    return this.verifyDecrypt$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseUaePassUserResponse>) => r.body as RestApiResponseUaePassUserResponse)
    );
  }

  /**
   * Path part for operation verify
   */
  static readonly VerifyPath = '/v1/ext/uaepass/auth/temp/user-info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `verify()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verify$Response(params: {
    body: UaePassExtRequest
  }): Observable<StrictHttpResponse<RestApiResponseUaePassUserResponse>> {

    const rb = new RequestBuilder(this.rootUrl, UaePassControllerService.VerifyPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseUaePassUserResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `verify$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  verify(params: {
    body: UaePassExtRequest
  }): Observable<RestApiResponseUaePassUserResponse> {

    return this.verify$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseUaePassUserResponse>) => r.body as RestApiResponseUaePassUserResponse)
    );
  }

}
