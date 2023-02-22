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
   * Path part for operation update49
   */
  static readonly Update49Path = '/v1/groups';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update49()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update49$Response(params: {
    body: Group
  }): Observable<StrictHttpResponse<RestApiResponseGroup>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.Update49Path, 'put');
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
   * To access the full response (for headers, for example), `update49$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update49(params: {
    body: Group
  }): Observable<RestApiResponseGroup> {

    return this.update49$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroup>) => r.body as RestApiResponseGroup)
    );
  }

  /**
   * Path part for operation create45
   */
  static readonly Create45Path = '/v1/groups';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create45()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create45$Response(params: {
    body: Group
  }): Observable<StrictHttpResponse<RestApiResponseGroup>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.Create45Path, 'post');
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
   * To access the full response (for headers, for example), `create45$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create45(params: {
    body: Group
  }): Observable<RestApiResponseGroup> {

    return this.create45$Response(params).pipe(
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
   * Path part for operation getActiveGroup
   */
  static readonly GetActiveGroupPath = '/v1/groups/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveGroup$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseGroupProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.GetActiveGroupPath, 'get');
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
   * To access the full response (for headers, for example), `getActiveGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveGroup(params: {
    id: number;
  }): Observable<RestApiResponseGroupProjection> {

    return this.getActiveGroup$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroupProjection>) => r.body as RestApiResponseGroupProjection)
    );
  }

  /**
   * Path part for operation delete24
   */
  static readonly Delete24Path = '/v1/groups/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete24()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  delete24$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseGroup>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.Delete24Path, 'delete');
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
   * To access the full response (for headers, for example), `delete24$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  delete24(params: {
    id: number;
  }): Observable<RestApiResponseGroup> {

    return this.delete24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGroup>) => r.body as RestApiResponseGroup)
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
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, ManageGroupsService.Export6Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
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
  }): Observable<void> {

    return this.export6$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
