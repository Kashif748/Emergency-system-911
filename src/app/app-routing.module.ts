import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { FirstLoginGuard } from '@shared/guards/first-login.guard';
import { InitialDataResolver } from './app.resolver';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'survey',
    loadChildren: () =>
      import('./modules/survey/survey.module').then((m) => m.SurveyModule),
  },
  {
    path: 'share-data',
    loadChildren: () =>
      import('./modules/share-location/share-location.module').then(
        (m) => m.ShareLocationModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    canActivate: [AuthGuard, FirstLoginGuard],
    canLoad: [FirstLoginGuard],
    resolve: {
      initialData: InitialDataResolver,
  },
    loadChildren: () =>
      import('./pages/layout.module').then((m) => m.LayoutModule),
  },

  { path: '**', redirectTo: 'errors/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
