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

import { BcAnalysisStatus } from '../models/bc-analysis-status';
import { RestApiResponseBcAnalysisStatus } from '../models/rest-api-response-bc-analysis-status';
import { RestApiResponseListBcAnalysisStatus } from '../models/rest-api-response-list-bc-analysis-status';

@Injectable()
export class BcAcitivityAnalysisStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById23
   */
  static readonly DeleteById23Path = '/v1/bc/activity-analysis/status/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById23()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById23$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.DeleteById23Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById23$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById23(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById23$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation list7
   */
  static readonly List7Path = '/v1/bc/activity-analysis/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list7()` instead.
   *
   * This method doesn't expect any request body.
   */
  list7$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.List7Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBcAnalysisStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list7(params?: {
  }): Observable<RestApiResponseListBcAnalysisStatus> {

    return this.list7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcAnalysisStatus>) => r.body as RestApiResponseListBcAnalysisStatus)
    );
  }

  /**
   * Path part for operation update103
   */
  static readonly Update103Path = '/v1/bc/activity-analysis/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update103()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update103$Response(params: {
    body: BcAnalysisStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.Update103Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcAnalysisStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update103$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update103(params: {
    body: BcAnalysisStatus
  }): Observable<RestApiResponseBcAnalysisStatus> {

    return this.update103$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcAnalysisStatus>) => r.body as RestApiResponseBcAnalysisStatus)
    );
  }

  /**
   * Path part for operation insertOne24
   */
  static readonly InsertOne24Path = '/v1/bc/activity-analysis/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne24()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne24$Response(params: {
    body: BcAnalysisStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.InsertOne24Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcAnalysisStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne24$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne24(params: {
    body: BcAnalysisStatus
  }): Observable<RestApiResponseBcAnalysisStatus> {

    return this.insertOne24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcAnalysisStatus>) => r.body as RestApiResponseBcAnalysisStatus)
    );
  }

  /**
   * Path part for operation getOne26
   */
  static readonly GetOne26Path = '/v1/bc/activity-analysis/status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne26()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne26$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.GetOne26Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcAnalysisStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne26$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne26(params: {
    id: number;
  }): Observable<RestApiResponseBcAnalysisStatus> {

    return this.getOne26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcAnalysisStatus>) => r.body as RestApiResponseBcAnalysisStatus)
    );
  }

}
