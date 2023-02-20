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
import { RestApiResponsePageNotificationPlaceholder } from '../models/rest-api-response-page-notification-placeholder';

@Injectable()
export class NotificationPlaceHolderControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getNotificationPlaceHolders
   */
  static readonly GetNotificationPlaceHoldersPath = '/v1/notification-placeholder';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNotificationPlaceHolders()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNotificationPlaceHolders$Response(params: {
    moduleId?: Array<number>;
    page: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageNotificationPlaceholder>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationPlaceHolderControllerService.GetNotificationPlaceHoldersPath, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageNotificationPlaceholder>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNotificationPlaceHolders$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNotificationPlaceHolders(params: {
    moduleId?: Array<number>;
    page: Pageable;
  }): Observable<RestApiResponsePageNotificationPlaceholder> {

    return this.getNotificationPlaceHolders$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageNotificationPlaceholder>) => r.body as RestApiResponsePageNotificationPlaceholder)
    );
  }

}
