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

import { Exercise } from '../models/exercise';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseExercise } from '../models/rest-api-response-exercise';
import { RestApiResponsePageExercise } from '../models/rest-api-response-page-exercise';

@Injectable()
export class ExerciseControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage13
   */
  static readonly FindActivePage13Path = '/v1/exercises';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage13()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage13$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExercise>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseControllerService.FindActivePage13Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExercise>;
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
  }): Observable<RestApiResponsePageExercise> {

    return this.findActivePage13$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExercise>) => r.body as RestApiResponsePageExercise)
    );
  }

  /**
   * Path part for operation update52
   */
  static readonly Update52Path = '/v1/exercises';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update52()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update52$Response(params: {
    body: Exercise
  }): Observable<StrictHttpResponse<RestApiResponseExercise>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseControllerService.Update52Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExercise>;
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
    body: Exercise
  }): Observable<RestApiResponseExercise> {

    return this.update52$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExercise>) => r.body as RestApiResponseExercise)
    );
  }

  /**
   * Path part for operation create48
   */
  static readonly Create48Path = '/v1/exercises';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create48()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create48$Response(params: {
    body: Exercise
  }): Observable<StrictHttpResponse<RestApiResponseExercise>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseControllerService.Create48Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExercise>;
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
    body: Exercise
  }): Observable<RestApiResponseExercise> {

    return this.create48$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExercise>) => r.body as RestApiResponseExercise)
    );
  }

  /**
   * Path part for operation getActiveExercise
   */
  static readonly GetActiveExercisePath = '/v1/exercises/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveExercise()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveExercise$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExercise>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseControllerService.GetActiveExercisePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExercise>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveExercise$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveExercise(params: {
    id: number;
  }): Observable<RestApiResponseExercise> {

    return this.getActiveExercise$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExercise>) => r.body as RestApiResponseExercise)
    );
  }

  /**
   * Path part for operation delete25
   */
  static readonly Delete25Path = '/v1/exercises/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete25()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete25$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseControllerService.Delete25Path, 'delete');
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
   * To access the full response (for headers, for example), `delete25$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete25(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete25$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

}
