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

import { ExerciseType } from '../models/exercise-type';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseExerciseType } from '../models/rest-api-response-exercise-type';
import { RestApiResponsePageExerciseType } from '../models/rest-api-response-page-exercise-type';

@Injectable()
export class ExerciseTypeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete20
   */
  static readonly Delete20Path = '/v1/exercise-types/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete20()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete20$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseTypeControllerService.Delete20Path, 'put');
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
   * To access the full response (for headers, for example), `delete20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete20(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation findActivePage15
   */
  static readonly FindActivePage15Path = '/v1/exercise-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage15()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage15$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseType>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseTypeControllerService.FindActivePage15Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExerciseType>;
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
  }): Observable<RestApiResponsePageExerciseType> {

    return this.findActivePage15$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseType>) => r.body as RestApiResponsePageExerciseType)
    );
  }

  /**
   * Path part for operation update57
   */
  static readonly Update57Path = '/v1/exercise-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update57()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update57$Response(params: {
    body: ExerciseType
  }): Observable<StrictHttpResponse<RestApiResponseExerciseType>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseTypeControllerService.Update57Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseType>;
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
    body: ExerciseType
  }): Observable<RestApiResponseExerciseType> {

    return this.update57$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseType>) => r.body as RestApiResponseExerciseType)
    );
  }

  /**
   * Path part for operation create52
   */
  static readonly Create52Path = '/v1/exercise-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create52()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create52$Response(params: {
    body: ExerciseType
  }): Observable<StrictHttpResponse<RestApiResponseExerciseType>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseTypeControllerService.Create52Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create52$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create52(params: {
    body: ExerciseType
  }): Observable<RestApiResponseExerciseType> {

    return this.create52$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseType>) => r.body as RestApiResponseExerciseType)
    );
  }

  /**
   * Path part for operation getActiveType
   */
  static readonly GetActiveTypePath = '/v1/exercise-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveType()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveType$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExerciseType>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseTypeControllerService.GetActiveTypePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveType(params: {
    id: number;
  }): Observable<RestApiResponseExerciseType> {

    return this.getActiveType$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseType>) => r.body as RestApiResponseExerciseType)
    );
  }

}
