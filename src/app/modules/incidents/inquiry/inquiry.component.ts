import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TranslationService } from '../../i18n/translation.service';
import { Location } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Directionality } from '@angular/cdk/bidi';
import { AppCommonDataService } from '@core/services/app-common-data.service';
import { AppCommonData } from '@core/entities/AppCommonData';
import { RegxConst } from '@core/constant/RegxConst';
import { IncidentsService } from '@core/api/services/incident.service';
import { AlertsService } from '../../../_metronic/core/services/alerts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomDatePipe } from '@shared/pipes/custom-date.pipe';
import { ThemePalette } from '@angular/material/core';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { Store } from '@ngrx/store';
import { IncidentDashboardStateModel } from '../new-incidents-view/store/incidents-dashboard.reducer';
import * as moment from 'moment';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss'],
})
export class InquiryComponent implements OnInit, OnChanges {
  // UI
  formGroup: FormGroup;
  //@Input() incidentDurationInSeconds = 0;
  incidentDurationFormatted;
  incidentStartTime;
  incidentDurationInSeconds = 0;
  // Variables
  reportingVia: any[] = [];
  tags: any[];
  commonData: AppCommonData;
  lang = 'en';
  isLoading = false;
  inquiryId: string;
  minDate: any;
  maxDate: any;
  isAddMode: boolean = true;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  redirectUrl: string;

  constructor(
    protected location: Location,
    protected translationService: TranslationService,
    protected formBuilder: FormBuilder,
    protected cdr: ChangeDetectorRef,
    public directionality: Directionality,
    private readonly appCommonService: AppCommonDataService,
    private readonly incidentService: IncidentsService,
    private readonly alertService: AlertsService,
    protected router: Router,
    private route: ActivatedRoute,
    private readonly customDatePipe: CustomDatePipe,
    private store: Store
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.incidentDurationInSeconds) {
    }
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = this.appCommonService.getCommonData();
    this.tags = this.commonData?.tags;
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.createForm();
    this.loadReportingVia();
    this.inquiryId = this.route.snapshot.params['id'];
    if (+this.inquiryId) {
      this.isAddMode = false;
      this.loadInquiryIncidentDetails();
    }

    if (this.isAddMode) {
      this.startTimer();
    }

