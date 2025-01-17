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

import { BcActivityAnalysisWorkLog } from '../models/bc-activity-analysis-work-log';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivityAnalysisWorkLog } from '../models/rest-api-response-bc-activity-analysis-work-log';
import { RestApiResponseBcActivityAnalysisWorkLogProjection } from '../models/rest-api-response-bc-activity-analysis-work-log-projection';
import { RestApiResponsePageBcActivityAnalysisWorkLogProjection } from '../models/rest-api-response-page-bc-activity-analysis-work-log-projection';

@Injectable()
export class BcActivityAnalysisWorkLogControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById34
   */
  static readonly DeleteById34Path = '/v1/bc/activity-analysis/work-log/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById34()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById34$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.DeleteById34Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `deleteById34$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById34(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById34$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update115
   */
  static readonly Update115Path = '/v1/bc/activity-analysis/work-log';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update115()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update115$Response(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.Update115Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update115$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update115(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<RestApiResponseBcActivityAnalysisWorkLog> {

    return this.update115$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>) => r.body as RestApiResponseBcActivityAnalysisWorkLog)
    );
  }

  /**
   * Path part for operation save3
   */
  static readonly Save3Path = '/v1/bc/activity-analysis/work-log';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `save3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save3$Response(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLogProjection>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.Save3Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLogProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `save3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  save3(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<RestApiResponseBcActivityAnalysisWorkLogProjection> {

    return this.save3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLogProjection>) => r.body as RestApiResponseBcActivityAnalysisWorkLogProjection)
    );
  }

  /**
   * Path part for operation getById11
   */
  static readonly GetById11Path = '/v1/bc/activity-analysis/work-log/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById11()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById11$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLogProjection>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.GetById11Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLogProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById11(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityAnalysisWorkLogProjection> {

    return this.getById11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLogProjection>) => r.body as RestApiResponseBcActivityAnalysisWorkLogProjection)
    );
  }

  /**
   * Path part for operation search26
   */
  static readonly Search26Path = '/v1/bc/activity-analysis/work-log/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search26()` instead.
   *
   * This method doesn't expect any request body.
   */
  search26$Response(params: {
    activityAnalysisId?: number;
    resourceId?: number;
    actionTypeId?: number;
    createdBy?: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLogProjection>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.Search26Path, 'get');
    if (params) {
      rb.query('activityAnalysisId', params.activityAnalysisId, {});
      rb.query('resourceId', params.resourceId, {});
      rb.query('actionTypeId', params.actionTypeId, {});
      rb.query('createdBy', params.createdBy, {});
      rb.query('isActive', params.isActive, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLogProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search26$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search26(params: {
    activityAnalysisId?: number;
    resourceId?: number;
    actionTypeId?: number;
    createdBy?: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityAnalysisWorkLogProjection> {

    return this.search26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLogProjection>) => r.body as RestApiResponsePageBcActivityAnalysisWorkLogProjection)
    );
  }

}
