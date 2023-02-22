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

import { CircularStatus } from '../models/circular-status';
import { RestApiResponseCircularStatus } from '../models/rest-api-response-circular-status';

@Injectable()
export class CircularStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation update75
   */
  static readonly Update75Path = '/v1/circular-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update75()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update75$Response(params: {
    body: CircularStatus
  }): Observable<StrictHttpResponse<RestApiResponseCircularStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CircularStatusControllerService.Update75Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update75$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update75(params: {
    body: CircularStatus
  }): Observable<RestApiResponseCircularStatus> {

    return this.update75$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularStatus>) => r.body as RestApiResponseCircularStatus)
    );
  }

  /**
   * Path part for operation create70
   */
  static readonly Create70Path = '/v1/circular-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create70()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create70$Response(params: {
    body: CircularStatus
  }): Observable<StrictHttpResponse<RestApiResponseCircularStatus>> {

    const rb = new RequestBuilder(this.rootUrl, CircularStatusControllerService.Create70Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create70$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create70(params: {
    body: CircularStatus
  }): Observable<RestApiResponseCircularStatus> {

    return this.create70$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularStatus>) => r.body as RestApiResponseCircularStatus)
    );
  }

}
