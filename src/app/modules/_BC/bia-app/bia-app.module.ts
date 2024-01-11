import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BiaAppRoutingModule} from './bia-app-routing.module';
import {BrowseBiaAppComponent} from './browse-bia-app/browse-bia-app.component';
import {ContentBiaAppComponent} from './browse-bia-app/content-bia-app/content-bia-app.component';
import {SkeletonModule} from "primeng/skeleton";
import {InlineSVGModule} from "ng-inline-svg";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TagModule} from "primeng/tag";
import {ToggleButtonModule} from "primeng/togglebutton";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {PrivilegesDirectiveModule} from "@shared/sh-directives/privileges.directive";
import {MultiSelectModule} from "primeng/multiselect";
import {SelectButtonModule} from "primeng/selectbutton";
import {TableModule} from "primeng/table";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {MenuModule} from "primeng/menu";
import {BlockableDivModule} from "@shared/sh-components/blockable-div/blockable-div.component";
import {DropdownModule} from "primeng/dropdown";
import {FieldsetModule} from "primeng/fieldset";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {ToolbarModule} from "primeng/toolbar";
import {DialogModule} from "primeng/dialog";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AvatarModule} from "primeng/avatar";
import {SplitButtonModule} from "primeng/splitbutton";
import {ChipModule} from "primeng/chip";
import {NgxsModule} from "@ngxs/store";
import {TreeSelectModule} from "@shared/sh-components/treeselect/treeselect.component";
import {TooltipModule} from "primeng/tooltip";
import {PaginatorModule} from "primeng/paginator";
import {HttpClient} from "@angular/common/http";
import {BlockUIModule} from "primeng/blockui";
import {BrowseBiaAppState} from "./states/browse-bia-app.state";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BiaAppComponent} from "./bia-app.component";
import {NewCycleDialogComponent} from "./browse-bia-app/cycle-dialog/new-cycle-dialog.component";
import {CalendarModule} from "primeng/calendar";
import {BadgeModule} from "primeng/badge";
import {CdateModule} from "@shared/sh-pipes/cdate.pipe";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService} from "primeng/api";
import {PanelModule} from "primeng/panel";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/bia-app/', '.json');
}

@NgModule({
  declarations: [BiaAppComponent, BrowseBiaAppComponent, ContentBiaAppComponent, NewCycleDialogComponent],
  imports: [
    CommonModule,
    BiaAppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([BrowseBiaAppState]),
    TableModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    InputTextModule,
    TagModule,
    DividerModule,
    SelectButtonModule,
    ToggleButtonModule,
    FieldsetModule,
    ChipModule,
    ToolbarModule,
    SplitButtonModule,
    AvatarModule,
    PaginatorModule,
    MenuModule,
    TooltipModule,
    SkeletonModule,
    DialogModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    BlockUIModule,
    TranslateObjModule,
    PrivilegesDirectiveModule,
    NodataTableModule,
    BlockableDivModule,
    InlineSVGModule,
    TreeSelectModule,
    SharedBreadcrumbModule,
    ProgressSpinnerModule,
    SelectButtonModule,
    CalendarModule,
    BadgeModule,
    ToolbarModule,
    CdateModule,
    ConfirmPopupModule,
    PanelModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }, ConfirmationService],
})
export class BiaAppModule { }
