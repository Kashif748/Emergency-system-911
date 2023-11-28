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

import { EmergencyLevel } from '../models/emergency-level';
import { Incident } from '../models/incident';
import { IncidentCloseObject } from '../models/incident-close-object';
import { IncidentExportFilters } from '../models/incident-export-filters';
import { IncidentFilter } from '../models/incident-filter';
import { IncidentLocation } from '../models/incident-location';
import { IncidentReportRequest } from '../models/incident-report-request';
import { IncidentSearchFilters } from '../models/incident-search-filters';
import { IncidentStatisticsDataFilter } from '../models/incident-statistics-data-filter';
import { IncidentStatisticsFilter } from '../models/incident-statistics-filter';
import { IncidentStatus } from '../models/incident-status';
import { OrgStructure } from '../models/org-structure';
import { Pageable } from '../models/pageable';
import { Priority } from '../models/priority';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseClosedIncidentResponse } from '../models/rest-api-response-closed-incident-response';
import { RestApiResponseIncidentLocationProjection } from '../models/rest-api-response-incident-location-projection';
import { RestApiResponseIncidentProjection } from '../models/rest-api-response-incident-projection';
import { RestApiResponseIncidentProjectionMinimum } from '../models/rest-api-response-incident-projection-minimum';
import { RestApiResponseIncidentReportDetails } from '../models/rest-api-response-incident-report-details';
import { RestApiResponseIncidentStatisticData } from '../models/rest-api-response-incident-statistic-data';
import { RestApiResponseListIncidentIdSubjectProjection } from '../models/rest-api-response-list-incident-id-subject-projection';
import { RestApiResponseListIncidentMainOrgStatistics } from '../models/rest-api-response-list-incident-main-org-statistics';
import { RestApiResponseListIncidentStatistics } from '../models/rest-api-response-list-incident-statistics';
import { RestApiResponseListLong } from '../models/rest-api-response-list-long';
import { RestApiResponseListMapStringObject } from '../models/rest-api-response-list-map-string-object';
import { RestApiResponseLong } from '../models/rest-api-response-long';
import { RestApiResponsePageIncidentInfoWithOrgsProjection } from '../models/rest-api-response-page-incident-info-with-orgs-projection';
import { RestApiResponsePageIncidentProjectionMinimum } from '../models/rest-api-response-page-incident-projection-minimum';
import { RestApiResponseString } from '../models/rest-api-response-string';
import { RestApiResponseTaskStatusDetails } from '../models/rest-api-response-task-status-details';

