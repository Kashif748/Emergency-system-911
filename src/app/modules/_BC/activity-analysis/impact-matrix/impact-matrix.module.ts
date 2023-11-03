import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseImpactMatrixComponent } from './browse-impact-matrix/browse-impact-matrix.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ILangFacade, LangFacade } from '@core/facades/lang.facade';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NodataTableModule } from '@shared/components/nodata-table/nodata-table.module';
import { NgxIntlTelInputModule } from '@shared/sh-components/ngx-intl-tel-input/ngx-intl-tel-input.module';
import { TranslateObjModule } from '@shared/sh-pipes/translate-obj.pipe';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TranslateHttpLoaderFactory } from '../locations/locations.module';
import { ColorSelectorComponent } from './browse-impact-matrix/color-selector/color-selector.component';
import { AccordionModule } from 'primeng/accordion';
import { TooltipModule } from 'primeng/tooltip';

const routes: Routes = [
  {
    path: '',
    component: BrowseImpactMatrixComponent,
  },
];
@NgModule({
  declarations: [BrowseImpactMatrixComponent, ColorSelectorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DividerModule,
    TranslateModule.forChild({
      extend: true,
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TranslateObjModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    MenuModule,
    SkeletonModule,
    BlockUIModule,
    ProgressSpinnerModule,
    NodataTableModule,
    DialogModule,
    NgxIntlTelInputModule,
    AccordionModule,
    TooltipModule,
  ],
  providers: [{ provide: ILangFacade, useClass: LangFacade }],
})
export class ImpactMatrixModule {}
