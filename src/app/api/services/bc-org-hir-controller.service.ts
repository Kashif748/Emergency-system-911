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

import { BcOrgHir } from '../models/bc-org-hir';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcOrgHir } from '../models/rest-api-response-bc-org-hir';
import { RestApiResponsePageBcOrgHir } from '../models/rest-api-response-page-bc-org-hir';

@Injectable()
export class BcOrgHirControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById2
   */
  static readonly DeleteById2Path = '/v1/bc/org-hir/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHirControllerService.DeleteById2Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById2(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById2$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getAll12
   */
  static readonly GetAll12Path = '/v1/bc/org-hir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll12()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll12$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcOrgHir>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHirControllerService.GetAll12Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcOrgHir>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll12$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll12(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcOrgHir> {

    return this.getAll12$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcOrgHir>) => r.body as RestApiResponsePageBcOrgHir)
    );
  }

  /**
   * Path part for operation update82
   */
  static readonly Update82Path = '/v1/bc/org-hir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update82()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update82$Response(params: {
    body: BcOrgHir
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHir>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHirControllerService.Update82Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHir>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update82$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update82(params: {
    body: BcOrgHir
  }): Observable<RestApiResponseBcOrgHir> {

    return this.update82$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHir>) => r.body as RestApiResponseBcOrgHir)
    );
  }

  /**
   * Path part for operation insertOne3
   */
  static readonly InsertOne3Path = '/v1/bc/org-hir';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne3$Response(params: {
    body: BcOrgHir
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHir>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHirControllerService.InsertOne3Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHir>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne3(params: {
    body: BcOrgHir
  }): Observable<RestApiResponseBcOrgHir> {

    return this.insertOne3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHir>) => r.body as RestApiResponseBcOrgHir)
    );
  }

  /**
   * Path part for operation getOne2
   */
  static readonly GetOne2Path = '/v1/bc/org-hir/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne2()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcOrgHir>> {

    const rb = new RequestBuilder(this.rootUrl, BcOrgHirControllerService.GetOne2Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcOrgHir>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne2(params: {
    id: number;
  }): Observable<RestApiResponseBcOrgHir> {

    return this.getOne2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcOrgHir>) => r.body as RestApiResponseBcOrgHir)
    );
  }

}
