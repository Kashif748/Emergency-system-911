import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ILangFacade } from '@core/facades/lang.facade';
import { CommonService } from '@core/services/common.service';
import {
  SysStatusModel,
  SysStatusService,
} from '@core/services/sys-status.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Inew } from 'src/app/modules/news/models/new.interface';
import { New } from 'src/app/modules/news/models/new.model';
import { DashboardService } from 'src/app/pages/dashboard/dashboard.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

@Component({
  selector: 'app-select-sys-status-dialog',
  templateUrl: './select-sys-status-dialog.component.html',
  styleUrls: ['./select-sys-status-dialog.component.scss'],
})
export class SelectSysStatusDialogComponent implements OnInit, OnDestroy {
  public lang = 'en';
  public control: FormControl;
  public reasonControl: FormControl;

  themeTypes = [
    {
      value: 'golden',
      nameAr: 'المستوى الاستراتيجي',
      nameEn: 'Strategic Level',
    },
    {
      value: 'silver',
      nameAr: 'المستوى العملياتي',
      nameEn: 'Operational Level',
    },
    {
      value: 'bronze',
      nameAr: 'المستوى التكتيكي',
      nameEn: 'Tactical Level',
    },
  ];
  private destroy$ = new Subject();
  constructor(
    private langFacade: ILangFacade,
    private sysStatusService: SysStatusService,
    private formBuilder: FormBuilder,
    private alertService: AlertsService,
    private commonService: CommonService,
    private dialogRef: MatDialogRef<SelectSysStatusDialogComponent>
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
    this.destroy$.complete();
  }
  save() {
    if (this.control.value && this.reasonControl.errors) {
      this.reasonControl.markAllAsTouched();
      return;
    }
    this.sysStatusService.saveChanges().subscribe(
      (data) => {},
      (error) => {
        const errorMsg =
          this.lang == 'en'
            ? error?.error?.error?.message_En
            : error?.error?.error?.message_Ar;
        this.alertService.customFailureSnackBar(errorMsg);
      },
      () => {
        this.dialogRef.close(true);
      }
    );
  }

  public prevState: SysStatusModel;

  cancel() {
    this.sysStatusService.setStatus(this.prevState.status);
    this.sysStatusService.setReason(this.prevState.reason);
  }
  ngOnInit() {
    this.prevState = this.sysStatusService.sanpshot;
    this.lang = this.langFacade.stateSanpshot.ActiveLang.key;
    this.control = this.formBuilder.control(
      this.sysStatusService.sanpshot.status
    );

    this.reasonControl = this.formBuilder.control(
      this.sysStatusService.sanpshot.reason,
      [Validators.required]
    );

    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.sysStatusService.setStatus(v ?? null);
    });

    this.reasonControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((v) => {
        this.sysStatusService.setReason(v);
      });
  }
}
