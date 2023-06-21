import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowseRecoveryComponent} from "./browse-recovery/browse-recovery.component";

const routes: Routes = [
  {
    path: '',
    component: BrowseRecoveryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryRoutingModule { }
