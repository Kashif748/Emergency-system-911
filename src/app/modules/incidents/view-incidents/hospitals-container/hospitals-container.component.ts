import {CommonModule} from '@angular/common';
import {ChangeDetectorRef, Component, NgModule, ViewChild} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SharedModule} from '@shared/shared.module';
import {InlineSVGModule} from 'ng-inline-svg';
import {TranslationModule} from 'src/app/modules/i18n/translation.module';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';
import {NgApexchartsModule} from 'ng-apexcharts';
import {HospitalsComponent} from '../../hospitals/hospitals.component';
import {HospitalsStatisticsComponent} from '../../hospital-data/hospitals-statistics/hospitals-statistics.component';
import {BaseComponent} from '@shared/components/base.component';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-hospitals-container',
  templateUrl: './hospitals-container.component.html',
  styleUrls: ['./hospitals-container.component.scss'],
})
export class HospitalsContainerComponent extends BaseComponent {
  // UI
  public form: FormGroup;
  @ViewChild('hospitalEl')
  hospitalEl: HospitalsComponent;
  @ViewChild('hospitalStatistics')
  hospitalStatistics: HospitalsStatisticsComponent;
  // Variables.
  loading = false;
  incidentId: number;

  constructor(
    private incidentsService: IncidentsService,
    private cd: ChangeDetectorRef,
    private alertService: AlertsService) {
    super();
  }

  openHospitalForm() {
    this.hospitalEl.add();
  }

  public update(hospitals) {
    if (!hospitals) {
      return;
    }
    this.loading = true;
    this.incidentsService
      .updateIncidentHospitalStatistics(this.incidentId, hospitals)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.loading = false;
          if (this.hospitalStatistics) {
            this.hospitalStatistics.updateChart(hospitals);
          }
          this.form.get('incidentHospitals').setValue(hospitals);
          this.hospitalEl.setHospitals(hospitals);
          this.cd.detectChanges();
          this.alertService.openSuccessSnackBar();
        },
        (e) => {
          this.loading = false;
          this.cd.detectChanges();
          console.error(e);
          this.alertService.openFailureSnackBar();
        }
      );
  }

}

@NgModule({
  imports: [
    TranslationModule,
    InlineSVGModule,
    MatProgressBarModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgApexchartsModule,
  ],
  declarations: [
    HospitalsContainerComponent,
    HospitalsStatisticsComponent,
    HospitalsComponent,
  ],
})
export class HospitalsContainerModule {
}
