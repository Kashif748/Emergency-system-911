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
   * Path part for operation delete11
   */
  static readonly Delete11Path = '/v1/incident-reminder/delete/{reminderId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete11()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete11$Response(params: {
    reminderId: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReminderControllerService.Delete11Path, 'put');
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
   * To access the full response (for headers, for example), `delete11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete11(params: {
    reminderId: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete11$Response(params).pipe(
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
   * Path part for operation update38
   */
  static readonly Update38Path = '/v1/incident-reminder';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update38()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update38$Response(params: {
    body: IncidentReminder
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReminderProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReminderControllerService.Update38Path, 'put');
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
   * To access the full response (for headers, for example), `update38$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update38(params: {
    body: IncidentReminder
  }): Observable<RestApiResponseIncidentReminderProjection> {

    return this.update38$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReminderProjection>) => r.body as RestApiResponseIncidentReminderProjection)
    );
  }

  /**
   * Path part for operation create35
   */
  static readonly Create35Path = '/v1/incident-reminder';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create35()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create35$Response(params: {
    body: IncidentReminder
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReminderProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReminderControllerService.Create35Path, 'post');
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
   * To access the full response (for headers, for example), `create35$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create35(params: {
    body: IncidentReminder
  }): Observable<RestApiResponseIncidentReminderProjection> {

    return this.create35$Response(params).pipe(
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
