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
import { RestApiResponsePageExternalPhonebookProjection } from '../models/rest-api-response-page-external-phonebook-projection';

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
   * Path part for operation search2
   */
  static readonly Search2Path = '/v1/phonebook';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search2()` instead.
   *
   * This method doesn't expect any request body.
   */
  search2$Response(params: {
    name?: string;
    mobileNumber?: string;
    orgName?: string;
    active?: boolean;
    isInternal?: boolean;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExternalPhonebookProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalPhonebookControllerService.Search2Path, 'get');
    if (params) {
      rb.query('name', params.name, {});
      rb.query('mobileNumber', params.mobileNumber, {});
      rb.query('orgName', params.orgName, {});
      rb.query('active', params.active, {});
      rb.query('isInternal', params.isInternal, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExternalPhonebookProjection>;
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
    name?: string;
    mobileNumber?: string;
    orgName?: string;
    active?: boolean;
    isInternal?: boolean;
    pageable: Pageable;
  }): Observable<RestApiResponsePageExternalPhonebookProjection> {

    return this.search2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExternalPhonebookProjection>) => r.body as RestApiResponsePageExternalPhonebookProjection)
    );
  }

  /**
   * Path part for operation update17
   */
  static readonly Update17Path = '/v1/phonebook';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update17()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update17$Response(params: {
    body: ExternalPhonebook
  }): Observable<StrictHttpResponse<RestApiResponseExternalPhonebook>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalPhonebookControllerService.Update17Path, 'put');
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
   * To access the full response (for headers, for example), `update17$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update17(params: {
    body: ExternalPhonebook
  }): Observable<RestApiResponseExternalPhonebook> {

    return this.update17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExternalPhonebook>) => r.body as RestApiResponseExternalPhonebook)
    );
  }

  /**
   * Path part for operation create17
   */
  static readonly Create17Path = '/v1/phonebook';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create17()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create17$Response(params: {
    body: ExternalPhonebook
  }): Observable<StrictHttpResponse<RestApiResponseExternalPhonebook>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalPhonebookControllerService.Create17Path, 'post');
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
   * To access the full response (for headers, for example), `create17$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create17(params: {
    body: ExternalPhonebook
  }): Observable<RestApiResponseExternalPhonebook> {

    return this.create17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExternalPhonebook>) => r.body as RestApiResponseExternalPhonebook)
    );
  }

  /**
   * Path part for operation getById4
   */
  static readonly GetById4Path = '/v1/phonebook/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById4()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExternalPhonebook>> {

    const rb = new RequestBuilder(this.rootUrl, ExternalPhonebookControllerService.GetById4Path, 'get');
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
   * To access the full response (for headers, for example), `getById4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById4(params: {
    id: number;
  }): Observable<RestApiResponseExternalPhonebook> {

    return this.getById4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExternalPhonebook>) => r.body as RestApiResponseExternalPhonebook)
    );
  }

}
