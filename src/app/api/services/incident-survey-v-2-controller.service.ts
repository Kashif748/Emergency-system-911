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

import { IncidentSurveyFilters } from '../models/incident-survey-filters';
import { IncidentSurveyV2 } from '../models/incident-survey-v-2';
import { Pageable } from '../models/pageable';
import { RestApiResponseListIncidentSurveyV2Statistics } from '../models/rest-api-response-list-incident-survey-v-2-statistics';
import { RestApiResponsePageIncidentSurveyV2Projection } from '../models/rest-api-response-page-incident-survey-v-2-projection';
import { RestApiResponseString } from '../models/rest-api-response-string';

@Injectable()
export class IncidentSurveyV2ControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation create2
   */
  static readonly Create2Path = '/v2/incident-survey/ext/{uuid}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create2$Response(params: {
    uuid: string;
    body: IncidentSurveyV2
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyV2ControllerService.Create2Path, 'post');
    if (params) {
      rb.path('uuid', params.uuid, {});
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
   * To access the full response (for headers, for example), `create2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create2(params: {
    uuid: string;
    body: IncidentSurveyV2
  }): Observable<RestApiResponseString> {

    return this.create2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation statistics
   */
  static readonly StatisticsPath = '/v2/incident-survey/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `statistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  statistics$Response(params: {
    filter: IncidentSurveyFilters;
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentSurveyV2Statistics>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyV2ControllerService.StatisticsPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentSurveyV2Statistics>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `statistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  statistics(params: {
    filter: IncidentSurveyFilters;
  }): Observable<RestApiResponseListIncidentSurveyV2Statistics> {

    return this.statistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentSurveyV2Statistics>) => r.body as RestApiResponseListIncidentSurveyV2Statistics)
    );
  }

  /**
   * Path part for operation search
   */
  static readonly SearchPath = '/v2/incident-survey/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search()` instead.
   *
   * This method doesn't expect any request body.
   */
  search$Response(params: {
    filter: IncidentSurveyFilters;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentSurveyV2Projection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyV2ControllerService.SearchPath, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageIncidentSurveyV2Projection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search(params: {
    filter: IncidentSurveyFilters;
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentSurveyV2Projection> {

    return this.search$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentSurveyV2Projection>) => r.body as RestApiResponsePageIncidentSurveyV2Projection)
    );
  }

  /**
   * Path part for operation getByUuid
   */
  static readonly GetByUuidPath = '/v2/incident-survey/ext/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByUuid()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByUuid$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyV2ControllerService.GetByUuidPath, 'get');
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
   * To access the full response (for headers, for example), `getByUuid$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByUuid(params: {
    id: string;
  }): Observable<RestApiResponseString> {

    return this.getByUuid$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation export
   */
  static readonly ExportPath = '/v2/incident-survey/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export()` instead.
   *
   * This method doesn't expect any request body.
   */
  export$Response(params: {
    filter: IncidentSurveyFilters;
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyV2ControllerService.ExportPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
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
   * To access the full response (for headers, for example), `export$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export(params: {
    filter: IncidentSurveyFilters;
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<void> {

    return this.export$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
