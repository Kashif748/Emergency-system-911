import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";

import { Correspondence } from "src/app/modules/correspondence/models/correspondence.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CorrService {
  private corrSubject = new Subject<Correspondence[]>();
  public corrChanged$: Observable<any[]>;
  constructor(private http: HttpClient) {
    this.corrChanged$ = this.corrSubject.asObservable();
  }

  result = new HttpHeaders().set(
    "Authorization",
    "Bearer " + localStorage.getItem("jwt")
  );

  getReceiving(
    pageIndex: number = 0,
    filter: { fitlerType: string; filter: string },
    withCircular?: any,
    external?: any
  ) {
    let httpParams = new HttpParams();

    httpParams = httpParams
      .append("page", pageIndex.toString())
      .append("sort", "created_on,desc")
      .append("size", "20");

    if (filter && filter.filter) {
      httpParams = httpParams.append(filter["fitlerType"], filter.filter);
    }

    if (!httpParams.has("filter")) {
      httpParams = httpParams.append("filter", "");
    }

    if (withCircular) {
      httpParams = httpParams.append("withCircular", withCircular);
    }

    if (external) {
      httpParams = httpParams.append("external", external);
    }

    return this.http.get<any>(environment.apiUrl + "/correspondences/receiving", {
          params: httpParams,
          headers: this.result,
        })
        .pipe(map((corr) => corr.result),
        tap(data => this.corrSubject.next(data.content)))
  }

  getSending(
    pageIndex: number = 0,
    filter: { fitlerType: string; filter: string },
    withCircular?: any,
    external?: any
  ) {

    let httpParams = new HttpParams();

    httpParams = httpParams
      .append("page", pageIndex.toString())
      .append("sort", "createdOn,desc")
      .append("size", "20");

    if (filter && filter.filter) {
      httpParams = httpParams.append(filter["fitlerType"], filter.filter);
    }

    if (!httpParams.has("filter")) {
      httpParams = httpParams.append("filter", "");
    }

    if (withCircular) {
      httpParams = httpParams.append("withCircular", withCircular);
    }

    if (external) {
      httpParams = httpParams.append("external", external);
    }

    return new Promise((resolve, reject) => {
      this.http
        .get<any>(environment.apiUrl + "/correspondences/sending", {
          params: httpParams,
          headers: this.result,
        })
        .pipe(map((corr) => corr.result))
        .subscribe(
          (data) => {
            this.corrSubject.next(data.content);
            resolve(true);
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getById(id = 0) {
    return this.http
      .get<any>(environment.apiUrl + "/correspondences/" + id, {
        headers: this.result,
      })
      .pipe(map((corr) => corr.result));
  }

  create(formData) {
    return this.http
      .post<any>(environment.apiUrl + "/correspondences", formData, {
        headers: this.result,
      })
      .pipe((corr) => {
        return corr;
      });
  }

  uploadFile(formData, recordId, tagId) {
    return this.http
      .post<any>(environment.apiUrl + '/dms/upload/?recordId=' + recordId + '&tagId=' + tagId , formData, {
        headers: this.result,
      })
      .pipe((corr) => {
        return corr;
      });
  }

  updateStatus(corrId, status) {
    return this.http
      .put<any>(
        environment.apiUrl + "/correspondences/status/" + corrId,
        status,
        {
          headers: this.result,
        }
      )
      .pipe((corr) => {
        return corr;
      });
  }

  loadAttachmants(corrId) {
    return this.http
      .get<any>(
        environment.apiUrl +
          "/dms?entityId=" +
          corrId +
          "&entityLabel=Correspondence",
        {
          headers: this.result,
        }
      )
      .pipe((att) => {
        return att;
      });
  }

  getReplyInfo(corrId) {
    return this.http
      .get<any>(environment.apiUrl + "/correspondences/reply-info/" + corrId, {
        headers: this.result,
      })
      .pipe((repInfo) => {
        return repInfo;
      });
  }
  downloadFile(uid: string) {
    return this.http.get<Blob>(environment.apiUrl + "/dms/load/" + uid, {
      headers: this.result,
      responseType: "blob" as "json",
      observe: "response",
    });
  }
}
