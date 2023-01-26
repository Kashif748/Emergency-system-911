import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from './../../shared/shared.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslationModule } from './../i18n/translation.module';
import { MaterialModule } from './../../shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScadDashboardComponent } from './scad-dashboard/scad-dashboard.component';
import { ScadRoutingModule } from './scad-routing.module';



@NgModule({
  declarations: [ScadDashboardComponent],
  imports: [
    CommonModule,
    ScadRoutingModule,
    MaterialModule,
    TranslationModule,
    FormsModule,
    NgApexchartsModule,
    MatIconModule,
    ReactiveFormsModule,
    InlineSVGModule,
    SharedModule,
    NgbDropdownModule,
    NgxPaginationModule,
  ]
})
export class ScadDashboardModule { }
