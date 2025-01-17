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

import { RestApiResponseSmsNotification } from '../models/rest-api-response-sms-notification';

@Injectable()
export class ResendSmsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation sendSms
   */
  static readonly SendSmsPath = '/v1/resend-send-sms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sendSms()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendSms$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseSmsNotification>> {

    const rb = new RequestBuilder(this.rootUrl, ResendSmsControllerService.SendSmsPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `sendSms$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sendSms(params: {
    id: number;
  }): Observable<RestApiResponseSmsNotification> {

    return this.sendSms$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseSmsNotification>) => r.body as RestApiResponseSmsNotification)
    );
  }

}
