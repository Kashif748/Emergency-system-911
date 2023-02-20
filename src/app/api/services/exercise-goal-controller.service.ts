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
   * Path part for operation update57
   */
  static readonly Update57Path = '/v1/exercise-goals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update57()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update57$Response(params: {
    body: ExerciseGoal
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoal>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.Update57Path, 'put');
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
   * To access the full response (for headers, for example), `update57$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update57(params: {
    body: ExerciseGoal
  }): Observable<RestApiResponseExerciseGoal> {

    return this.update57$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseGoal>) => r.body as RestApiResponseExerciseGoal)
    );
  }

  /**
   * Path part for operation create53
   */
  static readonly Create53Path = '/v1/exercise-goals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create53()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create53$Response(params: {
    body: ExerciseGoal
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoal>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.Create53Path, 'post');
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
   * To access the full response (for headers, for example), `create53$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create53(params: {
    body: ExerciseGoal
  }): Observable<RestApiResponseExerciseGoal> {

    return this.create53$Response(params).pipe(
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

  /**
   * Path part for operation delete30
   */
  static readonly Delete30Path = '/v1/exercise-goals/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete30()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete30$Response(params: {
    id: ExerciseGoal;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalControllerService.Delete30Path, 'delete');
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
   * To access the full response (for headers, for example), `delete30$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete30(params: {
    id: ExerciseGoal;
  }): Observable<RestApiResponseBoolean> {

    return this.delete30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

}
