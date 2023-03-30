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

import { Correspondence } from '../models/correspondence';
import { CorrespondenceStatus } from '../models/correspondence-status';
import { Pageable } from '../models/pageable';
import { RestApiResponseCorrespondence } from '../models/rest-api-response-correspondence';
import { RestApiResponseCorrespondenceProjection } from '../models/rest-api-response-correspondence-projection';
import { RestApiResponseListCorrespondenceTo } from '../models/rest-api-response-list-correspondence-to';
import { RestApiResponseMapStringLong } from '../models/rest-api-response-map-string-long';
import { RestApiResponsePageCorrespondenceProjection } from '../models/rest-api-response-page-correspondence-projection';
import { RestApiResponseReplyCorrInfoProjection } from '../models/rest-api-response-reply-corr-info-projection';

@Injectable()
export class CorrespondenceControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateStatus3
   */
  static readonly UpdateStatus3Path = '/v1/correspondences/status/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateStatus3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatus3$Response(params: {
    id: Correspondence;
    body: CorrespondenceStatus
  }): Observable<StrictHttpResponse<RestApiResponseListCorrespondenceTo>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceControllerService.UpdateStatus3Path, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListCorrespondenceTo>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateStatus3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateStatus3(params: {
    id: Correspondence;
    body: CorrespondenceStatus
  }): Observable<RestApiResponseListCorrespondenceTo> {

    return this.updateStatus3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListCorrespondenceTo>) => r.body as RestApiResponseListCorrespondenceTo)
    );
  }

  /**
   * Path part for operation create64
   */
  static readonly Create64Path = '/v1/correspondences';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create64()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create64$Response(params: {
    correspondence: string;
    body?: { 'att_0'?: Blob, 'att_1'?: Blob, 'att_2'?: Blob, 'att_3'?: Blob }
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondence>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceControllerService.Create64Path, 'post');
    if (params) {
      rb.query('correspondence', params.correspondence, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCorrespondence>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create64$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create64(params: {
    correspondence: string;
    body?: { 'att_0'?: Blob, 'att_1'?: Blob, 'att_2'?: Blob, 'att_3'?: Blob }
  }): Observable<RestApiResponseCorrespondence> {

    return this.create64$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondence>) => r.body as RestApiResponseCorrespondence)
    );
  }

  /**
   * Path part for operation get23
   */
  static readonly Get23Path = '/v1/correspondences/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `get23()` instead.
   *
   * This method doesn't expect any request body.
   */
  get23$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<RestApiResponseCorrespondenceProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceControllerService.Get23Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseCorrespondenceProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `get23$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  get23(params: {
    id: number;
  }): Observable<RestApiResponseCorrespondenceProjection> {

    return this.get23$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseCorrespondenceProjection>) => r.body as RestApiResponseCorrespondenceProjection)
    );
  }

  /**
   * Path part for operation unreadCorrespondence
   */
  static readonly UnreadCorrespondencePath = '/v1/correspondences/status/not-viewed';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `unreadCorrespondence()` instead.
   *
   * This method doesn't expect any request body.
   */
  unreadCorrespondence$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseMapStringLong>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceControllerService.UnreadCorrespondencePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseMapStringLong>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `unreadCorrespondence$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  unreadCorrespondence(params?: {
  }): Observable<RestApiResponseMapStringLong> {

    return this.unreadCorrespondence$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseMapStringLong>) => r.body as RestApiResponseMapStringLong)
    );
  }

  /**
   * Path part for operation sending
   */
  static readonly SendingPath = '/v1/correspondences/sending';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `sending()` instead.
   *
   * This method doesn't expect any request body.
   */
  sending$Response(params: {
    pageable: Pageable;
    filter: string;
    createdByName?: string;
    orgMail?: string;
    circularNumber?: string;
    external?: boolean;
    withCircular?: boolean;
  }): Observable<StrictHttpResponse<RestApiResponsePageCorrespondenceProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceControllerService.SendingPath, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
      rb.query('filter', params.filter, {});
      rb.query('createdByName', params.createdByName, {});
      rb.query('orgMail', params.orgMail, {});
      rb.query('circularNumber', params.circularNumber, {});
      rb.query('external', params.external, {});
      rb.query('withCircular', params.withCircular, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageCorrespondenceProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `sending$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  sending(params: {
    pageable: Pageable;
    filter: string;
    createdByName?: string;
    orgMail?: string;
    circularNumber?: string;
    external?: boolean;
    withCircular?: boolean;
  }): Observable<RestApiResponsePageCorrespondenceProjection> {

    return this.sending$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageCorrespondenceProjection>) => r.body as RestApiResponsePageCorrespondenceProjection)
    );
  }

  /**
   * Path part for operation getReplyInfo
   */
  static readonly GetReplyInfoPath = '/v1/correspondences/reply-info/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getReplyInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReplyInfo$Response(params: {
    id: Correspondence;
  }): Observable<StrictHttpResponse<RestApiResponseReplyCorrInfoProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceControllerService.GetReplyInfoPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseReplyCorrInfoProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getReplyInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getReplyInfo(params: {
    id: Correspondence;
  }): Observable<RestApiResponseReplyCorrInfoProjection> {

    return this.getReplyInfo$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseReplyCorrInfoProjection>) => r.body as RestApiResponseReplyCorrInfoProjection)
    );
  }

  /**
   * Path part for operation receiving
   */
  static readonly ReceivingPath = '/v1/correspondences/receiving';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `receiving()` instead.
   *
   * This method doesn't expect any request body.
   */
  receiving$Response(params: {
    pageable: Pageable;
    filter: string;
    createdByName?: string;
    orgMail?: string;
    circularNumber?: string;
    external?: boolean;
    withCircular?: boolean;
  }): Observable<StrictHttpResponse<RestApiResponsePageCorrespondenceProjection>> {

    const rb = new RequestBuilder(this.rootUrl, CorrespondenceControllerService.ReceivingPath, 'get');
    if (params) {
      rb.query('pageable', params.pageable, {});
      rb.query('filter', params.filter, {});
      rb.query('createdByName', params.createdByName, {});
      rb.query('orgMail', params.orgMail, {});
      rb.query('circularNumber', params.circularNumber, {});
      rb.query('external', params.external, {});
      rb.query('withCircular', params.withCircular, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageCorrespondenceProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `receiving$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  receiving(params: {
    pageable: Pageable;
    filter: string;
    createdByName?: string;
    orgMail?: string;
    circularNumber?: string;
    external?: boolean;
    withCircular?: boolean;
  }): Observable<RestApiResponsePageCorrespondenceProjection> {

    return this.receiving$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageCorrespondenceProjection>) => r.body as RestApiResponsePageCorrespondenceProjection)
    );
  }

}
