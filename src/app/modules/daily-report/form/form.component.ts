import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ILangFacade } from '@core/facades/lang.facade';
import { ExportService } from '@core/services/export.service';
import { IStorageService } from '@core/services/storage.service';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { FormInitDialogComponent } from '../form-init-dialog/form-init-dialog.component';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private storageService: IStorageService,
    private exportService: ExportService,
    private langFacade: ILangFacade,
    private dialog: MatDialog
  ) {}
  dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));
  public initForm$ = this.storageService.getState('daily-report-init');
  private destroy$ = new Subject();

  private openStartDialog() {
    const dialogRef = this.dialog.open(FormInitDialogComponent, {
      maxWidth: '500px',
      backdropClass: '',
      disableClose: true,
      data: {},
    });
  }

  review() {
    this.dialog.open(ReviewComponent, {
      width: '100%',
      height: '100%',
      minWidth: '100%',
      minHeight: '100%',
      direction: 'ltr',
      role: 'alertdialog',
    });
  }
  ngOnInit() {
    this.form = this.buildForm();
    this.openStartDialog();
    let tempReport = this.storageService.getItem('daily-report');
    for (
      let index = 0;
      index < tempReport?.performanceTasksAndEvents?.length - 1;
      index++
    ) {
      this.addRecordP1(index);
    }
    // for (
    //   let index = 0;
    //   index < tempReport?.performanceKeyPerformanceResults?.length - 1;
    //   index++
    // ) {
    //   this.addRecordP2(index);
    // }
    for (
      let index = 0;
      index < tempReport?.performanceMalfunctions?.length - 1;
      index++
    ) {
      this.addRecordP3(index);
    }
    const arrv = ['أبوظبي', 'المناطق الخارجية', 'العين', 'الظفرة'];

    if (tempReport) {
      if (Array.isArray(tempReport.performanceKeyPerformanceResults)) {
        tempReport.performanceKeyPerformanceResults.forEach((v, i, _) => {
          v[0] = arrv[i];
        });
      }
    }
    this.form.patchValue(
      tempReport ?? {
        performanceKeyPerformanceResults: [
          ['أبوظبي', '', '', '', '', '', '', ''],
          ['المناطق الخارجية', '', '', '', '', '', '', ''],
          ['العين', '', '', '', '', '', '', ''],
          ['الظفرة', '', '', '', '', '', '', ''],
        ],
      }
    );
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.storageService.setState('daily-report', value);
    });
    let exceptedControls = [
      'performanceTasksAndEvents',
      'performanceKeyPerformanceResults',
      'performanceMalfunctions',
    ];
    Object.keys(this.form.value)
      .filter((k) => exceptedControls.indexOf(k) < 0)
      .forEach((k) => {
        let subForm = this.form.get(k) as FormGroup;
        subForm
          .get('user')
          .valueChanges.pipe(takeUntil(this.destroy$))
          .subscribe((user) => {
            subForm
              .get('phone')
              .patchValue(
                user?.mobiles[0]?.mobile
                  ? `${user?.mobiles[0]?.mobile?.startsWith('+') ? '' : '+'}${
                      user?.mobiles[0]?.mobile
                    }`
                  : ''
              );
          });
      });
  }
  public export() {
    this.exportService.exportDailyReport();
  }
  public clear() {
    this.form.reset();
  }
  private buildForm(): FormGroup {
    const arrv = ['أبوظبي', 'المناطق الخارجية', 'العين', 'الظفرة'];
    const arr = [
      this.generateRecordWithInit(9, [arrv[0]]),
      this.generateRecordWithInit(9, [arrv[1]]),
      this.generateRecordWithInit(9, [arrv[2]]),
      this.generateRecordWithInit(9, [arrv[3]]),
    ];
    const performanceKeyPerformanceResults = this.formBuilder.array(arr);

    let form = this.formBuilder.group({
      ondutyIncidentManagement: this.formBuilder.group({
        user: [null],
        phone: [null],
        twok: [null],
      }),
      ondutyOperationsManagment: this.formBuilder.group({
        user: [null],
        phone: [null],
        twok: [null],
      }),
      ondutyCivilProtection: this.formBuilder.group({
        user: [null],
        phone: [null],
        twok: [null],
      }),
      ondutyFinanceAndSubsistence: this.formBuilder.group({
        user: [null],
        phone: [null],
        twok: [null],
      }),
      ondutyTransportAndConcerns: this.formBuilder.group({
        user: [null],
        phone: [null],
        twok: [null],
      }),
      ondutyFireAndRescueExpert: this.formBuilder.group({
        user: [null],
        phone: [null],
        twok: [null],
      }),
      // ---------------------
      ondutyGoldenAssistantCommander: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      ondutyOperationsGroupLeader: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      ondutyCapitalAndOuterRegions: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      ondutyAlDhafra: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      ondutyAlAin: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      ondutyAmbulance: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      ondutyHazardousSubstances: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      ondutyPsychologicalSupport: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      ondutyElectronicServices: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      ondutySpecialTransportAndConcerns: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      ondutyCorporateCommunications: this.formBuilder.group({
        user: [null],
        phone: [null],
      }),
      performanceTasksAndEvents: this.formBuilder.array([
        this.generateRecord(4),
      ]),
      performanceKeyPerformanceResults,
      performanceMalfunctions: this.formBuilder.array([this.generateRecord(3)]),
    });
    return form;
  }

  public addRecordP1(index: number) {
    let performanceTasksAndEvents = this.form.get(
      'performanceTasksAndEvents'
    ) as FormArray;
    performanceTasksAndEvents.insert(index + 1, this.generateRecord(4));
  }

  public removeRecordP1(index: number) {
    let performanceTasksAndEvents = this.form.get(
      'performanceTasksAndEvents'
    ) as FormArray;
    performanceTasksAndEvents.removeAt(index);
  }

  public addRecordP2(index: number) {
    let performanceKeyPerformanceResults = this.form.get(
      'performanceKeyPerformanceResults'
    ) as FormArray;
    performanceKeyPerformanceResults.insert(index + 1, this.generateRecord(7));
  }

  public removeRecordP2(index: number) {
    let performanceKeyPerformanceResults = this.form.get(
      'performanceKeyPerformanceResults'
    ) as FormArray;
    performanceKeyPerformanceResults.removeAt(index);
  }

  public addRecordP3(index: number) {
    let performanceMalfunctions = this.form.get(
      'performanceMalfunctions'
    ) as FormArray;
    performanceMalfunctions.insert(index + 1, this.generateRecord(3));
  }

  public removeRecordP3(index: number) {
    let performanceMalfunctions = this.form.get(
      'performanceMalfunctions'
    ) as FormArray;
    performanceMalfunctions.removeAt(index);
  }

  private generateRecord(length = 0) {
    let fields = Array(length)
      .fill(0)
      .map((_) => this.formBuilder.control(''));
    return this.formBuilder.array(fields);
  }

  private generateRecordWithInit(length = 0, init: any[] = []) {
    const initArr = Array(length)
      .fill(0)
      .map((_) => '');
    init.forEach((v, i, _) => {
      initArr[i] = v;
    });
    let fields = Array(length)
      .fill(0)
      .map((_, i, __) => this.formBuilder.control(initArr[i]));
    return this.formBuilder.array(fields);
  }

  p1headers = ['المنطقة', 'المهمة', 'المركز', 'تاريخ المهمة'];

  public p2headers = [
    'عدد حوادث الدفاع المدني',
    'عدد تقارير الحوادث',
    'عدد اشعارات الارسال للتطبيق',
    'عدد إنذارات الغير مؤكدة - حصنتك',
    'عدد الاصابات',
    'عدد الوفيات',
    'عدد المهام والفعاليات',
  ];

  public p3headers = ['المركز', 'المركبة', 'العطل'];
}
