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

import { BcPartners } from '../models/bc-partners';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcPartners } from '../models/rest-api-response-bc-partners';
import { RestApiResponsePageBcPartners } from '../models/rest-api-response-page-bc-partners';
import { RestApiResponsePageBcPartnersSummaryResponse } from '../models/rest-api-response-page-bc-partners-summary-response';

@Injectable()
export class BcPartnersControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById15
   */
  static readonly DeleteById15Path = '/v1/bc/partners/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById15()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById15$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.DeleteById15Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById15(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById15$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll12
   */
  static readonly GetAll12Path = '/v1/bc/partners';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll12()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll12$Response(params: {
    isActive?: boolean;
    name?: string;
    isCritical?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcPartners>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.GetAll12Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('name', params.name, {});
      rb.query('isCritical', params.isCritical, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcPartners>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll12(params: {
    isActive?: boolean;
    name?: string;
    isCritical?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcPartners> {

    return this.getAll12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcPartners>) => r.body as RestApiResponsePageBcPartners)
    );
  }

  /**
   * Path part for operation update94
   */
  static readonly Update94Path = '/v1/bc/partners';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update94()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update94$Response(params: {
    body: BcPartners
  }): Observable<StrictHttpResponse<RestApiResponseBcPartners>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.Update94Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcPartners>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update94$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update94(params: {
    body: BcPartners
  }): Observable<RestApiResponseBcPartners> {

    return this.update94$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcPartners>) => r.body as RestApiResponseBcPartners)
    );
  }

  /**
   * Path part for operation insertOne15
   */
  static readonly InsertOne15Path = '/v1/bc/partners';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne15()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne15$Response(params: {
    body: BcPartners
  }): Observable<StrictHttpResponse<RestApiResponseBcPartners>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.InsertOne15Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcPartners>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne15$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne15(params: {
    body: BcPartners
  }): Observable<RestApiResponseBcPartners> {

    return this.insertOne15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcPartners>) => r.body as RestApiResponseBcPartners)
    );
  }

  /**
   * Path part for operation getOne15
   */
  static readonly GetOne15Path = '/v1/bc/partners/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne15()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne15$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcPartners>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.GetOne15Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcPartners>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne15(params: {
    id: number;
  }): Observable<RestApiResponseBcPartners> {

    return this.getOne15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcPartners>) => r.body as RestApiResponseBcPartners)
    );
  }

  /**
   * Path part for operation summary
   */
  static readonly SummaryPath = '/v1/bc/partners/summary';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `summary()` instead.
   *
   * This method doesn't expect any request body.
   */
  summary$Response(params: {
    orgHierarchyId?: number;
    cycleId: number;
    isCritical?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcPartnersSummaryResponse>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.SummaryPath, 'get');
    if (params) {
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('isCritical', params.isCritical, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcPartnersSummaryResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `summary$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  summary(params: {
    orgHierarchyId?: number;
    cycleId: number;
    isCritical?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcPartnersSummaryResponse> {

    return this.summary$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcPartnersSummaryResponse>) => r.body as RestApiResponsePageBcPartnersSummaryResponse)
    );
  }

  /**
   * Path part for operation export7
   */
  static readonly Export7Path = '/v1/bc/partners/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export7()` instead.
   *
   * This method doesn't expect any request body.
   */
  export7$Response(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    orgHierarchyId?: number;
    cycleId: number;
    isCritical?: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.Export7Path, 'get');
    if (params) {
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
      rb.query('orgHierarchyId', params.orgHierarchyId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('isCritical', params.isCritical, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `export7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export7(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    orgHierarchyId?: number;
    cycleId: number;
    isCritical?: string;
  }): Observable<any> {

    return this.export7$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
