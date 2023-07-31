import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BCComponent } from './bc/bc.component';

const routes: Routes = [
  {
    path: '',
    component: BCComponent,
    children: [
      {
        path: '',
        redirectTo: 'lists',
        pathMatch: 'full',
      },
      {
        path: 'lists',
        loadChildren: () =>
          import('./bc-lists/bc-lists.module').then((m) => m.BcListsModule),
      },
      {
        path: 'impact-analysis',
        loadChildren: () =>
          import('./impact-analysis/impact-analysis.module').then(
            (m) => m.BusinessImpactAnalysisModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BCRoutingModule {}
