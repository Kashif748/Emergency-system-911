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

import { RestApiResponseCovidCasesByOutComeCp } from '../models/rest-api-response-covid-cases-by-out-come-cp';
import { RestApiResponseCovidTestSummaryTotalData } from '../models/rest-api-response-covid-test-summary-total-data';
import { RestApiResponseListBedCapacityData } from '../models/rest-api-response-list-bed-capacity-data';
import { RestApiResponseListCovidCase } from '../models/rest-api-response-list-covid-case';
import { RestApiResponseListCovidTestSummary } from '../models/rest-api-response-list-covid-test-summary';
import { RestApiResponseListSharingInformationData } from '../models/rest-api-response-list-sharing-information-data';
import { RestApiResponseListVolunteersData } from '../models/rest-api-response-list-volunteers-data';

@Injectable()
export class DohControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getVolunteers
   */
  static readonly GetVolunteersPath = '/v1/doh/volunteers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getVolunteers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVolunteers$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListVolunteersData>> {

    const rb = new RequestBuilder(this.rootUrl, DohControllerService.GetVolunteersPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListVolunteersData>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getVolunteers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getVolunteers(params?: {
  }): Observable<RestApiResponseListVolunteersData> {

    return this.getVolunteers$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListVolunteersData>) => r.body as RestApiResponseListVolunteersData)
    );
  }

  /**
   * Path part for operation getCovidSummarySum
   */
  static readonly GetCovidSummarySumPath = '/v1/doh/test-summary/sum';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCovidSummarySum()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCovidSummarySum$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseCovidTestSummaryTotalData>> {

    const rb = new RequestBuilder(this.rootUrl, DohControllerService.GetCovidSummarySumPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCovidTestSummaryTotalData>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCovidSummarySum$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCovidSummarySum(params?: {
  }): Observable<RestApiResponseCovidTestSummaryTotalData> {

    return this.getCovidSummarySum$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCovidTestSummaryTotalData>) => r.body as RestApiResponseCovidTestSummaryTotalData)
    );
  }

  /**
   * Path part for operation getCovidSummary
   */
  static readonly GetCovidSummaryPath = '/v1/doh/test-summary';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCovidSummary()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCovidSummary$Response(params?: {
    fromDate?: string;
    toDate?: string;
  }): Observable<StrictHttpResponse<RestApiResponseListCovidTestSummary>> {

    const rb = new RequestBuilder(this.rootUrl, DohControllerService.GetCovidSummaryPath, 'get');
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
        return r as StrictHttpResponse<RestApiResponseListCovidTestSummary>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCovidSummary$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCovidSummary(params?: {
    fromDate?: string;
    toDate?: string;
  }): Observable<RestApiResponseListCovidTestSummary> {

    return this.getCovidSummary$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListCovidTestSummary>) => r.body as RestApiResponseListCovidTestSummary)
    );
  }

  /**
   * Path part for operation getEventSharingInfo
   */
  static readonly GetEventSharingInfoPath = '/v1/doh/event-info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEventSharingInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventSharingInfo$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListSharingInformationData>> {

    const rb = new RequestBuilder(this.rootUrl, DohControllerService.GetEventSharingInfoPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListSharingInformationData>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEventSharingInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEventSharingInfo(params?: {
  }): Observable<RestApiResponseListSharingInformationData> {

    return this.getEventSharingInfo$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListSharingInformationData>) => r.body as RestApiResponseListSharingInformationData)
    );
  }

  /**
   * Path part for operation getCovidCasesSum
   */
  static readonly GetCovidCasesSumPath = '/v1/doh/covid-cases/sum';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCovidCasesSum()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCovidCasesSum$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseCovidCasesByOutComeCp>> {

    const rb = new RequestBuilder(this.rootUrl, DohControllerService.GetCovidCasesSumPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCovidCasesByOutComeCp>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCovidCasesSum$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCovidCasesSum(params?: {
  }): Observable<RestApiResponseCovidCasesByOutComeCp> {

    return this.getCovidCasesSum$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCovidCasesByOutComeCp>) => r.body as RestApiResponseCovidCasesByOutComeCp)
    );
  }

  /**
   * Path part for operation getCovidCases
   */
  static readonly GetCovidCasesPath = '/v1/doh/covid-cases';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCovidCases()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCovidCases$Response(params?: {
    fromDate?: string;
    toDate?: string;
  }): Observable<StrictHttpResponse<RestApiResponseListCovidCase>> {

    const rb = new RequestBuilder(this.rootUrl, DohControllerService.GetCovidCasesPath, 'get');
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
        return r as StrictHttpResponse<RestApiResponseListCovidCase>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCovidCases$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCovidCases(params?: {
    fromDate?: string;
    toDate?: string;
  }): Observable<RestApiResponseListCovidCase> {

    return this.getCovidCases$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListCovidCase>) => r.body as RestApiResponseListCovidCase)
    );
  }

  /**
   * Path part for operation getBedCapacity
   */
  static readonly GetBedCapacityPath = '/v1/doh/bed-capacity';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBedCapacity()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBedCapacity$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListBedCapacityData>> {

    const rb = new RequestBuilder(this.rootUrl, DohControllerService.GetBedCapacityPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBedCapacityData>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getBedCapacity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBedCapacity(params?: {
  }): Observable<RestApiResponseListBedCapacityData> {

    return this.getBedCapacity$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBedCapacityData>) => r.body as RestApiResponseListBedCapacityData)
    );
  }

}
