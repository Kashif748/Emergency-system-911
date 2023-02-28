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
import { RestApiResponsePageUserLogInAttemptsProjection } from '../models/rest-api-response-page-user-log-in-attempts-projection';

@Injectable()
export class UserLogInAttemptsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updatePassword1
   */
  static readonly UpdatePassword1Path = '/v1/user-login-attempts/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePassword1()` instead.
   *
   * This method doesn't expect any request body.
   */
  updatePassword1$Response(params: {
    orgId?: number;
    userName?: string;
    fromDate?: string;
    toDate?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageUserLogInAttemptsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, UserLogInAttemptsControllerService.UpdatePassword1Path, 'get');
    if (params) {
      rb.query('orgId', params.orgId, {});
      rb.query('userName', params.userName, {});
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageUserLogInAttemptsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePassword1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updatePassword1(params: {
    orgId?: number;
    userName?: string;
    fromDate?: string;
    toDate?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageUserLogInAttemptsProjection> {

    return this.updatePassword1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageUserLogInAttemptsProjection>) => r.body as RestApiResponsePageUserLogInAttemptsProjection)
    );
  }

}
