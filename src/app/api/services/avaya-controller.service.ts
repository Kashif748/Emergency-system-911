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

import { Avaya } from '../models/avaya';
import { RestApiResponseAvayaDto } from '../models/rest-api-response-avaya-dto';
import { RestApiResponseListAvayaDto } from '../models/rest-api-response-list-avaya-dto';
import { RestApiResponseObject } from '../models/rest-api-response-object';

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
  static readonly FindAllPath = '/v1/avaya';

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
   * Path part for operation update77
   */
  static readonly Update77Path = '/v1/avaya';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update77()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update77$Response(params: {
    body: Avaya
  }): Observable<StrictHttpResponse<RestApiResponseAvayaDto>> {

    const rb = new RequestBuilder(this.rootUrl, AvayaControllerService.Update77Path, 'put');
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
   * To access the full response (for headers, for example), `update77$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update77(params: {
    body: Avaya
  }): Observable<RestApiResponseAvayaDto> {

    return this.update77$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAvayaDto>) => r.body as RestApiResponseAvayaDto)
    );
  }

  /**
   * Path part for operation create72
   */
  static readonly Create72Path = '/v1/avaya';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create72()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create72$Response(params: {
    body: Avaya
  }): Observable<StrictHttpResponse<RestApiResponseAvayaDto>> {

    const rb = new RequestBuilder(this.rootUrl, AvayaControllerService.Create72Path, 'post');
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
   * To access the full response (for headers, for example), `create72$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create72(params: {
    body: Avaya
  }): Observable<RestApiResponseAvayaDto> {

    return this.create72$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAvayaDto>) => r.body as RestApiResponseAvayaDto)
    );
  }

  /**
   * Path part for operation delete38
   */
  static readonly Delete38Path = '/v1/avaya/{avayaId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete38()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete38$Response(params: {
    avayaId: number;
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, AvayaControllerService.Delete38Path, 'delete');
    if (params) {
      rb.path('avayaId', params.avayaId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete38$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete38(params: {
    avayaId: number;
  }): Observable<RestApiResponseObject> {

    return this.delete38$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

}
