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

import { ExerciseMemberRole } from '../models/exercise-member-role';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseExerciseMemberRole } from '../models/rest-api-response-exercise-member-role';
import { RestApiResponsePageExerciseMemberRole } from '../models/rest-api-response-page-exercise-member-role';

@Injectable()
export class ExerciseMemberRoleControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage16
   */
  static readonly FindActivePage16Path = '/v1/exercise-member-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage16()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage16$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageExerciseMemberRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseMemberRoleControllerService.FindActivePage16Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageExerciseMemberRole>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage16$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage16(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageExerciseMemberRole> {

    return this.findActivePage16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageExerciseMemberRole>) => r.body as RestApiResponsePageExerciseMemberRole)
    );
  }

  /**
   * Path part for operation update54
   */
  static readonly Update54Path = '/v1/exercise-member-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update54()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update54$Response(params: {
    body: ExerciseMemberRole
  }): Observable<StrictHttpResponse<RestApiResponseExerciseMemberRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseMemberRoleControllerService.Update54Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseMemberRole>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update54$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update54(params: {
    body: ExerciseMemberRole
  }): Observable<RestApiResponseExerciseMemberRole> {

    return this.update54$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseMemberRole>) => r.body as RestApiResponseExerciseMemberRole)
    );
  }

  /**
   * Path part for operation create50
   */
  static readonly Create50Path = '/v1/exercise-member-roles';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create50()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create50$Response(params: {
    body: ExerciseMemberRole
  }): Observable<StrictHttpResponse<RestApiResponseExerciseMemberRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseMemberRoleControllerService.Create50Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseMemberRole>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create50$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create50(params: {
    body: ExerciseMemberRole
  }): Observable<RestApiResponseExerciseMemberRole> {

    return this.create50$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseMemberRole>) => r.body as RestApiResponseExerciseMemberRole)
    );
  }

  /**
   * Path part for operation getActiveExerciseMemberRole
   */
  static readonly GetActiveExerciseMemberRolePath = '/v1/exercise-member-roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveExerciseMemberRole()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveExerciseMemberRole$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseExerciseMemberRole>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseMemberRoleControllerService.GetActiveExerciseMemberRolePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseExerciseMemberRole>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveExerciseMemberRole$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveExerciseMemberRole(params: {
    id: number;
  }): Observable<RestApiResponseExerciseMemberRole> {

    return this.getActiveExerciseMemberRole$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseExerciseMemberRole>) => r.body as RestApiResponseExerciseMemberRole)
    );
  }

  /**
   * Path part for operation delete27
   */
  static readonly Delete27Path = '/v1/exercise-member-roles/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete27()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete27$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, ExerciseMemberRoleControllerService.Delete27Path, 'delete');
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

}
