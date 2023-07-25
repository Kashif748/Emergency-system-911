import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseTasksComponent } from './browse-tasks/browse-tasks.component';
import { TaskReportComponent } from './task-report.component';

const routes: Routes = [
  {
    path: '',
    component: TaskReportComponent,
    children: [
      {
        path: '',
        component: BrowseTasksComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskReportRoutingModule {}
