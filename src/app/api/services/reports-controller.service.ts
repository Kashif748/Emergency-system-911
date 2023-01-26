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

import { AdcdReportCriteria } from '../models/adcd-report-criteria';
import { RestApiResponseListAdcdReportResponse } from '../models/rest-api-response-list-adcd-report-response';
import { RestApiResponseListAdcdaAvailabilityReportResponse } from '../models/rest-api-response-list-adcda-availability-report-response';

@Injectable()
export class ReportsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation adcdaAvailabilityReport
   */
  static readonly AdcdaAvailabilityReportPath = '/v1/reports/adcda/availability';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adcdaAvailabilityReport()` instead.
   *
   * This method doesn't expect any request body.
   */
  adcdaAvailabilityReport$Response(params?: {
    area?: number;
    sector?: number;
  }): Observable<StrictHttpResponse<RestApiResponseListAdcdaAvailabilityReportResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ReportsControllerService.AdcdaAvailabilityReportPath, 'get');
    if (params) {
      rb.query('area', params.area, {});
      rb.query('sector', params.sector, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListAdcdaAvailabilityReportResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `adcdaAvailabilityReport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adcdaAvailabilityReport(params?: {
    area?: number;
    sector?: number;
  }): Observable<RestApiResponseListAdcdaAvailabilityReportResponse> {

    return this.adcdaAvailabilityReport$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListAdcdaAvailabilityReportResponse>) => r.body as RestApiResponseListAdcdaAvailabilityReportResponse)
    );
  }

  /**
   * Path part for operation adcdReport
   */
  static readonly AdcdReportPath = '/v1/reports/adcda';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adcdReport()` instead.
   *
   * This method doesn't expect any request body.
   */
  adcdReport$Response(params: {
    filter: AdcdReportCriteria;
  }): Observable<StrictHttpResponse<RestApiResponseListAdcdReportResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ReportsControllerService.AdcdReportPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListAdcdReportResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `adcdReport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adcdReport(params: {
    filter: AdcdReportCriteria;
  }): Observable<RestApiResponseListAdcdReportResponse> {

    return this.adcdReport$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListAdcdReportResponse>) => r.body as RestApiResponseListAdcdReportResponse)
    );
  }

}
