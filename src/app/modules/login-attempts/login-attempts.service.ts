import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginAttemptsService {
  result = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + localStorage.getItem("jwt"));

  constructor(private http: HttpClient) {}


  getLoginAttempts(orgID: string, userName: string, fromDate, toDate, page, size ){
    return this.http.get<any>(`${environment.apiUrl}/user-login-attempts/search?`, {
      headers: this.result,
      params: new HttpParams()
        .set("orgId", orgID ? orgID : '')
        .set("userName", userName ? userName : '')
        .set("fromDate", fromDate ? fromDate : '' )
        .set("toDate", toDate ? toDate : '')
        .set("page", page ? page : 0)
        .set("size", size ? size : 10)
    }).pipe(map(r => r.result));
  }
}
