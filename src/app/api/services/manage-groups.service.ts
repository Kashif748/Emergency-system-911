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

import { Group } from '../models/group';
import { GroupFilter } from '../models/group-filter';
import { OrgStructure } from '../models/org-structure';
import { Pageable } from '../models/pageable';
import { RestApiResponseGroup } from '../models/rest-api-response-group';
import { RestApiResponseGroupProjection } from '../models/rest-api-response-group-projection';
import { RestApiResponseListNonGlobalGroupsByOrgResponse } from '../models/rest-api-response-list-non-global-groups-by-org-response';
import { RestApiResponsePageGroup } from '../models/rest-api-response-page-group';
import { RestApiResponsePageGroupProjection } from '../models/rest-api-response-page-group-projection';


/**
 * Manage groups
 */
@Injectable()
export class ManageGroupsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete18
   */
  static readonly Delete18Path = '/v1/groups/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete18()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete18$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseGroup>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.Delete18Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseGroup>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete18(params: {
    id: number;
  }): Observable<RestApiResponseGroup> {

    return this.delete18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroup>) => r.body as RestApiResponseGroup)
    );
  }

  /**
   * Path part for operation findByPage2
   */
  static readonly FindByPage2Path = '/v1/groups';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByPage2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByPage2$Response(params: {
    filter: GroupFilter;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageGroupProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.FindByPage2Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageGroupProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByPage2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByPage2(params: {
    filter: GroupFilter;
    page: Pageable;
  }): Observable<RestApiResponsePageGroupProjection> {

    return this.findByPage2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageGroupProjection>) => r.body as RestApiResponsePageGroupProjection)
    );
  }

  /**
   * Path part for operation update51
   */
  static readonly Update51Path = '/v1/groups';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update51()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update51$Response(params: {
    body: Group
  }): Observable<StrictHttpResponse<RestApiResponseGroup>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.Update51Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseGroup>;
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
    body: Group
  }): Observable<RestApiResponseGroup> {

    return this.update51$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroup>) => r.body as RestApiResponseGroup)
    );
  }

  /**
   * Path part for operation create46
   */
  static readonly Create46Path = '/v1/groups';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create46()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create46$Response(params: {
    body: Group
  }): Observable<StrictHttpResponse<RestApiResponseGroup>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.Create46Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseGroup>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create46$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create46(params: {
    body: Group
  }): Observable<RestApiResponseGroup> {

    return this.create46$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroup>) => r.body as RestApiResponseGroup)
    );
  }

  /**
   * Path part for operation getNonGlobalByOrg
   */
  static readonly GetNonGlobalByOrgPath = '/v1/groups/{orgId}/nonGlobal';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNonGlobalByOrg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNonGlobalByOrg$Response(params: {
    orgId: OrgStructure;
    name?: string;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageGroupProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.GetNonGlobalByOrgPath, 'get');
    if (params) {
      rb.path('orgId', params.orgId, {});
      rb.query('name', params.name, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageGroupProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNonGlobalByOrg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNonGlobalByOrg(params: {
    orgId: OrgStructure;
    name?: string;
    page: Pageable;
  }): Observable<RestApiResponsePageGroupProjection> {

    return this.getNonGlobalByOrg$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageGroupProjection>) => r.body as RestApiResponsePageGroupProjection)
    );
  }

  /**
   * Path part for operation get20
   */
  static readonly Get20Path = '/v1/groups/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get20()` instead.
   *
   * This method doesn't expect any request body.
   */
  get20$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseGroupProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.Get20Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseGroupProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get20(params: {
    id: number;
  }): Observable<RestApiResponseGroupProjection> {

    return this.get20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroupProjection>) => r.body as RestApiResponseGroupProjection)
    );
  }

  /**
   * Path part for operation getNonGlobal
   */
  static readonly GetNonGlobalPath = '/v1/groups/nonGlobal';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNonGlobal()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNonGlobal$Response(params: {
    name?: string;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageGroupProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.GetNonGlobalPath, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageGroupProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNonGlobal$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNonGlobal(params: {
    name?: string;
    page: Pageable;
  }): Observable<RestApiResponsePageGroupProjection> {

    return this.getNonGlobal$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageGroupProjection>) => r.body as RestApiResponsePageGroupProjection)
    );
  }

  /**
   * Path part for operation getNonGlobalGroupsByOrg
   */
  static readonly GetNonGlobalGroupsByOrgPath = '/v1/groups/non-global/{orgId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNonGlobalGroupsByOrg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNonGlobalGroupsByOrg$Response(params: {
    orgId: OrgStructure;
    name?: string;
    groupType?: number;
  }): Observable<StrictHttpResponse<RestApiResponseListNonGlobalGroupsByOrgResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.GetNonGlobalGroupsByOrgPath, 'get');
    if (params) {
      rb.path('orgId', params.orgId, {});
      rb.query('name', params.name, {});
      rb.query('groupType', params.groupType, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListNonGlobalGroupsByOrgResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNonGlobalGroupsByOrg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNonGlobalGroupsByOrg(params: {
    orgId: OrgStructure;
    name?: string;
    groupType?: number;
  }): Observable<RestApiResponseListNonGlobalGroupsByOrgResponse> {

    return this.getNonGlobalGroupsByOrg$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListNonGlobalGroupsByOrgResponse>) => r.body as RestApiResponseListNonGlobalGroupsByOrgResponse)
    );
  }

  /**
   * Path part for operation getglobal
   */
  static readonly GetglobalPath = '/v1/groups/global';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getglobal()` instead.
   *
   * This method doesn't expect any request body.
   */
  getglobal$Response(params: {
    name?: string;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageGroup>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.GetglobalPath, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageGroup>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getglobal$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getglobal(params: {
    name?: string;
    page: Pageable;
  }): Observable<RestApiResponsePageGroup> {

    return this.getglobal$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageGroup>) => r.body as RestApiResponsePageGroup)
    );
  }

  /**
   * Path part for operation export6
   */
  static readonly Export6Path = '/v1/groups/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export6()` instead.
   *
   * This method doesn't expect any request body.
   */
  export6$Response(params: {
    filter: GroupFilter;
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.Export6Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `export6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export6(params: {
    filter: GroupFilter;
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<any> {

    return this.export6$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
