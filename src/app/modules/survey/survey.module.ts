import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey/survey.component';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { IncidentSurveyComponent } from 'src/app/modules/survey/incident-survey/incident-survey.component';
import { SharedModule } from '@shared/shared.module';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/survey-page/', '.json');
}

export const routes: Routes = [
  // {
  //   path: 'survey-form/:uuid',
  //   component: SurveyComponent,
  // },
  {
    path: 'survey-form/:uuid',
    component: IncidentSurveyComponent,
  },
];

@NgModule({
  declarations: [SurveyComponent, IncidentSurveyComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    RouterModule.forChild(routes),
    TranslateModule,
    // TranslateModule.forChild({
    //   extend: true,
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: TranslateHttpLoaderFactory,
    //     deps: [HttpClient],
    //   },
    //   isolate: true,
    // }),
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class SurveyModule {}
