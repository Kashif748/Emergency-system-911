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

import { Pageable } from '../models/pageable';
import { RestApiResponsePageBcAnalysisByOrgHierarchyResponse } from '../models/rest-api-response-page-bc-analysis-by-org-hierarchy-response';

@Injectable()
export class BcAnalysisControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
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
