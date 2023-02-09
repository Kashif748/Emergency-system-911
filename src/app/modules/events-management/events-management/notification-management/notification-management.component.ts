import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NotificationManagementService} from "./notification-management.service";
import {map, takeUntil} from "rxjs/operators";
import {TranslationService} from "../../../i18n/translation.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Reminder} from "../../../incidents/view-incidents/incident-reminder/model/Incident-Reminder";
import {ReminderFormComponent} from "../../../incidents/view-incidents/incident-reminder/reminder-form/reminder-form.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationFormComponent} from "./notification-form/notification-form.component";
import {Observable, Subject} from "rxjs";
import {AdvancedSearchFieldsEnum} from "@shared/components/advanced-search/advancedSearch.model";
import {INCIDENTS_TABS} from "../../../incidents/incidents.model";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-notification-management',
  templateUrl: './notification-management.component.html',
  styleUrls: ['./notification-management.component.scss']
})
export class NotificationManagementComponent implements OnInit {
  displayedColumnsForSms: string[] = [
    "searlNo",
   // "lable",
    /*"createdOn",*/
    "eventName",
    "template",
    "actions"
  ];
  displayedColumnsForPush: string[] = [
    "searlNo",
    "eventName",
    "titleEn",
    "titleAr",
    "bodyEn",
    "bodyAr",
    "actions"
  ];

  displayedColumnsForWorklog: string[] = [
    "searlNo",
    "eventName",
    "eventNameAr",
    "config",
    "actions"
  ];
  public modules: any[] = [];
  public smsNotification: any[] = [];
  lang: string;
  notifications: any[] = [];
  dataSource = new MatTableDataSource<any>();
  loading: boolean = true;
  totalElement$: Observable<number>;
  pushNotificationTotalElement$: Observable<number>;
  worklongTemplateTotalElement$: Observable<number>;
  destroy$: Subject<boolean> = new Subject();
  pushDestroy$: Subject<boolean> = new Subject();
  worklongTemplateDestroy$: Subject<boolean> = new Subject();
  selectedTab = 0;

  constructor(private notificationService: NotificationManagementService,
              private translationService: TranslationService,
              private fb: FormBuilder,
              public matDialog: MatDialog,
              private cdr: ChangeDetectorRef) {
    this.lang = this.translationService.getSelectedLanguage();
    }
  notificationForm: FormGroup = this.fb.group({
    moduleId: [[]],
    notificationType: [[]]
  });

  async ngOnInit(): Promise<void> {
    await this.getModules();
    this.notifications = [{
      id: 1,
      nameAr: "لوحة القيادة",
      nameEn: "SMS Notification"
    }, {
      id: 2,
      nameAr: "لوحة القيادة",
      nameEn: "Push Notification"
    }, {
      id: 3,
      nameAr: "لوحة القيادة",
      nameEn: "Worklog templates" }];
    console.log(this.notifications);
    this.onTabChange('first');
  }

  typeChange(event) {
    if (this.selectedTab === 0) {
      this.getSmsNotification();
    } else if (this.selectedTab === 1) {
      this.getPushNotification();
    } else if (this.selectedTab === 2){
      this.getWorklogTemplates();
    }
  }

/*  onSubmit() {
    const type = this.notificationForm.get('notificationType').value
    if (type.id === 1) {
      this.getSmsNotification();
    } else if (type.id === 2) {
      this.getPushNotification();
    } else {
      this.getWorklogTemplates();
    }
  }*/

  onTabChange(first?, event?: MatTabChangeEvent) {
    this.loading = true;
    if (first) {
      this.selectedTab = 0;
    } else {
      this.selectedTab = event.index;
    }
    switch (this.selectedTab) {
      case 0:
        this.getSmsNotification();
        break;
      case 1: {
        this.getPushNotification();
        break;
      }
      case 2:
        this.getWorklogTemplates();
        break;
    }
  }

  async getModules() {
    try {
      this.modules = await this.notificationService.getModules().pipe(map((r) => r.result)).toPromise();
    } catch (error) {}
    console.log(this.modules);
  }
  getSmsNotification() {
    this.loading = true;
    const id = this.notificationForm.get('moduleId').value;
    this.totalElement$ = this.notificationService.totalElementChanged$;
    this.notificationService.notificationChanged$.pipe(takeUntil(this.destroy$)).subscribe(
      (data) => {
        if (data) {
          this.dataSource.data = [...data];
          this.loading = false;
          this.cdr.detectChanges();
        }
      },
      (err) => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    );
    this.notificationService.getSmsTemplate(id);
  }

  getPushNotification() {
    this.loading = true;
    const id = this.notificationForm.get('moduleId').value;
    this.pushNotificationTotalElement$ = this.notificationService.pushNotificationTotalElementChanged$;
    this.notificationService.pushNotificationChanged$.pipe(takeUntil(this.pushDestroy$)).subscribe(
      (data) => {
        if (data) {
          this.dataSource.data = [...data];
          this.loading = false;
          this.cdr.detectChanges();
        }
      },
      (err) => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    );
    this.notificationService.getPushTemplate(id);
  }

  getWorklogTemplates() {
    this.loading = true;
    const id = this.notificationForm.get('moduleId').value;
    this.worklongTemplateTotalElement$ = this.notificationService.worklongTemplatesTotalElementChanged$;
    this.notificationService.worklongTemplateChanged$.pipe(takeUntil(this.worklongTemplateDestroy$)).subscribe(
      (data) => {
        if (data) {
          this.dataSource.data = [...data];
          this.loading = false;
          this.cdr.detectChanges();
        }
      },
      (err) => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    );
    this.notificationService.getWorklogTemplate(id);
  }

  edit(data: any) {
    const id = this.notificationForm.get('moduleId').value;
    if (data.template) {
      this.matDialog.open(NotificationFormComponent, {
        data: {notifications: data, module: id},
        maxWidth: '50vw',
        panelClass: 'modal',
        disableClose: true,
      });
    } else if (data.body) {
      this.matDialog.open(NotificationFormComponent, {
        data: {push: data, module: id},
        maxWidth: '50vw',
        panelClass: 'modal',
        disableClose: true,
      });
    } else {
      this.matDialog.open(NotificationFormComponent, {
        data: {worklog: data, module: id},
        maxWidth: '50vw',
        panelClass: 'modal',
        disableClose: true,
      });
    }
  }

  onPagination(event: { pageSize: number; pageIndex: number }) {
    const id = this.notificationForm.get('moduleId').value;
    if (this.selectedTab === 0) {
      this.notificationService.getSmsTemplate(id, event.pageIndex, event.pageSize);
    } else if (this.selectedTab === 1) {
      this.notificationService.getPushTemplate(id, event.pageIndex, event.pageSize);
    } else if (this.selectedTab === 2) {
      this.notificationService.getWorklogTemplate(id, event.pageIndex, event.pageSize);
    }
  }
}
