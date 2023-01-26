import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingPageComponent} from './landing-page.component';
import {RouterModule, Routes} from '@angular/router';
import {SwiperModule} from 'swiper/angular';
import {HttpClient} from '@angular/common/http';
import {ILangFacade, LangFacade} from '@core/facades/lang.facade';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {InlineSVGModule} from 'ng-inline-svg';
import {VideoPlayerComponent} from './video-player/video-player.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {LanguageSelectComponent} from './language-select/language-select.component';
import {AuthModule} from 'src/app/auth/auth.module';
import {BrowserModule} from '@angular/platform-browser';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/landing-page/', '.json');
}

export const routes: Routes = [
  {
    path: 'salama',
    component: LandingPageComponent,
  },
];

@NgModule({
  declarations: [
    LandingPageComponent,
    VideoPlayerComponent,
    LanguageSelectComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(routes),
    InlineSVGModule,
    SwiperModule,
    NgbDropdownModule,
    AuthModule,
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
  providers: [{provide: ILangFacade, useClass: LangFacade}],
})
export class LandingPageModule {
}
