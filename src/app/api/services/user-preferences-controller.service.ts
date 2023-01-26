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
import { RestApiResponsePageUserPreferencesProjection } from '../models/rest-api-response-page-user-preferences-projection';
import { RestApiResponseString } from '../models/rest-api-response-string';
import { RestApiResponseUserPreferencesRes } from '../models/rest-api-response-user-preferences-res';
import { UserPreferences } from '../models/user-preferences';

@Injectable()
export class UserPreferencesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll2
   */
  static readonly GetAll2Path = '/v1/user-prefrences';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll2$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageUserPreferencesProjection>> {

    const rb = new RequestBuilder(this.rootUrl, UserPreferencesControllerService.GetAll2Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageUserPreferencesProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll2(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageUserPreferencesProjection> {

    return this.getAll2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageUserPreferencesProjection>) => r.body as RestApiResponsePageUserPreferencesProjection)
    );
  }

  /**
   * Path part for operation update3
   */
  static readonly Update3Path = '/v1/user-prefrences';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update3$Response(params: {
    body: UserPreferences
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, UserPreferencesControllerService.Update3Path, 'put');
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
   * To access the full response (for headers, for example), `update3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update3(params: {
    body: UserPreferences
  }): Observable<RestApiResponseString> {

    return this.update3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation getByStateKey
   */
  static readonly GetByStateKeyPath = '/v1/user-prefrences/stateKey';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByStateKey()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByStateKey$Response(params: {
    stateKey: string;
  }): Observable<StrictHttpResponse<RestApiResponseUserPreferencesRes>> {

    const rb = new RequestBuilder(this.rootUrl, UserPreferencesControllerService.GetByStateKeyPath, 'get');
    if (params) {
      rb.query('stateKey', params.stateKey, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseUserPreferencesRes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByStateKey$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByStateKey(params: {
    stateKey: string;
  }): Observable<RestApiResponseUserPreferencesRes> {

    return this.getByStateKey$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseUserPreferencesRes>) => r.body as RestApiResponseUserPreferencesRes)
    );
  }

}
