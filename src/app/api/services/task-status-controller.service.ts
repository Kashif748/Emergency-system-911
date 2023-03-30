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

import { RestApiResponseListTaskStatus } from '../models/rest-api-response-list-task-status';

@Injectable()
export class TaskStatusControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActiveList
   */
  static readonly FindActiveListPath = '/v1/task-statuses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActiveList()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveList$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListTaskStatus>> {

    const rb = new RequestBuilder(this.rootUrl, TaskStatusControllerService.FindActiveListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListTaskStatus>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActiveList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActiveList(params?: {
  }): Observable<RestApiResponseListTaskStatus> {

    return this.findActiveList$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListTaskStatus>) => r.body as RestApiResponseListTaskStatus)
    );
  }

}
