import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgendaManagementComponent } from "./agenda-management/agenda-management.component";
import { AgendaManagementService } from "@core/api/services/agenda-management.service";
import { AgendaManagementRouting } from "./agenda-management-routing.module";
import { AgendaListComponent } from "./agenda-list/agenda-list.component";
import { SharedModule } from "@shared/shared.module";

import { ILangFacade, LangFacade } from "@core/facades/lang.facade";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    "assets/i18n/agenda-management/",
    ".json"
  );
}
@NgModule({
  declarations: [AgendaManagementComponent, AgendaListComponent],
  imports: [
    CommonModule,
    AgendaManagementRouting,
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
    AgendaManagementService,
    { provide: ILangFacade, useClass: LangFacade },
  ],
})
export class AgendaManagementModule {}
