import { MaterialModule } from './../../shared/material.module';
import { TranslationModule } from './../i18n/translation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdnocDashboardComponent } from './adnoc-dashboard/adnoc-dashboard.component';
import { AdNocRoutingModule } from './adnoc-routing.module';



@NgModule({
  declarations: [AdnocDashboardComponent],
  imports: [
    CommonModule,
    AdNocRoutingModule,
    MaterialModule,
    TranslationModule,
    SharedModule
    
  ]
})
export class AdnocDashboardModule { }
