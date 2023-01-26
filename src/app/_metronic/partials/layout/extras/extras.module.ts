import { CommonModule } from "@angular/common";
import { OverlayModule } from "@angular/cdk/overlay";
import { InlineSVGModule } from "ng-inline-svg";
import { TranslationModule } from "src/app/modules/i18n/translation.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreModule } from "../../../core";
import { MaterialModule } from '@shared/material.module';
import { UserDropdownInnerComponent } from "./dropdown-inner/user-dropdown-inner/user-dropdown-inner.component";
import { NotificationsOffcanvasComponent } from "./offcanvas/notifications-offcanvas/notifications-offcanvas.component";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { NotificationsDropdownComponent } from "./dropdown-inner/notifications-dropdown/notifications-dropdown.component";
import { ToolbarComponent } from './toolbar/toolbar.component';
import {NgModule} from '@angular/core';
import { SelectSysStatusDialogComponent } from "./toolbar/select-sys-status-dialog/select-sys-status-dialog.component";

@NgModule({
  declarations: [
    UserDropdownInnerComponent,
    NotificationsOffcanvasComponent,
    NotificationsDropdownComponent,
    ToolbarComponent,
    SelectSysStatusDialogComponent
  ],
  imports: [
    CommonModule,
    TranslationModule,
    InlineSVGModule,
    CoreModule,
    MaterialModule,
    SharedModule,
    OverlayModule,
    NgbDropdownModule,
  ],
  exports: [
    UserDropdownInnerComponent,
    NotificationsOffcanvasComponent,
    NotificationsDropdownComponent,
    ToolbarComponent,
    SelectSysStatusDialogComponent
  ],
})
export class ExtrasModule {}

