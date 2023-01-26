import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilesListComponent } from "./files-list/files-list.component";
import { UppyAngularModule } from "uppy-angular";
import { AlertsService } from "src/app/_metronic/core/services/alerts.service";
import { InlineSVGModule } from "ng-inline-svg";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslationModule } from "src/app/modules/i18n/translation.module";
import { SharedModule } from "@shared/shared.module";
import { ViewImageComponent } from "./files-list/view-image/view-image.component";
@NgModule({
  declarations: [FilesListComponent, ViewImageComponent],
  imports: [
    CommonModule,
    TranslationModule,
    UppyAngularModule,
    InlineSVGModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
  exports: [FilesListComponent, ViewImageComponent],
  providers: [AlertsService],
})
export class AttachmentsListModule {}
