import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseTasksComponent } from './browse-tasks/browse-tasks.component';
import { TaskMgmtComponent } from './task-mgmt.component';

const routes: Routes = [
  {
    path: '',
    component: TaskMgmtComponent,
    children: [{
      path: '',component: BrowseTasksComponent
    }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskMgmtRoutingModule {}
