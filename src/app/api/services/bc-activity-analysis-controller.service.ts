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

import { BcActivityAnalysis } from '../models/bc-activity-analysis';
import { BcActivityAnalysisChangeStatusDto } from '../models/bc-activity-analysis-change-status-dto';
import { BcActivityAnalysisDto } from '../models/bc-activity-analysis-dto';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivityAnalysis } from '../models/rest-api-response-bc-activity-analysis';
import { RestApiResponseListBcActivityAnalysis } from '../models/rest-api-response-list-bc-activity-analysis';
import { RestApiResponsePageBcActivityAnalysis } from '../models/rest-api-response-page-bc-activity-analysis';

@Injectable()
export class BcActivityAnalysisControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById24
   */
  static readonly DeleteById24Path = '/v1/bc/activity-analysis/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById24()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById24$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.DeleteById24Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById24(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById24$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation changeStatus
   */
  static readonly ChangeStatusPath = '/v1/bc/activity-analysis/change-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStatus()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStatus$Response(params: {
    body: BcActivityAnalysisChangeStatusDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.ChangeStatusPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
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
   * To access the full response (for headers, for example), `changeStatus$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStatus(params: {
    body: BcActivityAnalysisChangeStatusDto
  }): Observable<void> {

    return this.changeStatus$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll32
   */
  static readonly GetAll32Path = '/v1/bc/activity-analysis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll32()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll32$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.GetAll32Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('versionId', params.versionId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll32$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll32(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityAnalysis> {

    return this.getAll32$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>) => r.body as RestApiResponsePageBcActivityAnalysis)
    );
  }

  /**
   * Path part for operation update104
   */
  static readonly Update104Path = '/v1/bc/activity-analysis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update104()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update104$Response(params: {
    body: BcActivityAnalysis
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.Update104Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityAnalysis>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update104$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update104(params: {
    body: BcActivityAnalysis
  }): Observable<RestApiResponseBcActivityAnalysis> {

    return this.update104$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysis>) => r.body as RestApiResponseBcActivityAnalysis)
    );
  }

  /**
   * Path part for operation saveAll
   */
  static readonly SaveAllPath = '/v1/bc/activity-analysis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveAll()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAll$Response(params: {
    body: Array<BcActivityAnalysisDto>
  }): Observable<StrictHttpResponse<RestApiResponseListBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.SaveAllPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBcActivityAnalysis>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveAll$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveAll(params: {
    body: Array<BcActivityAnalysisDto>
  }): Observable<RestApiResponseListBcActivityAnalysis> {

    return this.saveAll$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcActivityAnalysis>) => r.body as RestApiResponseListBcActivityAnalysis)
    );
  }

  /**
   * Path part for operation getOne23
   */
  static readonly GetOne23Path = '/v1/bc/activity-analysis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne23()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne23$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.GetOne23Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityAnalysis>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne23(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityAnalysis> {

    return this.getOne23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysis>) => r.body as RestApiResponseBcActivityAnalysis)
    );
  }

  /**
   * Path part for operation search18
   */
  static readonly Search18Path = '/v1/bc/activity-analysis/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search18()` instead.
   *
   * This method doesn't expect any request body.
   */
  search18$Response(params: {
    orgHierarchyId?: number;
    activityId?: number;
    cycleId?: number;
    activityName?: string;
    activityFrequenceId?: number;
    recoveryPriorityId?: number;
    rtoId?: number;
    activityAnalysisStatusId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.Search18Path, 'get');
    if (params) {
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('activityId', params.activityId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('activityName', params.activityName, {});
      rb.query('activityFrequenceId', params.activityFrequenceId, {});
      rb.query('recoveryPriorityId', params.recoveryPriorityId, {});
      rb.query('rtoId', params.rtoId, {});
      rb.query('activityAnalysisStatusId', params.activityAnalysisStatusId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search18(params: {
    orgHierarchyId?: number;
    activityId?: number;
    cycleId?: number;
    activityName?: string;
    activityFrequenceId?: number;
    recoveryPriorityId?: number;
    rtoId?: number;
    activityAnalysisStatusId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityAnalysis> {

    return this.search18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>) => r.body as RestApiResponsePageBcActivityAnalysis)
    );
  }

}
