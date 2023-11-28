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

import { AdafasaCreateIncident } from '../models/adafasa-create-incident';
import { RestApiResponseInformationSharing } from '../models/rest-api-response-information-sharing';

@Injectable()
export class InformationSharingControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation saveInformationSharing1
   */
  static readonly SaveInformationSharing1Path = '/v1/ext/create-incident';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveInformationSharing1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInformationSharing1$Response(params: {
    body: AdafasaCreateIncident
  }): Observable<StrictHttpResponse<RestApiResponseInformationSharing>> {

    const rb = new RequestBuilder(this.rootUrl, InformationSharingControllerService.SaveInformationSharing1Path, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseInformationSharing>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `saveInformationSharing1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveInformationSharing1(params: {
    body: AdafasaCreateIncident
  }): Observable<RestApiResponseInformationSharing> {

    return this.saveInformationSharing1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseInformationSharing>) => r.body as RestApiResponseInformationSharing)
    );
  }

}
