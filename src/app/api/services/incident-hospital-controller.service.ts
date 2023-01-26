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

import { IncidentHospital } from '../models/incident-hospital';
import { RestApiResponseListIncidentHospital } from '../models/rest-api-response-list-incident-hospital';
import { RestApiResponseListIncidentHospitalProjection } from '../models/rest-api-response-list-incident-hospital-projection';

@Injectable()
export class IncidentHospitalControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllIncidentHospital
   */
  static readonly GetAllIncidentHospitalPath = '/v1/incident-hospitals/{incidentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllIncidentHospital()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllIncidentHospital$Response(params: {
    incidentId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentHospitalProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentHospitalControllerService.GetAllIncidentHospitalPath, 'get');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentHospitalProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllIncidentHospital$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllIncidentHospital(params: {
    incidentId: number;
  }): Observable<RestApiResponseListIncidentHospitalProjection> {

    return this.getAllIncidentHospital$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentHospitalProjection>) => r.body as RestApiResponseListIncidentHospitalProjection)
    );
  }

  /**
   * Path part for operation updateHospitals
   */
  static readonly UpdateHospitalsPath = '/v1/incident-hospitals/{incidentId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateHospitals()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHospitals$Response(params: {
    incidentId: number;
    body: Array<IncidentHospital>
  }): Observable<StrictHttpResponse<RestApiResponseListIncidentHospital>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentHospitalControllerService.UpdateHospitalsPath, 'put');
    if (params) {
      rb.path('incidentId', params.incidentId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIncidentHospital>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateHospitals$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateHospitals(params: {
    incidentId: number;
    body: Array<IncidentHospital>
  }): Observable<RestApiResponseListIncidentHospital> {

    return this.updateHospitals$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIncidentHospital>) => r.body as RestApiResponseListIncidentHospital)
    );
  }

}
