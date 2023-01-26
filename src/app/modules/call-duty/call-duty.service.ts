import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CallDutyService {
  result = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  constructor(
    private _httpClient: HttpClient,
    private alertService: AlertsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.resolve(this.getAllUsers()).then((files) => {
        resolve(files);
      }, reject);
    });
  }

  getAllIncidents(page = 0, size = 10, search = ''): Observable<any> {
    let params = new HttpParams()
      .append('page', (page ?? 0) + '')
      .append('size', (size ?? 10) + '')
      .append('subject', search);
    return this._httpClient
      .get<any>(`${environment.apiUrl}/incidents/search`, {
        headers: this.result,
        params: params,
      })
      .pipe(map((incidents) => incidents.result.content));
  }
  getAllGroups(page = 0, size = 10, search = ''): Observable<any> {
    let params = new HttpParams()
      .append('page', (page ?? 0) + '')
      .append('size', (size ?? 10) + '')
      .append('name', search);
    return this._httpClient
      .get<any>(`${environment.apiUrl}/groups`, {
        headers: this.result,
        params: params,
      })
      .pipe(map((groups) => groups.result));
  }

  getIncidentsLocationInfo() {
    return this._httpClient
      .get(`${environment.apiUrl}/incident-location-info`)
      .pipe(map((data) => data['result']));
  }
  getAllUsers() {
    return this._httpClient
      .get<any>(`${environment.apiUrl}/users`, { headers: this.result })
      .pipe(map((users) => users.result.content));
  }

  sendSMS(message: any) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`${environment.apiUrl}/sendSMS`, message, {
          headers: this.result,
        })
        .subscribe(
          (res) => {
            //console.log(res);

            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }

  sendEmail(body) {
    console.log(body);

    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`${environment.apiUrl}/mail/send`, body, {
          headers: this.result,
        })
        .subscribe(
          (res) => {
            //console.log(res);

            if (res && res['status']) {
              this.alertService.openSuccessSnackBar();
              resolve(true);
            } else {
              this.alertService.openFailureSnackBar();
              reject(new Error('faile'));
            }
          },
          (err) => {
            this.alertService.openFailureSnackBar();
            reject(err);
          }
        );
    });
  }
}
