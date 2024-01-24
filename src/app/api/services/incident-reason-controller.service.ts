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
   * Path part for operation delete13
   */
  static readonly Delete13Path = '/v1/incident-reasons/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete13()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete13$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReasonControllerService.Delete13Path, 'put');
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
   * To access the full response (for headers, for example), `delete13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete13(params: {
    id: number;
  }): Observable<void> {

    return this.delete13$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update41
   */
  static readonly Update41Path = '/v1/incident-reasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update41()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update41$Response(params: {
    body: IncidentReason
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReason>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReasonControllerService.Update41Path, 'put');
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
   * To access the full response (for headers, for example), `update41$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update41(params: {
    body: IncidentReason
  }): Observable<RestApiResponseIncidentReason> {

    return this.update41$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReason>) => r.body as RestApiResponseIncidentReason)
    );
  }

  /**
   * Path part for operation create37
   */
  static readonly Create37Path = '/v1/incident-reasons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create37()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create37$Response(params: {
    body: IncidentReason
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReason>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReasonControllerService.Create37Path, 'post');
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
   * To access the full response (for headers, for example), `create37$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create37(params: {
    body: IncidentReason
  }): Observable<RestApiResponseIncidentReason> {

    return this.create37$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReason>) => r.body as RestApiResponseIncidentReason)
    );
  }

}
