import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { forkJoin, Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";

import { Page, PageRequest } from "../models/page.model";


export interface DmtFilter {
  endStartDate?: string;
  fromStartDate?: string;
  inspectionEndDate?: string;
  inspectionStartDate?: string;
  inspectionStatus?: string;
  municipality?: string;
  categories?: string;
  workflowName?: string;
}

export interface Inspection {
  applicationNumber?: string;
  onlineNumber?: string;
  inspectionDate?: string;
  inspectionStatusName?: string;
  inspectorName?: string;
  workflowInstanceId?: string;
  workflowName?: string;
  startDate?: string;
  completeDate?: string;
  applicationStatus?: string;
  municipality?: string;
  categories?: string;
  serviceCenter?: string;
  department?: string;
  checkItemName?: string;
}

export interface InspectionCount {
  municipality?: string;
  count?: number;
  workflowName?: string;
  categories?: string;
  inspectionDate?: string;
  startDate?: string;
  inspectionStatusName?: string;
}

@Injectable({
  providedIn: "root",
})
export class DmtService {
  private baseUrl = `${environment.apiUrl}/inspection`;
  constructor(private http: HttpClient) {}

  public getAll(): Observable<Inspection[]> {
    return this.http
      .get<any>(this.baseUrl)
      .pipe(map((r) => r.result as Inspection[]));
  }

  public getAllFilter(pageRequest: PageRequest, filter: DmtFilter) {
    pageRequest.page = pageRequest.page ?? 0;
    // return of(
    //   (pageRequest.page == 0
    //     ? filterPage0.result
    //     : pageRequest.page == 1
    //     ? filterPage1.result
    //     : ({
    //         content: [],
    //         totalElements: filterPage1.result.totalElements,
    //       } as unknown)) as Page<Inspection>
    // );
    return this.http
      .get<any>(`${this.baseUrl}`, { params: {...filter} })
      .pipe(map((r) => r.result as Page<Inspection>));
  }

  public getAllFilterAndCount(pageRequest: PageRequest, filter: DmtFilter) {
    pageRequest.page = pageRequest.page ?? 0;

    // return of(
    //   (pageRequest.page == 0
    //     ? filterAndCountPage0.result
    //     : pageRequest.page == 1
    //     ? filterAndCountPage1.result
    //     : ({
    //         content: [],
    //         totalElements: filterAndCountPage1.result.totalElements,
    //       } as unknown)) as Page<InspectionCount>
    // );
    // return this.http
    //   .get<any>(`${this.baseUrl}/filterAndCount`, { params: { ...filter } })
    //   .pipe(map((r) => r.result as Page<InspectionCount>));
      return this.http
      .get<any>(`${this.baseUrl}`, { params: { ...filter } })
      .pipe(map((r) => r.result as Page<InspectionCount>));
  }

  public requestDataFromMultipleSources(): Observable<any[]> {
 let categories = [
      "بلدية مدينة العين",
      "بلدية مدينة أبوظبي",
      "بلدية منطقة الظفرة",
    ]

    let workFLow = [
      "مخالفات قانون المظهر العام وقانون البناء"
    ]

    let inspectionStatus = [
   "مكتمل",
   "مطلوب المشرف مزيد من التفاصيل",
   "مرفوضة",
   "تحت الإجراء"
    ]

    let response1 = this.http.get(`${this.baseUrl}/filterAndCount?municipality=${categories[0]}`);
    let response2 = this.http.get(`${this.baseUrl}/filterAndCount?municipality=${categories[1]}`);
    let response3 = this.http.get(`${this.baseUrl}/filterAndCount?municipality=${categories[2]}`);

    let response4 = this.http.get(`${this.baseUrl}/filterAndCount?inspectionStatus=${inspectionStatus[0]}`);
    let response5 = this.http.get(`${this.baseUrl}/filterAndCount?inspectionStatus=${inspectionStatus[1]}`);
    let response6 = this.http.get(`${this.baseUrl}/filterAndCount?inspectionStatus=${inspectionStatus[2]}`);
    let response7 = this.http.get(`${this.baseUrl}/filterAndCount?inspectionStatus=${inspectionStatus[3]}`);

    let response8 = this.http.get(`${this.baseUrl}/filterAndCount?workflowName=${workFLow[0]}`);
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    return forkJoin([ response1, response2, response3, response4, response5, response6, response7, response8]);
  }

}
