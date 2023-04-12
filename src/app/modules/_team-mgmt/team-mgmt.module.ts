import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/user-mgmt/', '.json');
}

import { TeamMgmtRoutingModule } from './team-mgmt-routing.module';
import { TeamMgmtComponent } from './team-mgmt.component';
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {ChipModule} from "primeng/chip";
import {PaginatorModule} from "primeng/paginator";
import {NodataTableModule} from "../../shared/components/nodata-table/nodata-table.module";
import {TagModule} from "primeng/tag";
import {BlockUIModule} from "primeng/blockui";
import {ProgressBarModule} from "primeng/progressbar";
import {DropdownModule} from "primeng/dropdown";
import {FieldsetModule} from "primeng/fieldset";
import {DividerModule} from "primeng/divider";
import {PasswordModule} from "primeng/password";
import {TreeSelectModule} from "../../shared/sh-components/treeselect/treeselect.component";
import {InputTextModule} from "primeng/inputtext";
import {NgxIntlTelInputModule} from "../../shared/sh-components/ngx-intl-tel-input/ngx-intl-tel-input.module";
import {TranslateObjModule} from "../../shared/sh-pipes/translate-obj.pipe";
import {PrivilegesDirectiveModule} from "../../shared/sh-directives/privileges.directive";
import {AvatarModule} from "primeng/avatar";
import {BlockableDivModule} from "../../shared/sh-components/blockable-div/blockable-div.component";
import {DialogModule} from "primeng/dialog";
import {SkeletonModule} from "primeng/skeleton";
import {PhotoEditorModule} from "../../shared/sh-components/photo-editor";
import {TooltipModule} from "primeng/tooltip";
import {NgxsModule} from "@ngxs/store";
import {UrlPipeModule} from "../../shared/sh-pipes/url.pipe";
import {TableModule} from "primeng/table";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MenuModule} from "primeng/menu";
import {SelectButtonModule} from "primeng/selectbutton";
import {SplitButtonModule} from "primeng/splitbutton";
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToggleButtonModule} from "primeng/togglebutton";
import {TabViewModule} from "primeng/tabview";
import {InlineSVGModule} from "ng-inline-svg";
import {FileUploadModule} from "primeng/fileupload";
import {MultiSelectModule} from "primeng/multiselect";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {ILangFacade, LangFacade} from "../../core/facades/lang.facade";
import {BrowseGroupsComponent} from './browse-groups/browse-groups.component';
import {ContentGroupsComponent} from './browse-groups/content-groups/content-groups.component';
import {BrowseGroupsState} from "./states/browse-groups.state";
import {GroupDialogComponent} from './browse-groups/group-dialog/group-dialog.component';
import {SharedBreadcrumbModule} from "@shared/sh-components/breadcrumbs/breadcrumb.component";


@NgModule({
  declarations: [TeamMgmtComponent, BrowseGroupsComponent, ContentGroupsComponent, GroupDialogComponent],
  imports: [
    CommonModule,
    TeamMgmtRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([BrowseGroupsState]),
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
    CalendarModule,
    PasswordModule,
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
    NgxIntlTelInputModule,
    PhotoEditorModule,
    BlockUIModule,
    UrlPipeModule,
    TranslateObjModule,
    PrivilegesDirectiveModule,
    NodataTableModule,
    BlockableDivModule,
    InlineSVGModule,
    TreeSelectModule,
    CheckboxModule,
    InputTextareaModule,
    ProgressBarModule,
    FileUploadModule,
    SharedBreadcrumbModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class GroupsManagementModule { }
