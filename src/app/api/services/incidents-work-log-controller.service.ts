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

import { IncidentDashboardLogsRequest } from '../models/incident-dashboard-logs-request';
import { IncidentsWorkLog } from '../models/incidents-work-log';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseIncidentWorkLogMinProjection } from '../models/rest-api-response-incident-work-log-min-projection';
import { RestApiResponseIncidentWorkLogProjection } from '../models/rest-api-response-incident-work-log-projection';
import { RestApiResponsePageIncidentWorkLogForDashboardProjection } from '../models/rest-api-response-page-incident-work-log-for-dashboard-projection';
import { RestApiResponsePageIncidentWorkLogProjection } from '../models/rest-api-response-page-incident-work-log-projection';

@Injectable()
export class IncidentsWorkLogControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete1
   */
  static readonly Delete1Path = '/v1/incidents/{incidentId}/logs/inactive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete1()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1$Response(params: {
    incidentId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsWorkLogControllerService.Delete1Path, 'put');
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
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete1(params: {
    incidentId: number;
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation findActivePage7
   */
  static readonly FindActivePage7Path = '/v1/incidents/{incidentId}/logs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage7()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage7$Response(params: {
    incidentId: number;
    hasAttachment?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentWorkLogProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsWorkLogControllerService.FindActivePage7Path, 'get');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
      rb.query('hasAttachment', params.hasAttachment, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentWorkLogProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage7(params: {
    incidentId: number;
    hasAttachment?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentWorkLogProjection> {

    return this.findActivePage7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentWorkLogProjection>) => r.body as RestApiResponsePageIncidentWorkLogProjection)
    );
  }

  /**
   * Path part for operation update33
   */
  static readonly Update33Path = '/v1/incidents/{incidentId}/logs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update33()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update33$Response(params: {
    incidentId: number;
    body: IncidentsWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseIncidentWorkLogMinProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsWorkLogControllerService.Update33Path, 'put');
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
        return r as StrictHttpResponse<RestApiResponseIncidentWorkLogMinProjection>;
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
    body: IncidentsWorkLog
  }): Observable<RestApiResponseIncidentWorkLogMinProjection> {

    return this.update33$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentWorkLogMinProjection>) => r.body as RestApiResponseIncidentWorkLogMinProjection)
    );
  }

  /**
   * Path part for operation create29
   */
  static readonly Create29Path = '/v1/incidents/{incidentId}/logs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create29()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create29$Response(params: {
    incidentId: number;
    body: IncidentsWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseIncidentWorkLogMinProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsWorkLogControllerService.Create29Path, 'post');
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
        return r as StrictHttpResponse<RestApiResponseIncidentWorkLogMinProjection>;
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
    body: IncidentsWorkLog
  }): Observable<RestApiResponseIncidentWorkLogMinProjection> {

    return this.create29$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentWorkLogMinProjection>) => r.body as RestApiResponseIncidentWorkLogMinProjection)
    );
  }

  /**
   * Path part for operation getIncidentWorkLogForDashboard
   */
  static readonly GetIncidentWorkLogForDashboardPath = '/v1/incidents/dashboard/logs';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIncidentWorkLogForDashboard()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getIncidentWorkLogForDashboard$Response(params: {
    pageable: Pageable;
    body: IncidentDashboardLogsRequest
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentWorkLogForDashboardProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsWorkLogControllerService.GetIncidentWorkLogForDashboardPath, 'post');
    if (params) {
      rb.query('pageable', params.pageable, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentWorkLogForDashboardProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIncidentWorkLogForDashboard$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getIncidentWorkLogForDashboard(params: {
    pageable: Pageable;
    body: IncidentDashboardLogsRequest
  }): Observable<RestApiResponsePageIncidentWorkLogForDashboardProjection> {

    return this.getIncidentWorkLogForDashboard$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentWorkLogForDashboardProjection>) => r.body as RestApiResponsePageIncidentWorkLogForDashboardProjection)
    );
  }

  /**
   * Path part for operation getActiveIncidentsWorkLog
   */
  static readonly GetActiveIncidentsWorkLogPath = '/v1/incidents/{incidentId}/logs/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveIncidentsWorkLog()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveIncidentsWorkLog$Response(params: {
    incidentId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentWorkLogProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsWorkLogControllerService.GetActiveIncidentsWorkLogPath, 'get');
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
        return r as StrictHttpResponse<RestApiResponseIncidentWorkLogProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveIncidentsWorkLog$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveIncidentsWorkLog(params: {
    incidentId: number;
    id: number;
  }): Observable<RestApiResponseIncidentWorkLogProjection> {

    return this.getActiveIncidentsWorkLog$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentWorkLogProjection>) => r.body as RestApiResponseIncidentWorkLogProjection)
    );
  }

}
