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

import { BcImpactMatrixDto } from '../models/bc-impact-matrix-dto';
import { RestApiResponseBcImpactMatrixDto } from '../models/rest-api-response-bc-impact-matrix-dto';
import { RestApiResponseListBcImpactMatrixDto } from '../models/rest-api-response-list-bc-impact-matrix-dto';

@Injectable()
export class BcImpactTypesMatrixControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById22
   */
  static readonly DeleteById22Path = '/v1/bc/impactTypeMatrix/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById22()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById22$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.DeleteById22Path, 'put');
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
   * To access the full response (for headers, for example), `deleteById22$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById22(params: {
    id: number;
  }): Observable<void> {

    return this.deleteById22$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation findAll1
   */
  static readonly FindAll1Path = '/v1/bc/impactTypeMatrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAll1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll1$Response(params: {
    isActive: boolean;
    versionId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListBcImpactMatrixDto>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.FindAll1Path, 'get');
    if (params) {
      rb.query('isActive', params.isActive, {});
      rb.query('versionId', params.versionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListBcImpactMatrixDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAll1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAll1(params: {
    isActive: boolean;
    versionId: number;
  }): Observable<RestApiResponseListBcImpactMatrixDto> {

    return this.findAll1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListBcImpactMatrixDto>) => r.body as RestApiResponseListBcImpactMatrixDto)
    );
  }

  /**
   * Path part for operation update103
   */
  static readonly Update103Path = '/v1/bc/impactTypeMatrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update103()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update103$Response(params: {
    body: BcImpactMatrixDto
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactMatrixDto>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.Update103Path, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactMatrixDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update103$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update103(params: {
    body: BcImpactMatrixDto
  }): Observable<RestApiResponseBcImpactMatrixDto> {

    return this.update103$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactMatrixDto>) => r.body as RestApiResponseBcImpactMatrixDto)
    );
  }

  /**
   * Path part for operation insert
   */
  static readonly InsertPath = '/v1/bc/impactTypeMatrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insert()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insert$Response(params: {
    body: BcImpactMatrixDto
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactMatrixDto>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.InsertPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactMatrixDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insert$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insert(params: {
    body: BcImpactMatrixDto
  }): Observable<RestApiResponseBcImpactMatrixDto> {

    return this.insert$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactMatrixDto>) => r.body as RestApiResponseBcImpactMatrixDto)
    );
  }

  /**
   * Path part for operation getOneByImpactTypeId
   */
  static readonly GetOneByImpactTypeIdPath = '/v1/bc/impactTypeMatrix/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOneByImpactTypeId()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOneByImpactTypeId$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcImpactMatrixDto>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.GetOneByImpactTypeIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcImpactMatrixDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOneByImpactTypeId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOneByImpactTypeId(params: {
    id: number;
  }): Observable<RestApiResponseBcImpactMatrixDto> {

    return this.getOneByImpactTypeId$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcImpactMatrixDto>) => r.body as RestApiResponseBcImpactMatrixDto)
    );
  }

  /**
   * Path part for operation export8
   */
  static readonly Export8Path = '/v1/bc/impactTypeMatrix/export';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `export8()` instead.
   *
   * This method doesn't expect any request body.
   */
  export8$Response(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    isActive: boolean;
    versionId: number;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, BcImpactTypesMatrixControllerService.Export8Path, 'get');
    if (params) {
      rb.query('as', params.as, {});
      rb.query('lang', params.lang, {});
      rb.query('isActive', params.isActive, {});
      rb.query('versionId', params.versionId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `export8$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  export8(params: {
    as: 'PDF' | 'EXCEL';
    lang: boolean;
    isActive: boolean;
    versionId: number;
  }): Observable<any> {

    return this.export8$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
