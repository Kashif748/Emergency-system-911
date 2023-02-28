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

import { GroupCenters } from '../models/group-centers';
import { RestApiResponseGroupCentersProjection } from '../models/rest-api-response-group-centers-projection';
import { RestApiResponseListGroupCenters } from '../models/rest-api-response-list-group-centers';

@Injectable()
export class GroupCentersControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findByActiveGroup3
   */
  static readonly FindByActiveGroup3Path = '/v1/groups/{groupId}/centers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByActiveGroup3()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByActiveGroup3$Response(params: {
    groupId: number;
  }): Observable<StrictHttpResponse<RestApiResponseGroupCentersProjection>> {

    const rb = new RequestBuilder(this.rootUrl, GroupCentersControllerService.FindByActiveGroup3Path, 'get');
    if (params) {
      rb.path('groupId', params.groupId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseGroupCentersProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByActiveGroup3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByActiveGroup3(params: {
    groupId: number;
  }): Observable<RestApiResponseGroupCentersProjection> {

    return this.findByActiveGroup3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroupCentersProjection>) => r.body as RestApiResponseGroupCentersProjection)
    );
  }

  /**
   * Path part for operation update48
   */
  static readonly Update48Path = '/v1/groups/{groupId}/centers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update48()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update48$Response(params: {
    groupId: number;
    body: GroupCenters
  }): Observable<StrictHttpResponse<RestApiResponseListGroupCenters>> {

    const rb = new RequestBuilder(this.rootUrl, GroupCentersControllerService.Update48Path, 'put');
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
        return r as StrictHttpResponse<RestApiResponseListGroupCenters>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update48$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update48(params: {
    groupId: number;
    body: GroupCenters
  }): Observable<RestApiResponseListGroupCenters> {

    return this.update48$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroupCenters>) => r.body as RestApiResponseListGroupCenters)
    );
  }

  /**
   * Path part for operation create44
   */
  static readonly Create44Path = '/v1/groups/{groupId}/centers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create44()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create44$Response(params: {
    groupId: number;
    body: GroupCenters
  }): Observable<StrictHttpResponse<RestApiResponseListGroupCenters>> {

    const rb = new RequestBuilder(this.rootUrl, GroupCentersControllerService.Create44Path, 'post');
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
        return r as StrictHttpResponse<RestApiResponseListGroupCenters>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create44$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create44(params: {
    groupId: number;
    body: GroupCenters
  }): Observable<RestApiResponseListGroupCenters> {

    return this.create44$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroupCenters>) => r.body as RestApiResponseListGroupCenters)
    );
  }

}
