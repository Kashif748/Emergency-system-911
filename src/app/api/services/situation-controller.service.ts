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

import { Pageable } from '../models/pageable';
import { RestApiResponsePageAttachmentPerSituationResponse } from '../models/rest-api-response-page-attachment-per-situation-response';
import { RestApiResponsePageSituationProjection } from '../models/rest-api-response-page-situation-projection';
import { RestApiResponseSituationChartReportResponse } from '../models/rest-api-response-situation-chart-report-response';
import { RestApiResponseSituationProjection } from '../models/rest-api-response-situation-projection';
import { RestApiResponseSituationStatisticsResponse } from '../models/rest-api-response-situation-statistics-response';
import { Situation } from '../models/situation';

@Injectable()
export class SituationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation search1
   */
  static readonly Search1Path = '/v1/situations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search1()` instead.
   *
   * This method doesn't expect any request body.
   */
  search1$Response(params: {
    name?: string;
    newsType?: number;
    themeType?: number;
    active?: boolean;
    fromDate?: string;
    toDate?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageSituationProjection>> {

    const rb = new RequestBuilder(this.rootUrl, SituationControllerService.Search1Path, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('newsType', params.newsType, {});
      rb.query('themeType', params.themeType, {});
      rb.query('active', params.active, {});
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
        return r as StrictHttpResponse<RestApiResponsePageSituationProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search1(params: {
    name?: string;
    newsType?: number;
    themeType?: number;
    active?: boolean;
    fromDate?: string;
    toDate?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageSituationProjection> {

    return this.search1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageSituationProjection>) => r.body as RestApiResponsePageSituationProjection)
    );
  }

  /**
   * Path part for operation update8
   */
  static readonly Update8Path = '/v1/situations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update8()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update8$Response(params: {
    body: Situation
  }): Observable<StrictHttpResponse<RestApiResponseSituationProjection>> {

    const rb = new RequestBuilder(this.rootUrl, SituationControllerService.Update8Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSituationProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update8$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update8(params: {
    body: Situation
  }): Observable<RestApiResponseSituationProjection> {

    return this.update8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSituationProjection>) => r.body as RestApiResponseSituationProjection)
    );
  }

  /**
   * Path part for operation create8
   */
  static readonly Create8Path = '/v1/situations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create8()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create8$Response(params: {
    body: Situation
  }): Observable<StrictHttpResponse<RestApiResponseSituationProjection>> {

    const rb = new RequestBuilder(this.rootUrl, SituationControllerService.Create8Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSituationProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create8$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create8(params: {
    body: Situation
  }): Observable<RestApiResponseSituationProjection> {

    return this.create8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSituationProjection>) => r.body as RestApiResponseSituationProjection)
    );
  }

  /**
   * Path part for operation getById
   */
  static readonly GetByIdPath = '/v1/situations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseSituationProjection>> {

    const rb = new RequestBuilder(this.rootUrl, SituationControllerService.GetByIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSituationProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById(params: {
    id: number;
  }): Observable<RestApiResponseSituationProjection> {

    return this.getById$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSituationProjection>) => r.body as RestApiResponseSituationProjection)
    );
  }

  /**
   * Path part for operation statistics2
   */
  static readonly Statistics2Path = '/v1/situations/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `statistics2()` instead.
   *
   * This method doesn't expect any request body.
   */
  statistics2$Response(params: {
    situationId: number;
    poi: string;
  }): Observable<StrictHttpResponse<RestApiResponseSituationStatisticsResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SituationControllerService.Statistics2Path, 'get');
    if (params) {
      rb.query('situationId', params.situationId, {});
      rb.query('poi', params.poi, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSituationStatisticsResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `statistics2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  statistics2(params: {
    situationId: number;
    poi: string;
  }): Observable<RestApiResponseSituationStatisticsResponse> {

    return this.statistics2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSituationStatisticsResponse>) => r.body as RestApiResponseSituationStatisticsResponse)
    );
  }

  /**
   * Path part for operation generate1
   */
  static readonly Generate1Path = '/v1/situations/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generate1()` instead.
   *
   * This method doesn't expect any request body.
   */
  generate1$Response(params: {
    situationId: number;
    lang: boolean;
    poi: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, SituationControllerService.Generate1Path, 'get');
    if (params) {
      rb.query('situationId', params.situationId, {});
      rb.query('lang', params.lang, {});
      rb.query('poi', params.poi, {});
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
   * To access the full response (for headers, for example), `generate1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generate1(params: {
    situationId: number;
    lang: boolean;
    poi: string;
  }): Observable<any> {

    return this.generate1$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation chartReport
   */
  static readonly ChartReportPath = '/v1/situations/chart-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chartReport()` instead.
   *
   * This method doesn't expect any request body.
   */
  chartReport$Response(params: {
    situationId: number;
  }): Observable<StrictHttpResponse<RestApiResponseSituationChartReportResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SituationControllerService.ChartReportPath, 'get');
    if (params) {
      rb.query('situationId', params.situationId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSituationChartReportResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `chartReport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chartReport(params: {
    situationId: number;
  }): Observable<RestApiResponseSituationChartReportResponse> {

    return this.chartReport$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSituationChartReportResponse>) => r.body as RestApiResponseSituationChartReportResponse)
    );
  }

  /**
   * Path part for operation attachments
   */
  static readonly AttachmentsPath = '/v1/situations/attachment';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `attachments()` instead.
   *
   * This method doesn't expect any request body.
   */
  attachments$Response(params: {
    situationId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageAttachmentPerSituationResponse>> {

    const rb = new RequestBuilder(this.rootUrl, SituationControllerService.AttachmentsPath, 'get');
    if (params) {
      rb.query('situationId', params.situationId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageAttachmentPerSituationResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `attachments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  attachments(params: {
    situationId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageAttachmentPerSituationResponse> {

    return this.attachments$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageAttachmentPerSituationResponse>) => r.body as RestApiResponsePageAttachmentPerSituationResponse)
    );
  }

  /**
   * Path part for operation getActiveSituation
   */
  static readonly GetActiveSituationPath = '/v1/active/situation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveSituation()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveSituation$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseSituationProjection>> {

    const rb = new RequestBuilder(this.rootUrl, SituationControllerService.GetActiveSituationPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSituationProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveSituation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveSituation(params?: {
  }): Observable<RestApiResponseSituationProjection> {

    return this.getActiveSituation$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSituationProjection>) => r.body as RestApiResponseSituationProjection)
    );
  }

}
