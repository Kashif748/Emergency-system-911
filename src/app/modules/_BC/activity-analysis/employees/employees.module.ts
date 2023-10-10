import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { BrowseEmployeesComponent } from './browse-employees/browse-employees.component';
import { ContentEmployeesComponent } from './browse-employees/content-employees/content-employees.component';
import { EmployeesDialogComponent } from './browse-employees/employees-dialog/employees-dialog.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {BlockUIModule} from "primeng/blockui";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {DividerModule} from "primeng/divider";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputTextModule} from "primeng/inputtext";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {SkeletonModule} from "primeng/skeleton";
import {DialogModule} from "primeng/dialog";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MenuModule} from "primeng/menu";
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {NgxIntlTelInputModule} from "@shared/sh-components/ngx-intl-tel-input/ngx-intl-tel-input.module";
import { NgxsModule } from '@ngxs/store';
import { BrowseActivityEmployeesState } from './states/browse-employees.state';
import { SelectButtonModule } from 'primeng/selectbutton';
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-activity-analysis/',
    '.json'
  );
}

@NgModule({
  declarations: [BrowseEmployeesComponent, ContentEmployeesComponent, EmployeesDialogComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    DividerModule,
    NgxsModule.forFeature([BrowseActivityEmployeesState]),

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
    SelectButtonModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    NodataTableModule,
    DialogModule,
    NgxIntlTelInputModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class EmployeesModule { }
