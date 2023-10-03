import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemsRoutingModule } from './systems-routing.module';
import { BrowseSystemsComponent } from './browse-systems/browse-systems.component';
import { ContentSystemsComponent } from './browse-systems/content-systems/content-systems.component';
import { SystemsDialogComponent } from './browse-systems/systems-dialog/systems-dialog.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonModule } from 'primeng/button';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { BrowseActivitySystemsState } from './states/browse-systems.state';
import { NgxsModule } from '@ngxs/store';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { TreeSelectModule } from '@shared/sh-components/treeselect/treeselect.component';
import { SystemModule } from 'src/app/modules/_business-continuity-setup/system/system.module';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-activity-analysis/',
    '.json'
  );
}

@NgModule({
  declarations: [
    BrowseSystemsComponent,
    ContentSystemsComponent,
    SystemsDialogComponent,
  ],
  imports: [
    CommonModule,
    SystemsRoutingModule,
    DividerModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    NgxsModule.forFeature([BrowseActivitySystemsState]),
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ConfirmPopupModule,
    TranslateObjModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    NodataTableModule,
    DialogModule,
    SidebarModule,
    TreeSelectModule,
    //
    SystemModule,
  ],
  providers: [
    { provide: ILangFacade, useClass: LangFacade },
    ConfirmationService,
  ],
})
export class SystemsModule {}
