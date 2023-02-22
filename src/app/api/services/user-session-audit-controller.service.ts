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
import { RestApiResponsePageUserSessionAuditProjection } from '../models/rest-api-response-page-user-session-audit-projection';
import { RestApiResponsePageUserSessionShiftProjection } from '../models/rest-api-response-page-user-session-shift-projection';
import { UserSessionAuditCriteria } from '../models/user-session-audit-criteria';

@Injectable()
export class UserSessionAuditControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation shifts
   */
  static readonly ShiftsPath = '/v1/user/audit/shifts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `shifts()` instead.
   *
   * This method doesn't expect any request body.
   */
  shifts$Response(params: {
    name: string;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageUserSessionShiftProjection>> {

    const rb = new RequestBuilder(this.rootUrl, UserSessionAuditControllerService.ShiftsPath, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageUserSessionShiftProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `shifts$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  shifts(params: {
    name: string;
    page: Pageable;
  }): Observable<RestApiResponsePageUserSessionShiftProjection> {

    return this.shifts$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageUserSessionShiftProjection>) => r.body as RestApiResponsePageUserSessionShiftProjection)
    );
  }

  /**
   * Path part for operation history
   */
  static readonly HistoryPath = '/v1/user/audit';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `history()` instead.
   *
   * This method doesn't expect any request body.
   */
  history$Response(params: {
    filter: UserSessionAuditCriteria;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageUserSessionAuditProjection>> {

    const rb = new RequestBuilder(this.rootUrl, UserSessionAuditControllerService.HistoryPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageUserSessionAuditProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `history$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  history(params: {
    filter: UserSessionAuditCriteria;
    page: Pageable;
  }): Observable<RestApiResponsePageUserSessionAuditProjection> {

    return this.history$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageUserSessionAuditProjection>) => r.body as RestApiResponsePageUserSessionAuditProjection)
    );
  }

}
