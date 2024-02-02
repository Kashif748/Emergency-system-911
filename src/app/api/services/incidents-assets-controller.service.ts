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

import { IncidentAssetsStatisticsFilters } from '../models/incident-assets-statistics-filters';
import { IncidentsAssets } from '../models/incidents-assets';
import { Pageable } from '../models/pageable';
import { RestApiResponseIncidentAssetsProjection } from '../models/rest-api-response-incident-assets-projection';
import { RestApiResponseIncidentsAssets } from '../models/rest-api-response-incidents-assets';
import { RestApiResponseListMapStringObject } from '../models/rest-api-response-list-map-string-object';
import { RestApiResponsePageIncidentAssetsProjection } from '../models/rest-api-response-page-incident-assets-projection';

@Injectable()
export class IncidentsAssetsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findActivePage12
   */
  static readonly FindActivePage12Path = '/v1/incident-assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage12()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage12$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.FindActivePage12Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentAssetsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage12(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentAssetsProjection> {

    return this.findActivePage12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentAssetsProjection>) => r.body as RestApiResponsePageIncidentAssetsProjection)
    );
  }

  /**
   * Path part for operation update47
   */
  static readonly Update47Path = '/v1/incident-assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update47()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update47$Response(params: {
    body: IncidentsAssets
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsAssets>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.Update47Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentsAssets>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update47$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update47(params: {
    body: IncidentsAssets
  }): Observable<RestApiResponseIncidentsAssets> {

    return this.update47$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentsAssets>) => r.body as RestApiResponseIncidentsAssets)
    );
  }

  /**
   * Path part for operation create42
   */
  static readonly Create42Path = '/v1/incident-assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create42()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create42$Response(params: {
    body: IncidentsAssets
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsAssets>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.Create42Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentsAssets>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create42$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create42(params: {
    body: IncidentsAssets
  }): Observable<RestApiResponseIncidentsAssets> {

    return this.create42$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentsAssets>) => r.body as RestApiResponseIncidentsAssets)
    );
  }

  /**
   * Path part for operation getActiveIncidentAssets
   */
  static readonly GetActiveIncidentAssetsPath = '/v1/incident-assets/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveIncidentAssets()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveIncidentAssets$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseIncidentAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.GetActiveIncidentAssetsPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseIncidentAssetsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveIncidentAssets$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveIncidentAssets(params: {
    id: number;
  }): Observable<RestApiResponseIncidentAssetsProjection> {

    return this.getActiveIncidentAssets$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentAssetsProjection>) => r.body as RestApiResponseIncidentAssetsProjection)
    );
  }

  /**
   * Path part for operation incidentAssetsStatistics
   */
  static readonly IncidentAssetsStatisticsPath = '/v1/incident-assets/statistics';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incidentAssetsStatistics()` instead.
   *
   * This method doesn't expect any request body.
   */
  incidentAssetsStatistics$Response(params: {
    filter: IncidentAssetsStatisticsFilters;
  }): Observable<StrictHttpResponse<RestApiResponseListMapStringObject>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.IncidentAssetsStatisticsPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListMapStringObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `incidentAssetsStatistics$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  incidentAssetsStatistics(params: {
    filter: IncidentAssetsStatisticsFilters;
  }): Observable<RestApiResponseListMapStringObject> {

    return this.incidentAssetsStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListMapStringObject>) => r.body as RestApiResponseListMapStringObject)
    );
  }

  /**
   * Path part for operation search6
   */
  static readonly Search6Path = '/v1/incident-assets/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search6()` instead.
   *
   * This method doesn't expect any request body.
   */
  search6$Response(params: {
    incidentId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.Search6Path, 'get');
    if (params) {
      rb.query('incidentId', params.incidentId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageIncidentAssetsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search6$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search6(params: {
    incidentId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentAssetsProjection> {

    return this.search6$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentAssetsProjection>) => r.body as RestApiResponsePageIncidentAssetsProjection)
    );
  }

}
