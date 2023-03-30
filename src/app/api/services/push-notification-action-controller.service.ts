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
import { PushNotificationAction } from '../models/push-notification-action';
import { RestApiResponsePagePushNotificationAction } from '../models/rest-api-response-page-push-notification-action';
import { RestApiResponsePushNotificationAction } from '../models/rest-api-response-push-notification-action';

@Injectable()
export class PushNotificationActionControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation page4
   */
  static readonly Page4Path = '/v1/push-notificatio-actions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page4()` instead.
   *
   * This method doesn't expect any request body.
   */
  page4$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePagePushNotificationAction>> {

    const rb = new RequestBuilder(this.rootUrl, PushNotificationActionControllerService.Page4Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePagePushNotificationAction>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page4(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePagePushNotificationAction> {

    return this.page4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePagePushNotificationAction>) => r.body as RestApiResponsePagePushNotificationAction)
    );
  }

  /**
   * Path part for operation update14
   */
  static readonly Update14Path = '/v1/push-notificatio-actions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update14()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update14$Response(params: {
    body: PushNotificationAction
  }): Observable<StrictHttpResponse<RestApiResponsePushNotificationAction>> {

    const rb = new RequestBuilder(this.rootUrl, PushNotificationActionControllerService.Update14Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePushNotificationAction>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update14$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update14(params: {
    body: PushNotificationAction
  }): Observable<RestApiResponsePushNotificationAction> {

    return this.update14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePushNotificationAction>) => r.body as RestApiResponsePushNotificationAction)
    );
  }

  /**
   * Path part for operation create14
   */
  static readonly Create14Path = '/v1/push-notificatio-actions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create14()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create14$Response(params: {
    body: PushNotificationAction
  }): Observable<StrictHttpResponse<RestApiResponsePushNotificationAction>> {

    const rb = new RequestBuilder(this.rootUrl, PushNotificationActionControllerService.Create14Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePushNotificationAction>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create14$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create14(params: {
    body: PushNotificationAction
  }): Observable<RestApiResponsePushNotificationAction> {

    return this.create14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePushNotificationAction>) => r.body as RestApiResponsePushNotificationAction)
    );
  }

  /**
   * Path part for operation get7
   */
  static readonly Get7Path = '/v1/push-notificatio-actions/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get7()` instead.
   *
   * This method doesn't expect any request body.
   */
  get7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponsePushNotificationAction>> {

    const rb = new RequestBuilder(this.rootUrl, PushNotificationActionControllerService.Get7Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePushNotificationAction>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get7(params: {
    id: number;
  }): Observable<RestApiResponsePushNotificationAction> {

    return this.get7$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePushNotificationAction>) => r.body as RestApiResponsePushNotificationAction)
    );
  }

}
