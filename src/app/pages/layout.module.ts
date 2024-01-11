import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { InlineSVGModule } from 'ng-inline-svg';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreModule } from '../_metronic/core';
import { MaterialModule } from '@shared/material.module';
import { UnderBuildComponent } from '../under-build/under-build.component';
import { TranslationModule } from '../modules/i18n/translation.module';
import { ExtrasModule } from '../_metronic/partials/layout/extras/extras.module';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './_layout/layout.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import { HeaderMobileComponent } from './_layout/components/header-mobile/header-mobile.component';
import { HeaderComponent } from './_layout/components/header/header.component';
import { PaginationComponent } from './_layout/components/pagination/pagination.component';
import { TopbarComponent } from './_layout/components/topbar/topbar.component';
import { ScriptsInitComponent } from './_layout/init/scipts-init/scripts-init.component';
import { HeaderMenuDynamicComponent } from './_layout/components/header/header-menu-dynamic/header-menu-dynamic.component';
import { HeaderMenuComponent } from './_layout/components/header/header-menu/header-menu.component';
import { LanguageSelectorComponent } from './_layout/components/topbar/language-selector/language-selector.component';
import { SelectDialogComponent } from './_layout/components/header/header-menu/select-dialog/select-dialog.component';
import { LogoWrapperComponent } from './_layout/components/header/logo-wrapper/logo-wrapper.component';
import { PhonebookOffcanvasModule } from './_layout/components/phonebook-offcanvas/phonebook-offcanvas.module';
import {NotificationPopupModule} from "./_layout/components/notification-popup/notification-popup.module";
import {AuthService} from "@core/services/auth.service";
@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    HeaderMenuDynamicComponent,
    PaginationComponent,
    UnderBuildComponent,
    SelectDialogComponent,
    LogoWrapperComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TranslationModule,
    InlineSVGModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    CoreModule,
    PerfectScrollbarModule,
    MaterialModule,
    ReactiveFormsModule,
    MatSelectInfiniteScrollModule,
    ScrollingModule,
    MatFormFieldModule,
    PhonebookOffcanvasModule,
    NotificationPopupModule
  ],
  providers: [AuthService]
})
export class LayoutModule {}
