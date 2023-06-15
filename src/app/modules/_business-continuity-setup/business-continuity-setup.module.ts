import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessContinuitySetupRoutingModule } from './business-continuity-setup-routing.module';
import { BusinessContinuitySetupComponent } from './business-continuity-setup/business-continuity-setup.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputTextModule} from "primeng/inputtext";
import {OrganizationChartModule} from "primeng/organizationchart";
import {PanelMenuModule} from "primeng/panelmenu";
import {TableModule} from "primeng/table";
import {SkeletonModule} from "primeng/skeleton";
import {PaginatorModule} from "primeng/paginator";
import {MenuModule} from "primeng/menu";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {SplitButtonModule} from "primeng/splitbutton";
import {DividerModule} from "primeng/divider";
import {SelectButtonModule} from "primeng/selectbutton";
import {FieldsetModule} from "primeng/fieldset";
import {BadgeModule} from 'primeng/badge';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import {MultiSelectModule} from "primeng/multiselect";
import {ToggleButtonModule} from "primeng/togglebutton";
import { NgxIntlTelInputModule } from '@shared/sh-components/ngx-intl-tel-input/ngx-intl-tel-input.module';
import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';


export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/business-continuity-setup/', '.json');
}

@NgModule({
  declarations: [BusinessContinuitySetupComponent
    ],
  imports: [
    CommonModule,
    BusinessContinuitySetupRoutingModule,
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
export class BusinessContinuitySetupModule { }
