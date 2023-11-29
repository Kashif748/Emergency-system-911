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

import { RestApiResponseTaskDetails } from '../models/rest-api-response-task-details';
import { TaskDetails } from '../models/task-details';

@Injectable()
export class ManualTaskForAdafasaService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation saveInformationSharing
   */
  static readonly SaveInformationSharingPath = '/v1/ext/create-task';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveInformationSharing()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInformationSharing$Response(params: {
    body: TaskDetails
  }): Observable<StrictHttpResponse<RestApiResponseTaskDetails>> {

    const rb = new RequestBuilder(this.rootUrl, ManualTaskForAdafasaService.SaveInformationSharingPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseTaskDetails>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveInformationSharing$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInformationSharing(params: {
    body: TaskDetails
  }): Observable<RestApiResponseTaskDetails> {

    return this.saveInformationSharing$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseTaskDetails>) => r.body as RestApiResponseTaskDetails)
    );
  }

}
