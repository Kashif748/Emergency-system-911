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

import { RestApiResponseListAdcmcDailyReport } from '../models/rest-api-response-list-adcmc-daily-report';

@Injectable()
export class AdcmcReportControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation resendEmailByOrgs
   */
  static readonly ResendEmailByOrgsPath = '/v1/bc/adcmc-report';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `resendEmailByOrgs()` instead.
   *
   * This method doesn't expect any request body.
   */
  resendEmailByOrgs$Response(params?: {
    orgIds?: Array<number>;
  }): Observable<StrictHttpResponse<RestApiResponseListAdcmcDailyReport>> {

    const rb = new RequestBuilder(this.rootUrl, AdcmcReportControllerService.ResendEmailByOrgsPath, 'get');
    if (params) {
      rb.query('orgIds', params.orgIds, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListAdcmcDailyReport>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `resendEmailByOrgs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  resendEmailByOrgs(params?: {
    orgIds?: Array<number>;
  }): Observable<RestApiResponseListAdcmcDailyReport> {

    return this.resendEmailByOrgs$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListAdcmcDailyReport>) => r.body as RestApiResponseListAdcmcDailyReport)
    );
  }

}
