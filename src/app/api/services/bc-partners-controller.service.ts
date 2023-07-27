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

@Injectable()
export class BcPartnersControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll13
   */
  static readonly GetAll13Path = '/v1/bc/partners';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll13()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll13$Response(params: {
    isActive?: boolean;
    nameAr?: string;
    nameEn?: string;
    isCritical?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcPartners>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.GetAll13Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('nameAr', params.nameAr, {});
      rb.query('nameEn', params.nameEn, {});
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
   * To access the full response (for headers, for example), `getAll13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll13(params: {
    isActive?: boolean;
    nameAr?: string;
    nameEn?: string;
    isCritical?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcPartners> {

    return this.getAll13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcPartners>) => r.body as RestApiResponsePageBcPartners)
    );
  }

  /**
   * Path part for operation update83
   */
  static readonly Update83Path = '/v1/bc/partners';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update83()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update83$Response(params: {
    body: BcPartners
  }): Observable<StrictHttpResponse<RestApiResponseBcPartners>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.Update83Path, 'put');
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
   * To access the full response (for headers, for example), `update83$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update83(params: {
    body: BcPartners
  }): Observable<RestApiResponseBcPartners> {

    return this.update83$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcPartners>) => r.body as RestApiResponseBcPartners)
    );
  }

  /**
   * Path part for operation insertOne4
   */
  static readonly InsertOne4Path = '/v1/bc/partners';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne4()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne4$Response(params: {
    body: BcPartners
  }): Observable<StrictHttpResponse<RestApiResponseBcPartners>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.InsertOne4Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne4$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne4(params: {
    body: BcPartners
  }): Observable<RestApiResponseBcPartners> {

    return this.insertOne4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcPartners>) => r.body as RestApiResponseBcPartners)
    );
  }

  /**
   * Path part for operation getOne4
   */
  static readonly GetOne4Path = '/v1/bc/partners/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne4()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcPartners>> {

    const rb = new RequestBuilder(this.rootUrl, BcPartnersControllerService.GetOne4Path, 'get');
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
   * To access the full response (for headers, for example), `getOne4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne4(params: {
    id: number;
  }): Observable<RestApiResponseBcPartners> {

    return this.getOne4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcPartners>) => r.body as RestApiResponseBcPartners)
    );
  }

}
