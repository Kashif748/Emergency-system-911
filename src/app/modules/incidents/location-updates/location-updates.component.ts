import {AlertsService} from '../../../_metronic/core/services/alerts.service';
import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import {TranslationService} from '../../i18n/translation.service';
import {CustomDatePipe} from '@shared/pipes/custom-date.pipe';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-location-updates',
  templateUrl: './location-updates.component.html',
  styleUrls: ['./location-updates.component.scss'],
})
export class LocationUpdatesComponent implements OnInit {
  // UI
  @Input() incidentData;
  @ViewChild('picker') picker: any;
  @ViewChild('picker2') picker2: any;

  // Variables
  lang = 'en';
  containedDate: any = '';
  closedDate: any = '';
  locationReachedDate: any = '';

  constructor(
    private translationService: TranslationService,
    private incidentsService: IncidentsService,
    private alertService: AlertsService,
    private datePipe: DatePipe,
    private changeDetector: ChangeDetectorRef,
    private readonly customDatePipe: CustomDatePipe) {
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.locationReachedDate = this.customDatePipe.transform(
      this.incidentData.locationReachedDate,
      false
    );
    this.containedDate = this.customDatePipe.transform(
      this.incidentData.containedDate,
      false
    );
    this.closedDate = this.customDatePipe.transform(
      this.incidentData.closedDate,
      false
    );
  }

  onSubmit() {
    const newSelectionValues = {
      containedDate: this.containedDate,
      closedDate: this.closedDate,
      locationReachedDate: this.locationReachedDate,
    };

    this.incidentsService.updateIncidentLocationDateInfo(this.incidentData.id, newSelectionValues)
      .subscribe((response: any) => {
        if (response) {
          this.alertService.openSuccessSnackBar();
          const updatedIncident = response.result;
          this.incidentData.containedDate = updatedIncident.containedDate;
          this.incidentData.closedDate = updatedIncident.closedDate;
          this.incidentData.locationReachedDate = updatedIncident.locationReachedDate;
          this.changeDetector.detectChanges();
        }
      });
  }

  disableUpdateButton() {
    if (this.incidentData?.status?.id == '2') {
      // incident closed.
      return true;
    }
    return this.locationReachedDate == null && this.containedDate == null;
  }
}
