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
import { RestApiResponseListCommunityNameProjection } from '../models/rest-api-response-list-community-name-projection';
import { RestApiResponseListDistrictNameProjection } from '../models/rest-api-response-list-district-name-projection';
import { RestApiResponseListIdNameProjection } from '../models/rest-api-response-list-id-name-projection';
import { RestApiResponseListMapStringObject } from '../models/rest-api-response-list-map-string-object';
import { RestApiResponsePageServiceCenterArea } from '../models/rest-api-response-page-service-center-area';

@Injectable()
export class ServiceCenterAreaServiceControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getDistrictList
   */
  static readonly GetDistrictListPath = '/v1/service-center-area/district-list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDistrictList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDistrictList$Response(params?: {
    'district-name-ar'?: string;
    'district-name-en'?: string;
    'center-name-ar'?: string;
    'center-name-en'?: string;
    centerId?: number;
  }): Observable<StrictHttpResponse<RestApiResponseListDistrictNameProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceCenterAreaServiceControllerService.GetDistrictListPath, 'get');
    if (params) {
      rb.query('district-name-ar', params['district-name-ar'], {});
      rb.query('district-name-en', params['district-name-en'], {});
      rb.query('center-name-ar', params['center-name-ar'], {});
      rb.query('center-name-en', params['center-name-en'], {});
      rb.query('centerId', params.centerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListDistrictNameProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDistrictList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDistrictList(params?: {
    'district-name-ar'?: string;
    'district-name-en'?: string;
    'center-name-ar'?: string;
    'center-name-en'?: string;
    centerId?: number;
  }): Observable<RestApiResponseListDistrictNameProjection> {

    return this.getDistrictList$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListDistrictNameProjection>) => r.body as RestApiResponseListDistrictNameProjection)
    );
  }

  /**
   * Path part for operation getCommunityByDistrictName
   */
  static readonly GetCommunityByDistrictNamePath = '/v1/service-center-area/community';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCommunityByDistrictName()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommunityByDistrictName$Response(params?: {
    zoneId?: number;
    'district-name'?: string;
  }): Observable<StrictHttpResponse<RestApiResponseListCommunityNameProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceCenterAreaServiceControllerService.GetCommunityByDistrictNamePath, 'get');
    if (params) {
      rb.query('zoneId', params.zoneId, {});
      rb.query('district-name', params['district-name'], {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListCommunityNameProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCommunityByDistrictName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCommunityByDistrictName(params?: {
    zoneId?: number;
    'district-name'?: string;
  }): Observable<RestApiResponseListCommunityNameProjection> {

    return this.getCommunityByDistrictName$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListCommunityNameProjection>) => r.body as RestApiResponseListCommunityNameProjection)
    );
  }

  /**
   * Path part for operation getDistrictListByCity
   */
  static readonly GetDistrictListByCityPath = '/v1/service-center-area/cities/{cityId}/districts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getDistrictListByCity()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDistrictListByCity$Response(params: {
    cityId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListDistrictNameProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceCenterAreaServiceControllerService.GetDistrictListByCityPath, 'get');
    if (params) {
      rb.path('cityId', params.cityId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListDistrictNameProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getDistrictListByCity$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getDistrictListByCity(params: {
    cityId: number;
  }): Observable<RestApiResponseListDistrictNameProjection> {

    return this.getDistrictListByCity$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListDistrictNameProjection>) => r.body as RestApiResponseListDistrictNameProjection)
    );
  }

  /**
   * Path part for operation getCenters
   */
  static readonly GetCentersPath = '/v1/service-center-area/centers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCenters()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCenters$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListMapStringObject>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceCenterAreaServiceControllerService.GetCentersPath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `getCenters$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCenters(params?: {
  }): Observable<RestApiResponseListMapStringObject> {

    return this.getCenters$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListMapStringObject>) => r.body as RestApiResponseListMapStringObject)
    );
  }

  /**
   * Path part for operation getCenterList
   */
  static readonly GetCenterListPath = '/v1/service-center-area/center-list';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCenterList()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCenterList$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListIdNameProjection>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceCenterAreaServiceControllerService.GetCenterListPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListIdNameProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCenterList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCenterList(params?: {
  }): Observable<RestApiResponseListIdNameProjection> {

    return this.getCenterList$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListIdNameProjection>) => r.body as RestApiResponseListIdNameProjection)
    );
  }

  /**
   * Path part for operation page2
   */
  static readonly Page2Path = '/v1/service-center-area';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `page2()` instead.
   *
   * This method doesn't expect any request body.
   */
  page2$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageServiceCenterArea>> {

    const rb = new RequestBuilder(this.rootUrl, ServiceCenterAreaServiceControllerService.Page2Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageServiceCenterArea>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `page2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  page2(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageServiceCenterArea> {

    return this.page2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageServiceCenterArea>) => r.body as RestApiResponsePageServiceCenterArea)
    );
  }

}
