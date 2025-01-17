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

import { CircularOrg } from '../models/circular-org';
import { RestApiResponseCircularOrg } from '../models/rest-api-response-circular-org';
import { RestApiResponseObject } from '../models/rest-api-response-object';

@Injectable()
export class CircularOrgControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete31
   */
  static readonly Delete31Path = '/v1/circulars/{circularId}/org/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete31()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete31$Response(params: {
    circularId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, CircularOrgControllerService.Delete31Path, 'put');
    if (params) {
      rb.path('circularId', params.circularId, {});
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseObject>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete31$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete31(params: {
    circularId: number;
    id: number;
  }): Observable<RestApiResponseObject> {

    return this.delete31$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

  /**
   * Path part for operation update76
   */
  static readonly Update76Path = '/v1/circulars/{circularId}/org';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update76()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update76$Response(params: {
    circularId: number;
    body: CircularOrg
  }): Observable<StrictHttpResponse<RestApiResponseCircularOrg>> {

    const rb = new RequestBuilder(this.rootUrl, CircularOrgControllerService.Update76Path, 'put');
    if (params) {
      rb.path('circularId', params.circularId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update76$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update76(params: {
    circularId: number;
    body: CircularOrg
  }): Observable<RestApiResponseCircularOrg> {

    return this.update76$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularOrg>) => r.body as RestApiResponseCircularOrg)
    );
  }

  /**
   * Path part for operation create70
   */
  static readonly Create70Path = '/v1/circulars/{circularId}/org';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create70()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create70$Response(params: {
    circularId: number;
    body: CircularOrg
  }): Observable<StrictHttpResponse<RestApiResponseCircularOrg>> {

    const rb = new RequestBuilder(this.rootUrl, CircularOrgControllerService.Create70Path, 'post');
    if (params) {
      rb.path('circularId', params.circularId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCircularOrg>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create70$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create70(params: {
    circularId: number;
    body: CircularOrg
  }): Observable<RestApiResponseCircularOrg> {

    return this.create70$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularOrg>) => r.body as RestApiResponseCircularOrg)
    );
  }

}
