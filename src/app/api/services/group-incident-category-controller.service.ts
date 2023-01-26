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

import { GroupIncidentCatRequest } from '../models/group-incident-cat-request';
import { Pageable } from '../models/pageable';
import { RestApiResponseListGroupIncidentCategory } from '../models/rest-api-response-list-group-incident-category';
import { RestApiResponsePageGroupIncidentCategoryProjection } from '../models/rest-api-response-page-group-incident-category-projection';

@Injectable()
export class GroupIncidentCategoryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findByActiveGroup2
   */
  static readonly FindByActiveGroup2Path = '/v1/groups/{groupId}/incident-category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findByActiveGroup2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByActiveGroup2$Response(params: {
    groupId: number;
    pageable: Pageable;
  }): Observable<StrictHttpResponse<RestApiResponsePageGroupIncidentCategoryProjection>> {

    const rb = new RequestBuilder(this.rootUrl, GroupIncidentCategoryControllerService.FindByActiveGroup2Path, 'get');
    if (params) {
      rb.path('groupId', params.groupId, {});
      rb.query('pageable', params.pageable, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePageGroupIncidentCategoryProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findByActiveGroup2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findByActiveGroup2(params: {
    groupId: number;
    pageable: Pageable;
  }): Observable<RestApiResponsePageGroupIncidentCategoryProjection> {

    return this.findByActiveGroup2$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePageGroupIncidentCategoryProjection>) => r.body as RestApiResponsePageGroupIncidentCategoryProjection)
    );
  }

  /**
   * Path part for operation update46
   */
  static readonly Update46Path = '/v1/groups/{groupId}/incident-category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update46()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update46$Response(params: {
    groupId: number;
    body: GroupIncidentCatRequest
  }): Observable<StrictHttpResponse<RestApiResponseListGroupIncidentCategory>> {

    const rb = new RequestBuilder(this.rootUrl, GroupIncidentCategoryControllerService.Update46Path, 'put');
    if (params) {
      rb.path('groupId', params.groupId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListGroupIncidentCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `update46$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update46(params: {
    groupId: number;
    body: GroupIncidentCatRequest
  }): Observable<RestApiResponseListGroupIncidentCategory> {

    return this.update46$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroupIncidentCategory>) => r.body as RestApiResponseListGroupIncidentCategory)
    );
  }

  /**
   * Path part for operation create42
   */
  static readonly Create42Path = '/v1/groups/{groupId}/incident-category';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `create42()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create42$Response(params: {
    groupId: number;
    body: GroupIncidentCatRequest
  }): Observable<StrictHttpResponse<RestApiResponseListGroupIncidentCategory>> {

    const rb = new RequestBuilder(this.rootUrl, GroupIncidentCategoryControllerService.Create42Path, 'post');
    if (params) {
      rb.path('groupId', params.groupId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListGroupIncidentCategory>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `create42$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  create42(params: {
    groupId: number;
    body: GroupIncidentCatRequest
  }): Observable<RestApiResponseListGroupIncidentCategory> {

    return this.create42$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroupIncidentCategory>) => r.body as RestApiResponseListGroupIncidentCategory)
    );
  }

}
