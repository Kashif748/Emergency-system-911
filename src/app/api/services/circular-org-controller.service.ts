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
   * Path part for operation update70
   */
  static readonly Update70Path = '/v1/circulars/{circularId}/org';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update70()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update70$Response(params: {
    circularId: number;
    body: CircularOrg
  }): Observable<StrictHttpResponse<RestApiResponseCircularOrg>> {

    const rb = new RequestBuilder(this.rootUrl, CircularOrgControllerService.Update70Path, 'put');
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
   * To access the full response (for headers, for example), `update70$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update70(params: {
    circularId: number;
    body: CircularOrg
  }): Observable<RestApiResponseCircularOrg> {

    return this.update70$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularOrg>) => r.body as RestApiResponseCircularOrg)
    );
  }

  /**
   * Path part for operation create66
   */
  static readonly Create66Path = '/v1/circulars/{circularId}/org';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create66()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create66$Response(params: {
    circularId: number;
    body: CircularOrg
  }): Observable<StrictHttpResponse<RestApiResponseCircularOrg>> {

    const rb = new RequestBuilder(this.rootUrl, CircularOrgControllerService.Create66Path, 'post');
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
   * To access the full response (for headers, for example), `create66$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create66(params: {
    circularId: number;
    body: CircularOrg
  }): Observable<RestApiResponseCircularOrg> {

    return this.create66$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularOrg>) => r.body as RestApiResponseCircularOrg)
    );
  }

  /**
   * Path part for operation delete35
   */
  static readonly Delete35Path = '/v1/circulars/{circularId}/org/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete35()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete35$Response(params: {
    circularId: number;
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseObject>> {

    const rb = new RequestBuilder(this.rootUrl, CircularOrgControllerService.Delete35Path, 'delete');
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
   * To access the full response (for headers, for example), `delete35$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete35(params: {
    circularId: number;
    id: number;
  }): Observable<RestApiResponseObject> {

    return this.delete35$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseObject>) => r.body as RestApiResponseObject)
    );
  }

}
