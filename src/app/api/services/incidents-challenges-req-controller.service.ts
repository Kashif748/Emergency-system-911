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
   * Path part for operation delete9
   */
  static readonly Delete9Path = '/v1/incidents/{incidentId}/challenge-requests/inactive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete9()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete9$Response(params: {
    incidentId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsChallengesReq>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsChallengesReqControllerService.Delete9Path, 'put');
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
   * To access the full response (for headers, for example), `delete9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete9(params: {
    incidentId: number;
    id: number;
  }): Observable<RestApiResponseIncidentsChallengesReq> {

    return this.delete9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentsChallengesReq>) => r.body as RestApiResponseIncidentsChallengesReq)
    );
  }

  /**
   * Path part for operation findActivePage8
   */
  static readonly FindActivePage8Path = '/v1/incidents/{incidentId}/challenge-requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage8()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage8$Response(params: {
    incidentId: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentsChallengesReq>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsChallengesReqControllerService.FindActivePage8Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage8(params: {
    incidentId: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentsChallengesReq> {

    return this.findActivePage8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentsChallengesReq>) => r.body as RestApiResponsePageIncidentsChallengesReq)
    );
  }

  /**
   * Path part for operation update33
   */
  static readonly Update33Path = '/v1/incidents/{incidentId}/challenge-requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update33()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update33$Response(params: {
    incidentId: number;
    body: IncidentsChallengesReq
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsChallengesReq>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsChallengesReqControllerService.Update33Path, 'put');
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
   * To access the full response (for headers, for example), `update33$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update33(params: {
    incidentId: number;
    body: IncidentsChallengesReq
  }): Observable<RestApiResponseIncidentsChallengesReq> {

    return this.update33$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentsChallengesReq>) => r.body as RestApiResponseIncidentsChallengesReq)
    );
  }

  /**
   * Path part for operation create29
   */
  static readonly Create29Path = '/v1/incidents/{incidentId}/challenge-requests';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create29()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create29$Response(params: {
    incidentId: number;
    body: IncidentsChallengesReq
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsChallengesReq>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsChallengesReqControllerService.Create29Path, 'post');
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
   * To access the full response (for headers, for example), `create29$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create29(params: {
    incidentId: number;
    body: IncidentsChallengesReq
  }): Observable<RestApiResponseIncidentsChallengesReq> {

    return this.create29$Response(params).pipe(
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
