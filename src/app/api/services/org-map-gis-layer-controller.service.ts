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

import { OrgMapGisLayer } from '../models/org-map-gis-layer';
import { Pageable } from '../models/pageable';
import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseOrgMapGisLayer } from '../models/rest-api-response-org-map-gis-layer';
import { RestApiResponsePageOrgMapGisLayer } from '../models/rest-api-response-page-org-map-gis-layer';

@Injectable()
export class OrgMapGisLayerControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation delete4
   */
  static readonly Delete4Path = '/v1/org-map-gis-layer/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete4()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete4$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, OrgMapGisLayerControllerService.Delete4Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete4(params: {
    id: number;
  }): Observable<RestApiResponseBoolean> {

    return this.delete4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation findActivePage4
   */
  static readonly FindActivePage4Path = '/v1/org-map-gis-layer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findActivePage4()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage4$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageOrgMapGisLayer>> {

    const rb = new RequestBuilder(this.rootUrl, OrgMapGisLayerControllerService.FindActivePage4Path, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageOrgMapGisLayer>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findActivePage4$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findActivePage4(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageOrgMapGisLayer> {

    return this.findActivePage4$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageOrgMapGisLayer>) => r.body as RestApiResponsePageOrgMapGisLayer)
    );
  }

  /**
   * Path part for operation update19
   */
  static readonly Update19Path = '/v1/org-map-gis-layer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update19()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update19$Response(params: {
    body: OrgMapGisLayer
  }): Observable<StrictHttpResponse<RestApiResponseOrgMapGisLayer>> {

    const rb = new RequestBuilder(this.rootUrl, OrgMapGisLayerControllerService.Update19Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgMapGisLayer>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update19$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update19(params: {
    body: OrgMapGisLayer
  }): Observable<RestApiResponseOrgMapGisLayer> {

    return this.update19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgMapGisLayer>) => r.body as RestApiResponseOrgMapGisLayer)
    );
  }

  /**
   * Path part for operation create19
   */
  static readonly Create19Path = '/v1/org-map-gis-layer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create19()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create19$Response(params: {
    body: OrgMapGisLayer
  }): Observable<StrictHttpResponse<RestApiResponseOrgMapGisLayer>> {

    const rb = new RequestBuilder(this.rootUrl, OrgMapGisLayerControllerService.Create19Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgMapGisLayer>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create19$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create19(params: {
    body: OrgMapGisLayer
  }): Observable<RestApiResponseOrgMapGisLayer> {

    return this.create19$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgMapGisLayer>) => r.body as RestApiResponseOrgMapGisLayer)
    );
  }

  /**
   * Path part for operation getActiveOrgMapGisLayer
   */
  static readonly GetActiveOrgMapGisLayerPath = '/v1/org-map-gis-layer/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getActiveOrgMapGisLayer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveOrgMapGisLayer$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseOrgMapGisLayer>> {

    const rb = new RequestBuilder(this.rootUrl, OrgMapGisLayerControllerService.GetActiveOrgMapGisLayerPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgMapGisLayer>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getActiveOrgMapGisLayer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getActiveOrgMapGisLayer(params: {
    id: number;
  }): Observable<RestApiResponseOrgMapGisLayer> {

    return this.getActiveOrgMapGisLayer$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgMapGisLayer>) => r.body as RestApiResponseOrgMapGisLayer)
    );
  }

}
