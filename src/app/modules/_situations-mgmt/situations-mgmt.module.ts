import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SituationsMgmtComponent } from './situations-mgmt.component';
import { SituationsMgmtRoutingModule } from './situations-mgmt-routing.module';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { SharedBreadcrumbModule } from '@shared/sh-components/breadcrumbs/breadcrumb.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowseSituationsComponent } from './browse-situations/browse-situations.component';
import { ContentSituationsComponent } from './browse-situations/content-situations/content-situations.component';
import { BrowseSituationsState } from './states/browse-situations.state';
import { NgxsModule } from '@ngxs/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { BlockableDivModule } from '@shared/sh-components/blockable-div/blockable-div.component';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { SelectButtonModule } from 'primeng/selectbutton';

import { SituationDialogComponent } from './browse-situations/situation-dialog/situation-dialog.component';
import { PrivilegesDirectiveModule } from '@shared/sh-directives/privileges.directive';
import { CdateModule } from '@shared/sh-pipes/cdate.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { SituationDashboardComponent } from './situation-dashboard/situation-dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InlineSVGModule } from 'ng-inline-svg';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/situations-mgmt/', '.json');
}

@NgModule({
  declarations: [
    SituationsMgmtComponent,
    BrowseSituationsComponent,
    ContentSituationsComponent,
    SituationDialogComponent,
    SituationDashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedBreadcrumbModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    NgxsModule.forFeature([BrowseSituationsState]),
    SituationsMgmtRoutingModule,

    FieldsetModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToolbarModule,
    DividerModule,
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
    CalendarModule,
    SelectButtonModule,
    ProgressSpinnerModule,
    PrivilegesDirectiveModule,
    DropdownModule,
    CdateModule,
    NgApexchartsModule,
    InlineSVGModule,
    OverlayPanelModule,
    TagModule,
    ChipModule,

  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class SituationsMgmtModule {}
