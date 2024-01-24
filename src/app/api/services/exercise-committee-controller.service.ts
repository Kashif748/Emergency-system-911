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
   * Path part for operation delete26
   */
  static readonly Delete26Path = '/v1/exercise-committee/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete26()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete26$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeControllerService.Delete26Path, 'put');
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

  /**
   * Path part for operation findActivePage22
   */
  static readonly FindActivePage22Path = '/v1/exercise-committee';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage22()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage22$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseCommittee>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeControllerService.FindActivePage22Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage22(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseCommittee> {

    return this.findActivePage22$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseCommittee>) => r.body as RestApiResponsePageExerciseCommittee)
    );
  }

  /**
   * Path part for operation update64
   */
  static readonly Update64Path = '/v1/exercise-committee';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update64()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update64$Response(params: {
    body: ExerciseCommittee
  }): Observable<StrictHttpResponse<RestApiResponseExerciseCommittee>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeControllerService.Update64Path, 'put');
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
   * To access the full response (for headers, for example), `update64$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update64(params: {
    body: ExerciseCommittee
  }): Observable<RestApiResponseExerciseCommittee> {

    return this.update64$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseCommittee>) => r.body as RestApiResponseExerciseCommittee)
    );
  }

  /**
   * Path part for operation create59
   */
  static readonly Create59Path = '/v1/exercise-committee';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create59()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create59$Response(params: {
    body: ExerciseCommittee
  }): Observable<StrictHttpResponse<RestApiResponseExerciseCommittee>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeControllerService.Create59Path, 'post');
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
   * To access the full response (for headers, for example), `create59$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create59(params: {
    body: ExerciseCommittee
  }): Observable<RestApiResponseExerciseCommittee> {

    return this.create59$Response(params).pipe(
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

}
