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

import { ExerciseLesson } from '../models/exercise-lesson';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseExerciseLesson } from '../models/rest-api-response-exercise-lesson';
import { RestApiResponsePageExerciseLesson } from '../models/rest-api-response-page-exercise-lesson';

@Injectable()
export class ExerciseLessonControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete22
   */
  static readonly Delete22Path = '/v1/exercise-lessons/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete22()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete22$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseLessonControllerService.Delete22Path, 'put');
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
   * To access the full response (for headers, for example), `delete22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete22(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation findActivePage17
   */
  static readonly FindActivePage17Path = '/v1/exercise-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage17()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage17$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseLessonControllerService.FindActivePage17Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExerciseLesson>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage17$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage17(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseLesson> {

    return this.findActivePage17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseLesson>) => r.body as RestApiResponsePageExerciseLesson)
    );
  }

  /**
   * Path part for operation update57
   */
  static readonly Update57Path = '/v1/exercise-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update57()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update57$Response(params: {
    body: ExerciseLesson
  }): Observable<StrictHttpResponse<RestApiResponseExerciseLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseLessonControllerService.Update57Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseLesson>;
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
    body: ExerciseLesson
  }): Observable<RestApiResponseExerciseLesson> {

    return this.update57$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseLesson>) => r.body as RestApiResponseExerciseLesson)
    );
  }

  /**
   * Path part for operation create53
   */
  static readonly Create53Path = '/v1/exercise-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create53()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create53$Response(params: {
    body: ExerciseLesson
  }): Observable<StrictHttpResponse<RestApiResponseExerciseLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseLessonControllerService.Create53Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseLesson>;
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
    body: ExerciseLesson
  }): Observable<RestApiResponseExerciseLesson> {

    return this.create53$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseLesson>) => r.body as RestApiResponseExerciseLesson)
    );
  }

  /**
   * Path part for operation getActiveLesson
   */
  static readonly GetActiveLessonPath = '/v1/exercise-lessons/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveLesson()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveLesson$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExerciseLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseLessonControllerService.GetActiveLessonPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseLesson>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveLesson$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveLesson(params: {
    id: number;
  }): Observable<RestApiResponseExerciseLesson> {

    return this.getActiveLesson$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseLesson>) => r.body as RestApiResponseExerciseLesson)
    );
  }

}
