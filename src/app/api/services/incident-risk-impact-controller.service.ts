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

import { IncidentRiskImpact } from '../models/incident-risk-impact';
import { Pageable } from '../models/pageable';
import { RestApiResponseIncidentRiskImpact } from '../models/rest-api-response-incident-risk-impact';
import { RestApiResponsePageIncidentRiskImpact } from '../models/rest-api-response-page-incident-risk-impact';

@Injectable()
export class IncidentRiskImpactControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete11
   */
  static readonly Delete11Path = '/v1/incident-risk-impact/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete11()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete11$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentRiskImpact>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentRiskImpactControllerService.Delete11Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentRiskImpact>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete11(params: {
    id: number;
  }): Observable<RestApiResponseIncidentRiskImpact> {

    return this.delete11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentRiskImpact>) => r.body as RestApiResponseIncidentRiskImpact)
    );
  }

  /**
   * Path part for operation findActivePage11
   */
  static readonly FindActivePage11Path = '/v1/incident-risk-impact';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage11()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage11$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentRiskImpact>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentRiskImpactControllerService.FindActivePage11Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentRiskImpact>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage11(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentRiskImpact> {

    return this.findActivePage11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentRiskImpact>) => r.body as RestApiResponsePageIncidentRiskImpact)
    );
  }

  /**
   * Path part for operation update39
   */
  static readonly Update39Path = '/v1/incident-risk-impact';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update39()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update39$Response(params: {
    body: IncidentRiskImpact
  }): Observable<StrictHttpResponse<RestApiResponseIncidentRiskImpact>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentRiskImpactControllerService.Update39Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentRiskImpact>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update39$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update39(params: {
    body: IncidentRiskImpact
  }): Observable<RestApiResponseIncidentRiskImpact> {

    return this.update39$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentRiskImpact>) => r.body as RestApiResponseIncidentRiskImpact)
    );
  }

  /**
   * Path part for operation create35
   */
  static readonly Create35Path = '/v1/incident-risk-impact';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create35()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create35$Response(params: {
    body: IncidentRiskImpact
  }): Observable<StrictHttpResponse<RestApiResponseIncidentRiskImpact>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentRiskImpactControllerService.Create35Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentRiskImpact>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create35$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create35(params: {
    body: IncidentRiskImpact
  }): Observable<RestApiResponseIncidentRiskImpact> {

    return this.create35$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentRiskImpact>) => r.body as RestApiResponseIncidentRiskImpact)
    );
  }

  /**
   * Path part for operation getActiveIncidentRiskImpact
   */
  static readonly GetActiveIncidentRiskImpactPath = '/v1/incident-risk-impact/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveIncidentRiskImpact()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveIncidentRiskImpact$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentRiskImpact>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentRiskImpactControllerService.GetActiveIncidentRiskImpactPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentRiskImpact>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveIncidentRiskImpact$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveIncidentRiskImpact(params: {
    id: number;
  }): Observable<RestApiResponseIncidentRiskImpact> {

    return this.getActiveIncidentRiskImpact$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentRiskImpact>) => r.body as RestApiResponseIncidentRiskImpact)
    );
  }

}
