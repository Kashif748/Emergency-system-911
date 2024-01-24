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

import { IncidentReporterLocationModel } from '../models/incident-reporter-location-model';
import { RestApiResponseIncidentReporterLocation } from '../models/rest-api-response-incident-reporter-location';

@Injectable()
export class IncidentReporterLocationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation create49
   */
  static readonly Create49Path = '/v1/ext/incident-reporter-location';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create49()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create49$Response(params: {
    body: IncidentReporterLocationModel
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReporterLocation>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReporterLocationControllerService.Create49Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentReporterLocation>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create49$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create49(params: {
    body: IncidentReporterLocationModel
  }): Observable<RestApiResponseIncidentReporterLocation> {

    return this.create49$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReporterLocation>) => r.body as RestApiResponseIncidentReporterLocation)
    );
  }

  /**
   * Path part for operation get18
   */
  static readonly Get18Path = '/v1/incident-reporter-location/{incidentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get18()` instead.
   *
   * This method doesn't expect any request body.
   */
  get18$Response(params: {
    incidentId: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentReporterLocation>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentReporterLocationControllerService.Get18Path, 'get');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentReporterLocation>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get18$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get18(params: {
    incidentId: number;
  }): Observable<RestApiResponseIncidentReporterLocation> {

    return this.get18$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentReporterLocation>) => r.body as RestApiResponseIncidentReporterLocation)
    );
  }

}
