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

import { IncidentStatisticsFilter } from '../models/incident-statistics-filter';
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
   * Path part for operation findActivePage11
   */
  static readonly FindActivePage11Path = '/v1/incident-assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage11()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage11$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.FindActivePage11Path, 'get');
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
   * To access the full response (for headers, for example), `findActivePage11$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage11(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentAssetsProjection> {

    return this.findActivePage11$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentAssetsProjection>) => r.body as RestApiResponsePageIncidentAssetsProjection)
    );
  }

  /**
   * Path part for operation update45
   */
  static readonly Update45Path = '/v1/incident-assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update45()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update45$Response(params: {
    body: IncidentsAssets
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsAssets>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.Update45Path, 'put');
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
   * To access the full response (for headers, for example), `update45$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update45(params: {
    body: IncidentsAssets
  }): Observable<RestApiResponseIncidentsAssets> {

    return this.update45$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseIncidentsAssets>) => r.body as RestApiResponseIncidentsAssets)
    );
  }

  /**
   * Path part for operation create41
   */
  static readonly Create41Path = '/v1/incident-assets';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create41()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create41$Response(params: {
    body: IncidentsAssets
  }): Observable<StrictHttpResponse<RestApiResponseIncidentsAssets>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.Create41Path, 'post');
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
   * To access the full response (for headers, for example), `create41$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create41(params: {
    body: IncidentsAssets
  }): Observable<RestApiResponseIncidentsAssets> {

    return this.create41$Response(params).pipe(
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
    incidentStatisticsFilter: IncidentStatisticsFilter;
  }): Observable<StrictHttpResponse<RestApiResponseListMapStringObject>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.IncidentAssetsStatisticsPath, 'get');
    if (params) {
      rb.query('incidentStatisticsFilter', params.incidentStatisticsFilter, {});
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
    incidentStatisticsFilter: IncidentStatisticsFilter;
  }): Observable<RestApiResponseListMapStringObject> {

    return this.incidentAssetsStatistics$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListMapStringObject>) => r.body as RestApiResponseListMapStringObject)
    );
  }

  /**
   * Path part for operation search5
   */
  static readonly Search5Path = '/v1/incident-assets/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search5()` instead.
   *
   * This method doesn't expect any request body.
   */
  search5$Response(params: {
    incidentId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageIncidentAssetsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, IncidentsAssetsControllerService.Search5Path, 'get');
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
   * To access the full response (for headers, for example), `search5$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search5(params: {
    incidentId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageIncidentAssetsProjection> {

    return this.search5$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageIncidentAssetsProjection>) => r.body as RestApiResponsePageIncidentAssetsProjection)
    );
  }

}
