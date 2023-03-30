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

import { RestApiResponseListEntityTypeProjection } from '../models/rest-api-response-list-entity-type-projection';


/**
 * Orgs type
 */
@Injectable()
export class OrganizationTypesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getEntityTypeHierarchyForCurrentUser
   */
  static readonly GetEntityTypeHierarchyForCurrentUserPath = '/v1/orgs/entity-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEntityTypeHierarchyForCurrentUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEntityTypeHierarchyForCurrentUser$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListEntityTypeProjection>> {

    const rb = new RequestBuilder(this.rootUrl, OrganizationTypesService.GetEntityTypeHierarchyForCurrentUserPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListEntityTypeProjection>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getEntityTypeHierarchyForCurrentUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEntityTypeHierarchyForCurrentUser(params?: {
  }): Observable<RestApiResponseListEntityTypeProjection> {

    return this.getEntityTypeHierarchyForCurrentUser$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListEntityTypeProjection>) => r.body as RestApiResponseListEntityTypeProjection)
    );
  }

}
