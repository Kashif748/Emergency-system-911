import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReopenAnalysisMgmtComponent} from "./reopen-analysis-mgmt/reopen-analysis-mgmt.component";

const routes: Routes = [
  {
    path: '',
    component: ReopenAnalysisMgmtComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpactAnalysisRoutingModule { }
