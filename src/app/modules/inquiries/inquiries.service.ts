import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { UrlHelperService } from '@core/services/url-helper.service';
import { BehaviorSubject } from 'rxjs';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InquiriesService {
  lang: string;
  private chartsData: any[] = [];
  private _onChartsData: BehaviorSubject<any>;


  constructor(
    private http: HttpClient,
    private translationService: TranslationService,
    private urlHelper: UrlHelperService,
    private alertService: AlertsService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
    this._onChartsData = new BehaviorSubject([]);

  }



  public get onChartsData(): Observable<any> {
    return this._onChartsData.asObservable();
  }

  getInquiries(data? , pageNumber? , pageSize?): Observable<any> {
    return this.http.get(`${environment.apiUrl}/inquiry/search`, {
      params: {
        fromDate: data?.fromDate ?? '',
        toDate: data?.toDate ?? '',
        subject: data?.subject ?? '',
        userId: data?.userId?.id ?? '',
        page: pageNumber ?? '0',
        size : pageSize ?? '10'
        // sort: `${sort?.active ?? ''},${sort?.direction ?? ''}`,
      },
    });
  }

  downloadReport(exportAs: 'PDF' | 'EXCEL', filterForm?) {
    return this.http
      .get<any>(`${environment.apiUrl}/inquiry/export`, {
        params: {
          as: exportAs,
          lang: (this.lang == 'ar') + '',
          fromDate: filterForm?.fromDate ?? '',
          toDate: filterForm?.toDate ?? '',
          orgId: filterForm?.orgId ?? '',
          userId: filterForm?.userId ?? '',
          subject: filterForm?.subject ?? '',
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

  getStatistics(filterForm?) {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${environment.apiUrl}/inquiry/statistics`, {
          params: {
            fromDate: filterForm?.fromDate ?? '',
            toDate: filterForm?.toDate ?? '',
            subject: filterForm?.subject ?? '',
            userId: filterForm?.userId ?? '',
            callDurationInMinutes: filterForm?.callDurationInMinutes ?? '',
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
}
