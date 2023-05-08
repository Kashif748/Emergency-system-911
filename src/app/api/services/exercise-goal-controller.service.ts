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
   * Path part for operation delete23
   */
  static readonly Delete23Path = '/v1/exercise-goals/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete23()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete23$Response(params: {
    id: ExerciseGoal;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.Delete23Path, 'put');
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
   * To access the full response (for headers, for example), `delete23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete23(params: {
    id: ExerciseGoal;
  }): Observable<RestApiResponseBoolean> {

    return this.delete23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation findActivePage18
   */
  static readonly FindActivePage18Path = '/v1/exercise-goals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage18()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage18$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseGoal>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.FindActivePage18Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage18(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseGoal> {

    return this.findActivePage18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseGoal>) => r.body as RestApiResponsePageExerciseGoal)
    );
  }

  /**
   * Path part for operation update59
   */
  static readonly Update59Path = '/v1/exercise-goals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update59()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update59$Response(params: {
    body: ExerciseGoal
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoal>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.Update59Path, 'put');
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
   * To access the full response (for headers, for example), `update59$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update59(params: {
    body: ExerciseGoal
  }): Observable<RestApiResponseExerciseGoal> {

    return this.update59$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseGoal>) => r.body as RestApiResponseExerciseGoal)
    );
  }

  /**
   * Path part for operation create55
   */
  static readonly Create55Path = '/v1/exercise-goals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create55()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create55$Response(params: {
    body: ExerciseGoal
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoal>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.Create55Path, 'post');
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
   * To access the full response (for headers, for example), `create55$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create55(params: {
    body: ExerciseGoal
  }): Observable<RestApiResponseExerciseGoal> {

    return this.create55$Response(params).pipe(
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
