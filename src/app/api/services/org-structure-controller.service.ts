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

import { InAppOrgDetails } from '../models/in-app-org-details';
import { LdapOrgDetails } from '../models/ldap-org-details';
import { OrgStructure } from '../models/org-structure';
import { RestApiResponseListOrgStructure } from '../models/rest-api-response-list-org-structure';
import { RestApiResponseListOrgStructureProjection } from '../models/rest-api-response-list-org-structure-projection';
import { RestApiResponseObject } from '../models/rest-api-response-object';
import { RestApiResponseOrgStructure } from '../models/rest-api-response-org-structure';
import { RestApiResponseOrgStructureLogoProjection } from '../models/rest-api-response-org-structure-logo-projection';
import { RestApiResponseOrgStructureMinimumProjection } from '../models/rest-api-response-org-structure-minimum-projection';
import { ThemeDetails } from '../models/theme-details';

@Injectable()
export class OrgStructureControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation active
   */
  static readonly ActivePath = '/v1/organizations/update/theme';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `active()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  active$Response(params: {
    body: ThemeDetails
  }): Observable<StrictHttpResponse<RestApiResponseListOrgStructureProjection>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.ActivePath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `active$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  active(params: {
    body: ThemeDetails
  }): Observable<RestApiResponseListOrgStructureProjection> {

    return this.active$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListOrgStructureProjection>) => r.body as RestApiResponseListOrgStructureProjection)
    );
  }

  /**
   * Path part for operation inactive
   */
  static readonly InactivePath = '/v1/organizations/inactive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `inactive()` instead.
   *
   * This method doesn't expect any request body.
   */
  inactive$Response(params: {
    id: OrgStructure;
  }): Observable<StrictHttpResponse<RestApiResponseOrgStructure>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.InactivePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgStructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `inactive$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  inactive(params: {
    id: OrgStructure;
  }): Observable<RestApiResponseOrgStructure> {

    return this.inactive$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgStructure>) => r.body as RestApiResponseOrgStructure)
    );
  }

  /**
   * Path part for operation active1
   */
  static readonly Active1Path = '/v1/organizations/active/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `active1()` instead.
   *
   * This method doesn't expect any request body.
   */
  active1$Response(params: {
    id: OrgStructure;
  }): Observable<StrictHttpResponse<RestApiResponseOrgStructure>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.Active1Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgStructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `active1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  active1(params: {
    id: OrgStructure;
  }): Observable<RestApiResponseOrgStructure> {

    return this.active1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgStructure>) => r.body as RestApiResponseOrgStructure)
    );
  }

  /**
   * Path part for operation getAllOrgStructByType
   */
  static readonly GetAllOrgStructByTypePath = '/v1/organizations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOrgStructByType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrgStructByType$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListOrgStructure>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.GetAllOrgStructByTypePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListOrgStructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllOrgStructByType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrgStructByType(params?: {
  }): Observable<RestApiResponseListOrgStructure> {

    return this.getAllOrgStructByType$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListOrgStructure>) => r.body as RestApiResponseListOrgStructure)
    );
  }

  /**
   * Path part for operation updateOrgStructure
   */
  static readonly UpdateOrgStructurePath = '/v1/organizations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOrgStructure()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOrgStructure$Response(params: {
    body: (InAppOrgDetails | LdapOrgDetails)
  }): Observable<StrictHttpResponse<RestApiResponseOrgStructure>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.UpdateOrgStructurePath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgStructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateOrgStructure$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOrgStructure(params: {
    body: (InAppOrgDetails | LdapOrgDetails)
  }): Observable<RestApiResponseOrgStructure> {

    return this.updateOrgStructure$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgStructure>) => r.body as RestApiResponseOrgStructure)
    );
  }

  /**
   * Path part for operation createOrgStructure
   */
  static readonly CreateOrgStructurePath = '/v1/organizations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrgStructure()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrgStructure$Response(params: {
    body: (InAppOrgDetails | LdapOrgDetails)
  }): Observable<StrictHttpResponse<RestApiResponseOrgStructure>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.CreateOrgStructurePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgStructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createOrgStructure$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createOrgStructure(params: {
    body: (InAppOrgDetails | LdapOrgDetails)
  }): Observable<RestApiResponseOrgStructure> {

    return this.createOrgStructure$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgStructure>) => r.body as RestApiResponseOrgStructure)
    );
  }

  /**
   * Path part for operation getById4
   */
  static readonly GetById4Path = '/v1/organizations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById4()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseOrgStructure>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.GetById4Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgStructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById4(params: {
    id: number;
  }): Observable<RestApiResponseOrgStructure> {

    return this.getById4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgStructure>) => r.body as RestApiResponseOrgStructure)
    );
  }

  /**
   * Path part for operation deleteOrgStructure
   */
  static readonly DeleteOrgStructurePath = '/v1/organizations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOrgStructure()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrgStructure$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.DeleteOrgStructurePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteOrgStructure$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOrgStructure(params: {
    id: number;
  }): Observable<RestApiResponseObject> {

    return this.deleteOrgStructure$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

  /**
   * Path part for operation info
   */
  static readonly InfoPath = '/v1/organizations/info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `info()` instead.
   *
   * This method doesn't expect any request body.
   */
  info$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseOrgStructureMinimumProjection>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.InfoPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgStructureMinimumProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `info$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  info(params?: {
  }): Observable<RestApiResponseOrgStructureMinimumProjection> {

    return this.info$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgStructureMinimumProjection>) => r.body as RestApiResponseOrgStructureMinimumProjection)
    );
  }

  /**
   * Path part for operation loadHorizentalLogo1
   */
  static readonly LoadHorizentalLogo1Path = '/v1/ext/organizations/logo/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadHorizentalLogo1()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadHorizentalLogo1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseOrgStructureLogoProjection>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.LoadHorizentalLogo1Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgStructureLogoProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loadHorizentalLogo1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadHorizentalLogo1(params: {
    id: number;
  }): Observable<RestApiResponseOrgStructureLogoProjection> {

    return this.loadHorizentalLogo1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgStructureLogoProjection>) => r.body as RestApiResponseOrgStructureLogoProjection)
    );
  }

  /**
   * Path part for operation getRestrictedOrgStructByType
   */
  static readonly GetRestrictedOrgStructByTypePath = '/v1/ext/organizations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getRestrictedOrgStructByType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestrictedOrgStructByType$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListOrgStructureProjection>> {

    const rb = new RequestBuilder(this.rootUrl, OrgStructureControllerService.GetRestrictedOrgStructByTypePath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `getRestrictedOrgStructByType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getRestrictedOrgStructByType(params?: {
  }): Observable<RestApiResponseListOrgStructureProjection> {

    return this.getRestrictedOrgStructByType$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListOrgStructureProjection>) => r.body as RestApiResponseListOrgStructureProjection)
    );
  }

}
