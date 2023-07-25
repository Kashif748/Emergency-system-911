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
   * Path part for operation deleteById22
   */
  static readonly DeleteById22Path = '/v1/bc/activity-analysis/work-log/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById22()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById22$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.DeleteById22Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById22(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById22$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update102
   */
  static readonly Update102Path = '/v1/bc/activity-analysis/work-log';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update102()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update102$Response(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.Update102Path, 'put');
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
   * To access the full response (for headers, for example), `update102$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update102(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<RestApiResponseBcActivityAnalysisWorkLog> {

    return this.update102$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>) => r.body as RestApiResponseBcActivityAnalysisWorkLog)
    );
  }

  /**
   * Path part for operation insertOne23
   */
  static readonly InsertOne23Path = '/v1/bc/activity-analysis/work-log';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne23()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne23$Response(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.InsertOne23Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne23$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne23(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<RestApiResponseBcActivityAnalysisWorkLog> {

    return this.insertOne23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>) => r.body as RestApiResponseBcActivityAnalysisWorkLog)
    );
  }

  /**
   * Path part for operation getOne25
   */
  static readonly GetOne25Path = '/v1/bc/activity-analysis/work-log/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne25()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne25$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.GetOne25Path, 'get');
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
   * To access the full response (for headers, for example), `getOne25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne25(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityAnalysisWorkLog> {

    return this.getOne25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>) => r.body as RestApiResponseBcActivityAnalysisWorkLog)
    );
  }

  /**
   * Path part for operation search17
   */
  static readonly Search17Path = '/v1/bc/activity-analysis/work-log/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search17()` instead.
   *
   * This method doesn't expect any request body.
   */
  search17$Response(params: {
    activityAnalysisId?: number;
    auto?: boolean;
    createdBy?: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.Search17Path, 'get');
    if (params) {
      rb.query('activityAnalysisId', params.activityAnalysisId, {});
      rb.query('auto', params.auto, {});
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
   * To access the full response (for headers, for example), `search17$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search17(params: {
    activityAnalysisId?: number;
    auto?: boolean;
    createdBy?: number;
    isActive?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityAnalysisWorkLog> {

    return this.search17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLog>) => r.body as RestApiResponsePageBcActivityAnalysisWorkLog)
    );
  }

}
