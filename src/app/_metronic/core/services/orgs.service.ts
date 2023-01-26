import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { environment } from "src/environments/environment";

import { map, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class OrgsService {
  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders().set("Content-Type", "application/json");

  getOrgs() {
    return this.http
      .get<any>(`${environment.apiUrl}/ext/organizations`, {
        headers: this.headers,
      })
      .pipe(map((org) => org.result));
  }

  getOrgsByID(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/organizations/hierarchy/level/${id}`, {
        headers: this.headers,
      })
      .pipe(map((org) => org.result), shareReplay());
  }

  filterOrgs(filter: string) {
    const params = new HttpParams().append("filter", filter);

    return this.http
      .get<any>(`${environment.apiUrl}/ext/organizations`, {
        headers: this.headers,
        params,
      })
      .pipe(map((org) => org.result));
  }
}
