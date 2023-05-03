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
   * Path part for operation delete26
   */
  static readonly Delete26Path = '/v1/exercise-committee-roles/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete26()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete26$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeRoleControllerService.Delete26Path, 'put');
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
   * Path part for operation findActivePage20
   */
  static readonly FindActivePage20Path = '/v1/exercise-committee-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage20()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage20$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseCommitteeRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeRoleControllerService.FindActivePage20Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage20$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage20(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseCommitteeRole> {

    return this.findActivePage20$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseCommitteeRole>) => r.body as RestApiResponsePageExerciseCommitteeRole)
    );
  }

  /**
   * Path part for operation update61
   */
  static readonly Update61Path = '/v1/exercise-committee-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update61()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update61$Response(params: {
    body: ExerciseCommitteeRole
  }): Observable<StrictHttpResponse<RestApiResponseExerciseCommitteeRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeRoleControllerService.Update61Path, 'put');
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
   * To access the full response (for headers, for example), `update61$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update61(params: {
    body: ExerciseCommitteeRole
  }): Observable<RestApiResponseExerciseCommitteeRole> {

    return this.update61$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseCommitteeRole>) => r.body as RestApiResponseExerciseCommitteeRole)
    );
  }

  /**
   * Path part for operation create57
   */
  static readonly Create57Path = '/v1/exercise-committee-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create57()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create57$Response(params: {
    body: ExerciseCommitteeRole
  }): Observable<StrictHttpResponse<RestApiResponseExerciseCommitteeRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseCommitteeRoleControllerService.Create57Path, 'post');
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
   * To access the full response (for headers, for example), `create57$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create57(params: {
    body: ExerciseCommitteeRole
  }): Observable<RestApiResponseExerciseCommitteeRole> {

    return this.create57$Response(params).pipe(
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
