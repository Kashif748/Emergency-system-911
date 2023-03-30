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

import { IncidentSurvey } from '../models/incident-survey';
import { Pageable } from '../models/pageable';
import { RestApiResponseIncidentSurvey } from '../models/rest-api-response-incident-survey';
import { RestApiResponseIncidentSurveyStatistics } from '../models/rest-api-response-incident-survey-statistics';
import { RestApiResponseOrgStructureLogoProjection } from '../models/rest-api-response-org-structure-logo-projection';
import { RestApiResponsePageIncidentSurveyProjection } from '../models/rest-api-response-page-incident-survey-projection';
import { RestApiResponseString } from '../models/rest-api-response-string';

@Injectable()
export class IncidentSurveyControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getByUuid1
   */
  static readonly GetByUuid1Path = '/v1/incident-survey/ext/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByUuid1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByUuid1$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyControllerService.GetByUuid1Path, 'get');
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
   * To access the full response (for headers, for example), `getByUuid1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByUuid1(params: {
    id: string;
  }): Observable<RestApiResponseString> {

    return this.getByUuid1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation create31
   */
  static readonly Create31Path = '/v1/incident-survey/ext/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create31()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create31$Response(params: {
    id: string;
    body: IncidentSurvey
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyControllerService.Create31Path, 'post');
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
        return r as StrictHttpResponse<RestApiResponseString>;
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
    id: string;
    body: IncidentSurvey
  }): Observable<RestApiResponseString> {

    return this.create31$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation getById7
   */
  static readonly GetById7Path = '/v1/incident-survey/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById7()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentSurvey>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyControllerService.GetById7Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentSurvey>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById7(params: {
    id: number;
  }): Observable<RestApiResponseIncidentSurvey> {

    return this.getById7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentSurvey>) => r.body as RestApiResponseIncidentSurvey)
    );
  }

  /**
   * Path part for operation statistics2
   */
  static readonly Statistics2Path = '/v1/incident-survey/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `statistics2()` instead.
   *
   * This method doesn't expect any request body.
   */
  statistics2$Response(params?: {
    reason?: number;
    happiness?: number;
    incidentId?: number;
    fromDate?: string;
    toDate?: string;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentSurveyStatistics>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyControllerService.Statistics2Path, 'get');
    if (params) {
      rb.query('reason', params.reason, {});
      rb.query('happiness', params.happiness, {});
      rb.query('incidentId', params.incidentId, {});
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentSurveyStatistics>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `statistics2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  statistics2(params?: {
    reason?: number;
    happiness?: number;
    incidentId?: number;
    fromDate?: string;
    toDate?: string;
  }): Observable<RestApiResponseIncidentSurveyStatistics> {

    return this.statistics2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentSurveyStatistics>) => r.body as RestApiResponseIncidentSurveyStatistics)
    );
  }

  /**
   * Path part for operation loadHorizentalLogo
   */
  static readonly LoadHorizentalLogoPath = '/v1/incident-survey/ext/logo/{uuid}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadHorizentalLogo()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadHorizentalLogo$Response(params: {
    uuid: string;
  }): Observable<StrictHttpResponse<RestApiResponseOrgStructureLogoProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyControllerService.LoadHorizentalLogoPath, 'get');
    if (params) {
      rb.path('uuid', params.uuid, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgStructureLogoProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loadHorizentalLogo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadHorizentalLogo(params: {
    uuid: string;
  }): Observable<RestApiResponseOrgStructureLogoProjection> {

    return this.loadHorizentalLogo$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgStructureLogoProjection>) => r.body as RestApiResponseOrgStructureLogoProjection)
    );
  }

  /**
   * Path part for operation consolidateReport2
   */
  static readonly ConsolidateReport2Path = '/v1/incident-survey/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `consolidateReport2()` instead.
   *
   * This method doesn't expect any request body.
   */
  consolidateReport2$Response(params: {
    reason?: number;
    happiness?: number;
    incidentId?: number;
    fromDate?: string;
    toDate?: string;
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyControllerService.ConsolidateReport2Path, 'get');
    if (params) {
      rb.query('reason', params.reason, {});
      rb.query('happiness', params.happiness, {});
      rb.query('incidentId', params.incidentId, {});
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
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
   * To access the full response (for headers, for example), `consolidateReport2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  consolidateReport2(params: {
    reason?: number;
    happiness?: number;
    incidentId?: number;
    fromDate?: string;
    toDate?: string;
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<void> {

    return this.consolidateReport2$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation searchByPage
   */
  static readonly SearchByPagePath = '/v1/incident-survey';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchByPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchByPage$Response(params: {
    reason?: number;
    happiness?: number;
    incidentId?: number;
    fromDate?: string;
    toDate?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentSurveyProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyControllerService.SearchByPagePath, 'get');
    if (params) {
      rb.query('reason', params.reason, {});
      rb.query('happiness', params.happiness, {});
      rb.query('incidentId', params.incidentId, {});
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentSurveyProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `searchByPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchByPage(params: {
    reason?: number;
    happiness?: number;
    incidentId?: number;
    fromDate?: string;
    toDate?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentSurveyProjection> {

    return this.searchByPage$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentSurveyProjection>) => r.body as RestApiResponsePageIncidentSurveyProjection)
    );
  }

}
