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
   * Path part for operation delete25
   */
  static readonly Delete25Path = '/v1/exercise-goal-lessons/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete25()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete25$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalLessonControllerService.Delete25Path, 'put');
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

  /**
   * Path part for operation findActivePage20
   */
  static readonly FindActivePage20Path = '/v1/exercise-goal-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage20()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage20$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseGoalLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalLessonControllerService.FindActivePage20Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage20(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseGoalLesson> {

    return this.findActivePage20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseGoalLesson>) => r.body as RestApiResponsePageExerciseGoalLesson)
    );
  }

  /**
   * Path part for operation update62
   */
  static readonly Update62Path = '/v1/exercise-goal-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update62()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update62$Response(params: {
    body: ExerciseGoalLesson
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoalLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalLessonControllerService.Update62Path, 'put');
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
   * To access the full response (for headers, for example), `update62$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update62(params: {
    body: ExerciseGoalLesson
  }): Observable<RestApiResponseExerciseGoalLesson> {

    return this.update62$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseGoalLesson>) => r.body as RestApiResponseExerciseGoalLesson)
    );
  }

  /**
   * Path part for operation create57
   */
  static readonly Create57Path = '/v1/exercise-goal-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create57()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create57$Response(params: {
    body: ExerciseGoalLesson
  }): Observable<StrictHttpResponse<RestApiResponseExerciseGoalLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseGoalLessonControllerService.Create57Path, 'post');
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
   * To access the full response (for headers, for example), `create57$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create57(params: {
    body: ExerciseGoalLesson
  }): Observable<RestApiResponseExerciseGoalLesson> {

    return this.create57$Response(params).pipe(
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

}
