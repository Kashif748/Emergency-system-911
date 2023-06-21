import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { BrowseSystemComponent } from './browse-system/browse-system.component';
import { SystemContentComponent } from './browse-system/system-content/system-content.component';
import { SystemDialogComponent } from './browse-system/system-dialog/system-dialog.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {DividerModule} from "primeng/divider";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import {InputTextModule} from "primeng/inputtext";
import {BadgeModule} from "primeng/badge";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {SplitButtonModule} from "primeng/splitbutton";
import {NgxIntlTelInputModule} from "@shared/sh-components/ngx-intl-tel-input/ngx-intl-tel-input.module";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {ToolbarModule} from "primeng/toolbar";
import {PanelMenuModule} from "primeng/panelmenu";
import {DialogModule} from "primeng/dialog";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {FieldsetModule} from "primeng/fieldset";
import {TableModule} from "primeng/table";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {OrganizationChartModule} from "primeng/organizationchart";
import {MenuModule} from "primeng/menu";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BlockUIModule} from "primeng/blockui";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/business-continuity-setup/', '.json');
}

@NgModule({
  declarations: [BrowseSystemComponent, SystemContentComponent, SystemDialogComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    PanelMenuModule,
    OrganizationChartModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    ToolbarModule,
    DialogModule,
    SplitButtonModule,
    DividerModule,
    SelectButtonModule,
    FieldsetModule,
    BadgeModule,
    NodataTableModule,
    TranslateObjModule,
    MultiSelectModule,
    ToggleButtonModule,
    NgxIntlTelInputModule,
    SharedBreadcrumbModule,
    ProgressSpinnerModule,
    BlockUIModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class SystemModule { }