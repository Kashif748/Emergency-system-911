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

import { IncidentEnvironmentImpact } from '../models/incident-environment-impact';
import { RestApiResponseIncidentEnvironmentImpact } from '../models/rest-api-response-incident-environment-impact';

@Injectable()
export class IncidentEnvironmentImpactControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete15
   */
  static readonly Delete15Path = '/v1/incident-environment-impacts/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete15()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete15$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEnvironmentImpactControllerService.Delete15Path, 'put');
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
   * To access the full response (for headers, for example), `delete15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete15(params: {
    id: number;
  }): Observable<void> {

    return this.delete15$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update43
   */
  static readonly Update43Path = '/v1/incident-environment-impacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update43()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update43$Response(params: {
    body: IncidentEnvironmentImpact
  }): Observable<StrictHttpResponse<RestApiResponseIncidentEnvironmentImpact>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEnvironmentImpactControllerService.Update43Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentEnvironmentImpact>;
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
    body: IncidentEnvironmentImpact
  }): Observable<RestApiResponseIncidentEnvironmentImpact> {

    return this.update43$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentEnvironmentImpact>) => r.body as RestApiResponseIncidentEnvironmentImpact)
    );
  }

  /**
   * Path part for operation create39
   */
  static readonly Create39Path = '/v1/incident-environment-impacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create39()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create39$Response(params: {
    body: IncidentEnvironmentImpact
  }): Observable<StrictHttpResponse<RestApiResponseIncidentEnvironmentImpact>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEnvironmentImpactControllerService.Create39Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentEnvironmentImpact>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create39$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create39(params: {
    body: IncidentEnvironmentImpact
  }): Observable<RestApiResponseIncidentEnvironmentImpact> {

    return this.create39$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentEnvironmentImpact>) => r.body as RestApiResponseIncidentEnvironmentImpact)
    );
  }

}
