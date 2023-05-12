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

import { NotificationDetails } from '../models/notification-details';
import { Pageable } from '../models/pageable';
import { RestApiResponsePageSmsNotification } from '../models/rest-api-response-page-sms-notification';
import { RestApiResponsePageSmsNotificationProjection } from '../models/rest-api-response-page-sms-notification-projection';
import { RestApiResponseSmsNotification } from '../models/rest-api-response-sms-notification';

@Injectable()
export class NotificationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation update21
   */
  static readonly Update21Path = '/v1/notification/sms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update21()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update21$Response(params: {
    id: number;
    body: NotificationDetails
  }): Observable<StrictHttpResponse<RestApiResponseSmsNotification>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.Update21Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseSmsNotification>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update21$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update21(params: {
    id: number;
    body: NotificationDetails
  }): Observable<RestApiResponseSmsNotification> {

    return this.update21$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSmsNotification>) => r.body as RestApiResponseSmsNotification)
    );
  }

  /**
   * Path part for operation get10
   */
  static readonly Get10Path = '/v1/notification/transactions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get10()` instead.
   *
   * This method doesn't expect any request body.
   */
  get10$Response(params: {
    notificationTransId?: Array<number>;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageSmsNotificationProjection>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.Get10Path, 'get');
    if (params) {
      rb.query('notificationTransId', params.notificationTransId, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageSmsNotificationProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get10(params: {
    notificationTransId?: Array<number>;
    page: Pageable;
  }): Observable<RestApiResponsePageSmsNotificationProjection> {

    return this.get10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageSmsNotificationProjection>) => r.body as RestApiResponsePageSmsNotificationProjection)
    );
  }

  /**
   * Path part for operation get11
   */
  static readonly Get11Path = '/v1/notification';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get11()` instead.
   *
   * This method doesn't expect any request body.
   */
  get11$Response(params: {
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageSmsNotification>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationControllerService.Get11Path, 'get');
    if (params) {
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageSmsNotification>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get11(params: {
    page: Pageable;
  }): Observable<RestApiResponsePageSmsNotification> {

    return this.get11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageSmsNotification>) => r.body as RestApiResponsePageSmsNotification)
    );
  }

}
