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
import { RestApiResponsePageBcLocationsProjection } from '../models/rest-api-response-page-bc-locations-projection';

@Injectable()
export class BcLocationsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById19
   */
  static readonly DeleteById19Path = '/v1/bc/locations/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById19()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById19$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.DeleteById19Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById19(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById19$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll16
   */
  static readonly GetAll16Path = '/v1/bc/locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll16()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll16$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.GetAll16Path, 'get');
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
   * To access the full response (for headers, for example), `getAll16$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll16(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcLocations> {

    return this.getAll16$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcLocations>) => r.body as RestApiResponsePageBcLocations)
    );
  }

  /**
   * Path part for operation update100
   */
  static readonly Update100Path = '/v1/bc/locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update100()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update100$Response(params: {
    body: BcLocations
  }): Observable<StrictHttpResponse<RestApiResponseBcLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.Update100Path, 'put');
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
   * To access the full response (for headers, for example), `update100$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update100(params: {
    body: BcLocations
  }): Observable<RestApiResponseBcLocations> {

    return this.update100$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocations>) => r.body as RestApiResponseBcLocations)
    );
  }

  /**
   * Path part for operation insertOne19
   */
  static readonly InsertOne19Path = '/v1/bc/locations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne19()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne19$Response(params: {
    body: BcLocations
  }): Observable<StrictHttpResponse<RestApiResponseBcLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.InsertOne19Path, 'post');
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
   * To access the full response (for headers, for example), `insertOne19$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne19(params: {
    body: BcLocations
  }): Observable<RestApiResponseBcLocations> {

    return this.insertOne19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocations>) => r.body as RestApiResponseBcLocations)
    );
  }

  /**
   * Path part for operation getOne19
   */
  static readonly GetOne19Path = '/v1/bc/locations/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne19()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne19$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcLocations>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.GetOne19Path, 'get');
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
   * To access the full response (for headers, for example), `getOne19$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne19(params: {
    id: number;
  }): Observable<RestApiResponseBcLocations> {

    return this.getOne19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcLocations>) => r.body as RestApiResponseBcLocations)
    );
  }

  /**
   * Path part for operation search17
   */
  static readonly Search17Path = '/v1/bc/locations/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search17()` instead.
   *
   * This method doesn't expect any request body.
   */
  search17$Response(params: {
    isActive?: boolean;
    name?: string;
    locationTypeId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcLocationsProjection>> {

    const rb = new RequestBuilder(this.rootUrl, BcLocationsControllerService.Search17Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcLocationsProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search17$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search17(params: {
    isActive?: boolean;
    name?: string;
    locationTypeId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcLocationsProjection> {

    return this.search17$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcLocationsProjection>) => r.body as RestApiResponsePageBcLocationsProjection)
    );
  }

}
