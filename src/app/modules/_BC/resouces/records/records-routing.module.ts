import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseRecordsComponent} from "./browse-records/browse-records.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseRecordsComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
