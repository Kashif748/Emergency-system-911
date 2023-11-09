import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseRecordsComponent} from "./browse-records/browse-records.component";
import {RecordDialogComponent} from "./browse-records/record-dialog/record-dialog.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseRecordsComponent,
  },
  {
    path: 'record',
    component: RecordDialogComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
