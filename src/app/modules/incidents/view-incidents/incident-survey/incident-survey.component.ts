import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {IncidentsService} from '../../../../_metronic/core/services/incidents.service';
import {TranslationService} from '../../../i18n/translation.service';
import {HappinessLevel} from './models/HappinessLevel';
import {LoadingStatus} from './models/LoadingStatus';
import {HappinessType} from './models/HappinessType';

@Component({
  selector: 'app-incident-survey',
  templateUrl: './incident-survey.component.html',
  styleUrls: ['./incident-survey.component.scss']
})
export class IncidentSurveyComponent implements OnInit {

  // Variables.
  @Input() incidentId: number;
  happinessLevel: HappinessLevel;
  happinessLevelQues: any[] = [];
  happinessLevelQuesDumy: any[] = [];
  happinessLevelDumpy: Array<HappinessLevel> = [];
  lang = 'en';
  loadingStatus: LoadingStatus = {isLoading: true, msgInfo: null};

  constructor(private incidentsService: IncidentsService,
              private translationService: TranslationService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.loadIncidentSurvey();
  }

  private loadIncidentSurvey() {
    this.incidentsService.getIncidentSurvey(this.incidentId).subscribe((res) => {
      const content = res.result.content as any[];
      if (content.length > 0) {
        const survey = content[0];
        for (let i = 0; survey.incidentSurveyValues.length > i; i++) {
          this.happinessLevel = this.getHappinessLevelInfo(survey.incidentSurveyValues[i]);
          this.happinessLevelQues = this.getHappinessLevelQuesInfo(survey.incidentSurveyValues[i]);
          this.happinessLevelDumpy[i] = this.happinessLevel;
          this.happinessLevelQuesDumy[i] = this.happinessLevelQues;
        }
        this.loadingStatus = {
          isLoading: false,
          msgInfo: null
        };
      } else {
        this.loadingStatus = {
          isLoading: false,
          msgInfo: this.translationService.get('INCIDENTS.HAPPINESS_LEVEL_NO_DATA')
        };
      }
      this.cd.detectChanges();
    }, (e) => {
      this.loadingStatus = {
        isLoading: false,
        msgInfo: this.translationService.get('COMMON.ERROR_HAS_HAPPEND')
      };
      this.cd.detectChanges();
    });
  }

  private getHappinessLevelQuesInfo(survey: any) {
    if (survey.surveyConfig) {
      if (this.lang == 'en') {
        return survey.surveyConfig.nameEn;
      } else {
        return survey.surveyConfig.nameAr;
      }
    }
  }

  private getHappinessLevelInfo(survey: any) {
// tslint:disable-next-line:one-variable-per-declaration
    let level, icon, iconColor, levelName, reason, reasonName;
    switch (survey.surveyType.id) {
      case HappinessType.HAPPY:
      // happy.
      level = HappinessType.HAPPY;
      icon = 'blush';
      iconColor = `svg-icon svg-icon-lg svg-icon-2x p-3 svg-icon-success`;
      levelName = this.translationService.get('INCIDENTS.HAPPINESS_LEVEL.HAPPY');
      reason = survey.reason;
      reasonName = this.translationService.get('INCIDENTS.REASON') + ' : ' +
        this.translationService.get(('INCIDENTS.HAPPINESS_REASON.REASON_' + survey.reason));
      break;
      case HappinessType.VERYHAPPY:
        // happy.
        level = HappinessType.VERYHAPPY;
        icon = 'smiley';
        iconColor = `svg-icon svg-icon-lg svg-icon-2x p-3 svg-icon-success`;
        levelName = this.translationService.get('INCIDENTS.HAPPINESS_LEVEL.VERYHAPPY');
        reason = survey.reason;
        reasonName = this.translationService.get('INCIDENTS.REASON') + ' : ' +
          this.translationService.get(('INCIDENTS.HAPPINESS_REASON.REASON_' + survey.reason));
        break;
      case HappinessType.VERYSAD:
        // happy.
        level = HappinessType.VERYSAD;
        icon = 'disappointed';
        iconColor = `svg-icon svg-icon-lg svg-icon-2x p-3 svg-icon-success`;
        levelName = this.translationService.get('INCIDENTS.HAPPINESS_LEVEL.VERYSAD');
        reason = survey.reason;
        reasonName = this.translationService.get('INCIDENTS.REASON') + ' : ' +
          this.translationService.get(('INCIDENTS.HAPPINESS_REASON.REASON_' + survey.reason));
        break;
      case HappinessType.NEUTRAL:
        // neutral.
        level = HappinessType.NEUTRAL;
        icon = 'neutral_face';
        iconColor = `svg-icon svg-icon-lg svg-icon-2x p-3 svg-icon-warning`;
        levelName = this.translationService.get('INCIDENTS.HAPPINESS_LEVEL.NEUTRAL');
        reason = survey.reason;
        reasonName = this.translationService.get('INCIDENTS.REASON') + ' : ' +
          this.translationService.get(('INCIDENTS.HAPPINESS_REASON.REASON_' + survey.reason));
        break;
      case HappinessType.SAD:
        // unhappy.
        level = HappinessType.SAD;
        icon = 'confused';
        iconColor = `svg-icon svg-icon-lg svg-icon-2x p-3 svg-icon-danger`;
        levelName = this.translationService.get('INCIDENTS.HAPPINESS_LEVEL.SAD');
        reason = survey.reason;
        reasonName = this.translationService.get('INCIDENTS.REASON') + ' : ' +
          this.translationService.get(('INCIDENTS.HAPPINESS_REASON.REASON_' + survey.reason));
        break;
    }

    return {
      level,
      icon,
      iconColor,
      levelName,
      reason,
      reasonName
    };
  }
}
