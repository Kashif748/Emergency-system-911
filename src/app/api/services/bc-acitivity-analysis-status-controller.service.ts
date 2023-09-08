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
   * Path part for operation deleteById34
   */
  static readonly DeleteById34Path = '/v1/bc/activity-analysis/status/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById34()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById34$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.DeleteById34Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById34$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById34(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById34$Response(params).pipe(
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
   * Path part for operation update114
   */
  static readonly Update114Path = '/v1/bc/activity-analysis/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update114()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update114$Response(params: {
    body: BcAnalysisStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.Update114Path, 'put');
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
   * To access the full response (for headers, for example), `update114$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update114(params: {
    body: BcAnalysisStatus
  }): Observable<RestApiResponseBcAnalysisStatus> {

    return this.update114$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcAnalysisStatus>) => r.body as RestApiResponseBcAnalysisStatus)
    );
  }

  /**
   * Path part for operation insertOne35
   */
  static readonly InsertOne35Path = '/v1/bc/activity-analysis/status';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne35()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne35$Response(params: {
    body: BcAnalysisStatus
  }): Observable<StrictHttpResponse<RestApiResponseBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.InsertOne35Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne35$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne35(params: {
    body: BcAnalysisStatus
  }): Observable<RestApiResponseBcAnalysisStatus> {

    return this.insertOne35$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcAnalysisStatus>) => r.body as RestApiResponseBcAnalysisStatus)
    );
  }

  /**
   * Path part for operation getOne37
   */
  static readonly GetOne37Path = '/v1/bc/activity-analysis/status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne37()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne37$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcAnalysisStatus>> {

    const rb = new RequestBuilder(this.rootUrl, BcAcitivityAnalysisStatusControllerService.GetOne37Path, 'get');
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
   * To access the full response (for headers, for example), `getOne37$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne37(params: {
    id: number;
  }): Observable<RestApiResponseBcAnalysisStatus> {

    return this.getOne37$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcAnalysisStatus>) => r.body as RestApiResponseBcAnalysisStatus)
    );
  }

}
