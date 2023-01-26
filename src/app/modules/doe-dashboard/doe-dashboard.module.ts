import { MaterialModule } from './../../shared/material.module';
import { TranslationModule } from './../i18n/translation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoeDashboardComponent } from './doe-dashboard/doe-dashboard.component';
import { DoeRoutingModule } from './doe-routing.module';



@NgModule({
  declarations: [DoeDashboardComponent],
  imports: [
    CommonModule,
    DoeRoutingModule,
    MaterialModule,
    TranslationModule,
    SharedModule
  ]
})
export class DoeDashboardModule { }
