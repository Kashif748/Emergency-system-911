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

import { InspectionRequest } from '../models/inspection-request';
import { Pageable } from '../models/pageable';
import { RestApiResponseLong } from '../models/rest-api-response-long';
import { RestApiResponsePageListInspection } from '../models/rest-api-response-page-list-inspection';

@Injectable()
export class InspectionControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAllWithFilterAndCount
   */
  static readonly GetAllWithFilterAndCountPath = '/v1/inspection/filterAndCount';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWithFilterAndCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWithFilterAndCount$Response(params: {
    inspectionRequest: InspectionRequest;
  }): Observable<StrictHttpResponse<RestApiResponseLong>> {

    const rb = new RequestBuilder(this.rootUrl, InspectionControllerService.GetAllWithFilterAndCountPath, 'get');
    if (params) {
      rb.query('inspectionRequest', params.inspectionRequest, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllWithFilterAndCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWithFilterAndCount(params: {
    inspectionRequest: InspectionRequest;
  }): Observable<RestApiResponseLong> {

    return this.getAllWithFilterAndCount$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseLong>) => r.body as RestApiResponseLong)
    );
  }

  /**
   * Path part for operation getAllByFilter
   */
  static readonly GetAllByFilterPath = '/v1/inspection';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllByFilter()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllByFilter$Response(params: {
    inspectionRequest: InspectionRequest;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageListInspection>> {

    const rb = new RequestBuilder(this.rootUrl, InspectionControllerService.GetAllByFilterPath, 'get');
    if (params) {
      rb.query('inspectionRequest', params.inspectionRequest, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageListInspection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllByFilter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllByFilter(params: {
    inspectionRequest: InspectionRequest;
    pageable: Pageable;
  }): Observable<RestApiResponsePageListInspection> {

    return this.getAllByFilter$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageListInspection>) => r.body as RestApiResponsePageListInspection)
    );
  }

}
