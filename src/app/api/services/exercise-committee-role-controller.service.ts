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

import { ExerciseCommitteeRole } from '../models/exercise-committee-role';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseExerciseCommitteeRole } from '../models/rest-api-response-exercise-committee-role';
import { RestApiResponsePageExerciseCommitteeRole } from '../models/rest-api-response-page-exercise-committee-role';

@Injectable()
export class ExerciseCommitteeRoleControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete27
   */
  static readonly Delete27Path = '/v1/exercise-committee-roles/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete27()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete27$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeRoleControllerService.Delete27Path, 'put');
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
   * To access the full response (for headers, for example), `delete27$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete27(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete27$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation findActivePage21
   */
  static readonly FindActivePage21Path = '/v1/exercise-committee-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage21()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage21$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseCommitteeRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeRoleControllerService.FindActivePage21Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExerciseCommitteeRole>;
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
  }): Observable<RestApiResponsePageExerciseCommitteeRole> {

    return this.findActivePage21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseCommitteeRole>) => r.body as RestApiResponsePageExerciseCommitteeRole)
    );
  }

  /**
   * Path part for operation update63
   */
  static readonly Update63Path = '/v1/exercise-committee-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update63()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update63$Response(params: {
    body: ExerciseCommitteeRole
  }): Observable<StrictHttpResponse<RestApiResponseExerciseCommitteeRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeRoleControllerService.Update63Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseCommitteeRole>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update63$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update63(params: {
    body: ExerciseCommitteeRole
  }): Observable<RestApiResponseExerciseCommitteeRole> {

    return this.update63$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseCommitteeRole>) => r.body as RestApiResponseExerciseCommitteeRole)
    );
  }

  /**
   * Path part for operation create58
   */
  static readonly Create58Path = '/v1/exercise-committee-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create58()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create58$Response(params: {
    body: ExerciseCommitteeRole
  }): Observable<StrictHttpResponse<RestApiResponseExerciseCommitteeRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeRoleControllerService.Create58Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseCommitteeRole>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create58$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create58(params: {
    body: ExerciseCommitteeRole
  }): Observable<RestApiResponseExerciseCommitteeRole> {

    return this.create58$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseCommitteeRole>) => r.body as RestApiResponseExerciseCommitteeRole)
    );
  }

  /**
   * Path part for operation getActiveRole
   */
  static readonly GetActiveRolePath = '/v1/exercise-committee-roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveRole$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExerciseCommitteeRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeRoleControllerService.GetActiveRolePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseCommitteeRole>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveRole(params: {
    id: number;
  }): Observable<RestApiResponseExerciseCommitteeRole> {

    return this.getActiveRole$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseCommitteeRole>) => r.body as RestApiResponseExerciseCommitteeRole)
    );
  }

}
