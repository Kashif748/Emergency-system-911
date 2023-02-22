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

import { GroupZones } from '../models/group-zones';
import { RestApiResponseGroupZonesProjection } from '../models/rest-api-response-group-zones-projection';
import { RestApiResponseListGroupZones } from '../models/rest-api-response-list-group-zones';

@Injectable()
export class GroupZonesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findByActiveGroup
   */
  static readonly FindByActiveGroupPath = '/v1/groups/{groupId}/zones';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByActiveGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByActiveGroup$Response(params: {
    groupId: number;
  }): Observable<StrictHttpResponse<RestApiResponseGroupZonesProjection>> {

    const rb = new RequestBuilder(this.rootUrl, GroupZonesControllerService.FindByActiveGroupPath, 'get');
    if (params) {
      rb.path('groupId', params.groupId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseGroupZonesProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByActiveGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByActiveGroup(params: {
    groupId: number;
  }): Observable<RestApiResponseGroupZonesProjection> {

    return this.findByActiveGroup$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroupZonesProjection>) => r.body as RestApiResponseGroupZonesProjection)
    );
  }

  /**
   * Path part for operation update46
   */
  static readonly Update46Path = '/v1/groups/{groupId}/zones';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update46()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update46$Response(params: {
    groupId: number;
    body: GroupZones
  }): Observable<StrictHttpResponse<RestApiResponseListGroupZones>> {

    const rb = new RequestBuilder(this.rootUrl, GroupZonesControllerService.Update46Path, 'put');
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
        return r as StrictHttpResponse<RestApiResponseListGroupZones>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update46$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update46(params: {
    groupId: number;
    body: GroupZones
  }): Observable<RestApiResponseListGroupZones> {

    return this.update46$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroupZones>) => r.body as RestApiResponseListGroupZones)
    );
  }

  /**
   * Path part for operation create42
   */
  static readonly Create42Path = '/v1/groups/{groupId}/zones';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create42()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create42$Response(params: {
    groupId: number;
    body: GroupZones
  }): Observable<StrictHttpResponse<RestApiResponseListGroupZones>> {

    const rb = new RequestBuilder(this.rootUrl, GroupZonesControllerService.Create42Path, 'post');
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
        return r as StrictHttpResponse<RestApiResponseListGroupZones>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create42$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create42(params: {
    groupId: number;
    body: GroupZones
  }): Observable<RestApiResponseListGroupZones> {

    return this.create42$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroupZones>) => r.body as RestApiResponseListGroupZones)
    );
  }

}
