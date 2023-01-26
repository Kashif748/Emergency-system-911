import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import {ILangFacade} from '@core/facades/lang.facade';

import {MapComponent} from '@shared/components/map/map.component';

import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';

interface Statistics {
  deaths: number;
  majorInjuries: number;
  normalInjuries: number;
  minorInjuries: number;
  staffInjuries: number;
}

@Component({
  selector: 'app-pdf-template',
  templateUrl: './pdf-template.component.html',
  styleUrls: ['./pdf-template.component.scss'],
})
export class PdfTemplateComponent implements OnInit {

  // UI
  @Input() incidentId: number;
  @ViewChild(MapComponent) map: MapComponent;

  // Variables
  public assets$: Observable<any>;
  public hospitals;
  public statistics: Statistics;
  public incident$ = new BehaviorSubject<any>(null);
  incidents: any;
  dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));

  constructor(
    private incidentService: IncidentsService,
    private langFacade: ILangFacade,
    private cd: ChangeDetectorRef) {}


  ngOnInit() {
    this.assets$ = this.incidentService
      .getIncidentsAssets(this.incidentId)
      .pipe(map((r) => r.result.content));

    this.incidentService.viewIncidents(this.incidentId).subscribe(
      (data) => {
        if (data) {
          this.incidents = data.result;

          this.hospitals = [...data.result.incidentHospitals];
          this.statistics = this.prepareHospitalsData();
          this.cd.detectChanges();
          setTimeout((_) => {
            this.incident$.next({...data.result});
          }, 800);
        }
      },
      (error) => {
      }
    );
  }



  prepareHospitalsData(): Statistics {
    const statistics: Statistics = {
      deaths: 0,
      majorInjuries: 0,
      minorInjuries: 0,
      normalInjuries: 0,
      staffInjuries: 0,
    };

    this.hospitals.forEach((hospital) => {
      if (!hospital.staff) {
        statistics.deaths += hospital.deaths;
        statistics.majorInjuries += hospital.majorInjuries;
        statistics.minorInjuries += hospital.minorInjuries;
        statistics.normalInjuries += hospital.normalInjuries;
      } else {
        statistics.staffInjuries +=
          hospital.deaths +
          hospital.majorInjuries +
          hospital.minorInjuries +
          hospital.normalInjuries;
      }
    });

    return statistics;
  }
}
