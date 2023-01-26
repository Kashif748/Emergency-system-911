import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { env } from "process";

import { BehaviorSubject, observable, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LibrariesService {
  onPaginationConfigChange: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.onPaginationConfigChange = new BehaviorSubject(null);
  }
  result = new HttpHeaders()

    .set("Content-Type", "application/json")

    // TODO: Move adding token to intercept.service.ts

    .set("Authorization", "Bearer " + localStorage.getItem("jwt"));
  getLibrarys(pagination) {
    return this.http
      .get<any>(environment.apiUrl + "/library", {
        headers: this.result,
        params: new HttpParams()
          .set("page", pagination.pageIndex.toString())
          .set("size", pagination.pageSize.toString()),
      })
      .pipe(
        map((corr) => {
          this.onPaginationConfigChange.next({
            pageSize: pagination.pageSize,
            pageIndex: pagination.pageIndex,
            length: corr.result.totalElements,
          });
          return corr.result.content;
        })
      );
  }
  getChildsLibrarys(id, pagination) {
    return this.http
      .get<any>(environment.apiUrl + "/library/parent/" + id, {
        headers: this.result,
        params: new HttpParams()
          .set("page", pagination.pageIndex.toString())
          .set("size", pagination.pageSize.toString()),
      })
      .pipe(
        map((corr) => {
          this.onPaginationConfigChange.next({
            pageSize: pagination.pageSize,
            pageIndex: pagination.pageIndex,
            length: corr.result.totalElements,
          });
          return corr.result.content;
        })
      );
  }
  getAccessTypes() {
    return this.http
      .get<any>(environment.apiUrl + "/library/accesstypes", {
        headers: this.result,
      })
      .pipe(map((corr) => corr.result));
  }
  getCategories() {
    return this.http
      .get<any>(environment.apiUrl + "/library/categories", {
        headers: this.result,
      })
      .pipe(map((corr) => corr.result));
  }

  CreateFolder(library) {
    return this.http.post<any>(environment.apiUrl + "/library", library, {
      headers: this.result,
    });
  }

  deleteFolder(id) {
    this.http
      .delete<any>(environment.apiUrl + "/library/" + id, {
        headers: this.result,
      })
      .subscribe((x) => console.log("delete success", x));
  }

  downloadFile(uuid) {
    return this.http.get<any>(environment.apiUrl + "/dms/load/" + uuid, {
      headers: new HttpHeaders()
        .set("Content-Type", "txt")
        .set("Authorization", "Bearer " + localStorage.getItem("jwt")),
      observe: "body",
      responseType: "blob" as "json",
    });
  }

  getAttachments(id) {
    return this.http.get<any>(`${environment.apiUrl}/dms/tag`, {
      headers: this.result,
      params: { entityId: id, entityTagId: "3" },
    });
  }
  uploadFile(file, recordId) {
    let result = new HttpHeaders().set(
      "Authorization",
      "Bearer " + localStorage.getItem("jwt")
    );
    let formData: FormData = new FormData();
    formData.append("file", file, file.name);

    return this.http.post(environment.apiUrl + "/dms/upload", formData, {
      headers: result,
      params: { recordId: recordId, tagId: "3" },
    });
  }

  update(library) {
    return this.http.put<any>(environment.apiUrl + "/library", library, {
      headers: this.result,
    });
  }
}
