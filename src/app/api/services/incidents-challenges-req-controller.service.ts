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

import { IncidentsChallengesReq } from '../models/incidents-challenges-req';
import { Pageable } from '../models/pageable';
import { RestApiResponseIncidentsChallengesReq } from '../models/rest-api-response-incidents-challenges-req';
import { RestApiResponsePageIncidentsChallengesReq } from '../models/rest-api-response-page-incidents-challenges-req';

@Injectable()
export class IncidentsChallengesReqControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete10
   */
  static readonly Delete10Path = '/v1/incidents/{incidentId}/challenge-requests/inactive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete10()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete10$Response(params: {
    incidentId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsChallengesReq>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsChallengesReqControllerService.Delete10Path, 'put');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentsChallengesReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete10(params: {
    incidentId: number;
    id: number;
  }): Observable<RestApiResponseIncidentsChallengesReq> {

    return this.delete10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentsChallengesReq>) => r.body as RestApiResponseIncidentsChallengesReq)
    );
  }

  /**
   * Path part for operation findActivePage9
   */
  static readonly FindActivePage9Path = '/v1/incidents/{incidentId}/challenge-requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage9()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage9$Response(params: {
    incidentId: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentsChallengesReq>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsChallengesReqControllerService.FindActivePage9Path, 'get');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentsChallengesReq>;
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
    incidentId: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentsChallengesReq> {

    return this.findActivePage9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentsChallengesReq>) => r.body as RestApiResponsePageIncidentsChallengesReq)
    );
  }

  /**
   * Path part for operation update35
   */
  static readonly Update35Path = '/v1/incidents/{incidentId}/challenge-requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update35()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update35$Response(params: {
    incidentId: number;
    body: IncidentsChallengesReq
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsChallengesReq>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsChallengesReqControllerService.Update35Path, 'put');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentsChallengesReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update35$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update35(params: {
    incidentId: number;
    body: IncidentsChallengesReq
  }): Observable<RestApiResponseIncidentsChallengesReq> {

    return this.update35$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentsChallengesReq>) => r.body as RestApiResponseIncidentsChallengesReq)
    );
  }

  /**
   * Path part for operation create31
   */
  static readonly Create31Path = '/v1/incidents/{incidentId}/challenge-requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create31()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create31$Response(params: {
    incidentId: number;
    body: IncidentsChallengesReq
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsChallengesReq>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsChallengesReqControllerService.Create31Path, 'post');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentsChallengesReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create31$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create31(params: {
    incidentId: number;
    body: IncidentsChallengesReq
  }): Observable<RestApiResponseIncidentsChallengesReq> {

    return this.create31$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentsChallengesReq>) => r.body as RestApiResponseIncidentsChallengesReq)
    );
  }

  /**
   * Path part for operation getActiveIncidentChallengeReq
   */
  static readonly GetActiveIncidentChallengeReqPath = '/v1/incidents/{incidentId}/challenge-requests/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveIncidentChallengeReq()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveIncidentChallengeReq$Response(params: {
    incidentId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsChallengesReq>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsChallengesReqControllerService.GetActiveIncidentChallengeReqPath, 'get');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentsChallengesReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveIncidentChallengeReq$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveIncidentChallengeReq(params: {
    incidentId: number;
    id: number;
  }): Observable<RestApiResponseIncidentsChallengesReq> {

    return this.getActiveIncidentChallengeReq$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentsChallengesReq>) => r.body as RestApiResponseIncidentsChallengesReq)
    );
  }

}
