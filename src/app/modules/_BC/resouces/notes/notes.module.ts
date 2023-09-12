import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotesComponent} from './notes.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {ILangFacade, LangFacade} from '@core/facades/lang.facade';
import {HttpClient} from '@angular/common/http';
import {TranslateObjModule} from '@shared/sh-pipes/translate-obj.pipe';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {RouterModule, Routes} from '@angular/router';
import {CheckboxModule} from 'primeng/checkbox';
import {SkeletonModule} from "primeng/skeleton";
import {SharedModule} from "@shared/shared.module";
import {ListboxModule} from "primeng/listbox";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {NgxsModule} from "@ngxs/store";
import {BrowseResourceWorklogsState} from "./states/browse-resource-worklogs.state";
import {SelectButtonModule} from "primeng/selectbutton";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/business-resources/', '.json');
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
    NgxsModule.forFeature([BrowseResourceWorklogsState]),
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
    SkeletonModule,
    TranslateObjModule,
    PerfectScrollbarModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    SharedModule,
    ListboxModule,
    SelectButtonModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class NotesModule {}
