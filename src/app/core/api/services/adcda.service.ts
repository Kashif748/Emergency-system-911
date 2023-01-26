import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";

import { Page } from "../models/page.model";
import { GResult } from "../models/result.model";
interface Report {
  createdBy?: {
    id?: number;
  };
  approvedBy?: {
    id?: number;
  };
  createdOn?: string | Date;
  approvedOn?: string | Date;
  id?: number;
  isActive?: boolean;
  status: {
    id?: number;
    isActive?: true;
    nameAr?: string;
    nameEn?: string;
  };
}
@Injectable({
  providedIn: "root",
})
export class AdcdaService {
  private baseUrl = `${environment.apiUrl}/adcda-daily-report`;

  constructor(private http: HttpClient) {}

  create(report: Report) {
    return this.http.post<any>(`${this.baseUrl}`, report, {});
  }

  update(report: Report) {
    return this.http.put(`${this.baseUrl}`, report, {});
  }

  approve(report) {
    return this.http.put(`${this.baseUrl}/${report?.id}/approve`, report, {});
  }

  getAll(pageSize?, pageNumber?, search?, sort?) {
    return this.http.get<GResult<Page<Report>>>(`${this.baseUrl}/search`, {
      params: {
        size: pageSize,
        page: pageNumber,
        filter: search ?? "",
        sort: `${sort?.active ?? ""},${sort?.direction ?? ""}`,
      },
    });
  }

  getAttachments(id) {
    return this.http.get<any>(`${environment.apiUrl}/dms/tag`, {
      params: {
        entityId: id,
        entityTagId: "20",
      },
    });
  }

  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {});
  }

  getAreas(page?, size?, search?) {
    return this.http
      .get<any>(`${environment.apiUrl}/adcda-area`, {
        params: {
          page: page ?? 0,
          size: size ?? 10,
          name: search ?? "",
        },
      })
      .pipe(map((r) => r.result));
  }
}
