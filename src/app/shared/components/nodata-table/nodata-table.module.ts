import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NodataTableComponent } from "./nodata-table.component";
import { TranslationModule } from "src/app/modules/i18n/translation.module";

@NgModule({
  declarations: [NodataTableComponent],
  exports: [NodataTableComponent],
  imports: [CommonModule, TranslationModule],
})
export class NodataTableModule {}
