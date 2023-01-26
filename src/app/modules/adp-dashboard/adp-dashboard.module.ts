import { MaterialModule } from './../../shared/material.module';
import { TranslationModule } from './../i18n/translation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdpDashboardComponent } from './adp-dashboard/adp-dashboard.component';
import { AdpRoutingModule } from './adp-routing.module';



@NgModule({
  declarations: [AdpDashboardComponent],
  imports: [
    CommonModule,
    AdpRoutingModule,
    MaterialModule,
    TranslationModule,
    SharedModule
  ]
})
export class AdpDashboardModule { }
