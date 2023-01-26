import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslationService} from '../../../i18n/translation.service';
import {AlertsService} from '../../../../_metronic/core/services/alerts.service';
import {IncidentsService} from '../../../../_metronic/core/services/incidents.service';
import {LocationUtil} from '../../specific-org-forms/abstract-create-form/LocationUtil';
import {AppUtil} from '@core/utils/AppUtil';

@Component({
  selector: 'app-share-map-location',
  templateUrl: './share-map-location.component.html',
  styleUrls: ['./share-map-location.component.scss']
})
export class ShareMapLocationComponent implements OnInit {

  // Variables
  lang = 'en';
  isLoading = true;
  locationUrl = '';
  response : any;
  features : any;

  constructor(
    public matDialog: MatDialog,
    private translationService: TranslationService,
    private alertService: AlertsService,
    private incidentsService: IncidentsService,
    public dialogRef: MatDialogRef<ShareMapLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  ngOnInit(): void {
    this.loadLatLng();
  }

  private async loadLatLng() {
    try {
      this.isLoading = true;
      if((this.data.taskId != null) && (this.data.taskId != undefined) ){
         this.response = await this.incidentsService.getUTMByTaskId(this.data.taskId).toPromise();
         this.features = this.response.features;
         if(this.features.length == 0){
          this.response = await this.incidentsService.getUTMByIncidentId(this.data.incidentId).toPromise();
         this.features = this.response.features;
         }
      }
      else{
         this.response = await this.incidentsService.getUTMByIncidentId(this.data.incidentId).toPromise();
         this.features = this.response.features;
      }
      if (this.features && this.features.length > 0) {
        const geometry = this.features[0].geometry;
        const utm = {easting: geometry.x, northing: geometry.y, zone: 40};
        const location = LocationUtil.getLatLngFrom(utm);
        this.locationUrl = LocationUtil.buildGoogleMapUrl(location.latitude, location.longitude);
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
    AppUtil.copyToClipBoard(this.locationUrl).then(value => {
      this.alertService.openSuccessSnackBar('COMMON.SUCCESSFULLY_COPIED');
    }).catch(reason => {
      console.log(reason);
      this.alertService.openFailureSnackBar();
    });
  }
}

