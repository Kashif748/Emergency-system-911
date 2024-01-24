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

import { EventsConfigSms } from '../models/events-config-sms';
import { Pageable } from '../models/pageable';
import { RestApiResponseEventsConfigSms } from '../models/rest-api-response-events-config-sms';
import { RestApiResponseEventsConfigSmsProjection } from '../models/rest-api-response-events-config-sms-projection';
import { RestApiResponsePageEventsConfigSmsProjection } from '../models/rest-api-response-page-events-config-sms-projection';

@Injectable()
export class EventsConfigSmsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation update66
   */
  static readonly Update66Path = '/v1/events-config-sms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update66()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update66$Response(params: {
    body: EventsConfigSms
  }): Observable<StrictHttpResponse<RestApiResponseEventsConfigSmsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, EventsConfigSmsControllerService.Update66Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseEventsConfigSmsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update66$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update66(params: {
    body: EventsConfigSms
  }): Observable<RestApiResponseEventsConfigSmsProjection> {

    return this.update66$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseEventsConfigSmsProjection>) => r.body as RestApiResponseEventsConfigSmsProjection)
    );
  }

  /**
   * Path part for operation getById9
   */
  static readonly GetById9Path = '/v1/events-config-sms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById9()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById9$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseEventsConfigSms>> {

    const rb = new RequestBuilder(this.rootUrl, EventsConfigSmsControllerService.GetById9Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseEventsConfigSms>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById9(params: {
    id: number;
  }): Observable<RestApiResponseEventsConfigSms> {

    return this.getById9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseEventsConfigSms>) => r.body as RestApiResponseEventsConfigSms)
    );
  }

  /**
   * Path part for operation getSmsNotificationTemplates
   */
  static readonly GetSmsNotificationTemplatesPath = '/v1/events-config-sms/templates';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSmsNotificationTemplates()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSmsNotificationTemplates$Response(params: {
    moduleId?: Array<number>;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageEventsConfigSmsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, EventsConfigSmsControllerService.GetSmsNotificationTemplatesPath, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageEventsConfigSmsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getSmsNotificationTemplates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSmsNotificationTemplates(params: {
    moduleId?: Array<number>;
    page: Pageable;
  }): Observable<RestApiResponsePageEventsConfigSmsProjection> {

    return this.getSmsNotificationTemplates$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageEventsConfigSmsProjection>) => r.body as RestApiResponsePageEventsConfigSmsProjection)
    );
  }

}
