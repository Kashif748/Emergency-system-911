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
   * Path part for operation deleteById6
   */
  static readonly DeleteById6Path = '/v1/bc/levelsOfAvailability/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById6()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkImportanceLevelsControllerService.DeleteById6Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById6(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById6$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll15
   */
  static readonly GetAll15Path = '/v1/bc/levelsOfAvailability';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll15()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll15$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcWorkImportanceLevels>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkImportanceLevelsControllerService.GetAll15Path, 'get');
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
   * To access the full response (for headers, for example), `getAll15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll15(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcWorkImportanceLevels> {

    return this.getAll15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcWorkImportanceLevels>) => r.body as RestApiResponsePageBcWorkImportanceLevels)
    );
  }

  /**
   * Path part for operation update85
   */
  static readonly Update85Path = '/v1/bc/levelsOfAvailability';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update85()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update85$Response(params: {
    body: BcWorkImportanceLevels
  }): Observable<StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkImportanceLevelsControllerService.Update85Path, 'put');
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
   * To access the full response (for headers, for example), `update85$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update85(params: {
    body: BcWorkImportanceLevels
  }): Observable<RestApiResponseBcWorkImportanceLevels> {

    return this.update85$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>) => r.body as RestApiResponseBcWorkImportanceLevels)
    );
  }

  /**
   * Path part for operation insertOne6
   */
  static readonly InsertOne6Path = '/v1/bc/levelsOfAvailability';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne6()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne6$Response(params: {
    body: BcWorkImportanceLevels
  }): Observable<StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkImportanceLevelsControllerService.InsertOne6Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne6$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne6(params: {
    body: BcWorkImportanceLevels
  }): Observable<RestApiResponseBcWorkImportanceLevels> {

    return this.insertOne6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>) => r.body as RestApiResponseBcWorkImportanceLevels)
    );
  }

  /**
   * Path part for operation getOne6
   */
  static readonly GetOne6Path = '/v1/bc/levelsOfAvailability/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne6()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>> {

    const rb = new RequestBuilder(this.rootUrl, BcWorkImportanceLevelsControllerService.GetOne6Path, 'get');
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
   * To access the full response (for headers, for example), `getOne6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne6(params: {
    id: number;
  }): Observable<RestApiResponseBcWorkImportanceLevels> {

    return this.getOne6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcWorkImportanceLevels>) => r.body as RestApiResponseBcWorkImportanceLevels)
    );
  }

}
