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

import { LocalRisk } from '../models/local-risk';
import { RestApiResponseListLocalRisk } from '../models/rest-api-response-list-local-risk';
import { RestApiResponseLocalRisk } from '../models/rest-api-response-local-risk';

@Injectable()
export class LocalRiskControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll5
   */
  static readonly GetAll5Path = '/v1/local-risk';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll5()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll5$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListLocalRisk>> {

    const rb = new RequestBuilder(this.rootUrl, LocalRiskControllerService.GetAll5Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListLocalRisk>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll5(params?: {
  }): Observable<RestApiResponseListLocalRisk> {

    return this.getAll5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListLocalRisk>) => r.body as RestApiResponseListLocalRisk)
    );
  }

  /**
   * Path part for operation putLocalRisk
   */
  static readonly PutLocalRiskPath = '/v1/local-risk';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `putLocalRisk()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putLocalRisk$Response(params: {
    body: LocalRisk
  }): Observable<StrictHttpResponse<RestApiResponseLocalRisk>> {

    const rb = new RequestBuilder(this.rootUrl, LocalRiskControllerService.PutLocalRiskPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLocalRisk>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `putLocalRisk$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  putLocalRisk(params: {
    body: LocalRisk
  }): Observable<RestApiResponseLocalRisk> {

    return this.putLocalRisk$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLocalRisk>) => r.body as RestApiResponseLocalRisk)
    );
  }

  /**
   * Path part for operation postLocalRisk
   */
  static readonly PostLocalRiskPath = '/v1/local-risk';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postLocalRisk()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postLocalRisk$Response(params: {
    body: LocalRisk
  }): Observable<StrictHttpResponse<RestApiResponseLocalRisk>> {

    const rb = new RequestBuilder(this.rootUrl, LocalRiskControllerService.PostLocalRiskPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLocalRisk>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postLocalRisk$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postLocalRisk(params: {
    body: LocalRisk
  }): Observable<RestApiResponseLocalRisk> {

    return this.postLocalRisk$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLocalRisk>) => r.body as RestApiResponseLocalRisk)
    );
  }

}
