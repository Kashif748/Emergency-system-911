import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError, BehaviorSubject } from 'rxjs';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";

import { Observable } from "rxjs";
import { map , catchError } from "rxjs/operators";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DohService {

  result = new HttpHeaders()
  .set("Content-Type", "application/json")
  // TODO: Move adding token to intercept.service.ts
  .set("Authorization", "Bearer " + localStorage.getItem("jwt"));

  constructor(private http: HttpClient) { }


  getCovidCases() {
    return this.http
      .get<any>(`${environment.apiUrl}/doh/covid-cases/sum`, { headers: this.result })
      .pipe((covidStats) => {
        return covidStats;
      });
}

getCovidCasesByDate(from ,to) {
    return this.http
      .get<any>(`${environment.apiUrl}/doh/covid-cases?fromDate=${from}&toDate=${to}`, { headers: this.result })
      .pipe((covidStats) => {
        return covidStats;
      });
}

getTotalTest() {
  return this.http
  .get<any>(`${environment.apiUrl}/doh/test-summary/sum`, { headers: this.result })
  .pipe((totalCases) => {
    return totalCases;
  });
} 

getTestsbyDate(from ,to) {
  return this.http
  .get<any>(`${environment.apiUrl}/doh/test-summary?fromDate=${from}&toDate=${to}`, { headers: this.result })
  .pipe((totalCases) => {
    return totalCases;
  });
} 

getbedCapacity() {
  return this.http
  .get<any>(`${environment.apiUrl}/doh/bed-capacity`, { headers: this.result })
  .pipe((bedCapacity) => {
    return bedCapacity;
  });
} 

getVolunteers() {
  return this.http
  .get<any>(`${environment.apiUrl}/doh/volunteers`, { headers: this.result })
  .pipe((volunteers) => {
    return volunteers;
  });
}  

getEventInfo() {
  return this.http
  .get<any>(`${environment.apiUrl}/doh/event-info`, { headers: this.result })
  .pipe((eventsInfo) => {
    return eventsInfo;
  });
} 


}
