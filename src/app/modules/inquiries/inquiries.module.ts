import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiriesRoutingModule } from './inquiries-routing.module';
import { InquiriesComponent } from './inquiries.component';
import { InquiriesReportComponent } from './inquiries-report/inquiries-report.component';

import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { InquiriesService } from './inquiries.service';
import { SharedModule } from '@shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InquiresChartsComponent } from './inquires-charts/inquires-charts.component';
import {NgApexchartsModule} from 'ng-apexcharts';




@NgModule({
  declarations: [InquiriesComponent, InquiriesReportComponent, InquiresChartsComponent],
  imports: [
    CommonModule,
    InquiriesRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    NgApexchartsModule
    

  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }, 
    InquiriesService
  ],

})
export class InquiriesModule { }
