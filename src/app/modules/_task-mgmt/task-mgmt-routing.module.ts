import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskMgmtComponent } from './task-mgmt.component';

const routes: Routes = [
  {
    path: '',
    component: TaskMgmtComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskMgmtRoutingModule {}
