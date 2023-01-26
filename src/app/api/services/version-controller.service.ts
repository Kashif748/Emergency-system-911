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
import { RestApiResponseVersion } from '../models/rest-api-response-version';
import { RestApiResponseVersionWithLastSupported } from '../models/rest-api-response-version-with-last-supported';
import { Version } from '../models/version';

@Injectable()
export class VersionControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateVersion
   */
  static readonly UpdateVersionPath = '/v1/version';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateVersion()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVersion$Response(params: {
    body: Version
  }): Observable<StrictHttpResponse<RestApiResponseVersion>> {

    const rb = new RequestBuilder(this.rootUrl, VersionControllerService.UpdateVersionPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseVersion>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateVersion$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateVersion(params: {
    body: Version
  }): Observable<RestApiResponseVersion> {

    return this.updateVersion$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseVersion>) => r.body as RestApiResponseVersion)
    );
  }

  /**
   * Path part for operation addVersion
   */
  static readonly AddVersionPath = '/v1/version';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addVersion()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addVersion$Response(params: {
    body: Version
  }): Observable<StrictHttpResponse<RestApiResponseVersion>> {

    const rb = new RequestBuilder(this.rootUrl, VersionControllerService.AddVersionPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseVersion>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addVersion$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addVersion(params: {
    body: Version
  }): Observable<RestApiResponseVersion> {

    return this.addVersion$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseVersion>) => r.body as RestApiResponseVersion)
    );
  }

  /**
   * Path part for operation setActive
   */
  static readonly SetActivePath = '/v1/version/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `setActive()` instead.
   *
   * This method doesn't expect any request body.
   */
  setActive$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseVersion>> {

    const rb = new RequestBuilder(this.rootUrl, VersionControllerService.SetActivePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseVersion>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `setActive$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  setActive(params: {
    id: number;
  }): Observable<RestApiResponseVersion> {

    return this.setActive$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseVersion>) => r.body as RestApiResponseVersion)
    );
  }

  /**
   * Path part for operation getAll1
   */
  static readonly GetAll1Path = '/v1/version/ext/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll1$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponseVersionWithLastSupported>> {

    const rb = new RequestBuilder(this.rootUrl, VersionControllerService.GetAll1Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseVersionWithLastSupported>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll1(params: {
    pageable: Pageable;
  }): Observable<RestApiResponseVersionWithLastSupported> {

    return this.getAll1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseVersionWithLastSupported>) => r.body as RestApiResponseVersionWithLastSupported)
    );
  }

}
