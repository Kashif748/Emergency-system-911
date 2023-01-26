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

import { Inquiry } from '../models/inquiry';
import { InquirySearchCriteria } from '../models/inquiry-search-criteria';
import { Pageable } from '../models/pageable';
import { RestApiResponseInquiry } from '../models/rest-api-response-inquiry';
import { RestApiResponseInquiryProjection } from '../models/rest-api-response-inquiry-projection';
import { RestApiResponseListInquiry } from '../models/rest-api-response-list-inquiry';
import { RestApiResponseListInquiryDateStatistics } from '../models/rest-api-response-list-inquiry-date-statistics';
import { RestApiResponsePageInquiryProjection } from '../models/rest-api-response-page-inquiry-projection';

@Injectable()
export class InquiryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActiveInquiries
   */
  static readonly FindActiveInquiriesPath = '/v1/inquiry';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActiveInquiries()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveInquiries$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListInquiry>> {

    const rb = new RequestBuilder(this.rootUrl, InquiryControllerService.FindActiveInquiriesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListInquiry>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActiveInquiries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveInquiries(params?: {
  }): Observable<RestApiResponseListInquiry> {

    return this.findActiveInquiries$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListInquiry>) => r.body as RestApiResponseListInquiry)
    );
  }

  /**
   * Path part for operation update30
   */
  static readonly Update30Path = '/v1/inquiry';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update30()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update30$Response(params: {
    body: Inquiry
  }): Observable<StrictHttpResponse<RestApiResponseInquiry>> {

    const rb = new RequestBuilder(this.rootUrl, InquiryControllerService.Update30Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseInquiry>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update30$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update30(params: {
    body: Inquiry
  }): Observable<RestApiResponseInquiry> {

    return this.update30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseInquiry>) => r.body as RestApiResponseInquiry)
    );
  }

  /**
   * Path part for operation create26
   */
  static readonly Create26Path = '/v1/inquiry';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create26()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create26$Response(params: {
    body: Inquiry
  }): Observable<StrictHttpResponse<RestApiResponseInquiryProjection>> {

    const rb = new RequestBuilder(this.rootUrl, InquiryControllerService.Create26Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseInquiryProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create26$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create26(params: {
    body: Inquiry
  }): Observable<RestApiResponseInquiryProjection> {

    return this.create26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseInquiryProjection>) => r.body as RestApiResponseInquiryProjection)
    );
  }

  /**
   * Path part for operation getActiveInquiry
   */
  static readonly GetActiveInquiryPath = '/v1/inquiry/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveInquiry()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveInquiry$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseInquiry>> {

    const rb = new RequestBuilder(this.rootUrl, InquiryControllerService.GetActiveInquiryPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseInquiry>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveInquiry$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveInquiry(params: {
    id: number;
  }): Observable<RestApiResponseInquiry> {

    return this.getActiveInquiry$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseInquiry>) => r.body as RestApiResponseInquiry)
    );
  }

  /**
   * Path part for operation inquiryStatistics
   */
  static readonly InquiryStatisticsPath = '/v1/inquiry/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `inquiryStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  inquiryStatistics$Response(params: {
    filter: InquirySearchCriteria;
  }): Observable<StrictHttpResponse<RestApiResponseListInquiryDateStatistics>> {

    const rb = new RequestBuilder(this.rootUrl, InquiryControllerService.InquiryStatisticsPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListInquiryDateStatistics>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `inquiryStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  inquiryStatistics(params: {
    filter: InquirySearchCriteria;
  }): Observable<RestApiResponseListInquiryDateStatistics> {

    return this.inquiryStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListInquiryDateStatistics>) => r.body as RestApiResponseListInquiryDateStatistics)
    );
  }

  /**
   * Path part for operation search2
   */
  static readonly Search2Path = '/v1/inquiry/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search2()` instead.
   *
   * This method doesn't expect any request body.
   */
  search2$Response(params: {
    filter: InquirySearchCriteria;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageInquiryProjection>> {

    const rb = new RequestBuilder(this.rootUrl, InquiryControllerService.Search2Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageInquiryProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search2(params: {
    filter: InquirySearchCriteria;
    pageable: Pageable;
  }): Observable<RestApiResponsePageInquiryProjection> {

    return this.search2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageInquiryProjection>) => r.body as RestApiResponsePageInquiryProjection)
    );
  }

  /**
   * Path part for operation export3
   */
  static readonly Export3Path = '/v1/inquiry/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export3()` instead.
   *
   * This method doesn't expect any request body.
   */
  export3$Response(params: {
    filter: InquirySearchCriteria;
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, InquiryControllerService.Export3Path, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
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
   * To access the full response (for headers, for example), `export3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export3(params: {
    filter: InquirySearchCriteria;
    as: 'PDF' | 'EXCEL';
    lang: boolean;
  }): Observable<void> {

    return this.export3$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
