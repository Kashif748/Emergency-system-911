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
   * Path part for operation deleteById24
   */
  static readonly DeleteById24Path = '/v1/bc/activity-analysis/status/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById24()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById24$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.DeleteById24Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById24$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById24(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById24$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation list8
   */
  static readonly List8Path = '/v1/bc/activity-analysis/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list8()` instead.
   *
   * This method doesn't expect any request body.
   */
  list8$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.List8Path, 'get');
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
   * To access the full response (for headers, for example), `list8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list8(params?: {
  }): Observable<RestApiResponseListBcAnalysisStatus> {

    return this.list8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcAnalysisStatus>) => r.body as RestApiResponseListBcAnalysisStatus)
    );
  }

  /**
   * Path part for operation update104
   */
  static readonly Update104Path = '/v1/bc/activity-analysis/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update104()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update104$Response(params: {
    body: BcAnalysisStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.Update104Path, 'put');
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
   * To access the full response (for headers, for example), `update104$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update104(params: {
    body: BcAnalysisStatus
  }): Observable<RestApiResponseBcAnalysisStatus> {

    return this.update104$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcAnalysisStatus>) => r.body as RestApiResponseBcAnalysisStatus)
    );
  }

  /**
   * Path part for operation insertOne25
   */
  static readonly InsertOne25Path = '/v1/bc/activity-analysis/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne25()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne25$Response(params: {
    body: BcAnalysisStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.InsertOne25Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne25$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne25(params: {
    body: BcAnalysisStatus
  }): Observable<RestApiResponseBcAnalysisStatus> {

    return this.insertOne25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcAnalysisStatus>) => r.body as RestApiResponseBcAnalysisStatus)
    );
  }

  /**
   * Path part for operation getOne27
   */
  static readonly GetOne27Path = '/v1/bc/activity-analysis/status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne27()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne27$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.GetOne27Path, 'get');
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
   * To access the full response (for headers, for example), `getOne27$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne27(params: {
    id: number;
  }): Observable<RestApiResponseBcAnalysisStatus> {

    return this.getOne27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcAnalysisStatus>) => r.body as RestApiResponseBcAnalysisStatus)
    );
  }

}
