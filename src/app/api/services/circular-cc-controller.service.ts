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

import { CircularCc } from '../models/circular-cc';
import { RestApiResponseCircularCcProjection } from '../models/rest-api-response-circular-cc-projection';
import { RestApiResponseObject } from '../models/rest-api-response-object';

@Injectable()
export class CircularCcControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete31
   */
  static readonly Delete31Path = '/v1/circulars/{circularId}/cc/delete/{id}';

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

    const rb = new RequestBuilder(this.rootUrl, CircularCcControllerService.Delete31Path, 'put');
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
   * Path part for operation update74
   */
  static readonly Update74Path = '/v1/circulars/{circularId}/cc';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update74()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update74$Response(params: {
    circularId: number;
    body: CircularCc
  }): Observable<StrictHttpResponse<RestApiResponseCircularCcProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularCcControllerService.Update74Path, 'put');
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
        return r as StrictHttpResponse<RestApiResponseCircularCcProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update74$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update74(params: {
    circularId: number;
    body: CircularCc
  }): Observable<RestApiResponseCircularCcProjection> {

    return this.update74$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularCcProjection>) => r.body as RestApiResponseCircularCcProjection)
    );
  }

  /**
   * Path part for operation create69
   */
  static readonly Create69Path = '/v1/circulars/{circularId}/cc';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create69()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create69$Response(params: {
    circularId: number;
    body: CircularCc
  }): Observable<StrictHttpResponse<RestApiResponseCircularCcProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CircularCcControllerService.Create69Path, 'post');
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
        return r as StrictHttpResponse<RestApiResponseCircularCcProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create69$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create69(params: {
    circularId: number;
    body: CircularCc
  }): Observable<RestApiResponseCircularCcProjection> {

    return this.create69$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCircularCcProjection>) => r.body as RestApiResponseCircularCcProjection)
    );
  }

}
