import { MaterialModule } from './../../shared/material.module';
import { TranslationModule } from './../i18n/translation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ADportsRoutingModule } from './ad-ports-routing.module';
import { AdPortsDashboardComponent } from './ad-ports-dashboard/ad-ports-dashboard.component';



@NgModule({
  declarations: [AdPortsDashboardComponent],
  imports: [
    CommonModule,
    ADportsRoutingModule,
    MaterialModule,
    TranslationModule,
    SharedModule
  ]
})
export class AdPortsDashboardModule { }
