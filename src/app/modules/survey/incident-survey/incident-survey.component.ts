import {Direction, Directionality} from '@angular/cdk/bidi';
import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import { IncidentsService } from '@core/api/services/incident.service';
import { Observable, of, Subject } from 'rxjs';
import {catchError, concatMap, filter, tap} from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { environment } from 'src/environments/environment';
import { SurveyService } from '../survey.service';
import {
  IncidentSurveyConfig,
  IncidentSurveyType,
  SurveyBodyRequest,
} from './const';
import {ILangFacade} from "@core/facades/lang.facade";
import {DOCUMENT} from "@angular/common";


interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

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
  language: LanguageFlag;
  direction = '';
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: './assets/media/svg/flags/260-united-kingdom.svg',
    },
    {
      lang: 'ar',
      name: 'العربية',
      flag: './assets/media/svg/flags/151-united-arab-emirates.svg',
    },
  ];


  constructor(
    private incidentService: IncidentsService,
    public directionality: Directionality,
    private activatedRoute: ActivatedRoute,
    private surveyService: SurveyService,
    private cd: ChangeDetectorRef,
    private translationService: TranslationService,
    private langFacade: ILangFacade,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {}

  ngOnInit(): void {
    //this.surveyConfigs$ = this.incidentService.getIncidentSurveyConfig();
    this.setSelectedLanguage();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        this.setSelectedLanguage();
      });
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

  setLanguageWithRefresh(lang) {
    this.setLanguage(lang);
    this.langFacade.changeLang(lang);
    const dir = lang == 'ar' ? 'rtl' : ('ltr' as Direction);
    this.directionality.change.emit(dir);
    window.location.reload();
  }

  setLanguage(lang) {
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
    if (lang == 'ar') {
      this.direction = 'rtl';
    } else {
      this.direction = 'ltr';
    }

    const htmlTag = document.querySelector('html');
    htmlTag.setAttribute('lang', this.translationService.getSelectedLanguage());
    htmlTag.setAttribute('dir', this.direction);
    htmlTag.setAttribute('direction', this.direction);
    htmlTag.style.direction = this.direction;
  }

  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
    this.document.documentElement.lang =
      this.translationService.getSelectedLanguage();
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
