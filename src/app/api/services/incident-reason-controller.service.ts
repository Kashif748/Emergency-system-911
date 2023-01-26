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

import { IncidentReason } from '../models/incident-reason';
import { RestApiResponseIncidentReason } from '../models/rest-api-response-incident-reason';

@Injectable()
export class IncidentReasonControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation update38
   */
  static readonly Update38Path = '/v1/incident-reasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update38()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update38$Response(params: {
    body: IncidentReason
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReason>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReasonControllerService.Update38Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentReason>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update38$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update38(params: {
    body: IncidentReason
  }): Observable<RestApiResponseIncidentReason> {

    return this.update38$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReason>) => r.body as RestApiResponseIncidentReason)
    );
  }

  /**
   * Path part for operation create35
   */
  static readonly Create35Path = '/v1/incident-reasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create35()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create35$Response(params: {
    body: IncidentReason
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReason>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReasonControllerService.Create35Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentReason>;
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
    body: IncidentReason
  }): Observable<RestApiResponseIncidentReason> {

    return this.create35$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReason>) => r.body as RestApiResponseIncidentReason)
    );
  }

  /**
   * Path part for operation delete18
   */
  static readonly Delete18Path = '/v1/incident-reasons/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete18()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete18$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReasonControllerService.Delete18Path, 'delete');
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
   * To access the full response (for headers, for example), `delete18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete18(params: {
    id: number;
  }): Observable<void> {

    return this.delete18$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
