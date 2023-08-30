import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  constructor(private http: HttpClient) {}

  uploadIncidentFiles(IncidentId, formData) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/dms/upload/?recordId=${IncidentId}&tagId=1`,
        formData
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/files`);
  }

  getFilesList(recordId, tagId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityId=${recordId}&entityTagId=${tagId}`
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getAssestsFilesList(recordId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityTagId=29&entityId=${recordId}`
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getReporterFilesList(recordId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityTagId=31&entityId=${recordId}`
      )
      .pipe((incident) => {
        return incident;
      });
  }

  downloadFile(uid: string) {
    return this.http.get<Blob>(environment.apiUrl + '/dms/load/' + uid, {
      responseType: 'blob' as 'json',
      observe: 'response',
    });
  }

  deleteFile(uid: string) {
    return this.http.put<any>(environment.apiUrl + '/dms?id=' + uid, {
      responseType: 'blob' as 'json',
      observe: 'response',
    });
  }
  getSituationsAttachments(payload: {
    entityTagId: number;
    situationId: number;
    orgId: number;
    withSub: boolean;
  }) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityTagId=${payload.entityTagId}&entityId=${payload.situationId}&orgId=${payload.orgId}&withSub=${payload.withSub}`
      )
      .pipe((res) => {
        return res;
      });
  }
  getIncidentAttachments(incidentId: number) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/incidents/load-all-attachments?incidentId=${incidentId}`
      )
      .pipe((res) => {
        return res;
      });
  }

  getInterimIncidentAttachments(interimIncidentId: number) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/interim-incidents/load-all-attachments?interimIncidentId=${interimIncidentId}`
      )
      .pipe((res) => {
        return res;
      });
  }

  getIncidentWorkLogAttachments(incidentId: number) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/incident-worklog/load-all-attachments?incidentId=${incidentId}`
      )
      .pipe((res) => {
        return res;
      });
  }

  getTaskAttachments(taskId: number) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tasks/load-all-attachments?taskId=${taskId}`
      )
      .pipe((res) => {
        return res;
      });
  }

  getFilesByManyTags(recordId, tagsIds: number[]) {
    let tags = '';
    for (let i = 0; i < tagsIds.length; i++) {
      tags += tagsIds[i];
      if (i < tagsIds.length - 1) {
        tags += ',';
      }
    }
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/load-all-tags?entityId=${recordId}&entityTagId=${tags}`
      )
      .pipe((res) => {
        return res;
      });
  }

  getWorkLogsHasAttachment(
    incidentId: number,
    page = 0,
    pageSize = 50,
    sortDirection = 'asc'
  ) {
    return this.http
      .get<any>(
        `${
          environment.apiUrl
        }/incidents/${incidentId}/logs?page=${0}&size=${pageSize}&sort=id,${sortDirection}&hasAttachment=true`
      )
      .pipe((res) => {
        return res;
      });
  }

  getTaskWorkLogs(id: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/tasks/${id}/logs?hasAttachment=true`)
      .pipe((tasks) => {
        return tasks;
      });
  }
}
