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

import { AvayaRequest } from '../models/avaya-request';
import { RestApiResponseAvayaDto } from '../models/rest-api-response-avaya-dto';
import { RestApiResponseListAvayaDto } from '../models/rest-api-response-list-avaya-dto';

@Injectable()
export class AvayaControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findAll
   */
  static readonly FindAllPath = '/v1/ext/avaya';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListAvayaDto>> {

    const rb = new RequestBuilder(this.rootUrl, AvayaControllerService.FindAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListAvayaDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll(params?: {
  }): Observable<RestApiResponseListAvayaDto> {

    return this.findAll$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListAvayaDto>) => r.body as RestApiResponseListAvayaDto)
    );
  }

  /**
   * Path part for operation update52
   */
  static readonly Update52Path = '/v1/ext/avaya';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update52()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update52$Response(params: {
    body: AvayaRequest
  }): Observable<StrictHttpResponse<RestApiResponseAvayaDto>> {

    const rb = new RequestBuilder(this.rootUrl, AvayaControllerService.Update52Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAvayaDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update52$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update52(params: {
    body: AvayaRequest
  }): Observable<RestApiResponseAvayaDto> {

    return this.update52$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAvayaDto>) => r.body as RestApiResponseAvayaDto)
    );
  }

  /**
   * Path part for operation create48
   */
  static readonly Create48Path = '/v1/ext/avaya';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create48()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create48$Response(params: {
    body: AvayaRequest
  }): Observable<StrictHttpResponse<RestApiResponseAvayaDto>> {

    const rb = new RequestBuilder(this.rootUrl, AvayaControllerService.Create48Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAvayaDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create48$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create48(params: {
    body: AvayaRequest
  }): Observable<RestApiResponseAvayaDto> {

    return this.create48$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAvayaDto>) => r.body as RestApiResponseAvayaDto)
    );
  }

}
