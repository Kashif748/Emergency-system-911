import { Direction } from '@angular/cdk/bidi';
import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILangFacade } from '@core/facades/lang.facade';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor(
    private langFacade: ILangFacade,
    private translate: TranslateService,
    private injector: Injector
  ) {}

  openFailureSnackBar() {
    this.injector.get(MatSnackBar).open('Error', 'FAILED', {
      duration: 2000,
      direction: this.langFacade.stateSanpshot.ActiveLang.dir as Direction,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  customFailureSnackBar(msg) {
    this.injector.get(MatSnackBar).open('Error', msg, {
      duration: 4000,
      direction: this.langFacade.stateSanpshot.ActiveLang.dir as Direction,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  openFailureSnackBarWithMsg(msg, duration = 2000) {
    this.injector.get(MatSnackBar).open('Error', msg, {
      duration,
      direction: this.langFacade.stateSanpshot.ActiveLang.dir as Direction,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  openSuccessSnackBarWithMsg(msg, durationInSeconds: number = 2) {
    this.injector.get(MatSnackBar).open(this.translate.instant(msg), '', {
      duration: durationInSeconds,
      direction: this.langFacade.stateSanpshot.ActiveLang.dir as Direction,
      panelClass: ['blue-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  openSuccessSnackBar(
    message: string = 'COMMON.SUCCESSFULLY_DEFAULT',
    action: string = 'COMMON.SUCCESS'
  ) {
    this.injector
      .get(MatSnackBar)
      .open(this.translate.instant(message), this.translate.instant(action), {
        duration: 2000,
        direction: this.langFacade.stateSanpshot.ActiveLang.dir as Direction,
        panelClass: ['blue-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
  }

  customWarningSnackBar(msg) {
    this.injector.get(MatSnackBar).open('Warning', msg, {
      duration: 4000,
      direction: this.langFacade.stateSanpshot.ActiveLang.dir as Direction,
      panelClass: ['red-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
