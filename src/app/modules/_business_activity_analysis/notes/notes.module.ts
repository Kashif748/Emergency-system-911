import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { HttpClient } from '@angular/common/http';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Routes, RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/new-activity/', '.json');
}
const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
  },
];
@NgModule({
  declarations: [NotesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    TranslateObjModule,
    PerfectScrollbarModule,
    CheckboxModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class NotesModule {}
