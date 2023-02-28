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
   * Path part for operation findActivePage15
   */
  static readonly FindActivePage15Path = '/v1/exercise-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage15()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage15$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseStatus>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseStatusControllerService.FindActivePage15Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage15$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage15(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseStatus> {

    return this.findActivePage15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseStatus>) => r.body as RestApiResponsePageExerciseStatus)
    );
  }

  /**
   * Path part for operation update54
   */
  static readonly Update54Path = '/v1/exercise-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update54()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update54$Response(params: {
    body: ExerciseStatus
  }): Observable<StrictHttpResponse<RestApiResponseExerciseStatus>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseStatusControllerService.Update54Path, 'put');
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
   * To access the full response (for headers, for example), `update54$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update54(params: {
    body: ExerciseStatus
  }): Observable<RestApiResponseExerciseStatus> {

    return this.update54$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseStatus>) => r.body as RestApiResponseExerciseStatus)
    );
  }

  /**
   * Path part for operation create50
   */
  static readonly Create50Path = '/v1/exercise-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create50()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create50$Response(params: {
    body: ExerciseStatus
  }): Observable<StrictHttpResponse<RestApiResponseExerciseStatus>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseStatusControllerService.Create50Path, 'post');
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
   * To access the full response (for headers, for example), `create50$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create50(params: {
    body: ExerciseStatus
  }): Observable<RestApiResponseExerciseStatus> {

    return this.create50$Response(params).pipe(
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

  /**
   * Path part for operation delete27
   */
  static readonly Delete27Path = '/v1/exercise-statuses/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete27()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete27$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseStatusControllerService.Delete27Path, 'delete');
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
   * To access the full response (for headers, for example), `delete27$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete27(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

}
