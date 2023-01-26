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
import { RestApiResponseListScadKoiData } from '../models/rest-api-response-list-scad-koi-data';
import { RestApiResponseListString } from '../models/rest-api-response-list-string';
import { RestApiResponsePageScadKoiDetail } from '../models/rest-api-response-page-scad-koi-detail';
import { RestApiResponseScadKoiResponse } from '../models/rest-api-response-scad-koi-response';
import { ScadKoiDetail } from '../models/scad-koi-detail';

@Injectable()
export class ScadKoiControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation get5
   */
  static readonly Get5Path = '/v1/scad-koi/{code}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get5()` instead.
   *
   * This method doesn't expect any request body.
   */
  get5$Response(params: {
    code: number;
    filter: ScadKoiDetail;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageScadKoiDetail>> {

    const rb = new RequestBuilder(this.rootUrl, ScadKoiControllerService.Get5Path, 'get');
    if (params) {
      rb.path('code', params.code, {});
      rb.query('filter', params.filter, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageScadKoiDetail>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get5(params: {
    code: number;
    filter: ScadKoiDetail;
    pageable: Pageable;
  }): Observable<RestApiResponsePageScadKoiDetail> {

    return this.get5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageScadKoiDetail>) => r.body as RestApiResponsePageScadKoiDetail)
    );
  }

  /**
   * Path part for operation getScadKoiDetails
   */
  static readonly GetScadKoiDetailsPath = '/v1/scad-koi/filters';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getScadKoiDetails()` instead.
   *
   * This method doesn't expect any request body.
   */
  getScadKoiDetails$Response(params: {
    code?: number;
    filter: string;
  }): Observable<StrictHttpResponse<RestApiResponseListString>> {

    const rb = new RequestBuilder(this.rootUrl, ScadKoiControllerService.GetScadKoiDetailsPath, 'get');
    if (params) {
      rb.query('code', params.code, {});
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListString>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getScadKoiDetails$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getScadKoiDetails(params: {
    code?: number;
    filter: string;
  }): Observable<RestApiResponseListString> {

    return this.getScadKoiDetails$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListString>) => r.body as RestApiResponseListString)
    );
  }

  /**
   * Path part for operation processWebService
   */
  static readonly ProcessWebServicePath = '/v1/scad-koi/callws';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `processWebService()` instead.
   *
   * This method doesn't expect any request body.
   */
  processWebService$Response(params: {
    pageNo: number;
  }): Observable<StrictHttpResponse<RestApiResponseScadKoiResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ScadKoiControllerService.ProcessWebServicePath, 'get');
    if (params) {
      rb.query('pageNo', params.pageNo, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseScadKoiResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `processWebService$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  processWebService(params: {
    pageNo: number;
  }): Observable<RestApiResponseScadKoiResponse> {

    return this.processWebService$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseScadKoiResponse>) => r.body as RestApiResponseScadKoiResponse)
    );
  }

  /**
   * Path part for operation list
   */
  static readonly ListPath = '/v1/scad-koi';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list()` instead.
   *
   * This method doesn't expect any request body.
   */
  list$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListScadKoiData>> {

    const rb = new RequestBuilder(this.rootUrl, ScadKoiControllerService.ListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListScadKoiData>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list(params?: {
  }): Observable<RestApiResponseListScadKoiData> {

    return this.list$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListScadKoiData>) => r.body as RestApiResponseListScadKoiData)
    );
  }

}
