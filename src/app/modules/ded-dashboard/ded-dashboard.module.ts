import { MaterialModule } from './../../shared/material.module';
import { TranslationModule } from './../i18n/translation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DedDashboardComponent } from './ded-dashboard/ded-dashboard.component';
import { DedRoutingModule } from './ded-routing.module';



@NgModule({
  declarations: [DedDashboardComponent],
  imports: [
    CommonModule,
    DedRoutingModule,
    MaterialModule,
    TranslationModule,
    SharedModule
    
  ]
})
export class DedDashboardModule { }
