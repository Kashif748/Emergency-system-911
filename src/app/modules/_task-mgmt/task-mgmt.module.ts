import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskMgmtRoutingModule } from './task-mgmt-routing.module';
import { TaskMgmtComponent } from './task-mgmt.component';
import { TaskDialogComponent } from './browse-tasks/task-dialog/task-dialog.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { BrowseTasksComponent } from './browse-tasks/browse-tasks.component';
import { ContentTasksComponent } from './browse-tasks/content-tasks/content-tasks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreeSelectModule } from '@shared/sh-components/treeselect/treeselect.component';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DividerModule } from 'primeng/divider';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ChipModule } from 'primeng/chip';
import { MenuModule } from 'primeng/menu';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { PaginatorModule } from 'primeng/paginator';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { BlockUIModule } from 'primeng/blockui';
import { BlockableDivModule } from '@shared/sh-components/blockable-div/blockable-div.component';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { NgxsModule } from '@ngxs/store';
import { BrowseTasksState } from './states/browse-tasks.state';
import { PrivilegesDirectiveModule } from '@shared/sh-directives/privileges.directive';
import { InlineSVGModule } from 'ng-inline-svg';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CdateModule } from '@shared/sh-pipes/cdate.pipe';
import { TagModule } from 'primeng/tag';
import { DueDateDirectiveModule } from '@shared/sh-directives/due-date.directive';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/task-mgmt/', '.json');
}

@NgModule({
  declarations: [
    TaskMgmtComponent,
    BrowseTasksComponent,
    TaskDialogComponent,
    ContentTasksComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TaskMgmtRoutingModule,
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
    InputNumberModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    NgxsModule.forFeature([BrowseTasksState]),
    PrivilegesDirectiveModule,
    InlineSVGModule,
    CdateModule,
    DueDateDirectiveModule,
    TabViewModule,
    SharedBreadcrumbModule,
    ProgressSpinnerModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class TaskMgmtModule {}
