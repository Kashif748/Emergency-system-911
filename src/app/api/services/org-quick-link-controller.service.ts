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

import { OrgQuickLink } from '../models/org-quick-link';
import { Pageable } from '../models/pageable';
import { RestApiResponseOrgQuickLink } from '../models/rest-api-response-org-quick-link';
import { RestApiResponsePageOrgQuickLink } from '../models/rest-api-response-page-org-quick-link';

@Injectable()
export class OrgQuickLinkControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage3
   */
  static readonly FindActivePage3Path = '/v1/org-quick-link';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage3()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage3$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageOrgQuickLink>> {

    const rb = new RequestBuilder(this.rootUrl, OrgQuickLinkControllerService.FindActivePage3Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageOrgQuickLink>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage3(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageOrgQuickLink> {

    return this.findActivePage3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageOrgQuickLink>) => r.body as RestApiResponsePageOrgQuickLink)
    );
  }

  /**
   * Path part for operation update17
   */
  static readonly Update17Path = '/v1/org-quick-link';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update17()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update17$Response(params: {
    body: OrgQuickLink
  }): Observable<StrictHttpResponse<RestApiResponseOrgQuickLink>> {

    const rb = new RequestBuilder(this.rootUrl, OrgQuickLinkControllerService.Update17Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgQuickLink>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update17$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update17(params: {
    body: OrgQuickLink
  }): Observable<RestApiResponseOrgQuickLink> {

    return this.update17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgQuickLink>) => r.body as RestApiResponseOrgQuickLink)
    );
  }

  /**
   * Path part for operation create17
   */
  static readonly Create17Path = '/v1/org-quick-link';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create17()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create17$Response(params: {
    body: OrgQuickLink
  }): Observable<StrictHttpResponse<RestApiResponseOrgQuickLink>> {

    const rb = new RequestBuilder(this.rootUrl, OrgQuickLinkControllerService.Create17Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgQuickLink>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create17$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create17(params: {
    body: OrgQuickLink
  }): Observable<RestApiResponseOrgQuickLink> {

    return this.create17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgQuickLink>) => r.body as RestApiResponseOrgQuickLink)
    );
  }

  /**
   * Path part for operation getActiveOrgQuickLink
   */
  static readonly GetActiveOrgQuickLinkPath = '/v1/org-quick-link/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveOrgQuickLink()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveOrgQuickLink$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseOrgQuickLink>> {

    const rb = new RequestBuilder(this.rootUrl, OrgQuickLinkControllerService.GetActiveOrgQuickLinkPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgQuickLink>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveOrgQuickLink$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveOrgQuickLink(params: {
    id: number;
  }): Observable<RestApiResponseOrgQuickLink> {

    return this.getActiveOrgQuickLink$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgQuickLink>) => r.body as RestApiResponseOrgQuickLink)
    );
  }

  /**
   * Path part for operation delete9
   */
  static readonly Delete9Path = '/v1/org-quick-link/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete9()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete9$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseOrgQuickLink>> {

    const rb = new RequestBuilder(this.rootUrl, OrgQuickLinkControllerService.Delete9Path, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgQuickLink>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete9(params: {
    id: number;
  }): Observable<RestApiResponseOrgQuickLink> {

    return this.delete9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgQuickLink>) => r.body as RestApiResponseOrgQuickLink)
    );
  }

}
