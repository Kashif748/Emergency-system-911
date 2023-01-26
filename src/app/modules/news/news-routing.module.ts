import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewFormComponent } from './new-form/new-form.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsService } from './news.service';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  {
    path:"",
    component:NewsComponent,
    resolve:{NewsService},
    children:[
      {
        path:"",
        component:NewsListComponent
      },
      {
        path:"add",
        component:NewFormComponent
      },
      {
        path:"edit/:id",
        component:NewFormComponent
      },
      {
        path:"**",
        pathMatch:"full",
        redirectTo:""
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
