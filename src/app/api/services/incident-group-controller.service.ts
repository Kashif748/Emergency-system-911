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

import { IncidentGroup } from '../models/incident-group';
import { RestApiResponseIncidentGroup } from '../models/rest-api-response-incident-group';

@Injectable()
export class IncidentGroupControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete15
   */
  static readonly Delete15Path = '/v1/incident-groups/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete15()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete15$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentGroupControllerService.Delete15Path, 'put');
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
   * Path part for operation update44
   */
  static readonly Update44Path = '/v1/incident-groups';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update44()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update44$Response(params: {
    body: IncidentGroup
  }): Observable<StrictHttpResponse<RestApiResponseIncidentGroup>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentGroupControllerService.Update44Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentGroup>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update44$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update44(params: {
    body: IncidentGroup
  }): Observable<RestApiResponseIncidentGroup> {

    return this.update44$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentGroup>) => r.body as RestApiResponseIncidentGroup)
    );
  }

  /**
   * Path part for operation create39
   */
  static readonly Create39Path = '/v1/incident-groups';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create39()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create39$Response(params: {
    body: IncidentGroup
  }): Observable<StrictHttpResponse<RestApiResponseIncidentGroup>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentGroupControllerService.Create39Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentGroup>;
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
    body: IncidentGroup
  }): Observable<RestApiResponseIncidentGroup> {

    return this.create39$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentGroup>) => r.body as RestApiResponseIncidentGroup)
    );
  }

}
