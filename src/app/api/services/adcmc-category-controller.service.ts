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

import { RestApiResponseAdcmcCategory } from '../models/rest-api-response-adcmc-category';
import { RestApiResponseListAdcmcCategory } from '../models/rest-api-response-list-adcmc-category';

@Injectable()
export class AdcmcCategoryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getById8
   */
  static readonly GetById8Path = '/v1/assets/main-category/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById8()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById8$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseAdcmcCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AdcmcCategoryControllerService.GetById8Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseAdcmcCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById8(params: {
    id: number;
  }): Observable<RestApiResponseAdcmcCategory> {

    return this.getById8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseAdcmcCategory>) => r.body as RestApiResponseAdcmcCategory)
    );
  }

  /**
   * Path part for operation getActiveMainCategories
   */
  static readonly GetActiveMainCategoriesPath = '/v1/assets/main-category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveMainCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveMainCategories$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListAdcmcCategory>> {

    const rb = new RequestBuilder(this.rootUrl, AdcmcCategoryControllerService.GetActiveMainCategoriesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListAdcmcCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveMainCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveMainCategories(params?: {
  }): Observable<RestApiResponseListAdcmcCategory> {

    return this.getActiveMainCategories$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListAdcmcCategory>) => r.body as RestApiResponseListAdcmcCategory)
    );
  }

}
