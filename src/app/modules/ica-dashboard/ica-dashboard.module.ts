import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcaDashboardComponent } from './ica-dashboard/ica-dashboard.component';
import { IcaRoutingModule } from './ica-routing.module';



@NgModule({
  declarations: [IcaDashboardComponent],
  imports: [
    CommonModule,
    IcaRoutingModule
  ]
})
export class IcaDashboardModule { }
