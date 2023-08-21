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
import { RestApiResponsePageBcActivityAnalysisWorkLog } from '../models/rest-api-response-page-bc-activity-analysis-work-log';

@Injectable()
export class BcActivityAnalysisWorkLogControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById23
   */
  static readonly DeleteById23Path = '/v1/bc/activity-analysis/work-log/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById23()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById23$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.DeleteById23Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById23(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById23$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update103
   */
  static readonly Update103Path = '/v1/bc/activity-analysis/work-log';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update103()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update103$Response(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.Update103Path, 'put');
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
   * To access the full response (for headers, for example), `update103$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update103(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<RestApiResponseBcActivityAnalysisWorkLog> {

    return this.update103$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>) => r.body as RestApiResponseBcActivityAnalysisWorkLog)
    );
  }

  /**
   * Path part for operation insertOne24
   */
  static readonly InsertOne24Path = '/v1/bc/activity-analysis/work-log';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne24()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne24$Response(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.InsertOne24Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne24$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne24(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<RestApiResponseBcActivityAnalysisWorkLog> {

    return this.insertOne24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>) => r.body as RestApiResponseBcActivityAnalysisWorkLog)
    );
  }

  /**
   * Path part for operation getOne26
   */
  static readonly GetOne26Path = '/v1/bc/activity-analysis/work-log/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne26()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne26$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.GetOne26Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `getOne26$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne26(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityAnalysisWorkLog> {

    return this.getOne26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>) => r.body as RestApiResponseBcActivityAnalysisWorkLog)
    );
  }

  /**
   * Path part for operation search19
   */
  static readonly Search19Path = '/v1/bc/activity-analysis/work-log/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search19()` instead.
   *
   * This method doesn't expect any request body.
   */
  search19$Response(params: {
    activityAnalysisId?: number;
    actionTypeId?: number;
    createdBy?: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.Search19Path, 'get');
    if (params) {
      rb.query('activityAnalysisId', params.activityAnalysisId, {});
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLog>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search19(params: {
    activityAnalysisId?: number;
    actionTypeId?: number;
    createdBy?: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityAnalysisWorkLog> {

    return this.search19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLog>) => r.body as RestApiResponsePageBcActivityAnalysisWorkLog)
    );
  }

}
