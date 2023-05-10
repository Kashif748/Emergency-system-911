import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UrlHelperService } from '@core/services/url-helper.service';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SurveysManagementService {
  baseUrl = environment.apiUrl;

  private surveysList: any[] = [];
  private _onSurveysList: BehaviorSubject<any>;
  private _onSurveysListReport: BehaviorSubject<any>;

  private chartsData: any[] = [];
  private _onChartsData: BehaviorSubject<any>;
  public incidentSurveyConfig: any;

  onPaginationConfigChange: BehaviorSubject<PageEvent>;

  lang: string;
  constructor(
    private _httpClient: HttpClient,
    private alertService: AlertsService,
    private _translation: TranslationService,
    private translateService: TranslateService,
    private urlHelper: UrlHelperService
  ) {
    this._onSurveysList = new BehaviorSubject([]);
    this._onChartsData = new BehaviorSubject([]);
    this._onSurveysListReport = new BehaviorSubject([]);
    this.onPaginationConfigChange = new BehaviorSubject(null);
    this.lang = this._translation.getSelectedLanguage();
  }

  public get onSurveysList(): Observable<any> {
    return this._onSurveysList.asObservable();
  }

  public get onSurveysListReport(): Observable<any> {
    return this._onSurveysListReport.asObservable();
  }

  public get onChartsData(): Observable<any> {
    return this._onChartsData.asObservable();
  }

  getAllSurveys(pagination?: PageEvent, filterForm?, sort?) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get<any>(`${this.baseUrl}/incident-survey`, {
          params: {
            size: pagination?.pageSize.toString() ?? '10',
            page: pagination?.pageIndex.toString() ?? '0',
            fromDate: filterForm?.fromDate ?? '',
            toDate: filterForm?.toDate ?? '',
            happiness: filterForm?.happiness ?? '',
            reason: filterForm?.reason ?? '',
            incidentId: filterForm?.incident ?? '',
            sort: `${sort?.active ?? ''},${sort?.direction ?? ''}`,
          },
        })
        .subscribe(
          (response: any) => {
            if (!response || response['status']) reject;
            let result = response['result'];
            pagination.length = response['result']['totalElements'];
            this.onPaginationConfigChange.next(pagination);
            this.surveysList = result['content'];
            this._onSurveysList.next(this.surveysList);
            resolve(this._onSurveysList);
          },
          (err) => {
            this._onSurveysList.next([]);
            this.alertService.openFailureSnackBar();
            reject;
          }
        );
    });
  }

  getStatistics(filterForm?) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get<any>(`${this.baseUrl}/incident-survey/statistics`, {
          params: {
            fromDate: filterForm?.fromDate ?? '',
            toDate: filterForm?.toDate ?? '',
            incidentId: filterForm?.incident ?? '',
            reason: filterForm?.reason ?? '',
            happiness: filterForm?.happiness ?? '',
          },
        })
        .subscribe(
          (response: any) => {
            if (!response || response['status']) {
              reject;
            }
            this.chartsData = response['result'];
            this._onChartsData.next(this.chartsData);
            resolve(true);
          },
          (err) => {
            this._onChartsData.next(null);
            this.alertService.openFailureSnackBar();
            reject;
          }
        );
    });
  }

  downloadReport(
    exportAs: 'PDF' | 'EXCEL',
    filterForm?,
    pagination?: PageEvent
  ) {
    return this._httpClient
      .get<any>(`${environment.apiUrl}/incident-survey/export`, {
        params: {
          size: pagination?.pageSize.toString() ?? '10',
          page: pagination?.pageIndex.toString() ?? '0',
          as: exportAs,
          lang: (this.lang == 'ar') + '',
          fromDate: filterForm?.fromDate ?? '',
          toDate: filterForm?.toDate ?? '',
          happiness: filterForm?.happiness ?? '',
          reason: filterForm?.reason ?? '',
          incidentId: filterForm?.incident ?? '',
        },

        responseType: 'blob' as any,
      })
      .pipe(
        tap((res) => {
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

  //Incident-Survey-Report Module

  getincidentSurveyConfig() {
    return this._httpClient
      .get<any>(environment.apiUrlV2 + '/incident-survey-config/ext')
      .subscribe((res) => {
        this.incidentSurveyConfig = res.result;
      });
  }

  getStatisticsReport(filterForm?) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get<any>(`${environment.apiUrlV2}/incident-survey/statistics`, {
          params: {
            fromDate: filterForm?.fromDate ?? '',
            toDate: filterForm?.toDate ?? '',
            incidentId: filterForm?.incident ?? '',
            orgId: '',
          },
        })
        .subscribe(
          (response: any) => {
            if (!response || response['status']) {
              reject;
            }
            this.chartsData = response['result'];
            this._onChartsData.next(this.chartsData);
            resolve(true);
          },
          (err) => {
            this._onChartsData.next(null);
            this.alertService.openFailureSnackBar();
            reject;
          }
        );
    });
  }

  getAllSurveysReport(pagination?: PageEvent, filterForm?, sort?) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get<any>(`${environment.apiUrlV2}/incident-survey/search`, {
          params: {
            size: pagination?.pageSize.toString() ?? '10',
            page: pagination?.pageIndex.toString() ?? '0',
            fromDate: filterForm?.fromDate ?? '',
            toDate: filterForm?.toDate ?? '',
            incidentId: filterForm?.incident ?? '',
            sort: `${sort?.active ?? ''},${
              sort?.direction ?? 'createdDate,desc'
            }`,
          },
        })
        .subscribe(
          (response: any) => {
            if (!response || response['status']) reject;
            let result = response['result'];
            pagination.length = response['result']['totalElements'];
            this.onPaginationConfigChange.next(pagination);
            this.surveysList = result['content'];
            this._onSurveysListReport.next(this.surveysList);
            resolve(this._onSurveysList);
          },
          (err) => {
            this._onSurveysListReport.next([]);
            this.alertService.openFailureSnackBar();
            reject;
          }
        );
    });
  }

  downloadSurveyReport(
    exportAs: 'PDF' | 'EXCEL',
    filterForm?,
    pagination?: PageEvent
  ) {
    return this._httpClient
      .get<any>(`${environment.apiUrlV2}/incident-survey/export`, {
        params: {
          size: pagination?.pageSize.toString() ?? '10',
          page: pagination?.pageIndex.toString() ?? '0',
          as: exportAs,
          lang: (this.lang == 'ar') + '',
          fromDate: filterForm?.fromDate ?? '',
          toDate: filterForm?.toDate ?? '',
          incidentId: filterForm?.incident ?? '',
        },

        responseType: 'blob' as any,
      })
      .pipe(
        tap((res) => {
          const fileLabel = `${this.translateService.instant(
            'Survey.SURVEY_REPORT'
          )}`;
          const fileDate = `${DateTimeUtil.format(
            new Date(),
            'YYYY-MM-DD H:mm a'
          )}`;

          const fileName = `${fileLabel} ${fileDate}`;
          const newBlob = new Blob([res], {
            type: `application/${
              exportAs === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }`,
          });
          this.urlHelper.downloadBlob(newBlob ,fileName);
        })
      );
  }
}
