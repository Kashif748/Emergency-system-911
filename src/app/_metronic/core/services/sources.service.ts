import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UrlHelperService } from '@core/services/url-helper.service';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';

import { environment } from 'src/environments/environment';
import { AlertsService } from './alerts.service';
enum AlertsStates {
  Hide,
  HasError,
  NoError,
}

@Injectable({
  providedIn: 'root',
})
export class AssetsService implements Resolve<any> {
  alertState: AlertsStates = AlertsStates.Hide;
  alertsStates = AlertsStates;
  alertMsg = 'ERROR_HAS_HAPPEND';
  alertDuration: number = 2;

  onAlertStateChange: BehaviorSubject<any>;

  /*
   */
  sourcesList: any[] = [];
  onSourcesListChange: BehaviorSubject<any>;

  result = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  lang: string;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private _alerts: AlertsService,
    private _translation: TranslationService,
    private urlHelper: UrlHelperService
  ) {
    this.onSourcesListChange = new BehaviorSubject([]);
    this.onAlertStateChange = new BehaviorSubject({
      alertState: AlertsStates.Hide,
      alertMsg: this.alertMsg,
    });
    this.lang = this._translation.getSelectedLanguage();
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.resolve(this.getSourcesList()).then((files) => {
        resolve(files);
      }, reject);
    });
  }

  getSourcesList() {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(environment.apiUrl + '/assets', {
          headers: this.result,
          params: {
            // page: form.pageNumber ?? '0',
            size: '10000',
            categoryId: '',
            orgId: '',
            details: '',
            sort: 'id,desc',
          },
        })
        .subscribe((response: any) => {
          if (!response || response['status']) reject;
          this.sourcesList = response['result'];
          this.onSourcesListChange.next(this.sourcesList);
          resolve(this.sourcesList);
        }, reject);
    });
  }


  getSourcesListFilter(form) {
    return this.http
    .get<any>(`${environment.apiUrl}/assets`, {
      headers: this.result,
      params: {
       // page: form.pageNumber ?? '0',
        size: '10000',
        categoryId: form.category ?? '',
        orgId: form?.organization ?? '',
        details: form?.nameEn ?? '',
        sort :  form?.sort ?? 'id,desc',
      },
    })
    .pipe(map((r) => r.result));
  }

  getSourceItemLocal(id) {
    return this.sourcesList.find((item) => item.id == id);
  }

  getById(id) {
    return this.http
      .get<any>(environment.apiUrl + '/assets/' + id, { headers: this.result })
      .pipe(map((corr) => corr.result));
  }

  getCategories() {
    return this.http
      .get<any>(`${environment.apiUrl}/assets-category`, {
        headers: this.result,
        params: { page: '0', size: '10000' },
      })
      .pipe(map((r) => r.result));
  }

  create(value) {
    return this.http
      .post<any>(environment.apiUrl + '/assets/', value, {
        headers: this.result,
      })
      .pipe(
        map((res) => {
          this.showMsg('SUCCESSFULLY_ADDED', this.alertsStates.NoError);
          this.onAlertStateChange.next({
            alertMsg: 'SUCCESSFULLY_ADDED',
            alertState: this.alertsStates.NoError,
          });

          // this._alerts.openSuccessSnackBarWithMsg("SUCCESSFULLY_ADDED",1000)
          //  this.toastr.success('resources added ','test')
          const newResourse =res['result'];
          this.sourcesList.push(newResourse);
          this.onSourcesListChange.next(this.sourcesList);

          // this.successMessage('SUCCESSFULLY_ADDED',this.alertsStates.NoError)
          setTimeout(() => {
            this.onAlertStateChange.next({
              alertMsg: '',
              alertState: this.alertsStates.Hide,
            });
          }, 5000);

          return newResourse;
        })
      );

    //   this.showMsg('ERROR_HAS_HAPPEND', this.alertsStates.HasError);
    //     this.errorMessage(
    //       'ERROR_HAS_HAPPEND',
    //       this.alertsStates.HasError
    //     );
    // }
  }

  update(value) {
    return this.http
      .put(`${environment.apiUrl}/assets/`, value, {
        headers: this.result,
      })
      .pipe(
        tap((res) => {
          if (res && res['status']) {
            this.showMsg('SUCCESSFULLY_UPDATED', this.alertsStates.NoError);
            this.sourcesList = this.sourcesList.map((item) => {
              if (item.id == value['id']) {
                return res['result'];
              } else {
                return item;
              }
            });
            this.onSourcesListChange.next(this.sourcesList);
          } else {
            this.showMsg('ERROR_HAS_HAPPEND', this.alertsStates.HasError);
          }
        })
      );
  }

  deleteSource(id) {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${environment.apiUrl}/assets/delete/${id}`, {
          headers: this.result,
        })
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.showMsg('SUCCESSFULLY_DELETED', this.alertsStates.NoError);
              this.sourcesList = this.sourcesList.filter((item) => {
                return item.id !== id;
              });
              this.onSourcesListChange.next(this.sourcesList);

              resolve(true);
            } else {
              this.showMsg('ERROR_HAS_HAPPEND', this.alertsStates.HasError);
              reject();
            }
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  showMsg(msg, type) {
    this.onAlertStateChange.next({
      alertMsg: msg,
      alertState: type,
    });
  }

  searchAssets(form) {
    return this.http
      .get<any>(`${environment.apiUrl}/assets/search`, {
        headers: this.result,
        params: {
          // page: form.pageNumber ?? '0',
          size: '10000',
          categoryId: form.category ?? '',
          orgId: form?.organization ?? '',
          details: form?.nameEn ?? '',
          sort :  form?.sort ?? 'id,desc',
        },
      })
      .pipe(map((r) => r.result));
  }

  errorMessage = (
    message: string,
    durationInSeconds: number = 2,
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'right'
  ) => {
    this.snackBarMessage(
      message,
      durationInSeconds,
      verticalPosition,
      horizontalPosition,
      'mat-warn'
    );
  };

  successMessage = (
    message: string,
    durationInSeconds: number = 2,
    verticalPosition: MatSnackBarVerticalPosition = 'top',
    horizontalPosition: MatSnackBarHorizontalPosition = 'right'
  ) => {
    this.snackBarMessage(
      message,
      durationInSeconds,
      verticalPosition,
      horizontalPosition,
      'mat-primary'
    );
  };

  snackBarMessage = (
    message: string,
    durationInSeconds: number = 2,
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    horizontalPosition: MatSnackBarHorizontalPosition = 'center',
    panelClass = 'mat-primary'
  ) => {
    {
      this.snackBar.open(message, '', {
        duration: durationInSeconds * 1000,
        verticalPosition,
        horizontalPosition,
        panelClass: ['mat-toolbar', panelClass],
      });
    }
  };

  downloadReport(exportAs: 'PDF' | 'EXCEL', filterForm?) {
    //
    return this.http
      .get<any>(`${environment.apiUrl}/assets/export`, {
        params: {
          as: exportAs,
          lang: (this.lang == 'ar') + '',
          categoryId: filterForm.category ?? '',
          orgId: filterForm?.organization ?? '',
          details: filterForm?.nameEn ?? '',
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

  uploadAssestFiles(AssestId, formData) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/dms/upload/?recordId=${AssestId}&tagId=29`,
        formData
      )
      .pipe((assest) => {
        return assest;
      });
  }
}
