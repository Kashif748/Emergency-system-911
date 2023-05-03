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
import { PushNotificationBody } from '../models/push-notification-body';
import { RestApiResponsePagePushNotificationBody } from '../models/rest-api-response-page-push-notification-body';
import { RestApiResponsePagePushNotificationBodyProjection } from '../models/rest-api-response-page-push-notification-body-projection';
import { RestApiResponsePushNotificationBody } from '../models/rest-api-response-push-notification-body';
import { RestApiResponsePushNotificationBodyProjection } from '../models/rest-api-response-push-notification-body-projection';

@Injectable()
export class PushNotificationBodyControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation page3
   */
  static readonly Page3Path = '/v1/push-notificatios-body';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page3()` instead.
   *
   * This method doesn't expect any request body.
   */
  page3$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePagePushNotificationBody>> {

    const rb = new RequestBuilder(this.rootUrl, PushNotificationBodyControllerService.Page3Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePagePushNotificationBody>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page3(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePagePushNotificationBody> {

    return this.page3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePagePushNotificationBody>) => r.body as RestApiResponsePagePushNotificationBody)
    );
  }

  /**
   * Path part for operation update14
   */
  static readonly Update14Path = '/v1/push-notificatios-body';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update14()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update14$Response(params: {
    body: PushNotificationBody
  }): Observable<StrictHttpResponse<RestApiResponsePushNotificationBodyProjection>> {

    const rb = new RequestBuilder(this.rootUrl, PushNotificationBodyControllerService.Update14Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePushNotificationBodyProjection>;
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
    body: PushNotificationBody
  }): Observable<RestApiResponsePushNotificationBodyProjection> {

    return this.update14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePushNotificationBodyProjection>) => r.body as RestApiResponsePushNotificationBodyProjection)
    );
  }

  /**
   * Path part for operation create14
   */
  static readonly Create14Path = '/v1/push-notificatios-body';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create14()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create14$Response(params: {
    body: PushNotificationBody
  }): Observable<StrictHttpResponse<RestApiResponsePushNotificationBody>> {

    const rb = new RequestBuilder(this.rootUrl, PushNotificationBodyControllerService.Create14Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePushNotificationBody>;
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
    body: PushNotificationBody
  }): Observable<RestApiResponsePushNotificationBody> {

    return this.create14$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePushNotificationBody>) => r.body as RestApiResponsePushNotificationBody)
    );
  }

  /**
   * Path part for operation get6
   */
  static readonly Get6Path = '/v1/push-notificatios-body/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get6()` instead.
   *
   * This method doesn't expect any request body.
   */
  get6$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponsePushNotificationBody>> {

    const rb = new RequestBuilder(this.rootUrl, PushNotificationBodyControllerService.Get6Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePushNotificationBody>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get6(params: {
    id: number;
  }): Observable<RestApiResponsePushNotificationBody> {

    return this.get6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePushNotificationBody>) => r.body as RestApiResponsePushNotificationBody)
    );
  }

  /**
   * Path part for operation getPushNotificationTemplates
   */
  static readonly GetPushNotificationTemplatesPath = '/v1/push-notificatios-body/templates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPushNotificationTemplates()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPushNotificationTemplates$Response(params: {
    moduleId?: Array<number>;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePagePushNotificationBodyProjection>> {

    const rb = new RequestBuilder(this.rootUrl, PushNotificationBodyControllerService.GetPushNotificationTemplatesPath, 'get');
    if (params) {
      rb.query('moduleId', params.moduleId, {});
      rb.query('page', params.page, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePagePushNotificationBodyProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPushNotificationTemplates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPushNotificationTemplates(params: {
    moduleId?: Array<number>;
    page: Pageable;
  }): Observable<RestApiResponsePagePushNotificationBodyProjection> {

    return this.getPushNotificationTemplates$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePagePushNotificationBodyProjection>) => r.body as RestApiResponsePagePushNotificationBodyProjection)
    );
  }

}
