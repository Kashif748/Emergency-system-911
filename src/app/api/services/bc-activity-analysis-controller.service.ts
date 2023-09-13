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
import { RestApiResponseBcActivityAnalysisDtoWithStatus } from '../models/rest-api-response-bc-activity-analysis-dto-with-status';
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
   * Path part for operation deleteById35
   */
  static readonly DeleteById35Path = '/v1/bc/activity-analysis/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById35()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById35$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.DeleteById35Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById35$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById35(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById35$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation changeStatus1
   */
  static readonly ChangeStatus1Path = '/v1/bc/activity-analysis/change-status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `changeStatus1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStatus1$Response(params: {
    body: BcActivityAnalysisChangeStatusDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.ChangeStatus1Path, 'put');
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
   * To access the full response (for headers, for example), `changeStatus1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  changeStatus1(params: {
    body: BcActivityAnalysisChangeStatusDto
  }): Observable<void> {

    return this.changeStatus1$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll30
   */
  static readonly GetAll30Path = '/v1/bc/activity-analysis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll30()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll30$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.GetAll30Path, 'get');
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
   * To access the full response (for headers, for example), `getAll30$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll30(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityAnalysis> {

    return this.getAll30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>) => r.body as RestApiResponsePageBcActivityAnalysis)
    );
  }

  /**
   * Path part for operation update115
   */
  static readonly Update115Path = '/v1/bc/activity-analysis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update115()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update115$Response(params: {
    body: BcActivityAnalysis
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.Update115Path, 'put');
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
   * To access the full response (for headers, for example), `update115$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update115(params: {
    body: BcActivityAnalysis
  }): Observable<RestApiResponseBcActivityAnalysis> {

    return this.update115$Response(params).pipe(
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
   * Path part for operation getOne34
   */
  static readonly GetOne34Path = '/v1/bc/activity-analysis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne34()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne34$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.GetOne34Path, 'get');
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
   * To access the full response (for headers, for example), `getOne34$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne34(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityAnalysis> {

    return this.getOne34$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysis>) => r.body as RestApiResponseBcActivityAnalysis)
    );
  }

  /**
   * Path part for operation getOneByIdContainingActions
   */
  static readonly GetOneByIdContainingActionsPath = '/v1/bc/activity-analysis/statusWithAction/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOneByIdContainingActions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOneByIdContainingActions$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysisDtoWithStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.GetOneByIdContainingActionsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityAnalysisDtoWithStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOneByIdContainingActions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOneByIdContainingActions(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityAnalysisDtoWithStatus> {

    return this.getOneByIdContainingActions$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysisDtoWithStatus>) => r.body as RestApiResponseBcActivityAnalysisDtoWithStatus)
    );
  }

  /**
   * Path part for operation search27
   */
  static readonly Search27Path = '/v1/bc/activity-analysis/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search27()` instead.
   *
   * This method doesn't expect any request body.
   */
  search27$Response(params: {
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

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.Search27Path, 'get');
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
   * To access the full response (for headers, for example), `search27$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search27(params: {
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

    return this.search27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>) => r.body as RestApiResponsePageBcActivityAnalysis)
    );
  }

  /**
   * Path part for operation export8
   */
  static readonly Export8Path = '/v1/bc/activity-analysis/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export8()` instead.
   *
   * This method doesn't expect any request body.
   */
  export8$Response(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    orgHierarchyId?: number;
    cycleId?: number;
    isCritical?: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.Export8Path, 'get');
    if (params) {
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('isCritical', params.isCritical, {});
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
   * To access the full response (for headers, for example), `export8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export8(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    orgHierarchyId?: number;
    cycleId?: number;
    isCritical?: string;
  }): Observable<any> {

    return this.export8$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
