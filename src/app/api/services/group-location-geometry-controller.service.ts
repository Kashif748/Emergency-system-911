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

import { GroupLocationGeoInfo } from '../models/group-location-geo-info';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseListGroupLocationGeoResponse } from '../models/rest-api-response-list-group-location-geo-response';

@Injectable()
export class GroupLocationGeometryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation update51
   */
  static readonly Update51Path = '/v1/group-geometry-location';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update51()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update51$Response(params: {
    body: GroupLocationGeoInfo
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, GroupLocationGeometryControllerService.Update51Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update51$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update51(params: {
    body: GroupLocationGeoInfo
  }): Observable<RestApiResponseBoolean> {

    return this.update51$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation create47
   */
  static readonly Create47Path = '/v1/group-geometry-location';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create47()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create47$Response(params: {
    body: GroupLocationGeoInfo
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, GroupLocationGeometryControllerService.Create47Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create47$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create47(params: {
    body: GroupLocationGeoInfo
  }): Observable<RestApiResponseBoolean> {

    return this.create47$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation getByGroupId
   */
  static readonly GetByGroupIdPath = '/v1/group-geometry-location/{groupId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByGroupId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByGroupId$Response(params: {
    groupId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListGroupLocationGeoResponse>> {

    const rb = new RequestBuilder(this.rootUrl, GroupLocationGeometryControllerService.GetByGroupIdPath, 'get');
    if (params) {
      rb.path('groupId', params.groupId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListGroupLocationGeoResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByGroupId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByGroupId(params: {
    groupId: number;
  }): Observable<RestApiResponseListGroupLocationGeoResponse> {

    return this.getByGroupId$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroupLocationGeoResponse>) => r.body as RestApiResponseListGroupLocationGeoResponse)
    );
  }

}
