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
   * Path part for operation deleteById20
   */
  static readonly DeleteById20Path = '/v1/bc/activity-analysis/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById20()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById20$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.DeleteById20Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById20(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById20$Response(params).pipe(
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
   * Path part for operation update100
   */
  static readonly Update100Path = '/v1/bc/activity-analysis';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update100()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update100$Response(params: {
    body: BcActivityAnalysis
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.Update100Path, 'put');
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
   * To access the full response (for headers, for example), `update100$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update100(params: {
    body: BcActivityAnalysis
  }): Observable<RestApiResponseBcActivityAnalysis> {

    return this.update100$Response(params).pipe(
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
   * Path part for operation getOne21
   */
  static readonly GetOne21Path = '/v1/bc/activity-analysis/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne21()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne21$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.GetOne21Path, 'get');
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
   * To access the full response (for headers, for example), `getOne21$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne21(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityAnalysis> {

    return this.getOne21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityAnalysis>) => r.body as RestApiResponseBcActivityAnalysis)
    );
  }

  /**
   * Path part for operation search13
   */
  static readonly Search13Path = '/v1/bc/activity-analysis/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search13()` instead.
   *
   * This method doesn't expect any request body.
   */
  search13$Response(params: {
    orgHierarchyId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityAnalysisControllerService.Search13Path, 'get');
    if (params) {
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
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
   * To access the full response (for headers, for example), `search13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search13(params: {
    orgHierarchyId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityAnalysis> {

    return this.search13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityAnalysis>) => r.body as RestApiResponsePageBcActivityAnalysis)
    );
  }

}
