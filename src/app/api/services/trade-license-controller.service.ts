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

import { RestApiResponseContents } from '../models/rest-api-response-contents';

@Injectable()
export class TradeLicenseControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCompanyDetails
   */
  static readonly GetCompanyDetailsPath = '/v1/company/{cn}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCompanyDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCompanyDetails$Response(params: {
    cn: number;
  }): Observable<StrictHttpResponse<RestApiResponseContents>> {

    const rb = new RequestBuilder(this.rootUrl, TradeLicenseControllerService.GetCompanyDetailsPath, 'get');
    if (params) {
      rb.path('cn', params.cn, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseContents>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCompanyDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCompanyDetails(params: {
    cn: number;
  }): Observable<RestApiResponseContents> {

    return this.getCompanyDetails$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseContents>) => r.body as RestApiResponseContents)
    );
  }

}
