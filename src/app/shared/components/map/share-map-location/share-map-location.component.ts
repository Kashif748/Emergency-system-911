import { Component, Inject, NgModule, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { AlertsService } from '../../../../_metronic/core/services/alerts.service';
import { IncidentsService } from '../../../../_metronic/core/services/incidents.service';
import { AppUtil } from '@core/utils/AppUtil';
import { ILangFacade } from '@core/facades/lang.facade';
import { LocationUtil } from '../utils/LocationUtil';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-share-map-location',
  templateUrl: './share-map-location.component.html',
  styleUrls: ['./share-map-location.component.scss'],
})
export class ShareMapLocationComponent implements OnInit {
  // Variables
  dir$ = this.langFacade.vm$.pipe(map((m) => m.ActiveLang?.dir));

  isLoading = true;
  locationUrl = '';
  response: any;
  features: any;

  constructor(
    public matDialog: MatDialog,
    private langFacade: ILangFacade,
    private alertService: AlertsService,
    private incidentsService: IncidentsService,
    public dialogRef: MatDialogRef<ShareMapLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadLatLng();
  }

  private async loadLatLng() {
    try {
      this.isLoading = true;
      if (this.data.taskId != null && this.data.taskId != undefined) {
        this.response = await this.incidentsService
          .getUTMByTaskId(this.data.taskId)
          .toPromise();
        this.features = this.response.features;
        if (this.features.length == 0) {
          this.response = await this.incidentsService
            .getUTMByIncidentId(this.data.incidentId)
            .toPromise();
          this.features = this.response.features;
        }
      } else {
        this.response = await this.incidentsService
          .getUTMByIncidentId(this.data.incidentId)
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
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.alertService.openFailureSnackBar();
      }
    } catch (e) {
      this.alertService.openFailureSnackBar();
      this.isLoading = false;
    }
  }

  copyUrlClick() {
    AppUtil.copyToClipBoard(this.locationUrl)
      .then((value) => {
        this.alertService.openSuccessSnackBar('COMMON.SUCCESSFULLY_COPIED');
      })
      .catch((reason) => {
        this.alertService.openFailureSnackBar();
      });
  }
}

@NgModule({
  declarations: [ShareMapLocationComponent],
  imports: [
    TranslateModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [ShareMapLocationComponent],
})
export class ShareMapLocationModule {}
