import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgxPaginationModule} from 'ngx-pagination';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {InlineSVGModule} from 'ng-inline-svg';
import {CoreModule} from 'src/app/_metronic/core';
import {AngularSplitModule} from 'angular-split';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {SharedModule} from 'src/app/shared/shared.module';
import {TranslationModule} from '../i18n/translation.module';
import {MaterialModule} from '@shared/material.module';
import {CorrespondenceRoutingModule} from './correspondence-routing.module';
import {CorrespondenceComponent} from './correspondence.component';
import {CorrReceiversListComponent} from './corr-receivers-list/corr-receivers-list.component';
import {CorrespondenceAttachmentsComponent} from './correspondence-attachments/correspondence-attachments.component';
import {CorrespondenceFormComponent} from './correspondence-form/correspondence-form.component';
import {CorrespondenceReplyComponent} from './correspondence-reply/correspondence-reply.component';
import {CorrespondencesComponent} from './correspondences/correspondences.component';
import {ConfidentialityComponent} from './correspondence-form/confidentialty/confidentiality.component';
import {PriorityComponent} from './correspondence-form/priority/priority.component';
import {RelatedToIncidentComponent} from './correspondence-form/related-to-incident/related-to-incident.component';
import {CorrespondenceListMenuComponent} from './correspondences/correspondence-list-menu/correspondence-list-menu.component';
import {MessageComponent} from './correspondences/message/message.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {NodataTableModule} from '@shared/components/nodata-table/nodata-table.module';
import {CustomDatePipe} from '@shared/pipes/custom-date.pipe';
import {HtmlBodyComponent} from './correspondences/message/html-body/html-body.component';


@NgModule({
  declarations: [
    CorrespondenceComponent,
    CorrespondencesComponent,
    CorrespondenceReplyComponent,
    CorrespondenceFormComponent,
    CorrespondenceReplyComponent,
    CorrReceiversListComponent,
    MessageComponent,
    ConfidentialityComponent,
    PriorityComponent,
    RelatedToIncidentComponent,
    CorrespondenceAttachmentsComponent,
    CorrespondenceListMenuComponent,
    HtmlBodyComponent,
  ],
  imports: [
    CommonModule,
    CorrespondenceRoutingModule,
    MaterialModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    InlineSVGModule,
    CoreModule,
    AngularSplitModule,
    InfiniteScrollModule,
    SharedModule,
    PerfectScrollbarModule,
    NodataTableModule,
  ],
  providers: [
    AlertsService,
    DatePipe,
    CustomDatePipe,
  ],
})
export class CorrespondenceModule {
}
