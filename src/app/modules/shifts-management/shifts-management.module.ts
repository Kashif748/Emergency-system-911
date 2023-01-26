import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftsManagementComponent } from './shifts-management/shifts-management.component';
import { ShiftsManagmentRoutingModule } from './shifts-managment-routing.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { TranslationModule } from '../i18n/translation.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShiftsListComponent } from './shifts-list/shifts-list.component';




@NgModule({
  declarations: [ShiftsManagementComponent,ShiftsListComponent],
  imports: [
    CommonModule,
    ShiftsManagmentRoutingModule,
    MaterialModule,
    TranslationModule,
    NgxPaginationModule,
    SharedModule
  ]
})
export class ShiftsManagementModule { }
