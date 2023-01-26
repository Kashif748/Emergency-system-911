import { DailyBrevityComponent } from './daily-brevity.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: DailyBrevityComponent,
    children: [
      {
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'list/add',
        component: FormComponent,
      },
      {
				path: 'list/edit/:id',
				component: FormComponent,
			},
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyBrevityRoutingModule { }
 