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

import { IncidentOrg } from '../models/incident-org';
import { RestApiResponseIncidentOrg } from '../models/rest-api-response-incident-org';
import { RestApiResponseListIncidentOrgProjection } from '../models/rest-api-response-list-incident-org-projection';

@Injectable()
export class IncidentOrgControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete14
   */
  static readonly Delete14Path = '/v1/incident-orgs/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete14()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete14$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentOrgControllerService.Delete14Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `delete14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete14(params: {
    id: number;
  }): Observable<void> {

    return this.delete14$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update42
   */
  static readonly Update42Path = '/v1/incident-orgs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update42()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update42$Response(params: {
    body: IncidentOrg
  }): Observable<StrictHttpResponse<RestApiResponseIncidentOrg>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentOrgControllerService.Update42Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update42$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update42(params: {
    body: IncidentOrg
  }): Observable<RestApiResponseIncidentOrg> {

    return this.update42$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentOrg>) => r.body as RestApiResponseIncidentOrg)
    );
  }

  /**
   * Path part for operation create38
   */
  static readonly Create38Path = '/v1/incident-orgs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create38()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create38$Response(params: {
    body: IncidentOrg
  }): Observable<StrictHttpResponse<RestApiResponseIncidentOrg>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentOrgControllerService.Create38Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create38$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create38(params: {
    body: IncidentOrg
  }): Observable<RestApiResponseIncidentOrg> {

    return this.create38$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentOrg>) => r.body as RestApiResponseIncidentOrg)
    );
  }

  /**
   * Path part for operation getIncidentOrg
   */
  static readonly GetIncidentOrgPath = '/v1/incident-orgs/{incidentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIncidentOrg()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncidentOrg$Response(params: {
    incidentId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentOrgProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentOrgControllerService.GetIncidentOrgPath, 'get');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentOrgProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIncidentOrg$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncidentOrg(params: {
    incidentId: number;
  }): Observable<RestApiResponseListIncidentOrgProjection> {

    return this.getIncidentOrg$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentOrgProjection>) => r.body as RestApiResponseListIncidentOrgProjection)
    );
  }

}
