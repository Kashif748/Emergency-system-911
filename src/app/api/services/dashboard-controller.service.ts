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

import { RestApiResponseCorrespondenceDashboard } from '../models/rest-api-response-correspondence-dashboard';
import { RestApiResponseIncidentsDashboard } from '../models/rest-api-response-incidents-dashboard';
import { RestApiResponseListDashboardData } from '../models/rest-api-response-list-dashboard-data';
import { RestApiResponseListMapStringObject } from '../models/rest-api-response-list-map-string-object';
import { RestApiResponseTaskDashboard } from '../models/rest-api-response-task-dashboard';

@Injectable()
export class DashboardControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTaskDashboardStatistics
   */
  static readonly GetTaskDashboardStatisticsPath = '/v1/dashboard/tasks/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTaskDashboardStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskDashboardStatistics$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseTaskDashboard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardControllerService.GetTaskDashboardStatisticsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTaskDashboard>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTaskDashboardStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTaskDashboardStatistics(params?: {
  }): Observable<RestApiResponseTaskDashboard> {

    return this.getTaskDashboardStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTaskDashboard>) => r.body as RestApiResponseTaskDashboard)
    );
  }

  /**
   * Path part for operation getIncDashboardStatistics
   */
  static readonly GetIncDashboardStatisticsPath = '/v1/dashboard/incidents/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getIncDashboardStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncDashboardStatistics$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsDashboard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardControllerService.GetIncDashboardStatisticsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentsDashboard>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getIncDashboardStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getIncDashboardStatistics(params?: {
  }): Observable<RestApiResponseIncidentsDashboard> {

    return this.getIncDashboardStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentsDashboard>) => r.body as RestApiResponseIncidentsDashboard)
    );
  }

  /**
   * Path part for operation getInProgessIncBasedOnPriority
   */
  static readonly GetInProgessIncBasedOnPriorityPath = '/v1/dashboard/in-progress/incident-priority/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInProgessIncBasedOnPriority()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInProgessIncBasedOnPriority$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListMapStringObject>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardControllerService.GetInProgessIncBasedOnPriorityPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListMapStringObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInProgessIncBasedOnPriority$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInProgessIncBasedOnPriority(params?: {
  }): Observable<RestApiResponseListMapStringObject> {

    return this.getInProgessIncBasedOnPriority$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListMapStringObject>) => r.body as RestApiResponseListMapStringObject)
    );
  }

  /**
   * Path part for operation dashboardChartData
   */
  static readonly DashboardChartDataPath = '/v1/dashboard/dashboard-chart-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dashboardChartData()` instead.
   *
   * This method doesn't expect any request body.
   */
  dashboardChartData$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListDashboardData>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardControllerService.DashboardChartDataPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListDashboardData>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `dashboardChartData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dashboardChartData(params?: {
  }): Observable<RestApiResponseListDashboardData> {

    return this.dashboardChartData$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListDashboardData>) => r.body as RestApiResponseListDashboardData)
    );
  }

  /**
   * Path part for operation getCorrDashboardStatistics
   */
  static readonly GetCorrDashboardStatisticsPath = '/v1/dashboard/correspondence/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCorrDashboardStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCorrDashboardStatistics$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceDashboard>> {

    const rb = new RequestBuilder(this.rootUrl, DashboardControllerService.GetCorrDashboardStatisticsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCorrespondenceDashboard>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCorrDashboardStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCorrDashboardStatistics(params?: {
  }): Observable<RestApiResponseCorrespondenceDashboard> {

    return this.getCorrDashboardStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceDashboard>) => r.body as RestApiResponseCorrespondenceDashboard)
    );
  }

}
