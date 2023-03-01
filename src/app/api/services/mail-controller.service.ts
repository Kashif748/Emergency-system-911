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
import { RestApiResponseObject } from '../models/rest-api-response-object';
import { RestApiResponsePageEmailNotificationProjection } from '../models/rest-api-response-page-email-notification-projection';
import { SendMailToUsers } from '../models/send-mail-to-users';

@Injectable()
export class MailControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation send1
   */
  static readonly Send1Path = '/v1/mail/send';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `send1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  send1$Response(params: {
    body: SendMailToUsers
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, MailControllerService.Send1Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `send1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  send1(params: {
    body: SendMailToUsers
  }): Observable<RestApiResponseObject> {

    return this.send1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

  /**
   * Path part for operation getEmailNotification
   */
  static readonly GetEmailNotificationPath = '/v1/mail/transactions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEmailNotification()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEmailNotification$Response(params: {
    notificationTransId?: Array<number>;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageEmailNotificationProjection>> {

    const rb = new RequestBuilder(this.rootUrl, MailControllerService.GetEmailNotificationPath, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageEmailNotificationProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEmailNotification$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEmailNotification(params: {
    notificationTransId?: Array<number>;
    pageable: Pageable;
  }): Observable<RestApiResponsePageEmailNotificationProjection> {

    return this.getEmailNotification$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageEmailNotificationProjection>) => r.body as RestApiResponsePageEmailNotificationProjection)
    );
  }

}
