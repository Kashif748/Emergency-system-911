import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Suggestion, SuggestionStatus,} from 'src/app/core/api/models/suggestion-models';
import {SuggestionStatusService} from '@core/api/services/suggestion-status.service';
import {SuggestionService} from '@core/api/services/suggestion.service';
import {UrlHelperService} from 'src/app/core/services/url-helper.service';
import {AlertsService} from 'src/app/_metronic/core/services/alerts.service';
import {TranslationService} from '../../i18n/translation.service';
import {DateTimeUtil} from '@core/utils/DateTimeUtil';
import {CustomDatePipe} from '@shared/pipes/custom-date.pipe';

@Component({
  selector: 'app-review-suggestion',
  templateUrl: './review-suggestion.component.html',
  styleUrls: ['./review-suggestion.component.scss'],
})
export class ReviewSuggestionComponent implements OnInit, OnDestroy {

  // Variables
  lang: string;
  formGroup: FormGroup;
  attachments: any[];
  statuses: SuggestionStatus[] = [];
  suggestion: Suggestion;
  private subscriptions: Subscription[] = [];
  suggId;

  constructor(
    private translationServoce: TranslationService,
    private suggService: SuggestionService,
    private suggStatusService: SuggestionStatusService,
    private formBuilder: FormBuilder,
    private alertService: AlertsService,
    private route: ActivatedRoute,
    private urlHelper: UrlHelperService,
    private router: Router,
    private customDate: CustomDatePipe
  ) {
  }

  ngOnInit() {
    this.suggId = this.route.snapshot.params['id'];
    this.lang = this.translationServoce.getSelectedLanguage();
    this.formGroup = this.buildForm();
    let sub = this.suggService.getById(this.suggId).subscribe((response) => {
      const sugg: Suggestion = response.result;
      this.suggestion = sugg;
      this.formGroup.patchValue({
        ...sugg,
        statusId: sugg.suggestionStatus.id + '',
      });
    });
    this.subscriptions = [...this.subscriptions, sub];

    sub = this.suggService.getAttachments(this.suggId).subscribe((response) => {
      this.attachments = [...response.result];
    });
    this.subscriptions = [...this.subscriptions, sub];

    sub = this.suggStatusService.getAll().subscribe((response) => {
      this.statuses = response.result;
    });
    this.subscriptions = [...this.subscriptions, sub];
  }

  async download(att) {
    await this.urlHelper.download(att);
  }

  buildForm(): FormGroup {
    const title = this.formBuilder.control(null, [Validators.required]);
    const type = this.formBuilder.control(null, [Validators.required]);
    const desc = this.formBuilder.control(null, [Validators.required]);
    const status = this.formBuilder.control(null, [Validators.required]);
    title.disable();
    type.disable();
    desc.disable();
    return this.formBuilder.group({
      description: desc,
      stype: type,
      title,
      statusId: status,
    });
  }

  async submit() {
    const statusId = this.formGroup.get('statusId').value;
    try {
      const suggestion = this.suggestion;
      suggestion.createdOn = DateTimeUtil.getDateInUTCFormat(this.customDate.transform(suggestion.createdOn));
      const data = {
        ...suggestion,
        createdBy: this.suggestion.user.id,
        statusId,
      };
      await this.suggService.update(data).toPromise<any>();
      this.alertService.openSuccessSnackBar();
      this.router.navigate(['suggestions/manage']);
    } catch (err) {
      this.alertService.openFailureSnackBar();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
