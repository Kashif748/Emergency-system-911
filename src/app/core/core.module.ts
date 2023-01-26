import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IThemeFacade, ThemeFacade } from './facades/theme.facade';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CommonInterceptor } from './interceptors/common.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthService, IAuthService } from './services/auth.service';
import { ILinkService, LinkService } from './services/link.service';
import { IStorageService, StorageService } from './services/storage.service';
import { DueDateColorDirective } from './directives/due-date-color.directive';
import { DateInterceptor } from './interceptors/date.interceptor';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { AppCommonDataService } from '@core/services/app-common-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifService } from './api/services/notif.service';
import { MessageHelper } from './helpers/message.helper';
import { ApiHelper } from './helpers/api.helper';
import { MessageService } from 'primeng/api';
import { TreeHelper } from './helpers/tree.helper';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  declarations: [DueDateColorDirective, NumberOnlyDirective],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DateInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
    { provide: IAuthService, useClass: AuthService, multi: false },
    { provide: IStorageService, useClass: StorageService, multi: false },
    { provide: ILinkService, useClass: LinkService, multi: false },
    { provide: IThemeFacade, useClass: ThemeFacade, multi: false },
    AppCommonDataService,
    NotifService,
    ApiHelper,
    MessageService,
    MessageHelper,
    TreeHelper,
  ],
  exports: [DueDateColorDirective, NumberOnlyDirective],
})
export class CoreModule {}
