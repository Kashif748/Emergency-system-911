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

import { BcAnalysisBulkTransactionDto } from '../models/bc-analysis-bulk-transaction-dto';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcAnalysisStatusDetails } from '../models/rest-api-response-bc-analysis-status-details';
import { RestApiResponsePageBcAnalysisByOrgHierarchyResponse } from '../models/rest-api-response-page-bc-analysis-by-org-hierarchy-response';
import { RestApiResponseString } from '../models/rest-api-response-string';

@Injectable()
export class BcAnalysisControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation bulkTransaction
   */
  static readonly BulkTransactionPath = '/v1/bc/analysis/bulk-transaction';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `bulkTransaction()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  bulkTransaction$Response(params: {
    body: BcAnalysisBulkTransactionDto
  }): Observable<StrictHttpResponse<RestApiResponseString>> {

    const rb = new RequestBuilder(this.rootUrl, BcAnalysisControllerService.BulkTransactionPath, 'put');
    if (params) {
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
   * To access the full response (for headers, for example), `bulkTransaction$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  bulkTransaction(params: {
    body: BcAnalysisBulkTransactionDto
  }): Observable<RestApiResponseString> {

    return this.bulkTransaction$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseString>) => r.body as RestApiResponseString)
    );
  }

  /**
   * Path part for operation analysisStatusInfo
   */
  static readonly AnalysisStatusInfoPath = '/v1/bc/analysis/status-information';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analysisStatusInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  analysisStatusInfo$Response(params: {
    orgHierarchyId: number;
    cycleId: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcAnalysisStatusDetails>> {

    const rb = new RequestBuilder(this.rootUrl, BcAnalysisControllerService.AnalysisStatusInfoPath, 'get');
    if (params) {
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('cycleId', params.cycleId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcAnalysisStatusDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `analysisStatusInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analysisStatusInfo(params: {
    orgHierarchyId: number;
    cycleId: number;
  }): Observable<RestApiResponseBcAnalysisStatusDetails> {

    return this.analysisStatusInfo$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcAnalysisStatusDetails>) => r.body as RestApiResponseBcAnalysisStatusDetails)
    );
  }

  /**
   * Path part for operation analysis
   */
  static readonly AnalysisPath = '/v1/bc/analysis/by-org-hierarchy';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `analysis()` instead.
   *
   * This method doesn't expect any request body.
   */
  analysis$Response(params: {
    orgHierarchyId?: number;
    cycleId: number;
    status?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcAnalysisByOrgHierarchyResponse>> {

    const rb = new RequestBuilder(this.rootUrl, BcAnalysisControllerService.AnalysisPath, 'get');
    if (params) {
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('status', params.status, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcAnalysisByOrgHierarchyResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `analysis$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  analysis(params: {
    orgHierarchyId?: number;
    cycleId: number;
    status?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcAnalysisByOrgHierarchyResponse> {

    return this.analysis$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcAnalysisByOrgHierarchyResponse>) => r.body as RestApiResponsePageBcAnalysisByOrgHierarchyResponse)
    );
  }

}
