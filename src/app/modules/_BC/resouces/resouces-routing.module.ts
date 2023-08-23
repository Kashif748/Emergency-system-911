import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResourcesComponent} from "./resources.component";

const routes: Routes = [
  {
    path: '',
    component: ResourcesComponent,
    children: [
      {
        path: '',
        redirectTo: 'staff-requirement',
        pathMatch: 'full',
      },
      {
        path: 'staff-requirement',
        loadChildren: () =>
          import('./staff-requirement/staff-requirement.module').then(
            (m) => m.StaffRequirementModule
          ),
      },
      {
        path: 'remote-work',
        loadChildren: () =>
          import('./remote-work/remote-work.module').then(
            (m) => m.RemoteWorkModule
          ),
      },
      {
        path: 'records',
        loadChildren: () =>
          import('./records/records.module').then(
            (m) => m.RecordsModule
          ),
      },
      {
        path: 'application-system',
        loadChildren: () =>
          import('./app-systems/app-systems.module').then(
            (m) => m.AppSystemsModule
          ),
      },
      {
        path: 'infrastructure',
        loadChildren: () =>
          import('./infra-req/infra-req.module').then(
            (m) => m.InfraReqModule
          ),
      },
      {
        path: 'other',
        loadChildren: () =>
          import('./others/others.module').then(
            (m) => m.OthersModule
          ),
      },
      {
        path: 'notes',
        loadChildren: () =>
          import('./notes/notes.module').then(
            (m) => m.NotesModule
          ),
      },


    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResoucesRoutingModule { }
