import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationRoutingModule} from './location-routing.module';
import {BrowseLocationComponent} from './browse-location/browse-location.component';
import {LocationDialogComponent} from './browse-location/location-dialog/location-dialog.component';
import {LocationContentComponent} from './browse-location/location-content/location-content.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {DividerModule} from "primeng/divider";
import {ToggleButtonModule} from "primeng/togglebutton";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {PaginatorModule} from "primeng/paginator";
import {SkeletonModule} from "primeng/skeleton";
import {InputTextModule} from "primeng/inputtext";
import {OrganizationChartModule} from "primeng/organizationchart";
import {BadgeModule} from "primeng/badge";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {SplitButtonModule} from "primeng/splitbutton";
import {HttpClient} from "@angular/common/http";
import {NgxIntlTelInputModule} from "@shared/sh-components/ngx-intl-tel-input/ngx-intl-tel-input.module";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {ToolbarModule} from "primeng/toolbar";
import {PanelMenuModule} from "primeng/panelmenu";
import {DialogModule} from "primeng/dialog";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {FieldsetModule} from "primeng/fieldset";
import {TableModule} from "primeng/table";
import {MenuModule} from "primeng/menu";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BlockUIModule} from "primeng/blockui";
import { BrowseLocationsState } from './states/browse-locations.state';
import { NgxsModule } from '@ngxs/store';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/business-continuity-setup/', '.json');
}

@NgModule({
  declarations: [BrowseLocationComponent, LocationDialogComponent, LocationContentComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
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
    NgxsModule.forFeature([BrowseLocationsState]),
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
export class LocationModule { }
