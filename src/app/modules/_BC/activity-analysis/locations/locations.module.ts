import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { BrowseLocationsComponent } from './browse-locations/browse-locations.component';
import { ContentLocationsComponent } from './browse-locations/content-locations/content-locations.component';
import { LocationDialogComponent } from './browse-locations/location-dialog/location-dialog.component';
import { DividerModule } from 'primeng/divider';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { TableModule } from 'primeng/table';
import { BlockUIModule } from 'primeng/blockui';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { NgxsModule } from '@ngxs/store';
import { BrowseActivityLocationsState } from './states/browse-locations.state';
import { LocationModule } from 'src/app/modules/_business-continuity-setup/location/location.module';
import { SidebarModule } from 'primeng/sidebar';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-activity-analysis/',
    '.json'
  );
}

@NgModule({
  declarations: [
    BrowseLocationsComponent,
    ContentLocationsComponent,
    LocationDialogComponent,
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
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
    NgxsModule.forFeature([BrowseActivityLocationsState]),

    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TranslateObjModule,
    DropdownModule,
    CheckboxModule,
    NodataTableModule,
    TableModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    DialogModule,
    SidebarModule,

    LocationModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class LocationsModule {}
