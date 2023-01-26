import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { DailySummary } from '../models/daily-summary.models';

@Injectable({
  providedIn: 'root',
})
export class DailyReportService {
  private baseUrl = `${environment.apiUrl}/dailysummaries`;

  private httpHeader = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  constructor(private http: HttpClient) {}

  create(summary: DailySummary) {
    return this.http.post(`${this.baseUrl}`, summary, {
      headers: this.httpHeader,
    });
  }

  update(summary: DailySummary) {
    return this.http.put(`${this.baseUrl}`, summary, {
      headers: this.httpHeader,
    });
  }

  getAll(pageSize?, pageNumber?, fromDate?, toDate?, status?, name?) {
    return this.http.get<any>(`${this.baseUrl}`, {
      headers: this.httpHeader,
      params: {
        pageSize: pageSize,
        pageNumber: pageNumber,
        fromDate: fromDate ?? '',
        toDate: toDate ?? '',
        status: status ?? '',
        name: name ?? '',
      },
    });
  }

  getAttachments(reportId) {
    return this.http.get<any>(`${environment.apiUrl}/dms/tag`, {
      headers: this.httpHeader,
      params: {
        entityId: reportId,
        entityTagId: '23',
        // entityLabel: "DailySummary",
        // tag: "report",
      },
    });
  }

  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {
      headers: this.httpHeader,
    });
  }

  review(id) {
    return this.http.get(`${this.baseUrl}/review/${id}`, {
      headers: new HttpHeaders()
        .set('Content-Type', 'txt')
        .set('Authorization', 'Bearer ' + localStorage.getItem('jwt')),
      responseType: 'blob',
    });
  }

  archive(id) {
    return this.http.get<any>(`${this.baseUrl}/archive/${id}`, {
      headers: this.httpHeader,
      // responseType: "blob" as "json",
    });
  }
}
