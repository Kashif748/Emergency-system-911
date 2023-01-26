import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibListComponent } from './lib-list/lib-list.component';
import { LibraryComponent } from './library.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    children: [
      {
				path: '',
				redirectTo: 'libraries',
				pathMatch: 'full',
			},
      {
        path: 'libraries',
        component: LibListComponent,
      },
      // {
      //   path: 'libraries/add',
      //   component: FormlibrariesComponent,
      // },
      // {
			// 	path: 'libraries/edit/:id',
			// 	component: FormlibrariesComponent,
			// },
      { path: '', redirectTo: 'libraries', pathMatch: 'full' },
      { path: '**', redirectTo: 'libraries', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