    this.store
      .select(
        (state: { incidentDashboard: IncidentDashboardStateModel }) =>
          state?.incidentDashboard?.lastRouterUrl
      )
      .subscribe((data) => (this.redirectUrl = data));
  }

  startTimer() {
    this.incidentStartTime = moment().startOf('day');
    setInterval(() => {
      this.incidentStartTime.add(1, 'second');
      this.incidentDurationInSeconds += 1;
      this.incidentDurationFormatted =
        this.incidentStartTime.format('HH:mm:ss');
      this.cdr.detectChanges();
    }, 1000);
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      id: [0],
      reportingVia: [4, [Validators.required]],
      reporterName: [null, Validators.required],
      reportedByMobile: [''],
      reporterEmail: ['', [Validators.email]],
      subject: ['', Validators.required],
      answer: [''],
      isActive: [true],
      callDurationInMinutes: [0, Validators.required],
      orgStructure: [null, Validators.required],
      user: [null, Validators.required],
      createdDate: [new Date(), Validators.required],
      inquiryTags: [],
    });
    this.checkReportingViewValidation();
    if (this.commonData.currentUserDetails.id) {
      // set incident org.
      this.formGroup.patchValue({
        orgStructure: {
          id: this.commonData.currentOrgDetails.id,
          label: 'OrgStructure',
        },
      });
      //        specialized: this.commonData.currentUserDetails.id,
      this.formGroup.patchValue({
        user: { id: this.commonData.currentUserDetails.id, label: 'User' },
      });
    }
  }

  checkReportingViewValidation() {
    this.formGroup
      .get('reportedByMobile')
      .setValidators([
        Validators.required,
        Validators.pattern(RegxConst.PHONE_REGEX),
      ]);
    this.formGroup
      .get('reporterEmail')
      .setValidators(
        Validators.compose([Validators.pattern(RegxConst.EMAIL_REGEX)])
      );
    this.formGroup.get('reportingVia').valueChanges.subscribe((data) => {
      const item = this.reportingVia.find((item) => item.id === data);
      if (!item) {
        return;
      }
      if ([2, 4, 7].includes(item.id)) {
        // report by phone
        this.formGroup
          .get('reportedByMobile')
          .setValidators([
            Validators.required,
            Validators.pattern(RegxConst.PHONE_REGEX),
          ]);
        this.formGroup
          .get('reporterEmail')
          .setValidators(
            Validators.compose([Validators.pattern(RegxConst.EMAIL_REGEX)])
          );
      } else {
        // email
        this.formGroup
          .get('reporterEmail')
          .setValidators(
            Validators.compose([
              Validators.required,
              Validators.pattern(RegxConst.EMAIL_REGEX),
            ])
          );
        this.formGroup
          .get('reportedByMobile')
          .setValidators([Validators.pattern(RegxConst.PHONE_REGEX)]);
      }
      this.formGroup.get('reporterEmail').updateValueAndValidity();
      this.formGroup.get('reportedByMobile').updateValueAndValidity();
    });
  }

  loadReportingVia() {
    this.incidentService.getReportingVia().subscribe(
      (data) => {
        if (data) {
          this.reportingVia = data.result.content;
          this.cdr.detectChanges();
        }
      },
      (error) => {
        console.log(error);
        this.alertService.openFailureSnackBar();
      }
    );
  }

  private loadInquiryIncidentDetails() {
    this.isLoading = true;
    this.incidentService.getIncidentInquiry(this.inquiryId).subscribe(
      (res) => {
        this.isLoading = false;
        const result = res['result'];
        if (result['reportingVia']) {
          result.reportingVia = result['reportingVia'].id;
        }
        if (result['reportedByMobile']) {
          const reporterPhone = result['reportedByMobile'].toString();
          result['reportedByMobile'] =
            reporterPhone[0] == '+' ? reporterPhone : '+' + reporterPhone;
        }
        this.formGroup.patchValue({
          ...result,
          incidentTags: result.result.incidentTags.map(
            (tagObj) => tagObj.tag.id
          ),
          createdDate: this.customDatePipe.transform(
            result['createdDate'],
            false
          ),
        });
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.alertService.openFailureSnackBar();
        this.cdr.detectChanges();
      }
    );
  }

  getIsRequiredForControl(control) {
    const controller = this.formGroup.get(control);
    if (controller?.validator) {
      const validator = controller.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }
    return false;
  }

  getErrorMobile() {
    if (this.formGroup.get('reportedByMobile')?.hasError('required')) {
      return this.translationService.get('VALIDATION_MSG.REQUIRED');
    }

    if (this.formGroup.get('reportedByMobile')?.hasError('pattern')) {
      return this.translationService.get('VALIDATION_MSG.MOBILE.INVALID');
    }
  }

  getErrorEmail() {
    if (this.formGroup.get('reportedByEmail')?.hasError('required')) {
      return this.translationService.get('VALIDATION_MSG.REQUIRED');
    }

    if (this.formGroup.get('reportedByEmail')?.hasError('pattern')) {
      return this.translationService.get('VALIDATION_MSG.EMAIL.INVALID');
    }
  }

  public disableSubmitButton() {
    return this.isLoading;
  }

  back() {
    this.location.back();
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.alertService.customFailureSnackBar(
        this.translationService.get('INCIDENTS.INVALID_FORM')
      );
      this.isLoading = false;
      return;
    }
    const timeInMinutes = Math.ceil(this.incidentDurationInSeconds / 60);
    if (this.formGroup && !+this.inquiryId) {
      this.formGroup.get('callDurationInMinutes').setValue(timeInMinutes);
    }
    this.isLoading = true;
    // check if add or edit incident inquiry.
    const body = this.formGroup.value;
    body.createdDate = DateTimeUtil.getDateInUTCFormat(body.createdDate);
    body.reportingVia = {
      id: this.formGroup.value.reportingVia,
      label: 'ReportingVia',
    };
    body.inquiryTags.forEach((t) => {
      const tag = {
        id: 0,
        inquiry: {
          id: this.inquiryId,
        },

        tag: { id: t },
      };
    });
    if (body.id == 0) {
      // remove id from sent request
      delete body.id;
    }
    let method: 'POST' | 'PUT';
    if (+this.inquiryId) {
      // edit
      method = 'PUT';
    } else {
      // add
      method = 'POST';
    }

    this.incidentService.addUpdateInquiry(body, method).subscribe(
      (res) => {
        this.handleInquiryCreated();
      },
      (error) => {
        this.handleInquiryCreationFailed(error);
      }
    );
  }

  handleInquiryCreated() {
    this.isLoading = false;
    this.alertService.openSuccessSnackBar();
    this.router.navigate([this.redirectUrl]);
  }

  handleInquiryCreationFailed(error: any) {
    console.log(error);
    this.isLoading = false;
    this.alertService.openFailureSnackBar();
  }
}
