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
import { SystemsContentComponent } from './business-continuity-setup/systems-content/systems-content.component';
import { LocationsContentComponent } from './business-continuity-setup/locations-content/locations-content.component';
import { VendersPartnersContentComponent } from './business-continuity-setup/venders-partners-content/venders-partners-content.component';
import {BadgeModule} from 'primeng/badge';
import { NodataTableModule } from '../../shared/components/nodata-table/nodata-table.module';
import { AddSystemDialogComponent } from './business-continuity-setup/dialog/add-system-dialog/add-system-dialog.component';
import { AddLocationDialogComponent } from './business-continuity-setup/dialog/add-location-dialog/add-location-dialog.component';
import { AddVendersDialogComponent } from './business-continuity-setup/dialog/add-venders-dialog/add-venders-dialog.component';
import {TranslateObjModule} from "../../shared/sh-pipes/translate-obj.pipe";
import {MultiSelectModule} from "primeng/multiselect";
import {ToggleButtonModule} from "primeng/togglebutton";
import { NgxIntlTelInputModule } from '@shared/sh-components/ngx-intl-tel-input/ngx-intl-tel-input.module';


export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-continuity-setup/',
    '.json'
  );
}

@NgModule({
  declarations: [BusinessContinuitySetupComponent, SystemsContentComponent,
    LocationsContentComponent, VendersPartnersContentComponent,
    AddSystemDialogComponent, AddLocationDialogComponent,
    AddVendersDialogComponent],
  imports: [
    CommonModule,
    BusinessContinuitySetupRoutingModule,
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
    NgxIntlTelInputModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class BusinessContinuitySetupModule { }
