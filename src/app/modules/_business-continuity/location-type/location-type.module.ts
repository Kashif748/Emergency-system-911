import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationTypeRoutingModule } from './location-type-routing.module';
import { BrowseLocationTypeComponent } from './browse-location-type/browse-location-type.component';
import { ContentLocationTypeComponent } from './browse-location-type/content-location-type/content-location-type.component';
import { LocationTypeDialogComponent } from './browse-location-type/location-type-dialog/location-type-dialog.component';


@NgModule({
  declarations: [BrowseLocationTypeComponent, ContentLocationTypeComponent, LocationTypeDialogComponent],
  imports: [
    CommonModule,
    LocationTypeRoutingModule
  ]
})
export class LocationTypeModule { }
