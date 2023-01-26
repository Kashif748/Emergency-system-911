import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

import { MatIconModule } from "@angular/material/icon";
import { InlineSVGModule } from "ng-inline-svg";
import { TranslationModule } from "../i18n/translation.module";
import { ConfirmDialogComponent } from "./confirm-dialog.component";

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    MatDialogModule,
    MatButtonModule,
    InlineSVGModule,
    TranslationModule,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class ConfirmDialogModule {}
