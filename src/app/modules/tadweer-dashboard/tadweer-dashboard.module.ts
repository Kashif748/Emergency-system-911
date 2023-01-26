import { MaterialModule } from './../../shared/material.module';
import { TranslationModule } from './../i18n/translation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TadweerDashboardComponent } from './tadweer-dashboard/tadweer-dashboard.component';
import { TadweerRoutingModule } from './tadweer-routing.module';



@NgModule({
  declarations: [TadweerDashboardComponent],
  imports: [
    CommonModule,
    TadweerRoutingModule,
    MaterialModule,
    TranslationModule,
    SharedModule
  ]
})
export class TadweerDashboardModule { }
