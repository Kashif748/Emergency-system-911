import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { MapComponent } from './map.component';
import { MapService } from './services/map.service';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MapComponent, TopBarComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    TranslateModule,
    ProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [MapComponent],
  providers: [MapService],
})
export class MapModule {}
