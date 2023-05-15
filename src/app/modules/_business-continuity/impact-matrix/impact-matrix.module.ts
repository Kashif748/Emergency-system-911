import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpactMatrixRoutingModule } from './impact-matrix-routing.module';
import { BrowseImpactMatrixComponent } from './browse-impact-matrix/browse-impact-matrix.component';
import { ContentImpactMatrixComponent } from './browse-impact-matrix/content-impact-matrix/content-impact-matrix.component';
import { ImpactMatrixDialogComponent } from './browse-impact-matrix/impact-matrix-dialog/impact-matrix-dialog.component';


@NgModule({
  declarations: [BrowseImpactMatrixComponent, ContentImpactMatrixComponent, ImpactMatrixDialogComponent],
  imports: [
    CommonModule,
    ImpactMatrixRoutingModule
  ]
})
export class ImpactMatrixModule { }
