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

import { ExerciseCommittee } from '../models/exercise-committee';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseExerciseCommittee } from '../models/rest-api-response-exercise-committee';
import { RestApiResponsePageExerciseCommittee } from '../models/rest-api-response-page-exercise-committee';

@Injectable()
export class ExerciseCommitteeControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage21
   */
  static readonly FindActivePage21Path = '/v1/exercise-committee';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage21()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage21$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseCommittee>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeControllerService.FindActivePage21Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExerciseCommittee>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage21$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage21(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseCommittee> {

    return this.findActivePage21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseCommittee>) => r.body as RestApiResponsePageExerciseCommittee)
    );
  }

  /**
   * Path part for operation update59
   */
  static readonly Update59Path = '/v1/exercise-committee';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update59()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update59$Response(params: {
    body: ExerciseCommittee
  }): Observable<StrictHttpResponse<RestApiResponseExerciseCommittee>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeControllerService.Update59Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseCommittee>;
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
    body: ExerciseCommittee
  }): Observable<RestApiResponseExerciseCommittee> {

    return this.update59$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseCommittee>) => r.body as RestApiResponseExerciseCommittee)
    );
  }

  /**
   * Path part for operation create55
   */
  static readonly Create55Path = '/v1/exercise-committee';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create55()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create55$Response(params: {
    body: ExerciseCommittee
  }): Observable<StrictHttpResponse<RestApiResponseExerciseCommittee>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeControllerService.Create55Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseCommittee>;
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
    body: ExerciseCommittee
  }): Observable<RestApiResponseExerciseCommittee> {

    return this.create55$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseCommittee>) => r.body as RestApiResponseExerciseCommittee)
    );
  }

  /**
   * Path part for operation getActiveExeCommittee
   */
  static readonly GetActiveExeCommitteePath = '/v1/exercise-committee/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveExeCommittee()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveExeCommittee$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExerciseCommittee>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeControllerService.GetActiveExeCommitteePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseCommittee>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveExeCommittee$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveExeCommittee(params: {
    id: number;
  }): Observable<RestApiResponseExerciseCommittee> {

    return this.getActiveExeCommittee$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseCommittee>) => r.body as RestApiResponseExerciseCommittee)
    );
  }

  /**
   * Path part for operation delete31
   */
  static readonly Delete31Path = '/v1/exercise-committee/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete31()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete31$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeControllerService.Delete31Path, 'delete');
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
   * To access the full response (for headers, for example), `delete31$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete31(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete31$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

}
