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

import { RestApiResponseBcSectionDetailsResponse } from '../models/rest-api-response-bc-section-details-response';
import { RestApiResponseMapStringObject } from '../models/rest-api-response-map-string-object';

@Injectable()
export class BcDashboardControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation statistics4
   */
  static readonly Statistics4Path = '/v1/bc/dashboard/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `statistics4()` instead.
   *
   * This method doesn't expect any request body.
   */
  statistics4$Response(params: {
    cycleId: number;
    orgHierarchyId?: number;
  }): Observable<StrictHttpResponse<RestApiResponseMapStringObject>> {

    const rb = new RequestBuilder(this.rootUrl, BcDashboardControllerService.Statistics4Path, 'get');
    if (params) {
      rb.query('cycleId', params.cycleId, {});
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseMapStringObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `statistics4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  statistics4(params: {
    cycleId: number;
    orgHierarchyId?: number;
  }): Observable<RestApiResponseMapStringObject> {

    return this.statistics4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseMapStringObject>) => r.body as RestApiResponseMapStringObject)
    );
  }

  /**
   * Path part for operation sectionDetails
   */
  static readonly SectionDetailsPath = '/v1/bc/dashboard/section-details';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sectionDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  sectionDetails$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseBcSectionDetailsResponse>> {

    const rb = new RequestBuilder(this.rootUrl, BcDashboardControllerService.SectionDetailsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcSectionDetailsResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sectionDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sectionDetails(params?: {
  }): Observable<RestApiResponseBcSectionDetailsResponse> {

    return this.sectionDetails$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcSectionDetailsResponse>) => r.body as RestApiResponseBcSectionDetailsResponse)
    );
  }

}
