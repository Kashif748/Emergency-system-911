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

import { InterimIncidentCriteria } from '../models/interim-incident-criteria';
import { InterimIncidentDetails } from '../models/interim-incident-details';
import { Pageable } from '../models/pageable';
import { RestApiResponseGetInterimIncidentProjection } from '../models/rest-api-response-get-interim-incident-projection';
import { RestApiResponseInterimIncident } from '../models/rest-api-response-interim-incident';
import { RestApiResponsePageGetInterimIncidentProjection } from '../models/rest-api-response-page-get-interim-incident-projection';

@Injectable()
export class InterimIncidentControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation decline
   */
  static readonly DeclinePath = '/v1/interim-incidents/decline/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `decline()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  decline$Response(params: {
    id: number;
    body?: string
  }): Observable<StrictHttpResponse<RestApiResponseInterimIncident>> {

    const rb = new RequestBuilder(this.rootUrl, InterimIncidentControllerService.DeclinePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseInterimIncident>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `decline$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  decline(params: {
    id: number;
    body?: string
  }): Observable<RestApiResponseInterimIncident> {

    return this.decline$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseInterimIncident>) => r.body as RestApiResponseInterimIncident)
    );
  }

  /**
   * Path part for operation getAll8
   */
  static readonly GetAll8Path = '/v1/interim-incidents';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll8()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll8$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageGetInterimIncidentProjection>> {

    const rb = new RequestBuilder(this.rootUrl, InterimIncidentControllerService.GetAll8Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageGetInterimIncidentProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll8(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageGetInterimIncidentProjection> {

    return this.getAll8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageGetInterimIncidentProjection>) => r.body as RestApiResponsePageGetInterimIncidentProjection)
    );
  }

  /**
   * Path part for operation create26
   */
  static readonly Create26Path = '/v1/interim-incidents';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create26()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  create26$Response(params?: {
    body?: { 'details': InterimIncidentDetails, 'doc'?: Blob }
  }): Observable<StrictHttpResponse<RestApiResponseInterimIncident>> {

    const rb = new RequestBuilder(this.rootUrl, InterimIncidentControllerService.Create26Path, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseInterimIncident>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create26$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  create26(params?: {
    body?: { 'details': InterimIncidentDetails, 'doc'?: Blob }
  }): Observable<RestApiResponseInterimIncident> {

    return this.create26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseInterimIncident>) => r.body as RestApiResponseInterimIncident)
    );
  }

  /**
   * Path part for operation getById6
   */
  static readonly GetById6Path = '/v1/interim-incidents/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseGetInterimIncidentProjection>> {

    const rb = new RequestBuilder(this.rootUrl, InterimIncidentControllerService.GetById6Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseGetInterimIncidentProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById6(params: {
    id: number;
  }): Observable<RestApiResponseGetInterimIncidentProjection> {

    return this.getById6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseGetInterimIncidentProjection>) => r.body as RestApiResponseGetInterimIncidentProjection)
    );
  }

  /**
   * Path part for operation search2
   */
  static readonly Search2Path = '/v1/interim-incidents/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search2()` instead.
   *
   * This method doesn't expect any request body.
   */
  search2$Response(params: {
    filter: InterimIncidentCriteria;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageGetInterimIncidentProjection>> {

    const rb = new RequestBuilder(this.rootUrl, InterimIncidentControllerService.Search2Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageGetInterimIncidentProjection>;
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
    filter: InterimIncidentCriteria;
    pageable: Pageable;
  }): Observable<RestApiResponsePageGetInterimIncidentProjection> {

    return this.search2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageGetInterimIncidentProjection>) => r.body as RestApiResponsePageGetInterimIncidentProjection)
    );
  }

}
