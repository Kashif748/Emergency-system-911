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

import { RestApiResponseCommonDataProjection } from '../models/rest-api-response-common-data-projection';

@Injectable()
export class CommonControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation commonFullData
   */
  static readonly CommonFullDataPath = '/v1/common/full-data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `commonFullData()` instead.
   *
   * This method doesn't expect any request body.
   */
  commonFullData$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseCommonDataProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CommonControllerService.CommonFullDataPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCommonDataProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `commonFullData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  commonFullData(params?: {
  }): Observable<RestApiResponseCommonDataProjection> {

    return this.commonFullData$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCommonDataProjection>) => r.body as RestApiResponseCommonDataProjection)
    );
  }

  /**
   * Path part for operation utm2Url
   */
  static readonly Utm2UrlPath = '/v1/common/ext/utm-to-url';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `utm2Url()` instead.
   *
   * This method doesn't expect any request body.
   */
  utm2Url$Response(params: {
    utm: string;
  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, CommonControllerService.Utm2UrlPath, 'get');
    if (params) {
      rb.query('utm', params.utm, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `utm2Url$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  utm2Url(params: {
    utm: string;
  }): Observable<{  }> {

    return this.utm2Url$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation utm2Corr
   */
  static readonly Utm2CorrPath = '/v1/common/ext/utm-to-deg';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `utm2Corr()` instead.
   *
   * This method doesn't expect any request body.
   */
  utm2Corr$Response(params: {
    utm: string;
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, CommonControllerService.Utm2CorrPath, 'get');
    if (params) {
      rb.query('utm', params.utm, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `utm2Corr$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  utm2Corr(params: {
    utm: string;
  }): Observable<string> {

    return this.utm2Corr$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation url2Utm
   */
  static readonly Url2UtmPath = '/v1/common/ext/url-to-utm';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `url2Utm()` instead.
   *
   * This method doesn't expect any request body.
   */
  url2Utm$Response(params: {
    url: string;
  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, CommonControllerService.Url2UtmPath, 'get');
    if (params) {
      rb.query('url', params.url, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `url2Utm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  url2Utm(params: {
    url: string;
  }): Observable<{  }> {

    return this.url2Utm$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation corr2Utm
   */
  static readonly Corr2UtmPath = '/v1/common/ext/deg-to-utm';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `corr2Utm()` instead.
   *
   * This method doesn't expect any request body.
   */
  corr2Utm$Response(params: {
    lat: number;
    lon: number;
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, CommonControllerService.Corr2UtmPath, 'get');
    if (params) {
      rb.query('lat', params.lat, {});
      rb.query('lon', params.lon, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `corr2Utm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  corr2Utm(params: {
    lat: number;
    lon: number;
  }): Observable<string> {

    return this.corr2Utm$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation corr2Url
   */
  static readonly Corr2UrlPath = '/v1/common/ext/deg-to-url';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `corr2Url()` instead.
   *
   * This method doesn't expect any request body.
   */
  corr2Url$Response(params: {
    lat: number;
    lon: number;
  }): Observable<StrictHttpResponse<{  }>> {

    const rb = new RequestBuilder(this.rootUrl, CommonControllerService.Corr2UrlPath, 'get');
    if (params) {
      rb.query('lat', params.lat, {});
      rb.query('lon', params.lon, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{  }>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `corr2Url$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  corr2Url(params: {
    lat: number;
    lon: number;
  }): Observable<{  }> {

    return this.corr2Url$Response(params).pipe(
      map((r: StrictHttpResponse<{  }>) => r.body as {  })
    );
  }

  /**
   * Path part for operation commonData
   */
  static readonly CommonDataPath = '/v1/common/data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `commonData()` instead.
   *
   * This method doesn't expect any request body.
   */
  commonData$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseCommonDataProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CommonControllerService.CommonDataPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCommonDataProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `commonData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  commonData(params?: {
  }): Observable<RestApiResponseCommonDataProjection> {

    return this.commonData$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCommonDataProjection>) => r.body as RestApiResponseCommonDataProjection)
    );
  }

}
