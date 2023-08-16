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

import { BcWorkImportanceLevels } from '../models/bc-work-importance-levels';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcWorkImportanceLevels } from '../models/rest-api-response-bc-work-importance-levels';
import { RestApiResponsePageBcWorkImportanceLevels } from '../models/rest-api-response-page-bc-work-importance-levels';

@Injectable()
export class BcWorkImportanceLevelsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById9
   */
  static readonly DeleteById9Path = '/v1/bc/levelsOfAvailability/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById9()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById9$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkImportanceLevelsControllerService.DeleteById9Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById9(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById9$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll19
   */
  static readonly GetAll19Path = '/v1/bc/levelsOfAvailability';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll19()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll19$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcWorkImportanceLevels>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkImportanceLevelsControllerService.GetAll19Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('versionId', params.versionId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcWorkImportanceLevels>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll19(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcWorkImportanceLevels> {

    return this.getAll19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcWorkImportanceLevels>) => r.body as RestApiResponsePageBcWorkImportanceLevels)
    );
  }

  /**
   * Path part for operation update89
   */
  static readonly Update89Path = '/v1/bc/levelsOfAvailability';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update89()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update89$Response(params: {
    body: BcWorkImportanceLevels
  }): Observable<StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkImportanceLevelsControllerService.Update89Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update89$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update89(params: {
    body: BcWorkImportanceLevels
  }): Observable<RestApiResponseBcWorkImportanceLevels> {

    return this.update89$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>) => r.body as RestApiResponseBcWorkImportanceLevels)
    );
  }

  /**
   * Path part for operation insertOne10
   */
  static readonly InsertOne10Path = '/v1/bc/levelsOfAvailability';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne10()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne10$Response(params: {
    body: BcWorkImportanceLevels
  }): Observable<StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkImportanceLevelsControllerService.InsertOne10Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne10$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne10(params: {
    body: BcWorkImportanceLevels
  }): Observable<RestApiResponseBcWorkImportanceLevels> {

    return this.insertOne10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>) => r.body as RestApiResponseBcWorkImportanceLevels)
    );
  }

  /**
   * Path part for operation getOne10
   */
  static readonly GetOne10Path = '/v1/bc/levelsOfAvailability/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne10()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne10$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkImportanceLevelsControllerService.GetOne10Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne10(params: {
    id: number;
  }): Observable<RestApiResponseBcWorkImportanceLevels> {

    return this.getOne10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>) => r.body as RestApiResponseBcWorkImportanceLevels)
    );
  }

}
