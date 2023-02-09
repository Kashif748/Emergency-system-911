import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {TranslationService} from "../../../../i18n/translation.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReminderFormComponent} from "../../../../incidents/view-incidents/incident-reminder/reminder-form/reminder-form.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Reminder} from "../../../../incidents/view-incidents/incident-reminder/model/Incident-Reminder";
import {AlertsService} from "../../../../../_metronic/core/services/alerts.service";
import {NotificationManagementService} from "../notification-management.service";
import {PushNotification} from "../model/push-notification";
import {WorklongTemplate} from "../model/worklog-template";
import {map, takeUntil} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {ILangFacade} from "@core/facades/lang.facade";
import {Observable, Subject} from "rxjs";
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss']
})
export class NotificationFormComponent implements OnInit {


  displayedColumns: string[] = [
    "id",
    "code",
    "actions"
  ];

  //variable
  lang: string;
  form: FormGroup;
  display: boolean;
  smsTemplateID;
  pushTemplateID;
  worklogTemplateID;
  public placeHolders: any[] = [];
  dataSource = new MatTableDataSource<any>();
  public dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));
  loading = false;
  totalElement$: Observable<number>;
  destroy$: Subject<boolean> = new Subject();
  moduleId;
  name: string;


  constructor(
    private translation: TranslationService,
    private ref: ChangeDetectorRef,
    public MatDialogRef: MatDialogRef<ReminderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private langFacade: ILangFacade,
    private notificationService: NotificationManagementService,
    private alert: AlertsService,
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
    this.lang = this.translation.getSelectedLanguage();
    this.display = true;
    this.loading = true;
    this.moduleId = this.data['module'] ? this.data['module'] : "";
    this.smsTemplateID = this.data['notifications'] ? this.data['notifications'].id : "";
    this.pushTemplateID = this.data['push'] ? this.data['push'].id : "";
    this.worklogTemplateID = this.data['worklog'] ? this.data['worklog'].id : "";

    if (this.smsTemplateID) {
      this.createFormForSms();
    } else if (this.pushTemplateID) {
      this.createFormForPush();
    } else {
      this.createFormForWork();
    }
    this.getNotificationPlaceHolders();
  }

 getNotificationPlaceHolders() {
    const id = '';
    this.totalElement$ = this.notificationService.notificationPlaceholderTotalElementChanged$;
    this.notificationService.notificationPlaceholderChanged$.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data) {
          this.dataSource.data = [...data];
          this.loading = false;
          this.ref.detectChanges();
        }
      },
      (err) => {
        this.loading = false;
        this.ref.detectChanges();
      }
    );
    this.notificationService.getNotificationPlaceHolders(this.moduleId);
  }

  onPagination(event: { pageSize: number; pageIndex: number }) {
      this.notificationService.getNotificationPlaceHolders(this.moduleId, event.pageIndex, event.pageSize);
  }

  patchValuesForSms(data: any, name) {
    this.name = name,
    this.form.patchValue({
      descriptionEn: data
    });
  }

  patchValuesForPush(data: any) {
    this.name = data.event.name,
    this.form.patchValue({
      titleEn: data.titleEn,
      titleAr: data.titleAr,
      descriptionEn: data.enBody,
      descriptionAr: data.body
    });
  }

  patchValuesForWork(data: any) {
    this.name = this.lang ? data.nameEn : data.nameAr;
    this.form.patchValue({
      config: data.config,
    });
  }

  createFormForSms() {
    this.form = new FormGroup({
      descriptionEn: new FormControl('', [Validators.required])
    });
    this.patchValuesForSms(this.data['notifications'].template, this.data['notifications'].event.name);
    this.ref.markForCheck();
  }

  createFormForPush() {
    this.form = new FormGroup({
      titleEn: new FormControl(null, [Validators.required]),
      titleAr: new FormControl('', [Validators.required]),
      descriptionEn: new FormControl(null, [Validators.required]),
      descriptionAr: new FormControl('', [Validators.required])
    });
    this.patchValuesForPush(this.data['push']);
    this.ref.markForCheck();
  }

  createFormForWork() {
    this.form = new FormGroup({
      config: new FormControl(null, [Validators.required]),
    });
    this.patchValuesForWork(this.data['worklog']);
    this.ref.markForCheck();
  }

  submit() {
    if (!this.form.dirty) {
      return;
    }
    const template = this.form.get('descriptionEn').value;
    if (this.smsTemplateID) {
      this.notificationService.editSmsNotification(this.smsTemplateID, template).then((res) => {
        if (res) {
          this.alert.openSuccessSnackBarWithMsg(
            this.translation.translateAWord("COMMON.SUCCESSFULLY_UPDATED")
          );
          this.MatDialogRef.close();
        }
      }).catch((err) => {
        this.alert.openSuccessSnackBarWithMsg(
          this.translation.translateAWord("COMMON.ERROR_HAS_HAPPEND")
        );
      });
    } else if (this.pushTemplateID) {
      const data = this.prepareToSendForPush()
      this.notificationService.editPushNotification(data).then((res) => {
        if (res) {
          this.alert.openSuccessSnackBarWithMsg(
            this.translation.translateAWord("COMMON.SUCCESSFULLY_UPDATED")
          );
          this.MatDialogRef.close();
        }
      }).catch((err) => {
        this.alert.openSuccessSnackBarWithMsg(
          this.translation.translateAWord("COMMON.ERROR_HAS_HAPPEND")
        );
      });
    } else {
      const data = this.prepareToSendForWorklog()
      this.notificationService.editWorklog(data).then((res) => {
        if (res) {
          this.alert.openSuccessSnackBarWithMsg(
            this.translation.translateAWord("COMMON.SUCCESSFULLY_UPDATED")
          );
          this.MatDialogRef.close();
        }
      }).catch((err) => {
        this.alert.openSuccessSnackBarWithMsg(
          this.translation.translateAWord("COMMON.ERROR_HAS_HAPPEND")
        );
      });
    }
  }

  getRecord(value) {
    this.clipboard.copy(value);
    console.log(value);
  }

  prepareToSendForPush() {
    const dataToSend: PushNotification = new PushNotification(this.form.value);
    dataToSend.id = this.pushTemplateID ? this.pushTemplateID : 0;
    dataToSend.enBody = this.form.get('descriptionEn').value;
    dataToSend.titleEn = this.form.get('titleEn').value;
    dataToSend.body = this.form.get('descriptionAr').value;
    dataToSend.titleAr = this.form.get('titleAr').value;
    return dataToSend;
  }

  prepareToSendForWorklog() {
    const dataToSend: WorklongTemplate = new WorklongTemplate(this.form.value);
    dataToSend.id = this.worklogTemplateID ? this.worklogTemplateID : 0;
    dataToSend.config = this.form.get('config').value;
    dataToSend.nameEn = this.form.get('titleEn').value;
    dataToSend.nameAr = this.form.get('titleAr').value;
    dataToSend.descriptionEn = this.form.get('descriptionEn').value;
    dataToSend.descriptionAr = this.form.get('descriptionAr').value;
    dataToSend.code = this.data['worklog'].code;
    return dataToSend;
  }
}
