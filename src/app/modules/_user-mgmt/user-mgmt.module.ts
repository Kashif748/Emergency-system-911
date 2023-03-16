import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { UserMgmtRoutingModule } from './user-mgmt-routing.module';
import { UserMgmtComponent } from './user-mgmt.component';

import { NgxsModule } from '@ngxs/store';
import { TableModule } from 'primeng/table';
import { BrowseUsersComponent } from './browse-users/browse-users.component';
import { ButtonModule } from 'primeng/button';

import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FieldsetModule } from 'primeng/fieldset';
import { ChipModule } from 'primeng/chip';
import { BrowseUsersState } from './states/browse-users.state';

import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from 'primeng/avatar';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';

import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';

import { ContentUsersComponent } from './browse-users/content-users/content-users.component';
import { UserDialogComponent } from './browse-users/user-dialog/user-dialog.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TabViewModule } from 'primeng/tabview';
import { PhotoEditorModule } from '@shared/sh-components/photo-editor';
import { BlockUIModule } from 'primeng/blockui';
import { BrowseRolesComponent } from './browse-roles/browse-roles.component';
import { ContentRolesComponent } from './browse-roles/content-roles/content-roles.component';
import { RoleDialogComponent } from './browse-roles/role-dialog/role-dialog.component';
import { UrlPipeModule } from '@shared/sh-pipes/url.pipe';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { PrivilegesDirectiveModule } from '@shared/sh-directives/privileges.directive';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { BrowseRolesState } from './states/browse-roles.state';
import { BlockableDivModule } from '@shared/sh-components/blockable-div/blockable-div.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { TreeSelectModule } from '@shared/sh-components/treeselect/treeselect.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxIntlTelInputModule } from '@shared/sh-components/ngx-intl-tel-input/ngx-intl-tel-input.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/user-mgmt/', '.json');
}

@NgModule({
  declarations: [
    UserMgmtComponent,
    BrowseUsersComponent,
    ContentUsersComponent,
    UserDialogComponent,
    BrowseRolesComponent,
    ContentRolesComponent,
    RoleDialogComponent,
  ],
  imports: [
    CommonModule,
    UserMgmtRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([BrowseUsersState, BrowseRolesState]),
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
export class UserManagementModule {}
