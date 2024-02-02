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

import { ExerciseStatus } from '../models/exercise-status';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseExerciseStatus } from '../models/rest-api-response-exercise-status';
import { RestApiResponsePageExerciseStatus } from '../models/rest-api-response-page-exercise-status';

@Injectable()
export class ExerciseStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete21
   */
  static readonly Delete21Path = '/v1/exercise-statuses/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete21()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete21$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseStatusControllerService.Delete21Path, 'put');
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
   * To access the full response (for headers, for example), `delete21$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete21(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation findActivePage16
   */
  static readonly FindActivePage16Path = '/v1/exercise-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage16()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage16$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseStatus>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseStatusControllerService.FindActivePage16Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExerciseStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage16(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseStatus> {

    return this.findActivePage16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseStatus>) => r.body as RestApiResponsePageExerciseStatus)
    );
  }

  /**
   * Path part for operation update58
   */
  static readonly Update58Path = '/v1/exercise-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update58()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update58$Response(params: {
    body: ExerciseStatus
  }): Observable<StrictHttpResponse<RestApiResponseExerciseStatus>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseStatusControllerService.Update58Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update58$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update58(params: {
    body: ExerciseStatus
  }): Observable<RestApiResponseExerciseStatus> {

    return this.update58$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseStatus>) => r.body as RestApiResponseExerciseStatus)
    );
  }

  /**
   * Path part for operation create53
   */
  static readonly Create53Path = '/v1/exercise-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create53()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create53$Response(params: {
    body: ExerciseStatus
  }): Observable<StrictHttpResponse<RestApiResponseExerciseStatus>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseStatusControllerService.Create53Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create53$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create53(params: {
    body: ExerciseStatus
  }): Observable<RestApiResponseExerciseStatus> {

    return this.create53$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseStatus>) => r.body as RestApiResponseExerciseStatus)
    );
  }

  /**
   * Path part for operation getActiveStatus1
   */
  static readonly GetActiveStatus1Path = '/v1/exercise-statuses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveStatus1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveStatus1$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExerciseStatus>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseStatusControllerService.GetActiveStatus1Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveStatus1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveStatus1(params: {
    id: number;
  }): Observable<RestApiResponseExerciseStatus> {

    return this.getActiveStatus1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseStatus>) => r.body as RestApiResponseExerciseStatus)
    );
  }

}
