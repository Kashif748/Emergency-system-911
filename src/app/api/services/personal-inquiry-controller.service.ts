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

import { RestApiResponsePersonProfileType } from '../models/rest-api-response-person-profile-type';
import { RestApiResponsePersonalInfoProfile } from '../models/rest-api-response-personal-info-profile';

@Injectable()
export class PersonalInquiryControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPersonalProfileInfo
   */
  static readonly GetPersonalProfileInfoPath = '/v1/personal-info/profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPersonalProfileInfo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getPersonalProfileInfo$Response(params: {
    body: string
  }): Observable<StrictHttpResponse<RestApiResponsePersonalInfoProfile>> {

    const rb = new RequestBuilder(this.rootUrl, PersonalInquiryControllerService.GetPersonalProfileInfoPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePersonalInfoProfile>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPersonalProfileInfo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getPersonalProfileInfo(params: {
    body: string
  }): Observable<RestApiResponsePersonalInfoProfile> {

    return this.getPersonalProfileInfo$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePersonalInfoProfile>) => r.body as RestApiResponsePersonalInfoProfile)
    );
  }

  /**
   * Path part for operation getPersonalInfo
   */
  static readonly GetPersonalInfoPath = '/v1/personal-info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPersonalInfo()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getPersonalInfo$Response(params: {
    body: string
  }): Observable<StrictHttpResponse<RestApiResponsePersonProfileType>> {

    const rb = new RequestBuilder(this.rootUrl, PersonalInquiryControllerService.GetPersonalInfoPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponsePersonProfileType>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPersonalInfo$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  getPersonalInfo(params: {
    body: string
  }): Observable<RestApiResponsePersonProfileType> {

    return this.getPersonalInfo$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponsePersonProfileType>) => r.body as RestApiResponsePersonProfileType)
    );
  }

}
