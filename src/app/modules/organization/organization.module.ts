import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

import { ILangFacade, LangFacade } from "@core/facades/lang.facade";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AlertsService } from "src/app/_metronic/core/services/alerts.service";

import { NgxMatIntlTelInputModule } from "ngx-mat-intl-tel-input";

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { OrgChartModule } from "src/app/org-chart/org-chart.module";

import { SharedModule } from "../../shared/shared.module";

import { OrganizationRoutingModule } from "./organization-routing.module";

import { OrgTreeComponent } from "./org-tree/org-tree.component";
import { OrganizationFormComponent } from "./organization-form/organization-form.component";
import { OrganizationsComponent } from "./organizations/organizations.component";
import { ControlErrorComponent } from "./helper-components/control-error/control-error.component";
import { OrgModulesComponent } from "./organization-form/org-modules/org-modules.component";
import { MapModule } from "@shared/components/map/map.component";

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/organizations/", ".json");
}
@NgModule({
  declarations: [
    OrganizationFormComponent,
    ControlErrorComponent,
    OrgModulesComponent,
    OrgTreeComponent,
    OrganizationsComponent,
  ],
  imports: [
    SharedModule,
    MapModule,
    OrganizationRoutingModule,
    NgxMatIntlTelInputModule,
    PerfectScrollbarModule,
    FormsModule,
    OrgChartModule,
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
  providers: [AlertsService, { provide: ILangFacade, useClass: LangFacade }],
})
export class OrganizationModule {}
