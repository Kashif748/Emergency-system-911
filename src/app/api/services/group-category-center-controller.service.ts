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

import { IncidentLocationInfo } from '../models/incident-location-info';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseIncidentLocationInfoResponse } from '../models/rest-api-response-incident-location-info-response';
import { RestApiResponseListGroup } from '../models/rest-api-response-list-group';

@Injectable()
export class GroupCategoryCenterControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getGroups
   */
  static readonly GetGroupsPath = '/v1/incident-location-info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGroups()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGroups$Response(params: {
    category: number;
    center?: number;
    zone: number;
    location?: string;
    contractNo?: Array<string>;
  }): Observable<StrictHttpResponse<RestApiResponseListGroup>> {

    const rb = new RequestBuilder(this.rootUrl, GroupCategoryCenterControllerService.GetGroupsPath, 'get');
    if (params) {
      rb.query('category', params.category, {});
      rb.query('center', params.center, {});
      rb.query('zone', params.zone, {});
      rb.query('location', params.location, {});
      rb.query('contractNo', params.contractNo, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListGroup>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGroups$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGroups(params: {
    category: number;
    center?: number;
    zone: number;
    location?: string;
    contractNo?: Array<string>;
  }): Observable<RestApiResponseListGroup> {

    return this.getGroups$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroup>) => r.body as RestApiResponseListGroup)
    );
  }

  /**
   * Path part for operation update43
   */
  static readonly Update43Path = '/v1/incident-location-info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update43()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update43$Response(params: {
    body: IncidentLocationInfo
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, GroupCategoryCenterControllerService.Update43Path, 'put');
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
   * To access the full response (for headers, for example), `update43$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update43(params: {
    body: IncidentLocationInfo
  }): Observable<RestApiResponseBoolean> {

    return this.update43$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation addInfo
   */
  static readonly AddInfoPath = '/v1/incident-location-info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addInfo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addInfo$Response(params: {
    body: IncidentLocationInfo
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, GroupCategoryCenterControllerService.AddInfoPath, 'post');
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
   * To access the full response (for headers, for example), `addInfo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addInfo(params: {
    body: IncidentLocationInfo
  }): Observable<RestApiResponseBoolean> {

    return this.addInfo$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation getByGroupCenter
   */
  static readonly GetByGroupCenterPath = '/v1/incident-location-info/{groupId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByGroupCenter()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByGroupCenter$Response(params: {
    groupId: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentLocationInfoResponse>> {

    const rb = new RequestBuilder(this.rootUrl, GroupCategoryCenterControllerService.GetByGroupCenterPath, 'get');
    if (params) {
      rb.path('groupId', params.groupId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentLocationInfoResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByGroupCenter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByGroupCenter(params: {
    groupId: number;
  }): Observable<RestApiResponseIncidentLocationInfoResponse> {

    return this.getByGroupCenter$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentLocationInfoResponse>) => r.body as RestApiResponseIncidentLocationInfoResponse)
    );
  }

}
