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

import { Hospital } from '../models/hospital';
import { Pageable } from '../models/pageable';
import { RestApiResponseHospital } from '../models/rest-api-response-hospital';
import { RestApiResponsePageHospital } from '../models/rest-api-response-page-hospital';

@Injectable()
export class HospitalControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete17
   */
  static readonly Delete17Path = '/v1/hospitals/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete17()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete17$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseHospital>> {

    const rb = new RequestBuilder(this.rootUrl, HospitalControllerService.Delete17Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseHospital>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete17$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete17(params: {
    id: number;
  }): Observable<RestApiResponseHospital> {

    return this.delete17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseHospital>) => r.body as RestApiResponseHospital)
    );
  }

  /**
   * Path part for operation findActivePage13
   */
  static readonly FindActivePage13Path = '/v1/hospitals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage13()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage13$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageHospital>> {

    const rb = new RequestBuilder(this.rootUrl, HospitalControllerService.FindActivePage13Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageHospital>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage13$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage13(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageHospital> {

    return this.findActivePage13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageHospital>) => r.body as RestApiResponsePageHospital)
    );
  }

  /**
   * Path part for operation updateHospitals1
   */
  static readonly UpdateHospitals1Path = '/v1/hospitals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateHospitals1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHospitals1$Response(params: {
    body: Hospital
  }): Observable<StrictHttpResponse<RestApiResponseHospital>> {

    const rb = new RequestBuilder(this.rootUrl, HospitalControllerService.UpdateHospitals1Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseHospital>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateHospitals1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHospitals1(params: {
    body: Hospital
  }): Observable<RestApiResponseHospital> {

    return this.updateHospitals1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseHospital>) => r.body as RestApiResponseHospital)
    );
  }

  /**
   * Path part for operation createHospitals
   */
  static readonly CreateHospitalsPath = '/v1/hospitals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createHospitals()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createHospitals$Response(params: {
    body: Hospital
  }): Observable<StrictHttpResponse<RestApiResponseHospital>> {

    const rb = new RequestBuilder(this.rootUrl, HospitalControllerService.CreateHospitalsPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseHospital>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createHospitals$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createHospitals(params: {
    body: Hospital
  }): Observable<RestApiResponseHospital> {

    return this.createHospitals$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseHospital>) => r.body as RestApiResponseHospital)
    );
  }

  /**
   * Path part for operation getActiveHospital
   */
  static readonly GetActiveHospitalPath = '/v1/hospitals/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveHospital()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveHospital$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseHospital>> {

    const rb = new RequestBuilder(this.rootUrl, HospitalControllerService.GetActiveHospitalPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseHospital>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveHospital$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveHospital(params: {
    id: number;
  }): Observable<RestApiResponseHospital> {

    return this.getActiveHospital$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseHospital>) => r.body as RestApiResponseHospital)
    );
  }

}
