import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { ProgressBarModule } from 'primeng/progressbar';
import { AvatarModule } from 'primeng/avatar';
import { NgxsModule } from '@ngxs/store';
import { BrowseActivityAnalysisState } from './states/browse-activity-analysis.state';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { BlockUIModule } from 'primeng/blockui';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { ActivityAnalysisComponent } from './activity-analysis/activity-analysis.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    'assets/i18n/business-activity-analysis/',
    '.json'
  );
}
const routes: Routes = [
  {
    path: '',
    component: ActivityAnalysisComponent,
    children: [
      {
        path: '',
        redirectTo: 'impact-matrix',
        pathMatch: 'full',
      },
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
        path: 'worklogs',
        loadChildren: () =>
          import('./worklogs/worklogs.module').then((m) => m.WorklogsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [ActivityAnalysisComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    ButtonModule,
    CardModule,
    TabViewModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    NgxsModule.forFeature([BrowseActivityAnalysisState]),
    FormsModule,
    DividerModule,
    ProgressBarModule,
    TranslateObjModule,
    DialogModule,
    AvatarModule,
    BlockUIModule,
    SkeletonModule
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class ActivityAnalysisModule {}
