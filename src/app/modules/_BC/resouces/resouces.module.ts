import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResoucesRoutingModule } from './resouces-routing.module';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";
import {DividerModule} from "primeng/divider";
import {CardModule} from "primeng/card";
import {ProgressBarModule} from "primeng/progressbar";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {ToolbarModule} from "primeng/toolbar";
import {TabViewModule} from "primeng/tabview";
import {NgxsModule} from "@ngxs/store";
import {BrowseActivityAnalysisState} from "../activity-analysis/states/browse-activity-analysis.state";
import {AvatarModule} from "primeng/avatar";
import {BlockUIModule} from "primeng/blockui";
import {ButtonModule} from "primeng/button";
import {ResourcesComponent} from "./resources.component";
import {TranslateObjModule} from "@shared/sh-pipes/translate-obj.pipe";
import {ILangFacade, LangFacade} from "@core/facades/lang.facade";
import {BrowseResourceState} from "./states/browse-resource.state";
import {BadgeModule} from "primeng/badge";
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-resources/',
    '.json'
  );
}


@NgModule({
  declarations: [ResourcesComponent],
  imports: [
    CommonModule,
    ResoucesRoutingModule,
    ToolbarModule,
    ButtonModule,
    CardModule,
    TabViewModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    NgxsModule.forFeature([BrowseResourceState]),
    DividerModule,
    ProgressBarModule,
    TranslateObjModule,
    AvatarModule,
    BlockUIModule,
    BadgeModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class ResoucesModule { }
