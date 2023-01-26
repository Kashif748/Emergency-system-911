import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { reject } from 'esri/core/promiseUtils';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KpiV2Service {
  baseUrl = environment.apiUrlV2;

  kpisV2: any[] = [];
  private _onKpisV2: BehaviorSubject<any>;

  onPaginationConfigChange: BehaviorSubject<PageEvent>;

  t;

  constructor(
    private _httpClient: HttpClient,
    private alertService: AlertsService
  ) {
    this._onKpisV2 = new BehaviorSubject([]);
    this.onPaginationConfigChange = new BehaviorSubject(null);
  }

  public get onKpisV2(): Observable<any> {
    return this._onKpisV2.asObservable();
  }

  getAllKpiV2(pagination?: PageEvent, searchByName?, sort?) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get<any>(`${this.baseUrl}/kpis/`, {
          params: {
            size: pagination?.pageSize.toString() ?? '10',
            page: pagination?.pageIndex.toString() ?? '0',
            name: searchByName ?? '',
            sort: `${sort?.active ?? ''},${sort?.direction ?? ''}`,
          },
        })
        .subscribe((response: any) => {
          if (!response || response['status']) reject;
          let result = response['result'];
          pagination.length = response['result']['totalElements'];

          this.onPaginationConfigChange.next(pagination);

          this.kpisV2 = result['content'].map((item) => {
            return { ...item.kpi, kpiPriorities: item.kpiPriorities };
          });
          this._onKpisV2.next(this.kpisV2);
          resolve(this.kpisV2);
        }, reject);
    });
  }

  getKpiById(id) {
    return this.kpisV2.find((item) => item.id == id);
  }
  createKpi(level: any) {
    return new Promise((resolve, reject) => {
      this._httpClient.post(`${this.baseUrl}/kpis`, level, {}).subscribe(
        (res) => {
          if (res && res['status']) {
            this.alertService.openSuccessSnackBar();
            resolve(true);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('failed'));
          }
        },
        (err) => {
          this.alertService.openFailureSnackBar();
          reject(err);
        }
      );
    });
  }

  updateKpi(level: any) {
    return new Promise((resolve, reject) => {
      this._httpClient.put(`${this.baseUrl}/kpis`, level, {}).subscribe(
        (res) => {
          if (res && res['status']) {
            this.alertService.openSuccessSnackBar();
            resolve(true);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('failed'));
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
