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

import { ExerciseGoal } from '../models/exercise-goal';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseExerciseGoal } from '../models/rest-api-response-exercise-goal';
import { RestApiResponsePageExerciseGoal } from '../models/rest-api-response-page-exercise-goal';

@Injectable()
export class ExerciseGoalControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete24
   */
  static readonly Delete24Path = '/v1/exercise-goals/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete24()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete24$Response(params: {
    id: ExerciseGoal;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.Delete24Path, 'put');
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
   * To access the full response (for headers, for example), `delete24$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete24(params: {
    id: ExerciseGoal;
  }): Observable<RestApiResponseBoolean> {

    return this.delete24$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation findActivePage19
   */
  static readonly FindActivePage19Path = '/v1/exercise-goals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage19()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage19$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseGoal>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.FindActivePage19Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExerciseGoal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage19(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseGoal> {

    return this.findActivePage19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseGoal>) => r.body as RestApiResponsePageExerciseGoal)
    );
  }

  /**
   * Path part for operation update61
   */
  static readonly Update61Path = '/v1/exercise-goals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update61()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update61$Response(params: {
    body: ExerciseGoal
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoal>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.Update61Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseGoal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update61$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update61(params: {
    body: ExerciseGoal
  }): Observable<RestApiResponseExerciseGoal> {

    return this.update61$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseGoal>) => r.body as RestApiResponseExerciseGoal)
    );
  }

  /**
   * Path part for operation create56
   */
  static readonly Create56Path = '/v1/exercise-goals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create56()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create56$Response(params: {
    body: ExerciseGoal
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoal>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.Create56Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseGoal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create56$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create56(params: {
    body: ExerciseGoal
  }): Observable<RestApiResponseExerciseGoal> {

    return this.create56$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseGoal>) => r.body as RestApiResponseExerciseGoal)
    );
  }

  /**
   * Path part for operation getActiveGoal
   */
  static readonly GetActiveGoalPath = '/v1/exercise-goals/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveGoal()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveGoal$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoal>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.GetActiveGoalPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseGoal>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveGoal$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveGoal(params: {
    id: number;
  }): Observable<RestApiResponseExerciseGoal> {

    return this.getActiveGoal$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseGoal>) => r.body as RestApiResponseExerciseGoal)
    );
  }

}
