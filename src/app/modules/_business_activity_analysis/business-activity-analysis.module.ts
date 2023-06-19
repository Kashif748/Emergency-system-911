import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessActivityAnalysisComponent } from './business-activity-analysis/business-activity-analysis.component';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';

const routes: Routes = [
  {
    path: '',
    component: BusinessActivityAnalysisComponent,
    children: [
      {
        path: 'impact-matrix',
        loadChildren: () =>
          import('./impact-matrix/impact-matrix.module').then(
            (m) => m.ImpactMatrixModule
          ),
      },
      {
        path: 'locations',
        loadChildren: () =>
          import('./locations/locations.module').then((m) => m.LocationsModule),
      },
      {
        path: 'systems',
        loadChildren: () =>
          import('./systems/systems.module').then((m) => m.SystemsModule),
      },
      {
        path: 'employees',
        loadChildren: () =>
          import('./employees/employees.module').then((m) => m.EmployeesModule),
      },
      {
        path: 'dependencies',
        loadChildren: () =>
          import('./dependencies/dependencies.module').then(
            (m) => m.DependenciesModule
          ),
      },
      {
        path: 'recovery',
        loadChildren: () =>
          import('./recovery/recovery.module').then((m) => m.RecoveryModule),
      },
      {
        path: 'notes',
        loadChildren: () =>
          import('./notes/notes.module').then((m) => m.NotesModule),
      },
    ],
  },
];

@NgModule({
  declarations: [BusinessActivityAnalysisComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    ButtonModule,
    CardModule,
    TabViewModule,
    DividerModule,
    ProgressBarModule,
    AvatarModule,
  ],
})
export class BusinessActivityAnalysisModule {}
