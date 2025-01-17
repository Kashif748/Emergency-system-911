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

import { RestApiResponseListGroupTypes } from '../models/rest-api-response-list-group-types';

@Injectable()
export class GroupTypesControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAll9
   */
  static readonly GetAll9Path = '/v1/group-types';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAll9()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll9$Response(params?: {
  }): Observable<StrictHttpResponse<RestApiResponseListGroupTypes>> {

    const rb = new RequestBuilder(this.rootUrl, GroupTypesControllerService.GetAll9Path, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListGroupTypes>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAll9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAll9(params?: {
  }): Observable<RestApiResponseListGroupTypes> {

    return this.getAll9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListGroupTypes>) => r.body as RestApiResponseListGroupTypes)
    );
  }

}
