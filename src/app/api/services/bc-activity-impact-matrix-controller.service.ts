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

import { BcActivityImpactMatrix } from '../models/bc-activity-impact-matrix';
import { BcActivityImpactMatrixDetailsDto } from '../models/bc-activity-impact-matrix-details-dto';
import { Pageable } from '../models/pageable';
import { RestApiResponseBcActivityImpactMatrix } from '../models/rest-api-response-bc-activity-impact-matrix';
import { RestApiResponseBcActivityImpactMatrixResponse } from '../models/rest-api-response-bc-activity-impact-matrix-response';
import { RestApiResponsePageBcActivityImpactMatrix } from '../models/rest-api-response-page-bc-activity-impact-matrix';

@Injectable()
export class BcActivityImpactMatrixControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll29
   */
  static readonly GetAll29Path = '/v1/bc/activity-impact-matrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll29()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll29$Response(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageBcActivityImpactMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityImpactMatrixControllerService.GetAll29Path, 'get');
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
        return r as StrictHttpResponse<RestApiResponsePageBcActivityImpactMatrix>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll29$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAll29(params: {
    isActive?: boolean;
    versionId?: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageBcActivityImpactMatrix> {

    return this.getAll29$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageBcActivityImpactMatrix>) => r.body as RestApiResponsePageBcActivityImpactMatrix)
    );
  }

  /**
   * Path part for operation updateImpactLevels
   */
  static readonly UpdateImpactLevelsPath = '/v1/bc/activity-impact-matrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateImpactLevels()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImpactLevels$Response(params: {
    body: BcActivityImpactMatrixDetailsDto
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityImpactMatrixResponse>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityImpactMatrixControllerService.UpdateImpactLevelsPath, 'put');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityImpactMatrixResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateImpactLevels$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateImpactLevels(params: {
    body: BcActivityImpactMatrixDetailsDto
  }): Observable<RestApiResponseBcActivityImpactMatrixResponse> {

    return this.updateImpactLevels$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityImpactMatrixResponse>) => r.body as RestApiResponseBcActivityImpactMatrixResponse)
    );
  }

  /**
   * Path part for operation insertOne32
   */
  static readonly InsertOne32Path = '/v1/bc/activity-impact-matrix';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne32()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne32$Response(params: {
    body: BcActivityImpactMatrix
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityImpactMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityImpactMatrixControllerService.InsertOne32Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityImpactMatrix>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne32$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  insertOne32(params: {
    body: BcActivityImpactMatrix
  }): Observable<RestApiResponseBcActivityImpactMatrix> {

    return this.insertOne32$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityImpactMatrix>) => r.body as RestApiResponseBcActivityImpactMatrix)
    );
  }

  /**
   * Path part for operation getOne32
   */
  static readonly GetOne32Path = '/v1/bc/activity-impact-matrix/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOne32()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne32$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityImpactMatrix>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityImpactMatrixControllerService.GetOne32Path, 'get');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityImpactMatrix>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getOne32$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOne32(params: {
    id: number;
  }): Observable<RestApiResponseBcActivityImpactMatrix> {

    return this.getOne32$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityImpactMatrix>) => r.body as RestApiResponseBcActivityImpactMatrix)
    );
  }

  /**
   * Path part for operation search23
   */
  static readonly Search23Path = '/v1/bc/activity-impact-matrix/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `search23()` instead.
   *
   * This method doesn't expect any request body.
   */
  search23$Response(params: {
    activityId: number;
    cycleId: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponseBcActivityImpactMatrixResponse>> {

    const rb = new RequestBuilder(this.rootUrl, BcActivityImpactMatrixControllerService.Search23Path, 'get');
    if (params) {
      rb.query('activityId', params.activityId, {});
      rb.query('cycleId', params.cycleId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBcActivityImpactMatrixResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `search23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  search23(params: {
    activityId: number;
    cycleId: number;
    pageable: Pageable;
  }): Observable<RestApiResponseBcActivityImpactMatrixResponse> {

    return this.search23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBcActivityImpactMatrixResponse>) => r.body as RestApiResponseBcActivityImpactMatrixResponse)
    );
  }

}
