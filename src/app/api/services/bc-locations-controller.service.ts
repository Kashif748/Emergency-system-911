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

import { BcLocations } from '../models/bc-locations';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcLocations } from '../models/rest-api-response-bc-locations';
import { RestApiResponsePageBcLocations } from '../models/rest-api-response-page-bc-locations';

@Injectable()
export class BcLocationsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById7
   */
  static readonly DeleteById7Path = '/v1/bc/locations/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById7()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById7$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.DeleteById7Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteById7$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById7(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById7$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll17
   */
  static readonly GetAll17Path = '/v1/bc/locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll17()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll17$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.GetAll17Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('versionId', params.versionId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcLocations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll17$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll17(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcLocations> {

    return this.getAll17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcLocations>) => r.body as RestApiResponsePageBcLocations)
    );
  }

  /**
   * Path part for operation update87
   */
  static readonly Update87Path = '/v1/bc/locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update87()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update87$Response(params: {
    body: BcLocations
  }): Observable<StrictHttpResponse<RestApiResponseBcLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.Update87Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcLocations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update87$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update87(params: {
    body: BcLocations
  }): Observable<RestApiResponseBcLocations> {

    return this.update87$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocations>) => r.body as RestApiResponseBcLocations)
    );
  }

  /**
   * Path part for operation insertOne8
   */
  static readonly InsertOne8Path = '/v1/bc/locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne8()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne8$Response(params: {
    body: BcLocations
  }): Observable<StrictHttpResponse<RestApiResponseBcLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.InsertOne8Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcLocations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne8$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne8(params: {
    body: BcLocations
  }): Observable<RestApiResponseBcLocations> {

    return this.insertOne8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocations>) => r.body as RestApiResponseBcLocations)
    );
  }

  /**
   * Path part for operation getOne8
   */
  static readonly GetOne8Path = '/v1/bc/locations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne8()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne8$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.GetOne8Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcLocations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne8(params: {
    id: number;
  }): Observable<RestApiResponseBcLocations> {

    return this.getOne8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocations>) => r.body as RestApiResponseBcLocations)
    );
  }

  /**
   * Path part for operation search8
   */
  static readonly Search8Path = '/v1/bc/locations/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search8()` instead.
   *
   * This method doesn't expect any request body.
   */
  search8$Response(params: {
    isActive?: boolean;
    name?: string;
    locationTypeId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.Search8Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('name', params.name, {});
      rb.query('locationTypeId', params.locationTypeId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcLocations>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search8(params: {
    isActive?: boolean;
    name?: string;
    locationTypeId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcLocations> {

    return this.search8$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcLocations>) => r.body as RestApiResponsePageBcLocations)
    );
  }

}
