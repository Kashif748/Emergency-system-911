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

import { RestApiResponseListEntityTag } from '../models/rest-api-response-list-entity-tag';

@Injectable()
export class TagControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getTags
   */
  static readonly GetTagsPath = '/tags/{entityLabel}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTags()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags$Response(params: {
    entityLabel: string;
    fieldId?: number;
  }): Observable<StrictHttpResponse<RestApiResponseListEntityTag>> {

    const rb = new RequestBuilder(this.rootUrl, TagControllerService.GetTagsPath, 'get');
    if (params) {
      rb.path('entityLabel', params.entityLabel, {});
      rb.query('fieldId', params.fieldId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListEntityTag>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getTags$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTags(params: {
    entityLabel: string;
    fieldId?: number;
  }): Observable<RestApiResponseListEntityTag> {

    return this.getTags$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListEntityTag>) => r.body as RestApiResponseListEntityTag)
    );
  }

}
