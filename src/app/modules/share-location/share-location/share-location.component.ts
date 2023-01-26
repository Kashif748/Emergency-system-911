import { Directionality } from '@angular/cdk/bidi';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, Optional, SkipSelf } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IncidentsService } from '@core/api/services/incident.service';
import { ILangFacade } from '@core/facades/lang.facade';
import { MapComponent } from '@shared/components/map/map.component';
import {
  MapConfig,
  MapService,
} from '@shared/components/map/services/map.service';

import { MapActionType } from '@shared/components/map/utils/MapActionType';
import { MapViewType } from '@shared/components/map/utils/MapViewType';
import { TaskIncidentGisData } from '@shared/components/map/utils/TaskIncidentGisData';
import { Subject } from 'rxjs';
import { concatMap, map, tap, throwIfEmpty } from 'rxjs/operators';
import { ShareLocationService } from '../shareLocation.service';

export enum LocationStatusEnum {
  PREVIOUS_SET,
  JUST_SEND,
  NOT_SEND,
}

@Component({
  selector: 'app-share-location',
  templateUrl: './share-location.component.html',
  styleUrls: ['./share-location.component.scss'],
})
export class ShareLocationComponent implements OnInit {
  uuid: string;
  status$ = new Subject<LocationStatusEnum>();
  locationStatus = LocationStatusEnum;
  location: { latitude: string; longitude: string };
  mapConfigData: MapConfig = {
    mapType: MapViewType.REPORTER,
    zoomModel: {
      referenceId: '',
      featureName: MapActionType.INCIDENT_POINT,
    },
    showLayers: false,
    closeMapAuto: false,
  };
  constructor(
    private activatedRoute: ActivatedRoute,
    private shareLocService: ShareLocationService,
    private mapService: MapService,
    public directionality: Directionality
  ) {
    this.location = {
      latitude: '',
      longitude: '',
    };
  }

  ngOnInit(): void {
    this.uuid = this.activatedRoute.snapshot.params['uuid'];
    this.shareLocService.verifyUUID(this.uuid).subscribe((data) => {
      this.status$.next(
        data['result']
          ? LocationStatusEnum.NOT_SEND
          : LocationStatusEnum.PREVIOUS_SET
      );
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      });
    }
  }

  OnSaveMap(response: {
    ff: (ref: TaskIncidentGisData) => Promise<void>;
    gType: string;
    locationInfo?: any;
    pointCoordinates: {
      latitude: string;
      longitude: string;
      x: string;
      y: string;
    };
    polylineCoordinates: Array<Array<Array<string>>>;
    polygonCoordinates: Array<Array<Array<string>>>;
  }) {
    const { latitude, longitude } = response?.pointCoordinates;
    const location = `POINT(${latitude} ${longitude})`;
    this.shareLocService
      .sendReporterLocation({
        location: location,
        createdOn: new Date(),
        uuid: this.uuid,
      })
      .subscribe((data) => {
        this.status$.next(LocationStatusEnum.JUST_SEND);
      });
  }
}
