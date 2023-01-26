import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { UrlHelperService } from '@core/services/url-helper.service';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {TranslationService} from "../i18n/translation.service";

@Injectable({
  providedIn: 'root',
})
export class UserStatisticsReportService {
  baseUrl = environment.apiUrl;
  lang: string;

  constructor(
    private http: HttpClient,
    private langFacade: ILangFacade,
    private urlHelper: UrlHelperService,
    private translation: TranslationService,
  ) {
    this.lang = this.translation.getSelectedLanguage();
  }

  loadReport(
    tableView: 'incidents' | 'tasks',
    queryParams: Record<string, string>
  ) {
    // ?orgId=2&userId=109,444&fromDate=2022-10-01&toDate=2022-10-30
    return this.http.get(
      `${this.baseUrl}/user-statistics-report/${tableView}`,
      {
        params: queryParams,
      }
    );
  }

  downloadReport(exportAs: 'PDF' | 'EXCEL', category: 'incidents' | 'tasks', filterForm?) {
    console.log(filterForm)
    return this.http
      .get<any>(`${environment.apiUrl}/user-statistics-report/` + category + `/export`, {
        params: {
          as: exportAs,
          lang: (this.lang == 'ar') + '',
          orgId: filterForm?.orgId ?? '',
          fromDate: filterForm?.fromDate ?? '',
          toDate: filterForm?.toDate ?? '',
          userId: filterForm?.userId.toString() ?? '',
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
}
