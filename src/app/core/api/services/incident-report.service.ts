import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { map, tap } from 'rxjs/operators';
import { ILangFacade } from '@core/facades/lang.facade';
import { UrlHelperService } from '@core/services/url-helper.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class IncidentReportService {
  // Variables
  baseUrl = environment.apiUrl;
  private statisticsList: any[] = [];
  public statisticsChangeListener = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private langFacade: ILangFacade,
    private urlHelper: UrlHelperService,
    private alertService: AlertsService
  ) {
    this.statisticsChangeListener = new BehaviorSubject([]);
  }

  loadReport(queryParams: Record<string, string>) {
    return this.http.get(`${environment.apiUrl}/incidents/incident-report`, {
      params: queryParams,
    });
  }

  loadStatistics(queryParams: Record<string, string>) {
    const params: URLSearchParams = new URLSearchParams(queryParams);
    return this.http.get(`${environment.apiUrl}/incident-assets/statistics`, {
      params: queryParams,
    });
  }

  getStatisticsForCenters(filterForm?: any) {
    return this.http
      .get<any>(`${this.baseUrl}/incidents/statistics`, {
        params: {
          fromDate: filterForm?.fromDate ?? '',
          toDate: filterForm?.toDate ?? '',
        },
      })
      .pipe(map((res: any) => res?.result));
  }

  // getStatistics(filterForm?) {
  //   return new Promise((resolve, reject) => {
  //     this.http
  //       .get<any>(`${this.baseUrl}/incidents/statistics`, {
  //         params: {
  //           fromDate: filterForm?.fromDate ?? '',
  //           toDate: filterForm?.toDate ?? '',
  //         },
  //       })
  //       .subscribe(
  //         (response: any) => {
  //           if (response && response['status']) {
  //             this.statisticsList = response['result'];
  //             this.statisticsChangeListener.next(this.statisticsList);
  //             resolve(this.statisticsChangeListener);
  //           } else {
  //             reject(false);
  //           }
  //         },
  //         (err) => {
  //           this.statisticsChangeListener.next([]);
  //           this.alertService.openFailureSnackBar();
  //           reject(false);
  //         }
  //       );
  //   });
  // }

  downloadReport(exportAs: 'PDF' | 'EXCEL', filterForm?) {
    const headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    return this.http
      .get<any>(`${this.baseUrl}/incidents/consolidate-statistics/report`, {
        headers,
        params: {
          exportAs,
          language: (this.langFacade.stateSanpshot.ActiveLang.key == 'ar') + '',
          fromDate: filterForm?.fromDate ?? '',
          toDate: filterForm?.toDate ?? '',
          centerId: filterForm?.centerId ?? '',
        },

        responseType: 'blob' as any,
      })
      .pipe(
        tap((res) => {
          console.log('here 2', res);

          const newBlob = new Blob([res], {
            type: `application/${
              exportAs === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }`,
          });
          this.urlHelper.downloadBlob(newBlob);
        })
      );
  }

  getStatisticsForMainOrg(filterForm?) {
    return this.http
      .get<any>(`${this.baseUrl}/incidents/main-organization/statistics`, {
        params: {
          fromDate: filterForm?.fromDate ?? '',
          toDate: filterForm?.toDate ?? '',
        },
      })
      .pipe(
        map((res: any) => res?.result),
        tap((data: any) => {
          this.statisticsList = data;
          this.statisticsChangeListener.next(this.statisticsList);
        })
      );
    // .subscribe(
    //   (data: any) => {
    //       this.statisticsList = data;
    //       this.statisticsChangeListener.next(this.statisticsList);
    //   },
    //   (err) => {
    //     this.statisticsChangeListener.next([]);
    //     this.alertService.openFailureSnackBar();
    //   }
    // );
  }

  downloadReportForMainOrg(exportAs: 'PDF' | 'EXCEL', filterForm?) {
    const headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    return this.http
      .get<any>(`${this.baseUrl}/incidents/main-organization/statistics/report`, {
        headers,
        params: {
          exportAs,
          language: (this.langFacade.stateSanpshot.ActiveLang.key == 'ar') + '',
          fromDate: filterForm?.fromDate ?? '',
          toDate: filterForm?.toDate ?? '',
          centerId: filterForm?.centerId ?? '',
        },

        responseType: 'blob' as any,
      })
      .pipe(
        tap((res) => {
          console.log('here 2', res);

          const newBlob = new Blob([res], {
            type: `application/${
              exportAs === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }`,
          });
          this.urlHelper.downloadBlob(newBlob);
        })
      );
  }
}
