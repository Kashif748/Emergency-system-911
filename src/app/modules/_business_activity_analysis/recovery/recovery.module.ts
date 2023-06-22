import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoveryRoutingModule } from './recovery-routing.module';
import { BrowseRecoveryComponent } from './browse-recovery/browse-recovery.component';
import { ContentRecoveryComponent } from './browse-recovery/content-recovery/content-recovery.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {DropdownModule} from "primeng/dropdown";
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/new-activity/',
    '.json'
  );
}

@NgModule({
  declarations: [BrowseRecoveryComponent, ContentRecoveryComponent],
  imports: [
    CommonModule,
    RecoveryRoutingModule,
    DividerModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TranslateObjModule,
    DropdownModule,
    CheckboxModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class RecoveryModule { }
