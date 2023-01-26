import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { ILangFacade, LangFacade } from '@core/facades/lang.facade';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'src/app/shared/shared.module';

import { NgApexchartsModule } from 'ng-apexcharts';

import { MapDashboardRoutingModule } from './map-dashboard-routing.module';
import { MapDashboardComponent } from './map-dashboard.component';

import { LayersInputComponent } from './layers-input/layers-input.component';
import { OrgsInputComponent } from './orgs-input/orgs-input.component';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/map-dashboard/', '.json');
}
@NgModule({
  declarations: [
    MapDashboardComponent,
    LayersInputComponent,
    OrgsInputComponent,
  ],
  imports: [
    CommonModule,
    MapDashboardRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    NgApexchartsModule,
    // NgxMatTimepickerModule,
    // NgxMatNativeDateModule,
    // NgxMatDatetimePickerModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class MapDashboardModule {}
