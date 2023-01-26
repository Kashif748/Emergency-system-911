import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareLocationRoutingModule } from './share-location-routing.module';
import { ShareLocationComponent } from './share-location/share-location.component';
import { SharedModule } from '@shared/shared.module';
import { MapModule } from '@shared/components/map/map.component';
import { MapService } from '@shared/components/map/services/map.service';
import {NewShareLocationComponent} from "./new-share-location/new-share-location.component";
import {AttachmentsListModule} from "@shared/attachments-list/attachments-list.module";

@NgModule({
  declarations: [ShareLocationComponent, NewShareLocationComponent],
  imports: [SharedModule, MapModule, CommonModule, ShareLocationRoutingModule, AttachmentsListModule],
  providers: [MapService],
})
export class ShareLocationModule {}
