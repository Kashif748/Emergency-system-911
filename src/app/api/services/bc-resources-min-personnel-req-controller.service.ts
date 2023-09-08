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

import { BcResourcesMinPersonnelReq } from '../models/bc-resources-min-personnel-req';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcResourcesMinPersonnelReq } from '../models/rest-api-response-bc-resources-min-personnel-req';
import { RestApiResponsePageBcResourcesMinPersonnelReq } from '../models/rest-api-response-page-bc-resources-min-personnel-req';

@Injectable()
export class BcResourcesMinPersonnelReqControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById9
   */
  static readonly DeleteById9Path = '/v1/bc/resources/min-personnel-req/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById9()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById9$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesMinPersonnelReqControllerService.DeleteById9Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById9$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  deleteById9(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById9$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAsPage
   */
  static readonly GetAsPagePath = '/v1/bc/resources/min-personnel-req';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAsPage()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAsPage$Response(params: {
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcResourcesMinPersonnelReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesMinPersonnelReqControllerService.GetAsPagePath, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageBcResourcesMinPersonnelReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAsPage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAsPage(params: {
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcResourcesMinPersonnelReq> {

    return this.getAsPage$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcResourcesMinPersonnelReq>) => r.body as RestApiResponsePageBcResourcesMinPersonnelReq)
    );
  }

  /**
   * Path part for operation update88
   */
  static readonly Update88Path = '/v1/bc/resources/min-personnel-req';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update88()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update88$Response(params: {
    body: BcResourcesMinPersonnelReq
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesMinPersonnelReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesMinPersonnelReqControllerService.Update88Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesMinPersonnelReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update88$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  update88(params: {
    body: BcResourcesMinPersonnelReq
  }): Observable<RestApiResponseBcResourcesMinPersonnelReq> {

    return this.update88$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesMinPersonnelReq>) => r.body as RestApiResponseBcResourcesMinPersonnelReq)
    );
  }

  /**
   * Path part for operation insertOne9
   */
  static readonly InsertOne9Path = '/v1/bc/resources/min-personnel-req';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne9()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne9$Response(params: {
    body: BcResourcesMinPersonnelReq
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesMinPersonnelReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesMinPersonnelReqControllerService.InsertOne9Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesMinPersonnelReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne9$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   *
   * @deprecated
   */
  insertOne9(params: {
    body: BcResourcesMinPersonnelReq
  }): Observable<RestApiResponseBcResourcesMinPersonnelReq> {

    return this.insertOne9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesMinPersonnelReq>) => r.body as RestApiResponseBcResourcesMinPersonnelReq)
    );
  }

  /**
   * Path part for operation getOne10
   */
  static readonly GetOne10Path = '/v1/bc/resources/min-personnel-req/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne10()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne10$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcResourcesMinPersonnelReq>> {

    const rb = new RequestBuilder(this.rootUrl, BcResourcesMinPersonnelReqControllerService.GetOne10Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcResourcesMinPersonnelReq>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne10$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne10(params: {
    id: number;
  }): Observable<RestApiResponseBcResourcesMinPersonnelReq> {

    return this.getOne10$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcResourcesMinPersonnelReq>) => r.body as RestApiResponseBcResourcesMinPersonnelReq)
    );
  }

}
