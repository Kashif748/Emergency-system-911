import { NgApexchartsModule } from 'ng-apexcharts';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { TranslationModule } from 'src/app/modules/i18n/translation.module';
import { MaterialModule } from '../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DohDashboardComponent } from './doh-dashboard/doh-dashboard.component';
import { DohRoutingModule } from './doh-routing.module';
import { SearchPipe } from './search-filter.pipe';


@NgModule({
  declarations: [DohDashboardComponent,SearchPipe],
  imports: [
    CommonModule,
    DohRoutingModule,
    MaterialModule,
    TranslationModule,
    FormsModule,
    NgApexchartsModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class DohDashboardModule { }
