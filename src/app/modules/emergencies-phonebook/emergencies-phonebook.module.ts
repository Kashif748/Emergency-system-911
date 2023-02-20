import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmergenciesPhonebookComponent } from './emergencies-phonebook.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { EmergenciesPhonebookService } from './emergencies-phonebook.service';
import { HttpClient } from '@angular/common/http';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PhonebookDialogComponent } from './phonebook-dialog/phonebook-dialog.component';
import { NgxIntlTelInputModule } from '@shared/sh-components/ngx-intl-tel-input/ngx-intl-tel-input.module';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { BrowsePhonebookState } from './states/browse-phonebook.state';
import { NgxsModule } from '@ngxs/store';
import { PhonebookTableComponent } from './phonebook-table/phonebook-table.component';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/emergencies-phonebook/',
    '.json'
  );
}

const routes: Routes = [
  {
    path: '',
    component: EmergenciesPhonebookComponent,
  },
];

@NgModule({
  declarations: [EmergenciesPhonebookComponent, PhonebookDialogComponent, PhonebookTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgxIntlTelInputModule,
    InputTextModule,
    FieldsetModule,
    NgxsModule.forFeature([BrowsePhonebookState]),
    ButtonModule,
    PaginatorModule,
    TableModule,
    MenuModule,
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
  providers: [
    EmergenciesPhonebookService,
    { provide: ILangFacade, useClass: LangFacade },
  ],
})
export class EmergenciesPhonebookModule {}
