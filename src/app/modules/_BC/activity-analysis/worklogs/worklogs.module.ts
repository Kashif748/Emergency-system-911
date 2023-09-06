import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorklogsComponent } from './worklogs.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { HttpClient } from '@angular/common/http';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Routes, RouterModule } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { BrowseActivityWorklogsState } from './states/browse-worklogs.state';
import { NgxsModule } from '@ngxs/store';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from '@shared/shared.module';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-activity-analysis/',
    '.json'
  );
}
const routes: Routes = [
  {
    path: '',
    component: WorklogsComponent,
  },
];
@NgModule({
  declarations: [WorklogsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([BrowseActivityWorklogsState]),
    ReactiveFormsModule,
    FormsModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    SkeletonModule,
    TranslateObjModule,
    PerfectScrollbarModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    SharedModule,
    ListboxModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class WorklogsModule {}
