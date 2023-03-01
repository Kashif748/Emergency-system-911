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

import { Circular } from '../models/circular';
import { CircularStatus } from '../models/circular-status';
import { Pageable } from '../models/pageable';
import { RestApiResponseCircularMinimumProjection } from '../models/rest-api-response-circular-minimum-projection';
import { RestApiResponseCircularProjection } from '../models/rest-api-response-circular-projection';
import { RestApiResponseMapStringString } from '../models/rest-api-response-map-string-string';
import { RestApiResponsePageCircularWithOrgsProjection } from '../models/rest-api-response-page-circular-with-orgs-projection';
import { User } from '../models/user';
import { UserInappAuthentication } from '../models/user-inapp-authentication';
import { UserMiddlewareAuth } from '../models/user-middleware-auth';

@Injectable()
export class CircularControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation list6
   */
  static readonly List6Path = '/v1/circulars';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `list6()` instead.
   *
   * This method doesn't expect any request body.
   */
  list6$Response(params: {
    status?: CircularStatus;
    number?: string;
    fromDate?: string;
    toDate?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageCircularWithOrgsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.List6Path, 'get');
    if (params) {
      rb.query('status', params.status, {});
      rb.query('number', params.number, {});
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageCircularWithOrgsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `list6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  list6(params: {
    status?: CircularStatus;
    number?: string;
    fromDate?: string;
    toDate?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageCircularWithOrgsProjection> {

    return this.list6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageCircularWithOrgsProjection>) => r.body as RestApiResponsePageCircularWithOrgsProjection)
    );
  }

  /**
   * Path part for operation update74
   */
  static readonly Update74Path = '/v1/circulars';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update74()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update74$Response(params: {
    body: Circular
  }): Observable<StrictHttpResponse<RestApiResponseCircularMinimumProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.Update74Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularMinimumProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update74$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update74(params: {
    body: Circular
  }): Observable<RestApiResponseCircularMinimumProjection> {

    return this.update74$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularMinimumProjection>) => r.body as RestApiResponseCircularMinimumProjection)
    );
  }

  /**
   * Path part for operation create69
   */
  static readonly Create69Path = '/v1/circulars';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create69()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create69$Response(params: {
    body: Circular
  }): Observable<StrictHttpResponse<RestApiResponseCircularProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.Create69Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create69$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create69(params: {
    body: Circular
  }): Observable<RestApiResponseCircularProjection> {

    return this.create69$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularProjection>) => r.body as RestApiResponseCircularProjection)
    );
  }

  /**
   * Path part for operation get26
   */
  static readonly Get26Path = '/v1/circulars/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get26()` instead.
   *
   * This method doesn't expect any request body.
   */
  get26$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseCircularProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.Get26Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get26$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get26(params: {
    id: number;
  }): Observable<RestApiResponseCircularProjection> {

    return this.get26$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularProjection>) => r.body as RestApiResponseCircularProjection)
    );
  }

  /**
   * Path part for operation sendToManager
   */
  static readonly SendToManagerPath = '/v1/circulars/send/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendToManager()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendToManager$Response(params: {
    id: Circular;
    manager: (User | UserInappAuthentication | UserMiddlewareAuth);
  }): Observable<StrictHttpResponse<RestApiResponseCircularMinimumProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.SendToManagerPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('manager', params.manager, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularMinimumProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sendToManager$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendToManager(params: {
    id: Circular;
    manager: (User | UserInappAuthentication | UserMiddlewareAuth);
  }): Observable<RestApiResponseCircularMinimumProjection> {

    return this.sendToManager$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularMinimumProjection>) => r.body as RestApiResponseCircularMinimumProjection)
    );
  }

  /**
   * Path part for operation generate3
   */
  static readonly Generate3Path = '/v1/circulars/review/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `generate3()` instead.
   *
   * This method doesn't expect any request body.
   */
  generate3$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.Generate3Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `generate3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  generate3(params: {
    id: number;
  }): Observable<void> {

    return this.generate3$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation reject
   */
  static readonly RejectPath = '/v1/circulars/reject/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `reject()` instead.
   *
   * This method doesn't expect any request body.
   */
  reject$Response(params: {
    id: Circular;
  }): Observable<StrictHttpResponse<RestApiResponseCircularMinimumProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.RejectPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularMinimumProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `reject$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  reject(params: {
    id: Circular;
  }): Observable<RestApiResponseCircularMinimumProjection> {

    return this.reject$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularMinimumProjection>) => r.body as RestApiResponseCircularMinimumProjection)
    );
  }

  /**
   * Path part for operation publish
   */
  static readonly PublishPath = '/v1/circulars/publish/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `publish()` instead.
   *
   * This method doesn't expect any request body.
   */
  publish$Response(params: {
    id: Circular;
    withArch?: boolean;
  }): Observable<StrictHttpResponse<RestApiResponseCircularMinimumProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.PublishPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('withArch', params.withArch, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularMinimumProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `publish$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  publish(params: {
    id: Circular;
    withArch?: boolean;
  }): Observable<RestApiResponseCircularMinimumProjection> {

    return this.publish$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularMinimumProjection>) => r.body as RestApiResponseCircularMinimumProjection)
    );
  }

  /**
   * Path part for operation getNextNumber
   */
  static readonly GetNextNumberPath = '/v1/circulars/nextNumber';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNextNumber()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNextNumber$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseMapStringString>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.GetNextNumberPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseMapStringString>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNextNumber$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNextNumber(params?: {
  }): Observable<RestApiResponseMapStringString> {

    return this.getNextNumber$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseMapStringString>) => r.body as RestApiResponseMapStringString)
    );
  }

  /**
   * Path part for operation archive2
   */
  static readonly Archive2Path = '/v1/circulars/archive/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `archive2()` instead.
   *
   * This method doesn't expect any request body.
   */
  archive2$Response(params: {
    id: Circular;
  }): Observable<StrictHttpResponse<RestApiResponseCircularMinimumProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.Archive2Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularMinimumProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `archive2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  archive2(params: {
    id: Circular;
  }): Observable<RestApiResponseCircularMinimumProjection> {

    return this.archive2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularMinimumProjection>) => r.body as RestApiResponseCircularMinimumProjection)
    );
  }

  /**
   * Path part for operation approve1
   */
  static readonly Approve1Path = '/v1/circulars/approve/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approve1()` instead.
   *
   * This method doesn't expect any request body.
   */
  approve1$Response(params: {
    id: Circular;
  }): Observable<StrictHttpResponse<RestApiResponseCircularMinimumProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularControllerService.Approve1Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularMinimumProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `approve1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approve1(params: {
    id: Circular;
  }): Observable<RestApiResponseCircularMinimumProjection> {

    return this.approve1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularMinimumProjection>) => r.body as RestApiResponseCircularMinimumProjection)
    );
  }

}
