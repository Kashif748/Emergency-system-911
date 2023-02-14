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
  declarations: [EmergenciesPhonebookComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
  ],
  providers: [
    EmergenciesPhonebookService,
    { provide: ILangFacade, useClass: LangFacade },
  ],
})
export class EmergenciesPhonebookModule {}
