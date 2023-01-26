import { Directionality } from '@angular/cdk/bidi';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IncidentsService } from '@core/api/services/incident.service';
import { Observable, of, Subject } from 'rxjs';
import { catchError, concatMap, tap } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { environment } from 'src/environments/environment';
import { SurveyService } from '../survey.service';
import {
  IncidentSurveyConfig,
  IncidentSurveyType,
  SurveyBodyRequest,
} from './const';

@Component({
  selector: 'app-incident-survey',
  templateUrl: './incident-survey.component.html',
  styleUrls: ['./incident-survey.component.scss'],
})
export class IncidentSurveyComponent implements OnInit {
  surveyConfigs$: Observable<IncidentSurveyConfig[]>;
  configMap: Map<IncidentSurveyConfig, IncidentSurveyType> = new Map<
    IncidentSurveyConfig,
    IncidentSurveyType
  >();
  notesFormControl: FormControl = new FormControl('');
  incidentId: string;
  lang = 'en';
  isPosted$: Subject<boolean> = new Subject();
  processState: 'INVALID_UUID' | 'CHECKING_UUID' | 'VALID_UUID';
  orgLogo: string = '';
  constructor(
    private incidentService: IncidentsService,
    public directionality: Directionality,
    private activatedRoute: ActivatedRoute,
    private surveyService: SurveyService,
    private cd: ChangeDetectorRef,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    //this.surveyConfigs$ = this.incidentService.getIncidentSurveyConfig();
    this.lang = this.translationService.getSelectedLanguage();
    this.incidentId = this.activatedRoute.snapshot.params['uuid'];
    this.processState = 'CHECKING_UUID';

    this.surveyService
      .checkUUID(this.incidentId)
      .pipe(
        tap((v) => {
          this.processState = v['result'] ? 'VALID_UUID' : 'INVALID_UUID';
        }),

        concatMap((v) => this.incidentService.getIncidentSurveyConfig()),
        tap((v) => {
          this.surveyConfigs$ = of(v);
          this.isPosted$.next(false);
        })
      )
      .subscribe(
        (data) => {},
        (err) => {
          if (!err['error']['status']) {
            this.processState = 'INVALID_UUID';
            this.cd.detectChanges();
          }
        },
        () => {
          this.cd.detectChanges();
        }
      );

    this.surveyService
      .getOrgByIncidentUUID(this.incidentId)
      .subscribe((data) => {
        this.orgLogo =
          environment.apiUrl +
          '/dms/load-logo/ext/' +
          data['result'].logoHorizental;
        console.log(this.orgLogo);
        this.cd.detectChanges();
      });
  }

  chooseType(type: IncidentSurveyType, config: IncidentSurveyConfig) {
    this.configMap.set(config, type);
  }

  hasSelected(type: IncidentSurveyType, config: IncidentSurveyConfig) {
    return this.configMap.get(config)?.id === type.id;
  }

  prepareDataToSend() {
    let body: SurveyBodyRequest = { incidentSurveyValues: [], notes: '' };
    body.notes = this.notesFormControl.value;
    this.configMap.forEach((value, key) => {
      body.incidentSurveyValues.push({
        surveyConfig: key,
        surveyType: value,
      });
    });

    return body;
  }

  submit() {
    const body = this.prepareDataToSend();
    this.incidentService
      .postIncidentSurveyResults(this.incidentId.toString(), body)
      .subscribe((data) => {
        console.log(data);
        this.isPosted$.next(true);
      });
  }
}
