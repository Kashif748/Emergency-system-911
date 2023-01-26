import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { IAvailabilityReport } from "src/app/modules/availability-report/availability.model";
import { DataSourceService } from "src/app/modules/services/data-source/data-source.service";
import { environment } from "src/environments/environment";

const endPoint: string = "reports/adcda/";

@Injectable({
  providedIn: "root",
})
export class AvailabilityService
  extends DataSourceService
  implements Resolve<any>
{
  public reportsChanged$: Observable<any[]>;
  public reportSubject: BehaviorSubject<any> = new BehaviorSubject([]);

  public availabilityChanged$: Observable<any[]>;
  public availabilitySubject: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor() {
    super(endPoint);
    this.reportsChanged$ = this.reportSubject.asObservable();
    this.availabilityChanged$ = this.availabilitySubject.asObservable();
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([this.getAllAvailabilityRoperts()]).then((content) => {
        resolve(content);
      }, reject);
    });
  }

  // this  method  to  get  the  global  schema  for reports
  getAvailabilityReport(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getAll<IAvailabilityReport>("availability").subscribe(
        (data) => {
          this.reportSubject.next(data);
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getAllAvailabilityRoperts() {
    return this.http
      .get(`${environment.apiUrl}/adcda/availability-report`)
      .pipe(
        tap((data) => {
          this.availabilitySubject.next(data["result"]["content"]);
        })
      )
      .toPromise();
  }

  getCurrentState(id) {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment.apiUrl}/adcda/availability-report/${id}`)
        .subscribe(
          (response) => {
            if (response && response["status"]) {
              const body = JSON.parse(response["result"].body);
              this.reportSubject.next(body);
              resolve(body);
            }
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
  createNewReport(currentState) {
    this.http
      .post(`${environment.apiUrl}/adcda/availability-report`, currentState)
      .subscribe((data) => {});
  }
  saveCurrentState(currentState) {
    this.http
      .put(`${environment.apiUrl}/adcda/availability-report`, currentState)
      .subscribe((response) => {
        if (response && response["status"]) {
          const t = this.availabilitySubject.value.map((p) =>
            p.id == currentState.id ? { ...p, body: currentState.body } : p
          );
          this.availabilitySubject.next(t);
        }
      });
  }
}
