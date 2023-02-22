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

import { RestApiResponseBoolean } from '../models/rest-api-response-boolean';
import { RestApiResponseDocuments } from '../models/rest-api-response-documents';
import { RestApiResponseListAttachmentsWorkLogModel } from '../models/rest-api-response-list-attachments-work-log-model';
import { RestApiResponseListDocuments } from '../models/rest-api-response-list-documents';
import { RestApiResponseMapDocumentsListByte } from '../models/rest-api-response-map-documents-list-byte';

@Injectable()
export class DmsControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation findAllAttachments
   */
  static readonly FindAllAttachmentsPath = '/v1/dms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllAttachments()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAttachments$Response(params: {
    entityLabel: string;
    entityId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListDocuments>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.FindAllAttachmentsPath, 'get');
    if (params) {
      rb.query('entityLabel', params.entityLabel, {});
      rb.query('entityId', params.entityId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListDocuments>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAllAttachments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllAttachments(params: {
    entityLabel: string;
    entityId: number;
  }): Observable<RestApiResponseListDocuments> {

    return this.findAllAttachments$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListDocuments>) => r.body as RestApiResponseListDocuments)
    );
  }

  /**
   * Path part for operation delete3
   */
  static readonly Delete3Path = '/v1/dms';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete3()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete3$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<RestApiResponseBoolean>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.Delete3Path, 'put');
    if (params) {
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseBoolean>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `delete3$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete3(params: {
    id: string;
  }): Observable<RestApiResponseBoolean> {

    return this.delete3$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseBoolean>) => r.body as RestApiResponseBoolean)
    );
  }

  /**
   * Path part for operation upload
   */
  static readonly UploadPath = '/v1/dms/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `upload()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  upload$Response(params: {
    tagId: number;
    recordId?: number;
    desc?: string;
    body?: { 'file': Blob }
  }): Observable<StrictHttpResponse<RestApiResponseDocuments>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.UploadPath, 'post');
    if (params) {
      rb.query('tagId', params.tagId, {});
      rb.query('recordId', params.recordId, {});
      rb.query('desc', params.desc, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDocuments>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `upload$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  upload(params: {
    tagId: number;
    recordId?: number;
    desc?: string;
    body?: { 'file': Blob }
  }): Observable<RestApiResponseDocuments> {

    return this.upload$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDocuments>) => r.body as RestApiResponseDocuments)
    );
  }

  /**
   * Path part for operation uploadMultiple
   */
  static readonly UploadMultiplePath = '/v1/dms/upload-multiple';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadMultiple()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadMultiple$Response(params: {
    tagId: number;
    recordId?: number;
    desc?: string;
    body?: { 'files': Array<Blob> }
  }): Observable<StrictHttpResponse<RestApiResponseListDocuments>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.UploadMultiplePath, 'post');
    if (params) {
      rb.query('tagId', params.tagId, {});
      rb.query('recordId', params.recordId, {});
      rb.query('desc', params.desc, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListDocuments>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadMultiple$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  uploadMultiple(params: {
    tagId: number;
    recordId?: number;
    desc?: string;
    body?: { 'files': Array<Blob> }
  }): Observable<RestApiResponseListDocuments> {

    return this.uploadMultiple$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListDocuments>) => r.body as RestApiResponseListDocuments)
    );
  }

  /**
   * Path part for operation upload1
   */
  static readonly Upload1Path = '/v1/dms/ext/upload';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `upload1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  upload1$Response(params: {
    uuid: string;
    body?: { 'file': Blob }
  }): Observable<StrictHttpResponse<RestApiResponseDocuments>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.Upload1Path, 'post');
    if (params) {
      rb.query('uuid', params.uuid, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDocuments>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `upload1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  upload1(params: {
    uuid: string;
    body?: { 'file': Blob }
  }): Observable<RestApiResponseDocuments> {

    return this.upload1$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDocuments>) => r.body as RestApiResponseDocuments)
    );
  }

  /**
   * Path part for operation getById9
   */
  static readonly GetById9Path = '/v1/dms/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById9()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById9$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<RestApiResponseDocuments>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.GetById9Path, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseDocuments>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getById9$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById9(params: {
    id: string;
  }): Observable<RestApiResponseDocuments> {

    return this.getById9$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseDocuments>) => r.body as RestApiResponseDocuments)
    );
  }

  /**
   * Path part for operation findTaskAttachments
   */
  static readonly FindTaskAttachmentsPath = '/v1/dms/tasks/load-all-attachments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findTaskAttachments()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTaskAttachments$Response(params: {
    taskId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListAttachmentsWorkLogModel>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.FindTaskAttachmentsPath, 'get');
    if (params) {
      rb.query('taskId', params.taskId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListAttachmentsWorkLogModel>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findTaskAttachments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTaskAttachments(params: {
    taskId: number;
  }): Observable<RestApiResponseListAttachmentsWorkLogModel> {

    return this.findTaskAttachments$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListAttachmentsWorkLogModel>) => r.body as RestApiResponseListAttachmentsWorkLogModel)
    );
  }

  /**
   * Path part for operation findTaskWlwlAttachments
   */
  static readonly FindTaskWlwlAttachmentsPath = '/v1/dms/task-worklog/load-all-attachments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findTaskWlwlAttachments()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTaskWlwlAttachments$Response(params: {
    taskId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListDocuments>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.FindTaskWlwlAttachmentsPath, 'get');
    if (params) {
      rb.query('taskId', params.taskId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListDocuments>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findTaskWlwlAttachments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findTaskWlwlAttachments(params: {
    taskId: number;
  }): Observable<RestApiResponseListDocuments> {

    return this.findTaskWlwlAttachments$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListDocuments>) => r.body as RestApiResponseListDocuments)
    );
  }

  /**
   * Path part for operation findAttachment
   */
  static readonly FindAttachmentPath = '/v1/dms/tag';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAttachment()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAttachment$Response(params: {
    entityTagId: number;
    entityId: number;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.FindAttachmentPath, 'get');
    if (params) {
      rb.query('entityTagId', params.entityTagId, {});
      rb.query('entityId', params.entityId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAttachment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAttachment(params: {
    entityTagId: number;
    entityId: number;
  }): Observable<any> {

    return this.findAttachment$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation loadAttachment
   */
  static readonly LoadAttachmentPath = '/v1/dms/load/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadAttachment()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadAttachment$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.LoadAttachmentPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `loadAttachment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadAttachment(params: {
    id: string;
  }): Observable<any> {

    return this.loadAttachment$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation loadLogo
   */
  static readonly LoadLogoPath = '/v1/dms/load-logo/ext/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadLogo()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadLogo$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.LoadLogoPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `loadLogo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadLogo(params: {
    id: string;
  }): Observable<any> {

    return this.loadLogo$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation loadAllAttachment
   */
  static readonly LoadAllAttachmentPath = '/v1/dms/load-all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadAllAttachment()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadAllAttachment$Response(params: {
    entityLabel: string;
    entityId: number;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.LoadAllAttachmentPath, 'get');
    if (params) {
      rb.query('entityLabel', params.entityLabel, {});
      rb.query('entityId', params.entityId, {});
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
   * To access the full response (for headers, for example), `loadAllAttachment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadAllAttachment(params: {
    entityLabel: string;
    entityId: number;
  }): Observable<any> {

    return this.loadAllAttachment$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation loadAllAttachment1
   */
  static readonly LoadAllAttachment1Path = '/v1/dms/load-all/{tag}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadAllAttachment1()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadAllAttachment1$Response(params: {
    entityLabel: string;
    tag: string;
    entityId: number;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.LoadAllAttachment1Path, 'get');
    if (params) {
      rb.query('entityLabel', params.entityLabel, {});
      rb.path('tag', params.tag, {});
      rb.query('entityId', params.entityId, {});
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
   * To access the full response (for headers, for example), `loadAllAttachment1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadAllAttachment1(params: {
    entityLabel: string;
    tag: string;
    entityId: number;
  }): Observable<any> {

    return this.loadAllAttachment1$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation loadDocumentWithByte
   */
  static readonly LoadDocumentWithBytePath = '/v1/dms/load-all-documents-bytes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loadDocumentWithByte()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadDocumentWithByte$Response(params: {
    entityLabel: string;
    entityId: number;
  }): Observable<StrictHttpResponse<RestApiResponseMapDocumentsListByte>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.LoadDocumentWithBytePath, 'get');
    if (params) {
      rb.query('entityLabel', params.entityLabel, {});
      rb.query('entityId', params.entityId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseMapDocumentsListByte>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `loadDocumentWithByte$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  loadDocumentWithByte(params: {
    entityLabel: string;
    entityId: number;
  }): Observable<RestApiResponseMapDocumentsListByte> {

    return this.loadDocumentWithByte$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseMapDocumentsListByte>) => r.body as RestApiResponseMapDocumentsListByte)
    );
  }

  /**
   * Path part for operation findInterimIncidentsAttachments
   */
  static readonly FindInterimIncidentsAttachmentsPath = '/v1/dms/interim-incidents/load-all-attachments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findInterimIncidentsAttachments()` instead.
   *
   * This method doesn't expect any request body.
   */
  findInterimIncidentsAttachments$Response(params: {
    interimIncidentId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListDocuments>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.FindInterimIncidentsAttachmentsPath, 'get');
    if (params) {
      rb.query('interimIncidentId', params.interimIncidentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListDocuments>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findInterimIncidentsAttachments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findInterimIncidentsAttachments(params: {
    interimIncidentId: number;
  }): Observable<RestApiResponseListDocuments> {

    return this.findInterimIncidentsAttachments$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListDocuments>) => r.body as RestApiResponseListDocuments)
    );
  }

  /**
   * Path part for operation findAttachmentList
   */
  static readonly FindAttachmentListPath = '/v1/dms/incidents/load-all-attachments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAttachmentList()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAttachmentList$Response(params: {
    incidentId: number;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.FindAttachmentListPath, 'get');
    if (params) {
      rb.query('incidentId', params.incidentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findAttachmentList$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAttachmentList(params: {
    incidentId: number;
  }): Observable<any> {

    return this.findAttachmentList$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation findIncidentWlAttachments
   */
  static readonly FindIncidentWlAttachmentsPath = '/v1/dms/incident-worklog/load-all-attachments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findIncidentWlAttachments()` instead.
   *
   * This method doesn't expect any request body.
   */
  findIncidentWlAttachments$Response(params: {
    incidentId: number;
  }): Observable<StrictHttpResponse<RestApiResponseListDocuments>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.FindIncidentWlAttachmentsPath, 'get');
    if (params) {
      rb.query('incidentId', params.incidentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'blob',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RestApiResponseListDocuments>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `findIncidentWlAttachments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findIncidentWlAttachments(params: {
    incidentId: number;
  }): Observable<RestApiResponseListDocuments> {

    return this.findIncidentWlAttachments$Response(params).pipe(
      map((r: StrictHttpResponse<RestApiResponseListDocuments>) => r.body as RestApiResponseListDocuments)
    );
  }

  /**
   * Path part for operation downloadImages
   */
  static readonly DownloadImagesPath = '/v1/dms/ext/download/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadImages()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadImages$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.DownloadImagesPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `downloadImages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadImages(params: {
    id: string;
  }): Observable<any> {

    return this.downloadImages$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation downloadSecure
   */
  static readonly DownloadSecurePath = '/v1/dms/ext/download/sec/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadSecure()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadSecure$Response(params: {
    otp: string;
    id: string;
  }): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, DmsControllerService.DownloadSecurePath, 'get');
    if (params) {
      rb.query('otp', params.otp, {});
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `downloadSecure$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadSecure(params: {
    otp: string;
    id: string;
  }): Observable<any> {

    return this.downloadSecure$Response(params).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
