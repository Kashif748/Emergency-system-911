import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BrowseIncidentsComponent } from './reopen-mgmt/browse-incidents/browse-incidents.component';
import { ReopenState } from './states/reopen.state';
import { NgxsModule } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ChipModule } from 'primeng/chip';
import { MenuModule } from 'primeng/menu';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { BlockUIModule } from 'primeng/blockui';
import { BlockableDivModule } from '@shared/sh-components/blockable-div/blockable-div.component';
import { DialogModule } from 'primeng/dialog';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeSelectModule } from '@shared/sh-components/treeselect/treeselect.component';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ContentIncidentsComponent } from './reopen-mgmt/browse-incidents/content-incidents/content-incidents.component';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TabViewModule } from 'primeng/tabview';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { SharedModule } from '@shared/shared.module';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ReopenMgmtComponent } from './reopen-mgmt/reopen-mgmt.component';
import { BrowseTasksComponent } from './reopen-mgmt/browse-tasks/browse-tasks.component';
import { ContentTasksComponent } from './reopen-mgmt/browse-tasks/content-tasks/content-tasks.component';
import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';
import {PrivilegesDirectiveModule} from "@shared/sh-directives/privileges.directive";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/incident-mgmt/', '.json');
}
const routes: Routes = [
  {
    path: '',
    component: ReopenMgmtComponent,
  },
];

@NgModule({
  declarations: [
    BrowseIncidentsComponent,
    ContentIncidentsComponent,
    ReopenMgmtComponent,
    BrowseTasksComponent,
    ContentTasksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([ReopenState]),
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    FormsModule,
    ReactiveFormsModule,
    FieldsetModule,
    DropdownModule,
    TreeSelectModule,
    ButtonModule,
    ToolbarModule,
    DividerModule,
    MultiSelectModule,
    SelectButtonModule,
    ToggleButtonModule,
    ChipModule,
    MenuModule,
    NodataTableModule,
    PaginatorModule,
    TranslateObjModule,
    TableModule,
    SkeletonModule,
    TooltipModule,
    DialogModule,
    BlockUIModule,
    BlockableDivModule,
    InputTextModule,
    InputTextareaModule,
    TagModule,
    CalendarModule,
    TabViewModule,
    InputNumberModule,
    SharedModule,
    ConfirmPopupModule,
    SharedBreadcrumbModule,
    PrivilegesDirectiveModule
  ],
  providers: [
    { provide: ILangFacade, useClass: LangFacade },
    DatePipe,
    CustomDatePipe,
    ConfirmationService,
  ],
})
export class IncidentsMgmtModule {}
