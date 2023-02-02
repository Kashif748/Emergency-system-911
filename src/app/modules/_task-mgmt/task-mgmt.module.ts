import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskMgmtRoutingModule } from './task-mgmt-routing.module';
import { TaskMgmtComponent } from './task-mgmt.component';


@NgModule({
  declarations: [TaskMgmtComponent],
  imports: [
    CommonModule,
    TaskMgmtRoutingModule
  ]
})
export class TaskMgmtModule { }
