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

import { ExternalPhonebook } from '../models/external-phonebook';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseExternalPhonebook } from '../models/rest-api-response-external-phonebook';
import { RestApiResponsePageExternalPhonebook } from '../models/rest-api-response-page-external-phonebook';

@Injectable()
export class ExternalPhonebookControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation softDelete
   */
  static readonly SoftDeletePath = '/v1/phonebook/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `softDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  softDelete$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalPhonebookControllerService.SoftDeletePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `softDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  softDelete(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.softDelete$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation search1
   */
  static readonly Search1Path = '/v1/phonebook';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search1()` instead.
   *
   * This method doesn't expect any request body.
   */
  search1$Response(params: {
    name?: string;
    mobileNumber?: string;
    orgName?: string;
    active?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExternalPhonebook>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalPhonebookControllerService.Search1Path, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('mobileNumber', params.mobileNumber, {});
      rb.query('orgName', params.orgName, {});
      rb.query('active', params.active, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExternalPhonebook>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search1(params: {
    name?: string;
    mobileNumber?: string;
    orgName?: string;
    active?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageExternalPhonebook> {

    return this.search1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExternalPhonebook>) => r.body as RestApiResponsePageExternalPhonebook)
    );
  }

  /**
   * Path part for operation update16
   */
  static readonly Update16Path = '/v1/phonebook';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update16()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update16$Response(params: {
    body: ExternalPhonebook
  }): Observable<StrictHttpResponse<RestApiResponseExternalPhonebook>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalPhonebookControllerService.Update16Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExternalPhonebook>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update16$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update16(params: {
    body: ExternalPhonebook
  }): Observable<RestApiResponseExternalPhonebook> {

    return this.update16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExternalPhonebook>) => r.body as RestApiResponseExternalPhonebook)
    );
  }

  /**
   * Path part for operation create16
   */
  static readonly Create16Path = '/v1/phonebook';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create16()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create16$Response(params: {
    body: ExternalPhonebook
  }): Observable<StrictHttpResponse<RestApiResponseExternalPhonebook>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalPhonebookControllerService.Create16Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExternalPhonebook>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create16$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create16(params: {
    body: ExternalPhonebook
  }): Observable<RestApiResponseExternalPhonebook> {

    return this.create16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExternalPhonebook>) => r.body as RestApiResponseExternalPhonebook)
    );
  }

  /**
   * Path part for operation getById3
   */
  static readonly GetById3Path = '/v1/phonebook/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById3()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExternalPhonebook>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalPhonebookControllerService.GetById3Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExternalPhonebook>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById3(params: {
    id: number;
  }): Observable<RestApiResponseExternalPhonebook> {

    return this.getById3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExternalPhonebook>) => r.body as RestApiResponseExternalPhonebook)
    );
  }

}
