import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DependenciesRoutingModule } from './dependencies-routing.module';
import { BrowseDependenciesComponent } from './browse-dependencies/browse-dependencies.component';
import { ContentDependenciesComponent } from './browse-dependencies/content-dependencies/content-dependencies.component';
import { DependenciesDialogComponent } from './browse-dependencies/dependencies-dialog/dependencies-dialog.component';
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
import {HttpClient} from "@angular/common/http";
import {DialogModule} from "primeng/dialog";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {MenuModule} from "primeng/menu";
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {CheckboxModule} from "primeng/checkbox";
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/new-activity/',
    '.json'
  );
}

@NgModule({
  declarations: [BrowseDependenciesComponent, ContentDependenciesComponent, DependenciesDialogComponent],
  imports: [
    CommonModule,
    DependenciesRoutingModule,
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
    TableModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    NodataTableModule,
    DialogModule,
    CheckboxModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class DependenciesModule { }
