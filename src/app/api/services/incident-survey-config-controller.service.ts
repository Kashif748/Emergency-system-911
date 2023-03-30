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

import { RestApiResponseListIncidentSurveyConfig } from '../models/rest-api-response-list-incident-survey-config';

@Injectable()
export class IncidentSurveyConfigControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll
   */
  static readonly GetAllPath = '/v2/incident-survey-config/ext';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentSurveyConfig>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentSurveyConfigControllerService.GetAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentSurveyConfig>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll(params?: {
  }): Observable<RestApiResponseListIncidentSurveyConfig> {

    return this.getAll$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentSurveyConfig>) => r.body as RestApiResponseListIncidentSurveyConfig)
    );
  }

}
