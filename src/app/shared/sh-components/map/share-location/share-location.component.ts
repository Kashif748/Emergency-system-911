import { Component, Input, OnInit } from '@angular/core';
import { LocationUtil } from '../utils/location.util';
import { AppUtil } from '@core/utils/AppUtil';
import { MessageHelper } from '@core/helpers/message.helper';
import { MapService } from '../services/map.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-share-location',
  templateUrl: './share-location.component.html',
  styleUrls: ['./share-location.component.scss'],
})
export class ShareLocationComponent implements OnInit {
  loading$ = new BehaviorSubject(false);
  locationUrl = '';
  response: any;
  features: any;
  @Input()
  taskId: number;
  @Input()
  incidentId: number;

  constructor(private message: MessageHelper, private mapService: MapService) {}

  ngOnInit(): void {
    this.loadLatLng();
  }

  private async loadLatLng() {
    try {
      this.loading$.next(true);
      if (this.taskId != null && this.taskId != undefined) {
        this.response = await this.mapService
          .getUTMByTaskId(this.taskId)
          .toPromise();
        this.features = this.response.features;
        if (this.features.length == 0) {
          this.response = await this.mapService
            .getUTMByIncidentId(this.incidentId)
            .toPromise();
          this.features = this.response.features;
        }
      } else {
        this.response = await this.mapService
          .getUTMByIncidentId(this.incidentId)
          .toPromise();
        this.features = this.response.features;
      }
      if (this.features && this.features.length > 0) {
        const geometry = this.features[0].geometry;
        const utm = { easting: geometry.x, northing: geometry.y, zone: 40 };
        const location = LocationUtil.getLatLngFrom(utm);
        this.locationUrl = LocationUtil.buildGoogleMapUrl(
          location.latitude,
          location.longitude
        );
      }
    } catch (e) {}
    this.loading$.next(false);
  }

  copyUrlClick() {
    AppUtil.copyToClipBoard(this.locationUrl)
      .then(() => {
        this.message.success({ detail: 'COMMON.SUCCESSFULLY_COPIED' });
      })
      .catch(() => {
        this.message.error();
      });
  }
}
