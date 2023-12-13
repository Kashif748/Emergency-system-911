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

import { GroupContractRequest } from '../models/group-contract-request';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseGroupContract } from '../models/rest-api-response-group-contract';

@Injectable()
export class GroupContractControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation update53
   */
  static readonly Update53Path = '/v1/group-contract';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update53()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update53$Response(params: {
    body: GroupContractRequest
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, GroupContractControllerService.Update53Path, 'put');
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
   * To access the full response (for headers, for example), `update53$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update53(params: {
    body: GroupContractRequest
  }): Observable<RestApiResponseBoolean> {

    return this.update53$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation getByGroup
   */
  static readonly GetByGroupPath = '/v1/group-contract/{groupId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByGroup$Response(params: {
    groupId: number;
  }): Observable<StrictHttpResponse<RestApiResponseGroupContract>> {

    const rb = new RequestBuilder(this.rootUrl, GroupContractControllerService.GetByGroupPath, 'get');
    if (params) {
      rb.path('groupId', params.groupId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseGroupContract>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByGroup(params: {
    groupId: number;
  }): Observable<RestApiResponseGroupContract> {

    return this.getByGroup$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroupContract>) => r.body as RestApiResponseGroupContract)
    );
  }

}
