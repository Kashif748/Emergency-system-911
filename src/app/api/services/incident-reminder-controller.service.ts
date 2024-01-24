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

import { IncidentReminder } from '../models/incident-reminder';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseIncidentReminder } from '../models/rest-api-response-incident-reminder';
import { RestApiResponseIncidentReminderProjection } from '../models/rest-api-response-incident-reminder-projection';
import { RestApiResponsePageIncidentReminderProjection } from '../models/rest-api-response-page-incident-reminder-projection';

@Injectable()
export class IncidentReminderControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete12
   */
  static readonly Delete12Path = '/v1/incident-reminder/delete/{reminderId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete12()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete12$Response(params: {
    reminderId: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReminderControllerService.Delete12Path, 'put');
    if (params) {
      rb.path('reminderId', params.reminderId, {});
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
   * To access the full response (for headers, for example), `delete12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete12(params: {
    reminderId: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation getReminders
   */
  static readonly GetRemindersPath = '/v1/incident-reminder';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getReminders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReminders$Response(params: {
    incidentId: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentReminderProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReminderControllerService.GetRemindersPath, 'get');
    if (params) {
      rb.query('incidentId', params.incidentId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentReminderProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getReminders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReminders(params: {
    incidentId: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentReminderProjection> {

    return this.getReminders$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentReminderProjection>) => r.body as RestApiResponsePageIncidentReminderProjection)
    );
  }

  /**
   * Path part for operation update40
   */
  static readonly Update40Path = '/v1/incident-reminder';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update40()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update40$Response(params: {
    body: IncidentReminder
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReminderProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReminderControllerService.Update40Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentReminderProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update40$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update40(params: {
    body: IncidentReminder
  }): Observable<RestApiResponseIncidentReminderProjection> {

    return this.update40$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReminderProjection>) => r.body as RestApiResponseIncidentReminderProjection)
    );
  }

  /**
   * Path part for operation create36
   */
  static readonly Create36Path = '/v1/incident-reminder';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create36()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create36$Response(params: {
    body: IncidentReminder
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReminderProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReminderControllerService.Create36Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentReminderProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create36$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create36(params: {
    body: IncidentReminder
  }): Observable<RestApiResponseIncidentReminderProjection> {

    return this.create36$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReminderProjection>) => r.body as RestApiResponseIncidentReminderProjection)
    );
  }

  /**
   * Path part for operation getByReminderId
   */
  static readonly GetByReminderIdPath = '/v1/incident-reminder/{reminderId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByReminderId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByReminderId$Response(params: {
    reminderId: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReminder>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReminderControllerService.GetByReminderIdPath, 'get');
    if (params) {
      rb.path('reminderId', params.reminderId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentReminder>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getByReminderId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByReminderId(params: {
    reminderId: number;
  }): Observable<RestApiResponseIncidentReminder> {

    return this.getByReminderId$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReminder>) => r.body as RestApiResponseIncidentReminder)
    );
  }

}
