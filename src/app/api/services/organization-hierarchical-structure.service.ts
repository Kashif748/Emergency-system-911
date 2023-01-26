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

import { RestApiResponseListOrgStructureProjection } from '../models/rest-api-response-list-org-structure-projection';

@Injectable()
export class OrganizationHierarchicalStructureService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getOrgStructLevel
   */
  static readonly GetOrgStructLevelPath = '/v1/organizations/hierarchy/level/{parentId}/{type}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrgStructLevel()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrgStructLevel$Response(params: {
    parentId: number;
    type: string;
  }): Observable<StrictHttpResponse<RestApiResponseListOrgStructureProjection>> {

    const rb = new RequestBuilder(this.rootUrl, OrganizationHierarchicalStructureService.GetOrgStructLevelPath, 'get');
    if (params) {
      rb.path('parentId', params.parentId, {});
      rb.path('type', params.type, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListOrgStructureProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrgStructLevel$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrgStructLevel(params: {
    parentId: number;
    type: string;
  }): Observable<RestApiResponseListOrgStructureProjection> {

    return this.getOrgStructLevel$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListOrgStructureProjection>) => r.body as RestApiResponseListOrgStructureProjection)
    );
  }

  /**
   * Path part for operation getOrgStructLevel1
   */
  static readonly GetOrgStructLevel1Path = '/v1/organizations/hierarchy/level/{parentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOrgStructLevel1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrgStructLevel1$Response(params: {
    parentId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListOrgStructureProjection>> {

    const rb = new RequestBuilder(this.rootUrl, OrganizationHierarchicalStructureService.GetOrgStructLevel1Path, 'get');
    if (params) {
      rb.path('parentId', params.parentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListOrgStructureProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOrgStructLevel1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOrgStructLevel1(params: {
    parentId: number;
  }): Observable<RestApiResponseListOrgStructureProjection> {

    return this.getOrgStructLevel1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListOrgStructureProjection>) => r.body as RestApiResponseListOrgStructureProjection)
    );
  }

}
