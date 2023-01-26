import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InlineSVGModule} from 'ng-inline-svg';
import {TranslationModule} from '../i18n/translation.module';
import {MaterialModule} from '@shared/material.module';
import {SuggestionsRoutingModule} from './suggestions-routing.module';
import {SuggestionsComponent} from './suggestions.component';
import {CreateSuggestionComponent} from './create-suggestion/create-suggestion.component';
import {ManageSuggestionsComponent} from './manage-suggestions/manage-suggestions.component';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {AngularFileUploaderModule} from 'angular-file-uploader';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MySuggestionsComponent} from './my-suggestions/my-suggestions.component';
import {StatusDialogComponent} from './status-dialog/status-dialog.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {ReviewSuggestionComponent} from './review-suggestion/review-suggestion.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    SuggestionsComponent,
    CreateSuggestionComponent,
    ManageSuggestionsComponent,
    MySuggestionsComponent,
    StatusDialogComponent,
    ReviewSuggestionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SuggestionsRoutingModule,
    MaterialModule,
    TranslationModule,
    InlineSVGModule,
    AngularFileUploaderModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [AlertsService],
})
export class SuggestionsModule {}
