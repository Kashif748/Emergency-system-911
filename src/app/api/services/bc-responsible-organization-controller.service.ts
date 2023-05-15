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

import { OrgStructure } from '../models/org-structure';
import { RestApiResponseOrgStructure } from '../models/rest-api-response-org-structure';

@Injectable()
export class BcResponsibleOrganizationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation deleteById2
   */
  static readonly DeleteById2Path = '/v1/bc/org/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteById2$Response(params: {
    id: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BcResponsibleOrganizationControllerService.DeleteById2Path, 'put');
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
   * Path part for operation insertOne9
   */
  static readonly InsertOne9Path = '/v1/bc/org/save';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `insertOne9()` instead.
   *
   * This method doesn't expect any request body.
   */
  insertOne9$Response(params: {
    orgStructure: OrgStructure;
  }): Observable<StrictHttpResponse<RestApiResponseOrgStructure>> {

    const rb = new RequestBuilder(this.rootUrl, BcResponsibleOrganizationControllerService.InsertOne9Path, 'get');
    if (params) {
      rb.query('orgStructure', params.orgStructure, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseOrgStructure>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `insertOne9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  insertOne9(params: {
    orgStructure: OrgStructure;
  }): Observable<RestApiResponseOrgStructure> {

    return this.insertOne9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseOrgStructure>) => r.body as RestApiResponseOrgStructure)
    );
  }

}
