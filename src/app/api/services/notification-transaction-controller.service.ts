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
import { RestApiResponsePageNotificationTransactionProjection } from '../models/rest-api-response-page-notification-transaction-projection';

@Injectable()
export class NotificationTransactionControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getNotificationTransaction
   */
  static readonly GetNotificationTransactionPath = '/v1/notification-transactions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getNotificationTransaction()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNotificationTransaction$Response(params: {
    moduleId: number;
    recordId: number;
    fromDate?: string;
    toDate?: string;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageNotificationTransactionProjection>> {

    const rb = new RequestBuilder(this.rootUrl, NotificationTransactionControllerService.GetNotificationTransactionPath, 'get');
    if (params) {
      rb.query('moduleId', params.moduleId, {});
      rb.query('recordId', params.recordId, {});
      rb.query('fromDate', params.fromDate, {});
      rb.query('toDate', params.toDate, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageNotificationTransactionProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getNotificationTransaction$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getNotificationTransaction(params: {
    moduleId: number;
    recordId: number;
    fromDate?: string;
    toDate?: string;
    pageable: Pageable;
  }): Observable<RestApiResponsePageNotificationTransactionProjection> {

    return this.getNotificationTransaction$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageNotificationTransactionProjection>) => r.body as RestApiResponsePageNotificationTransactionProjection)
    );
  }

}
