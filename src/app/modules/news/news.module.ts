import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewsRoutingModule } from "./news-routing.module";
import { NewsComponent } from "./news/news.component";
import { NewsListComponent } from "./news-list/news-list.component";
import { NewFormComponent } from "./new-form/new-form.component";
import { MaterialModule } from "../../shared/material.module";
import { TranslationModule } from "../i18n/translation.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { SharedModule } from "../../shared/shared.module";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [NewsComponent, NewsListComponent, NewFormComponent],
  imports: [
    NewsRoutingModule,
    NgxPaginationModule,
    SharedModule,
    TranslationModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [AlertsService],
})
export class NewsModule {}
