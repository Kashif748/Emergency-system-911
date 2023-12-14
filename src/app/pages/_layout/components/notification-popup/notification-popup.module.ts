import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationPopupComponent} from './notification-popup.component';
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "@shared/shared.module";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [NotificationPopupComponent],
  imports: [
    CommonModule,
    DialogModule,
    SharedModule,
    ButtonModule
  ],
  exports: [NotificationPopupComponent],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class NotificationPopupModule { }
