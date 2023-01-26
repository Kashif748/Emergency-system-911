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
   * Path part for operation update42
   */
  static readonly Update42Path = '/v1/incident-environment-impacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update42()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update42$Response(params: {
    body: IncidentEnvironmentImpact
  }): Observable<StrictHttpResponse<RestApiResponseIncidentEnvironmentImpact>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEnvironmentImpactControllerService.Update42Path, 'put');
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
   * To access the full response (for headers, for example), `update42$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update42(params: {
    body: IncidentEnvironmentImpact
  }): Observable<RestApiResponseIncidentEnvironmentImpact> {

    return this.update42$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentEnvironmentImpact>) => r.body as RestApiResponseIncidentEnvironmentImpact)
    );
  }

  /**
   * Path part for operation create38
   */
  static readonly Create38Path = '/v1/incident-environment-impacts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create38()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create38$Response(params: {
    body: IncidentEnvironmentImpact
  }): Observable<StrictHttpResponse<RestApiResponseIncidentEnvironmentImpact>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEnvironmentImpactControllerService.Create38Path, 'post');
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
   * To access the full response (for headers, for example), `create38$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create38(params: {
    body: IncidentEnvironmentImpact
  }): Observable<RestApiResponseIncidentEnvironmentImpact> {

    return this.create38$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentEnvironmentImpact>) => r.body as RestApiResponseIncidentEnvironmentImpact)
    );
  }

  /**
   * Path part for operation delete21
   */
  static readonly Delete21Path = '/v1/incident-environment-impacts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete21()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete21$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentEnvironmentImpactControllerService.Delete21Path, 'delete');
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
   * To access the full response (for headers, for example), `delete21$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete21(params: {
    id: number;
  }): Observable<void> {

    return this.delete21$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
