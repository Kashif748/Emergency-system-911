import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { BrowseSystemComponent } from './browse-system/browse-system.component';
import { SystemContentComponent } from './browse-system/system-content/system-content.component';
import { SystemDialogComponent } from './browse-system/system-dialog/system-dialog.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { DividerModule } from 'primeng/divider';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { DialogModule } from 'primeng/dialog';
import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TreeSelectModule } from '@shared/sh-components/treeselect/treeselect.component';
import { NgxsModule } from '@ngxs/store';
import { BrowseSystemsState } from './states/browse-systems.state';
import { ToolbarModule } from 'primeng/toolbar';
import { PrivilegesDirectiveModule } from '@shared/sh-directives/privileges.directive';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldsetModule } from 'primeng/fieldset';
import { ToggleButtonModule } from 'primeng/togglebutton';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-continuity-setup/',
    '.json'
  );
}

@NgModule({
  declarations: [
    BrowseSystemComponent,
    SystemContentComponent,
    SystemDialogComponent,
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    DialogModule,
    DividerModule,
    SelectButtonModule,
    BadgeModule,
    NodataTableModule,
    TranslateObjModule,
    MultiSelectModule,
    SharedBreadcrumbModule,
    ToggleButtonModule,
    TreeSelectModule,
    PrivilegesDirectiveModule,
    BlockUIModule,
    FieldsetModule,
    ProgressSpinnerModule,
    NgxsModule.forFeature([BrowseSystemsState]),
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
  exports: [SystemDialogComponent],
})
export class SystemModule {}
