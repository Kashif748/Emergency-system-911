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

import { IncidentStatus } from '../models/incident-status';
import { Pageable } from '../models/pageable';
import { RestApiResponseIncidentStatus } from '../models/rest-api-response-incident-status';
import { RestApiResponsePageIncidentStatus } from '../models/rest-api-response-page-incident-status';

@Injectable()
export class IncidentStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage9
   */
  static readonly FindActivePage9Path = '/v1/incident-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage9()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage9$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentStatus>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentStatusControllerService.FindActivePage9Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage9(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentStatus> {

    return this.findActivePage9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentStatus>) => r.body as RestApiResponsePageIncidentStatus)
    );
  }

  /**
   * Path part for operation update37
   */
  static readonly Update37Path = '/v1/incident-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update37()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update37$Response(params: {
    body: IncidentStatus
  }): Observable<StrictHttpResponse<RestApiResponseIncidentStatus>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentStatusControllerService.Update37Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update37$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update37(params: {
    body: IncidentStatus
  }): Observable<RestApiResponseIncidentStatus> {

    return this.update37$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentStatus>) => r.body as RestApiResponseIncidentStatus)
    );
  }

  /**
   * Path part for operation create33
   */
  static readonly Create33Path = '/v1/incident-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create33()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create33$Response(params: {
    body: IncidentStatus
  }): Observable<StrictHttpResponse<RestApiResponseIncidentStatus>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentStatusControllerService.Create33Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create33$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create33(params: {
    body: IncidentStatus
  }): Observable<RestApiResponseIncidentStatus> {

    return this.create33$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentStatus>) => r.body as RestApiResponseIncidentStatus)
    );
  }

}
