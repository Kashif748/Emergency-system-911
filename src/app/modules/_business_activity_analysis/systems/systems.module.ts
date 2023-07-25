import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemsRoutingModule } from './systems-routing.module';
import { BrowseSystemsComponent } from './browse-systems/browse-systems.component';
import { ContentSystemsComponent } from './browse-systems/content-systems/content-systems.component';
import { SystemsDialogComponent } from './browse-systems/systems-dialog/systems-dialog.component';
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
import {SkeletonModule} from "primeng/skeleton";
import {PaginatorModule} from "primeng/paginator";
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {BlockUIModule} from "primeng/blockui";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DialogModule} from "primeng/dialog";
import { BrowseActivitySystemsState } from './states/browse-systems.state';
import { NgxsModule } from '@ngxs/store';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-activity-analysis/',
    '.json'
  );
}

@NgModule({
  declarations: [BrowseSystemsComponent, ContentSystemsComponent, SystemsDialogComponent],
  imports: [
    CommonModule,
    SystemsRoutingModule,
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
    NgxsModule.forFeature([BrowseActivitySystemsState]),
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
    DialogModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class SystemsModule { }
