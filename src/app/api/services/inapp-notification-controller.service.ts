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

import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseLong } from '../models/rest-api-response-long';
import { RestApiResponsePageInappNotification } from '../models/rest-api-response-page-inapp-notification';
import { RestApiResponsePageInappNotificationProjection } from '../models/rest-api-response-page-inapp-notification-projection';

@Injectable()
export class InappNotificationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation markRead
   */
  static readonly MarkReadPath = '/v1/inapp-notif/mark-read/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `markRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  markRead$Response(params: {
    id: number;
    ids?: Array<number>;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, InappNotificationControllerService.MarkReadPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('ids', params.ids, {});
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
   * To access the full response (for headers, for example), `markRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  markRead(params: {
    id: number;
    ids?: Array<number>;
  }): Observable<RestApiResponseBoolean> {

    return this.markRead$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation markAllRead
   */
  static readonly MarkAllReadPath = '/v1/inapp-notif/mark-all-read';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `markAllRead()` instead.
   *
   * This method doesn't expect any request body.
   */
  markAllRead$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, InappNotificationControllerService.MarkAllReadPath, 'put');
    if (params) {
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
   * To access the full response (for headers, for example), `markAllRead$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  markAllRead(params?: {
  }): Observable<RestApiResponseBoolean> {

    return this.markAllRead$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation unread
   */
  static readonly UnreadPath = '/v1/inapp-notif/unread';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unread()` instead.
   *
   * This method doesn't expect any request body.
   */
  unread$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, InappNotificationControllerService.UnreadPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unread$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unread(params?: {
  }): Observable<RestApiResponseLong> {

    return this.unread$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

  /**
   * Path part for operation getInappNotification
   */
  static readonly GetInappNotificationPath = '/v1/inapp-notif/transactions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getInappNotification()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInappNotification$Response(params: {
    notificationTransId?: Array<number>;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageInappNotificationProjection>> {

    const rb = new RequestBuilder(this.rootUrl, InappNotificationControllerService.GetInappNotificationPath, 'get');
    if (params) {
      rb.query('notificationTransId', params.notificationTransId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageInappNotificationProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getInappNotification$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getInappNotification(params: {
    notificationTransId?: Array<number>;
    pageable: Pageable;
  }): Observable<RestApiResponsePageInappNotificationProjection> {

    return this.getInappNotification$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageInappNotificationProjection>) => r.body as RestApiResponsePageInappNotificationProjection)
    );
  }

  /**
   * Path part for operation get19
   */
  static readonly Get19Path = '/v1/inapp-notif';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get19()` instead.
   *
   * This method doesn't expect any request body.
   */
  get19$Response(params: {
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageInappNotification>> {

    const rb = new RequestBuilder(this.rootUrl, InappNotificationControllerService.Get19Path, 'get');
    if (params) {
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageInappNotification>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get19(params: {
    page: Pageable;
  }): Observable<RestApiResponsePageInappNotification> {

    return this.get19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageInappNotification>) => r.body as RestApiResponsePageInappNotification)
    );
  }

}
