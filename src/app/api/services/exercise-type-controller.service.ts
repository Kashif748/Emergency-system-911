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
   * Path part for operation findActivePage14
   */
  static readonly FindActivePage14Path = '/v1/exercise-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage14()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage14$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseType>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseTypeControllerService.FindActivePage14Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage14$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage14(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseType> {

    return this.findActivePage14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseType>) => r.body as RestApiResponsePageExerciseType)
    );
  }

  /**
   * Path part for operation update53
   */
  static readonly Update53Path = '/v1/exercise-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update53()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update53$Response(params: {
    body: ExerciseType
  }): Observable<StrictHttpResponse<RestApiResponseExerciseType>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseTypeControllerService.Update53Path, 'put');
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
   * To access the full response (for headers, for example), `update53$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update53(params: {
    body: ExerciseType
  }): Observable<RestApiResponseExerciseType> {

    return this.update53$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseType>) => r.body as RestApiResponseExerciseType)
    );
  }

  /**
   * Path part for operation create49
   */
  static readonly Create49Path = '/v1/exercise-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create49()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create49$Response(params: {
    body: ExerciseType
  }): Observable<StrictHttpResponse<RestApiResponseExerciseType>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseTypeControllerService.Create49Path, 'post');
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
   * To access the full response (for headers, for example), `create49$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create49(params: {
    body: ExerciseType
  }): Observable<RestApiResponseExerciseType> {

    return this.create49$Response(params).pipe(
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

  /**
   * Path part for operation delete26
   */
  static readonly Delete26Path = '/v1/exercise-types/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete26()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete26$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseTypeControllerService.Delete26Path, 'delete');
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
   * To access the full response (for headers, for example), `delete26$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete26(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

}
