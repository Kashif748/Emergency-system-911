import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhonebookOffcanvasComponent } from './phonebook-offcanvas.component';
import { NgxsModule } from '@ngxs/store';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { OffcanvasPhonebookState } from './states/offcanvas-phonebook.state';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';

import { NgxIntlTelInputModule } from '@shared/sh-components/ngx-intl-tel-input/ngx-intl-tel-input.module';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { HttpClient } from '@angular/common/http';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import {PaginatorModule} from 'primeng/paginator';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/emergencies-phonebook/',
    '.json'
  );
}
@NgModule({
  declarations: [PhonebookOffcanvasComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    AccordionModule,
    PanelModule,
    NgxIntlTelInputModule,
    InputTextModule,
    FieldsetModule,
    TooltipModule,
    SkeletonModule,
    PerfectScrollbarModule,
    PaginatorModule,
    RouterModule,
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
    InlineSVGModule,
    NgxsModule.forFeature([OffcanvasPhonebookState]),
  ],
  exports: [PhonebookOffcanvasComponent],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class PhonebookOffcanvasModule {}
