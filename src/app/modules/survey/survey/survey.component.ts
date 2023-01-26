import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { animations } from '@shared/animations/animation';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TranslationService } from '../../i18n/translation.service';
import { FEELS, REASONS } from '../keys-data';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
  animations: animations,
})
export class SurveyComponent implements OnInit {
  proccessState:
    | 'SUBMITING'
    | 'INVALID_UUID'
    | 'VALID_UUID'
    | 'CHECKING_UUID'
    | 'SUCCESS';
  feels = FEELS;
  reasons = REASONS;

  selectedFeel = -1;
  selectedReason = -1;
  lang = 'en';
  otherReason = new FormControl('');
  uuid = '';
  resultMsg = undefined;
  orgLogo;
  constructor(
    private route: ActivatedRoute,
    private langFacade: ILangFacade,
    private translationService: TranslationService,
    private surveyService: SurveyService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.uuid = this.route.snapshot.params['uuid'];

    if (this.uuid) {
      this.proccessState = 'CHECKING_UUID';
      this.surveyService.checkUUID(this.uuid).subscribe(
        (data) => {
          if (data['status']) {
            this.proccessState = 'VALID_UUID';
            this.cdr.detectChanges();
          }
        },
        (err: HttpErrorResponse) => {
          setTimeout(() => {
            this.proccessState = 'INVALID_UUID';
            this.cdr.detectChanges();
          }, 1000);
        }
      );

      this.surveyService.getOrgByIncidentUUID(this.uuid).subscribe(
        (data) => {
          this.orgLogo =
            environment.apiUrl +
            '/dms/load-logo/ext/' +
            data['result'].logoHorizental;
          console.log(this.orgLogo);
          this.cdr.detectChanges();
        },
        (err: HttpErrorResponse) => {
          this.orgLogo =
            '/assets/logos/' + (this.lang == 'en' ? 'V-En' : 'V-Ar') + '.png';
        }
      );
    }
  }

  submit() {
    if (this.selectedFeel < 0 || this.selectedReason < 0) {
      this.otherReason.setErrors({ incorrect: true });
      return;
    }
    let body = {
      id: 0,
      happiness: this.selectedFeel,
      reason: this.selectedReason,
      other: this.otherReason.value,
    };
    this.proccessState = 'SUBMITING';
    this.surveyService.addNewSurvey(body, this.uuid).subscribe(
      (data) => {
        console.log(data);
        if (data['status']) {
          this.proccessState = 'SUCCESS';
          this.cdr.detectChanges();
        }
      },
      (err: HttpErrorResponse) => {
        setTimeout(() => {
          this.proccessState = 'INVALID_UUID';
          this.cdr.detectChanges();
        }, 1000);
      }
    );
  }
}