@Injectable()
export class IncidentControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation transfer
   */
  static readonly TransferPath = '/v1/incidents/{incId}/transfer/{orgId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `transfer()` instead.
   *
   * This method doesn't expect any request body.
   */
  transfer$Response(params: {
    incId: number;
    orgId: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentProjectionMinimum>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.TransferPath, 'put');
    if (params) {
      rb.path('incId', params.incId, {});
      rb.path('orgId', params.orgId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentProjectionMinimum>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `transfer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  transfer(params: {
    incId: number;
    orgId: number;
  }): Observable<RestApiResponseIncidentProjectionMinimum> {

    return this.transfer$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentProjectionMinimum>) => r.body as RestApiResponseIncidentProjectionMinimum)
    );
  }

  /**
   * Path part for operation get16
   */
  static readonly Get16Path = '/v1/incidents/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get16()` instead.
   *
   * This method doesn't expect any request body.
   */
  get16$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.Get16Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get16(params: {
    id: number;
  }): Observable<RestApiResponseIncidentProjection> {

    return this.get16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentProjection>) => r.body as RestApiResponseIncidentProjection)
    );
  }

  /**
   * Path part for operation update35
   */
  static readonly Update35Path = '/v1/incidents/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update35()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update35$Response(params: {
    id: number;
    body: IncidentLocation
  }): Observable<StrictHttpResponse<RestApiResponseIncidentLocationProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.Update35Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentLocationProjection>;
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
    id: number;
    body: IncidentLocation
  }): Observable<RestApiResponseIncidentLocationProjection> {

    return this.update35$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentLocationProjection>) => r.body as RestApiResponseIncidentLocationProjection)
    );
  }

  /**
   * Path part for operation closeIncident
   */
  static readonly CloseIncidentPath = '/v1/incidents/closeIncident';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `closeIncident()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  closeIncident$Response(params: {
    body: IncidentCloseObject
  }): Observable<StrictHttpResponse<RestApiResponseClosedIncidentResponse>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.CloseIncidentPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseClosedIncidentResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `closeIncident$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  closeIncident(params: {
    body: IncidentCloseObject
  }): Observable<RestApiResponseClosedIncidentResponse> {

    return this.closeIncident$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseClosedIncidentResponse>) => r.body as RestApiResponseClosedIncidentResponse)
    );
  }

  /**
   * Path part for operation changeIncident1
   */
  static readonly ChangeIncident1Path = '/v1/incidents/changeIncidentStatus/{incId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeIncident1()` instead.
   *
   * This method doesn't expect any request body.
   */
  changeIncident1$Response(params: {
    incId: number;
    language: boolean;
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.ChangeIncident1Path, 'put');
    if (params) {
      rb.path('incId', params.incId, {});
      rb.query('language', params.language, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseString>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `changeIncident1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  changeIncident1(params: {
    incId: number;
    language: boolean;
  }): Observable<RestApiResponseString> {

    return this.changeIncident1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation action
   */
  static readonly ActionPath = '/v1/incidents/action/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `action()` instead.
   *
   * This method doesn't expect any request body.
   */
  action$Response(params: {
    id: number;
    action: 'REACHED' | 'CONTAINED';
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.ActionPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('action', params.action, {});
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
   * To access the full response (for headers, for example), `action$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  action(params: {
    id: number;
    action: 'REACHED' | 'CONTAINED';
  }): Observable<RestApiResponseBoolean> {

    return this.action$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation page8
   */
  static readonly Page8Path = '/v1/incidents';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page8()` instead.
   *
   * This method doesn't expect any request body.
   */
  page8$Response(params: {
    filter: IncidentFilter;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentProjectionMinimum>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.Page8Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentProjectionMinimum>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page8(params: {
    filter: IncidentFilter;
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentProjectionMinimum> {

    return this.page8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentProjectionMinimum>) => r.body as RestApiResponsePageIncidentProjectionMinimum)
    );
  }

  /**
   * Path part for operation update36
   */
  static readonly Update36Path = '/v1/incidents';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update36()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update36$Response(params: {
    body: Incident
  }): Observable<StrictHttpResponse<RestApiResponseIncidentProjectionMinimum>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.Update36Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentProjectionMinimum>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update36$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update36(params: {
    body: Incident
  }): Observable<RestApiResponseIncidentProjectionMinimum> {

    return this.update36$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentProjectionMinimum>) => r.body as RestApiResponseIncidentProjectionMinimum)
    );
  }

  /**
   * Path part for operation create31
   */
  static readonly Create31Path = '/v1/incidents';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create31()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create31$Response(params: {
    body: Incident
  }): Observable<StrictHttpResponse<RestApiResponseIncidentProjectionMinimum>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.Create31Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentProjectionMinimum>;
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
    body: Incident
  }): Observable<RestApiResponseIncidentProjectionMinimum> {

    return this.create31$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentProjectionMinimum>) => r.body as RestApiResponseIncidentProjectionMinimum)
    );
  }

  /**
   * Path part for operation shareViaMail
   */
  static readonly ShareViaMailPath = '/v1/incidents/{id}/share-via-mail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `shareViaMail()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  shareViaMail$Response(params: {
    id: number;
    body: string
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.ShareViaMailPath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `shareViaMail$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  shareViaMail(params: {
    id: number;
    body: string
  }): Observable<RestApiResponseLong> {

    return this.shareViaMail$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

  /**
   * Path part for operation generate
   */
  static readonly GeneratePath = '/v1/incidents/report/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  generate$Response(params: {
    id: number;
    body: IncidentReportRequest
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.GeneratePath, 'post');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `generate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  generate(params: {
    id: number;
    body: IncidentReportRequest
  }): Observable<any> {

    return this.generate$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation getTaskStatusCount
   */
  static readonly GetTaskStatusCountPath = '/v1/incidents/{incidentId}/tasks/status-count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskStatusCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskStatusCount$Response(params: {
    incidentId: number;
  }): Observable<StrictHttpResponse<RestApiResponseTaskStatusDetails>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.GetTaskStatusCountPath, 'get');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTaskStatusDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskStatusCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskStatusCount(params: {
    incidentId: number;
  }): Observable<RestApiResponseTaskStatusDetails> {

    return this.getTaskStatusCount$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTaskStatusDetails>) => r.body as RestApiResponseTaskStatusDetails)
    );
  }

  /**
   * Path part for operation up
   */
  static readonly UpPath = '/v1/incidents/up/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `up()` instead.
   *
   * This method doesn't expect any request body.
   */
  up$Response(params: {
    id: Incident;
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.UpPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `up$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  up(params: {
    id: Incident;
  }): Observable<RestApiResponseLong> {

    return this.up$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

  /**
   * Path part for operation findBySubject
   */
  static readonly FindBySubjectPath = '/v1/incidents/subject';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findBySubject()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBySubject$Response(params: {
    filter: string;
    status?: Array<number>;
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentIdSubjectProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.FindBySubjectPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('status', params.status, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentIdSubjectProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findBySubject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findBySubject(params: {
    filter: string;
    status?: Array<number>;
  }): Observable<RestApiResponseListIncidentIdSubjectProjection> {

    return this.findBySubject$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentIdSubjectProjection>) => r.body as RestApiResponseListIncidentIdSubjectProjection)
    );
  }

  /**
   * Path part for operation incidentStatistics
   */
  static readonly IncidentStatisticsPath = '/v1/incidents/statistics-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incidentStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  incidentStatistics$Response(params: {
    module?: string;
    filter: IncidentStatisticsDataFilter;
    priority?: Array<Priority>;
    emergencylevel?: Array<EmergencyLevel>;
    statuses?: Array<IncidentStatus>;
    isKpiExpired?: boolean;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentStatisticData>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.IncidentStatisticsPath, 'get');
    if (params) {
      rb.query('module', params.module, {});
      rb.query('filter', params.filter, {});
      rb.query('priority', params.priority, {});
      rb.query('emergencylevel', params.emergencylevel, {});
      rb.query('statuses', params.statuses, {});
      rb.query('isKpiExpired', params.isKpiExpired, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentStatisticData>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `incidentStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  incidentStatistics(params: {
    module?: string;
    filter: IncidentStatisticsDataFilter;
    priority?: Array<Priority>;
    emergencylevel?: Array<EmergencyLevel>;
    statuses?: Array<IncidentStatus>;
    isKpiExpired?: boolean;
  }): Observable<RestApiResponseIncidentStatisticData> {

    return this.incidentStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentStatisticData>) => r.body as RestApiResponseIncidentStatisticData)
    );
  }

  /**
   * Path part for operation centerStatistics
   */
  static readonly CenterStatisticsPath = '/v1/incidents/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `centerStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  centerStatistics$Response(params?: {
    fromDate?: string;
    toDate?: string;
    centerId?: number;
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentStatistics>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.CenterStatisticsPath, 'get');
    if (params) {
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('centerId', params.centerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentStatistics>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `centerStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  centerStatistics(params?: {
    fromDate?: string;
    toDate?: string;
    centerId?: number;
  }): Observable<RestApiResponseListIncidentStatistics> {

    return this.centerStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentStatistics>) => r.body as RestApiResponseListIncidentStatistics)
    );
  }

  /**
   * Path part for operation searchIncidentCount
   */
  static readonly SearchIncidentCountPath = '/v1/incidents/search/list-ids';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchIncidentCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchIncidentCount$Response(params: {
    filter: IncidentSearchFilters;
    priority?: Array<Priority>;
    emergencylevel?: Array<EmergencyLevel>;
    status?: Array<IncidentStatus>;
    isKpiExpired?: boolean;
  }): Observable<StrictHttpResponse<RestApiResponseListLong>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.SearchIncidentCountPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('priority', params.priority, {});
      rb.query('emergencylevel', params.emergencylevel, {});
      rb.query('status', params.status, {});
      rb.query('isKpiExpired', params.isKpiExpired, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `searchIncidentCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchIncidentCount(params: {
    filter: IncidentSearchFilters;
    priority?: Array<Priority>;
    emergencylevel?: Array<EmergencyLevel>;
    status?: Array<IncidentStatus>;
    isKpiExpired?: boolean;
  }): Observable<RestApiResponseListLong> {

    return this.searchIncidentCount$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListLong>) => r.body as RestApiResponseListLong)
    );
  }

  /**
   * Path part for operation search5
   */
  static readonly Search5Path = '/v1/incidents/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search5()` instead.
   *
   * This method doesn't expect any request body.
   */
  search5$Response(params: {
    priority?: Array<Priority>;
    emergencylevel?: Array<EmergencyLevel>;
    status?: Array<IncidentStatus>;
    isKpiExpired?: boolean;
    filter: IncidentSearchFilters;
    tagId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentInfoWithOrgsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.Search5Path, 'get');
    if (params) {
      rb.query('priority', params.priority, {});
      rb.query('emergencylevel', params.emergencylevel, {});
      rb.query('status', params.status, {});
      rb.query('isKpiExpired', params.isKpiExpired, {});
      rb.query('filter', params.filter, {});
      rb.query('tagId', params.tagId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentInfoWithOrgsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search5(params: {
    priority?: Array<Priority>;
    emergencylevel?: Array<EmergencyLevel>;
    status?: Array<IncidentStatus>;
    isKpiExpired?: boolean;
    filter: IncidentSearchFilters;
    tagId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentInfoWithOrgsProjection> {

    return this.search5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentInfoWithOrgsProjection>) => r.body as RestApiResponsePageIncidentInfoWithOrgsProjection)
    );
  }

  /**
   * Path part for operation consolidateReport
   */
  static readonly ConsolidateReportPath = '/v1/incidents/main-organization/statistics/report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consolidateReport()` instead.
   *
   * This method doesn't expect any request body.
   */
  consolidateReport$Response(params: {
    fromDate?: string;
    toDate?: string;
    exportAs: 'PDF' | 'EXCEL';
    language: boolean;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.ConsolidateReportPath, 'get');
    if (params) {
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('exportAs', params.exportAs, {});
      rb.query('language', params.language, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consolidateReport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consolidateReport(params: {
    fromDate?: string;
    toDate?: string;
    exportAs: 'PDF' | 'EXCEL';
    language: boolean;
  }): Observable<any> {

    return this.consolidateReport$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation mainOrganizationStatistics
   */
  static readonly MainOrganizationStatisticsPath = '/v1/incidents/main-organization/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `mainOrganizationStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  mainOrganizationStatistics$Response(params?: {
    fromDate?: string;
    toDate?: string;
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentMainOrgStatistics>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.MainOrganizationStatisticsPath, 'get');
    if (params) {
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentMainOrgStatistics>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `mainOrganizationStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  mainOrganizationStatistics(params?: {
    fromDate?: string;
    toDate?: string;
  }): Observable<RestApiResponseListIncidentMainOrgStatistics> {

    return this.mainOrganizationStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentMainOrgStatistics>) => r.body as RestApiResponseListIncidentMainOrgStatistics)
    );
  }

  /**
   * Path part for operation similiarIncident
   */
  static readonly SimiliarIncidentPath = '/v1/incidents/location/coordinates-difference';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `similiarIncident()` instead.
   *
   * This method doesn't expect any request body.
   */
  similiarIncident$Response(params: {
    incidentCategory: number;
    zone: number;
    sector: number;
    location?: string;
  }): Observable<StrictHttpResponse<RestApiResponseListMapStringObject>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.SimiliarIncidentPath, 'get');
    if (params) {
      rb.query('incidentCategory', params.incidentCategory, {});
      rb.query('zone', params.zone, {});
      rb.query('sector', params.sector, {});
      rb.query('location', params.location, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListMapStringObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `similiarIncident$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  similiarIncident(params: {
    incidentCategory: number;
    zone: number;
    sector: number;
    location?: string;
  }): Observable<RestApiResponseListMapStringObject> {

    return this.similiarIncident$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListMapStringObject>) => r.body as RestApiResponseListMapStringObject)
    );
  }

  /**
   * Path part for operation getIncidentReport
   */
  static readonly GetIncidentReportPath = '/v1/incidents/incident-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIncidentReport()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncidentReport$Response(params: {
    filter: IncidentStatisticsFilter;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReportDetails>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.GetIncidentReportPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentReportDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIncidentReport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncidentReport(params: {
    filter: IncidentStatisticsFilter;
  }): Observable<RestApiResponseIncidentReportDetails> {

    return this.getIncidentReport$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReportDetails>) => r.body as RestApiResponseIncidentReportDetails)
    );
  }

  /**
   * Path part for operation getGeneralPosition
   */
  static readonly GetGeneralPositionPath = '/v1/incidents/gp/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGeneralPosition()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGeneralPosition$Response(params: {
    id: Incident;
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.GetGeneralPositionPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseString>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getGeneralPosition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGeneralPosition(params: {
    id: Incident;
  }): Observable<RestApiResponseString> {

    return this.getGeneralPosition$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation get17
   */
  static readonly Get17Path = '/v1/incidents/ext/uuid';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get17()` instead.
   *
   * This method doesn't expect any request body.
   */
  get17$Response(params: {
    uuid: string;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.Get17Path, 'get');
    if (params) {
      rb.query('uuid', params.uuid, {});
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
   * To access the full response (for headers, for example), `get17$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get17(params: {
    uuid: string;
  }): Observable<RestApiResponseBoolean> {

    return this.get17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation export4
   */
  static readonly Export4Path = '/v1/incidents/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export4()` instead.
   *
   * This method doesn't expect any request body.
   */
  export4$Response(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    filter: IncidentExportFilters;
    priority?: Array<number>;
    status?: Array<number>;
    columns?: Array<string>;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.Export4Path, 'get');
    if (params) {
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
      rb.query('filter', params.filter, {});
      rb.query('priority', params.priority, {});
      rb.query('status', params.status, {});
      rb.query('columns', params.columns, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `export4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export4(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    filter: IncidentExportFilters;
    priority?: Array<number>;
    status?: Array<number>;
    columns?: Array<string>;
  }): Observable<any> {

    return this.export4$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation down
   */
  static readonly DownPath = '/v1/incidents/down/{id}/{childOrgId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `down()` instead.
   *
   * This method doesn't expect any request body.
   */
  down$Response(params: {
    id: Incident;
    childOrgId: OrgStructure;
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.DownPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('childOrgId', params.childOrgId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `down$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  down(params: {
    id: Incident;
    childOrgId: OrgStructure;
  }): Observable<RestApiResponseLong> {

    return this.down$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

  /**
   * Path part for operation consolidateReport1
   */
  static readonly ConsolidateReport1Path = '/v1/incidents/consolidate-statistics/report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consolidateReport1()` instead.
   *
   * This method doesn't expect any request body.
   */
  consolidateReport1$Response(params: {
    fromDate?: string;
    toDate?: string;
    centerId?: number;
    exportAs: 'PDF' | 'EXCEL';
    language: boolean;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentControllerService.ConsolidateReport1Path, 'get');
    if (params) {
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('centerId', params.centerId, {});
      rb.query('exportAs', params.exportAs, {});
      rb.query('language', params.language, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `consolidateReport1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consolidateReport1(params: {
    fromDate?: string;
    toDate?: string;
    centerId?: number;
    exportAs: 'PDF' | 'EXCEL';
    language: boolean;
  }): Observable<any> {

    return this.consolidateReport1$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
