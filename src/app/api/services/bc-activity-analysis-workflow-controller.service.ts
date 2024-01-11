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

import { RestApiResponseBcActivityAnalysisWorkflow } from '../models/rest-api-response-bc-activity-analysis-workflow';
import { RestApiResponseListBcActivityAnalysisWorkflow } from '../models/rest-api-response-list-bc-activity-analysis-workflow';

@Injectable()
export class BcActivityAnalysisWorkflowControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getOne35
   */
  static readonly GetOne35Path = '/v1/bc/activity-analysis/workflow/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne35()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne35$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkflow>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkflowControllerService.GetOne35Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkflow>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne35$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne35(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityAnalysisWorkflow> {

    return this.getOne35$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisWorkflow>) => r.body as RestApiResponseBcActivityAnalysisWorkflow)
    );
  }

  /**
   * Path part for operation search25
   */
  static readonly Search25Path = '/v1/bc/activity-analysis/workflow/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search25()` instead.
   *
   * This method doesn't expect any request body.
   */
  search25$Response(params: {
    activityAnalysisId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListBcActivityAnalysisWorkflow>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisWorkflowControllerService.Search25Path, 'get');
    if (params) {
      rb.query('activityAnalysisId', params.activityAnalysisId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBcActivityAnalysisWorkflow>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search25(params: {
    activityAnalysisId: number;
  }): Observable<RestApiResponseListBcActivityAnalysisWorkflow> {

    return this.search25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcActivityAnalysisWorkflow>) => r.body as RestApiResponseListBcActivityAnalysisWorkflow)
    );
  }

}
