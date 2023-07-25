import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationActivitiesRoutingModule } from './organization-activities-routing.module';
import {OrganizationActivitiesComponent} from "./organization-activities.component";
import { BrowseOrganizationsComponent } from './browse-organizations/browse-organizations.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {BrowseRolesState} from "../_user-mgmt/states/browse-roles.state";
import {FieldsetModule} from "primeng/fieldset";
import {MenuModule} from "primeng/menu";
import {TagModule} from "primeng/tag";
import {ChipModule} from "primeng/chip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowseUsersState} from "../_user-mgmt/states/browse-users.state";
import {InputTextModule} from "primeng/inputtext";
import {SkeletonModule} from "primeng/skeleton";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";
import {DividerModule} from "primeng/divider";
import {ToggleButtonModule} from "primeng/togglebutton";
import {PaginatorModule} from "primeng/paginator";
import {AvatarModule} from "primeng/avatar";
import {DropdownModule} from "primeng/dropdown";
import {SplitButtonModule} from "primeng/splitbutton";
import {SelectButtonModule} from "primeng/selectbutton";
import {NgxsModule} from "@ngxs/store";
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {TabViewModule} from "primeng/tabview";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {BlockUIModule} from "primeng/blockui";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {PrivilegesDirectiveModule} from "@shared/sh-directives/privileges.directive";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {BlockableDivModule} from "@shared/sh-components/blockable-div/blockable-div.component";
import {InlineSVGModule} from "ng-inline-svg";
import {TreeSelectModule} from "@shared/sh-components/treeselect/treeselect.component";
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import { ContentOrganizationsComponent } from './browse-organizations/content-organizations/content-organizations.component';
import { OrganizationDialogComponent } from './browse-organizations/organization-dialog/organization-dialog.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {BrowseOrganizationState} from "./states/browse-organization.state";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/org-activities/', '.json');
}

@NgModule({
  declarations: [
    OrganizationActivitiesComponent,
    BrowseOrganizationsComponent,
    ContentOrganizationsComponent,
    OrganizationDialogComponent
  ],

  imports: [
    CommonModule,
    OrganizationActivitiesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([BrowseOrganizationState]),
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
    TabViewModule,
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
    SelectButtonModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class OrganizationActivitiesModule { }
