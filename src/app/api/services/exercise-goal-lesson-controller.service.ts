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

import { ExerciseGoalLesson } from '../models/exercise-goal-lesson';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseExerciseGoalLesson } from '../models/rest-api-response-exercise-goal-lesson';
import { RestApiResponsePageExerciseGoalLesson } from '../models/rest-api-response-page-exercise-goal-lesson';

@Injectable()
export class ExerciseGoalLessonControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage19
   */
  static readonly FindActivePage19Path = '/v1/exercise-goal-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage19()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage19$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseGoalLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalLessonControllerService.FindActivePage19Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExerciseGoalLesson>;
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
  }): Observable<RestApiResponsePageExerciseGoalLesson> {

    return this.findActivePage19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseGoalLesson>) => r.body as RestApiResponsePageExerciseGoalLesson)
    );
  }

  /**
   * Path part for operation update57
   */
  static readonly Update57Path = '/v1/exercise-goal-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update57()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update57$Response(params: {
    body: ExerciseGoalLesson
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoalLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalLessonControllerService.Update57Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseGoalLesson>;
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
    body: ExerciseGoalLesson
  }): Observable<RestApiResponseExerciseGoalLesson> {

    return this.update57$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseGoalLesson>) => r.body as RestApiResponseExerciseGoalLesson)
    );
  }

  /**
   * Path part for operation create53
   */
  static readonly Create53Path = '/v1/exercise-goal-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create53()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create53$Response(params: {
    body: ExerciseGoalLesson
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoalLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalLessonControllerService.Create53Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseGoalLesson>;
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
    body: ExerciseGoalLesson
  }): Observable<RestApiResponseExerciseGoalLesson> {

    return this.create53$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseGoalLesson>) => r.body as RestApiResponseExerciseGoalLesson)
    );
  }

  /**
   * Path part for operation getActiveGoalLesson
   */
  static readonly GetActiveGoalLessonPath = '/v1/exercise-goal-lessons/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveGoalLesson()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveGoalLesson$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoalLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalLessonControllerService.GetActiveGoalLessonPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseGoalLesson>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveGoalLesson$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveGoalLesson(params: {
    id: number;
  }): Observable<RestApiResponseExerciseGoalLesson> {

    return this.getActiveGoalLesson$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseGoalLesson>) => r.body as RestApiResponseExerciseGoalLesson)
    );
  }

  /**
   * Path part for operation delete30
   */
  static readonly Delete30Path = '/v1/exercise-goal-lessons/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete30()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete30$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalLessonControllerService.Delete30Path, 'delete');
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
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete30$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

}
