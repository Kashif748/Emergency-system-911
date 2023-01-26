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
   * Path part for operation update55
   */
  static readonly Update55Path = '/v1/exercise-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update55()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update55$Response(params: {
    body: ExerciseLesson
  }): Observable<StrictHttpResponse<RestApiResponseExerciseLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseLessonControllerService.Update55Path, 'put');
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
   * To access the full response (for headers, for example), `update55$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update55(params: {
    body: ExerciseLesson
  }): Observable<RestApiResponseExerciseLesson> {

    return this.update55$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseLesson>) => r.body as RestApiResponseExerciseLesson)
    );
  }

  /**
   * Path part for operation create51
   */
  static readonly Create51Path = '/v1/exercise-lessons';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create51()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create51$Response(params: {
    body: ExerciseLesson
  }): Observable<StrictHttpResponse<RestApiResponseExerciseLesson>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseLessonControllerService.Create51Path, 'post');
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
   * To access the full response (for headers, for example), `create51$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create51(params: {
    body: ExerciseLesson
  }): Observable<RestApiResponseExerciseLesson> {

    return this.create51$Response(params).pipe(
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

  /**
   * Path part for operation delete28
   */
  static readonly Delete28Path = '/v1/exercise-lessons/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete28()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete28$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseLessonControllerService.Delete28Path, 'delete');
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
   * To access the full response (for headers, for example), `delete28$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete28(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete28$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

}
