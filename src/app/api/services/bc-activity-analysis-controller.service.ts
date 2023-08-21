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
   * Path part for operation deleteById25
   */
  static readonly DeleteById25Path = '/v1/bc/activity-analysis/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById25()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById25$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.DeleteById25Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById25(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById25$Response(params).pipe(
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
   * Path part for operation update105
   */
  static readonly Update105Path = '/v1/bc/activity-analysis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update105()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update105$Response(params: {
    body: BcActivityAnalysis
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.Update105Path, 'put');
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
   * To access the full response (for headers, for example), `update105$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update105(params: {
    body: BcActivityAnalysis
  }): Observable<RestApiResponseBcActivityAnalysis> {

    return this.update105$Response(params).pipe(
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
   * Path part for operation getOne24
   */
  static readonly GetOne24Path = '/v1/bc/activity-analysis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne24()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne24$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.GetOne24Path, 'get');
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
   * To access the full response (for headers, for example), `getOne24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne24(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityAnalysis> {

    return this.getOne24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysis>) => r.body as RestApiResponseBcActivityAnalysis)
    );
  }

  /**
   * Path part for operation search20
   */
  static readonly Search20Path = '/v1/bc/activity-analysis/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search20()` instead.
   *
   * This method doesn't expect any request body.
   */
  search20$Response(params: {
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

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.Search20Path, 'get');
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
   * To access the full response (for headers, for example), `search20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search20(params: {
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

    return this.search20$Response(params).pipe(
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
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.Export8Path, 'get');
    if (params) {
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('isCritical', params.isCritical, {});
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
  }): Observable<void> {

    return this.export8$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
