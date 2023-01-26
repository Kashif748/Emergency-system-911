import {HttpHeaders, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {forkJoin, of} from 'rxjs';
import {tap} from 'rxjs/operators';

import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DmsService {
  constructor(
    private http: HttpClient,
    private translationService: TranslationService,
    private alertService: AlertsService
  ) {
  }

  private uploadFile(formData: FormData, recordId: number, tagId: number) {
    const uploadHeaders = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + localStorage.getItem('jwt')
    );

    return this.http
      .post<any>(
        `${environment.apiUrl}/dms/upload?recordId=${recordId}&tagId=${tagId}`,
        formData,
        {headers: uploadHeaders}
      )
      .pipe(
        tap((r) => {
          this.alertService.openSuccessSnackBarWithMsg(
            `${r?.result?.fileName} has been uploaded successfully`
          );
        })
      );
  }

  uploadFiles(files: File[], recordId: number, tagId: number, description: string = null) {
    if (files?.length <= 0) {
      return of();
    }
    this.alertService.openSuccessSnackBarWithMsg(
      this.translationService.get('SHARED.NOTIFICATION.UPLOAD')
    );

    const files$ = files.map((f) => {
      const fd = new FormData();
      fd.set('file', f);
      if (description) {
        fd.set('desc', description);
      }
      return this.uploadFile(fd, recordId, tagId);
    });
    this.alertService.openSuccessSnackBarWithMsg(
      this.translationService.get('SHARED.NOTIFICATION.UPLOAD')
    );
    return forkJoin(files$);
  }

  getDmsFiles(entityId, entityTagId) {
    return this.http.get<any>(
      `${environment.apiUrl}/dms/tag?entityId=${entityId}&entityTagId=${entityTagId}`,
      {}
    );
  }
}
