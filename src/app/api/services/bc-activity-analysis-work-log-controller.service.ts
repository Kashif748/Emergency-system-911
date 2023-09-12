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
   * Path part for operation deleteById33
   */
  static readonly DeleteById33Path = '/v1/bc/activity-analysis/work-log/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById33()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById33$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.DeleteById33Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById33$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById33(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById33$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation update113
   */
  static readonly Update113Path = '/v1/bc/activity-analysis/work-log';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update113()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update113$Response(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.Update113Path, 'put');
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
   * To access the full response (for headers, for example), `update113$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update113(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<RestApiResponseBcActivityAnalysisWorkLog> {

    return this.update113$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>) => r.body as RestApiResponseBcActivityAnalysisWorkLog)
    );
  }

  /**
   * Path part for operation insertOne34
   */
  static readonly InsertOne34Path = '/v1/bc/activity-analysis/work-log';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne34()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne34$Response(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.InsertOne34Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne34$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne34(params: {
    body: BcActivityAnalysisWorkLog
  }): Observable<RestApiResponseBcActivityAnalysisWorkLog> {

    return this.insertOne34$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>) => r.body as RestApiResponseBcActivityAnalysisWorkLog)
    );
  }

  /**
   * Path part for operation getOne36
   */
  static readonly GetOne36Path = '/v1/bc/activity-analysis/work-log/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne36()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne36$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkLogControllerService.GetOne36Path, 'get');
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
   * To access the full response (for headers, for example), `getOne36$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne36(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityAnalysisWorkLog> {

    return this.getOne36$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkLog>) => r.body as RestApiResponseBcActivityAnalysisWorkLog)
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
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLog>> {

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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLog>;
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
  }): Observable<RestApiResponsePageBcActivityAnalysisWorkLog> {

    return this.search26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityAnalysisWorkLog>) => r.body as RestApiResponsePageBcActivityAnalysisWorkLog)
    );
  }

}
