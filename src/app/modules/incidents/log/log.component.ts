import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { DmsService } from '@core/api/services/dms.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { CommonService } from 'src/app/_metronic/core/services/common.service';
import { IncidentsService } from 'src/app/_metronic/core/services/incidents.service';
import { animations } from 'src/app/shared/animations/animation';
import { LogFileBottomSheetComponent } from '../log-file-bottom-sheet/log-file-bottom-sheet.component';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { TranslationService } from '../../i18n/translation.service';
import * as _ from 'lodash';
import { UploadTagIdConst } from '@core/constant/UploadTagIdConst';
import { AttachmentsService } from '../../../_metronic/core/services/attachments.service';
import { DataOptions } from '@shared/components/advanced-search/advanced-search.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { onMessage } from 'firebase/messaging';
import { NotifService } from '@core/api/services/notif.service';
import { NotificationsEvents } from '@core/constant/NotificationsEvents';

export interface Log {
  id?: number;
  notes: string;
  createdBy?: any;
  createdOn?: any;
  hasAttachments?: boolean;
  show?: boolean;
  priority: { id: number };
  modifiable: boolean;
}

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  animations,
})
export class LogComponent implements OnInit, OnDestroy {
  // UI
  @Input() type: 'task' | 'incident';
  @Input() id: number;
  @Input() height = '450px';
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('orgInput') orgInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(PerfectScrollbarComponent)
  public directiveScroll: PerfectScrollbarComponent;

  // Variables
  priorityStyle: string;
  lang = 'en';
  notes = '';
  commonData: any;
  loading = true;
  private subscription: Subscription[] = [];
  mode: 'edit' | 'new' = 'new';
  selectedLog: any = null;
  private cachedLogs = Array.from<Log>({ length: 0 });
  public dataStream = new BehaviorSubject<(Log | undefined)[]>(this.cachedLogs);
  private pageSize = 20;
  public lastPage = 1000;
  public pageIndex = 0;
  private gettingNextAllowed = true;
  currentUserId;
  currentUserPhoto;
  totalElements = 0;
  data$: Observable<any>;
  private newLogs: any[] = [];
  newLogs$ = new BehaviorSubject<any[]>([]);
  public incident;
  public currentOrg;
  public files: File[] = [];
  uploading = false;
  public priority = 1;
  priorities$: Observable<any[]>;

  // orgs
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  orgCtrl = new FormControl(Validators.required);
  filteredOrgs: Observable<any[]>;
  orgs: any[] = [];
  allOrgs: any[] = [];
  priorities: DataOptions = { children: [], formControlName: '' };

  constructor(
    private incidentsService: IncidentsService,
    private translationService: TranslationService,
    private alertService: AlertsService,
    private commonService: CommonService,
    private dmsService: DmsService,
    private bottomSheet: MatBottomSheet,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private attachmentsService: AttachmentsService,
    private notifService: NotifService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
    this.commonData = JSON.parse(localStorage.getItem('commonData'));
  }

  ngOnInit() {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    const currentUser = commonData['currentUserDetails'];
    this.currentOrg = this.commonData?.currentOrgDetails;
    this.currentUserId = currentUser?.id;
    this.currentUserPhoto = currentUser?.photo;
    this.priorities$ = this.incidentsService.getPriorities().pipe(
      map((r) => {
        this.priorities.children = r.result.content;
        return r.result.content;
      })
    );
    this.allOrgs = this.incident?.incidentOrgs ?? [];
    this.filteredOrgs = this.orgCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: any | null) => (fruit ? this._filter(fruit) : this.allOrgs))
    );
    this.getNexLogs();
    this.notifService.onNewMessage$
      .pipe(
        filter((message) => !!message),
        debounceTime(1000),
        tap((message) => {
          const eventType = message.data?.event;
          const incidentId = message.data?.id;
          if (
            (eventType === NotificationsEvents.C_TASK_WL ||
              eventType === NotificationsEvents.C_INC_WL) &&
            incidentId === this.id?.toString()
          ) {
            this.pageIndex--;
            this.getNexLogs();
          }
        })
      )
      .subscribe();
  }

  @HostListener('document:visibilitychange', ['$event'])
  visibilityChange($event: Event) {
    if (document.visibilityState === 'visible') {
      this.pageIndex--;
      this.getNexLogs();
    }
  }

  scrollBottom() {
    if (!this.directiveScroll) return;
    this.directiveScroll.directiveRef.scrollToBottom(0, 100);
  }
  openBottomSheet(logId): void {
    this.bottomSheet.open(LogFileBottomSheetComponent, {
      data: { id: logId, type: this.type },
    });
  }

  getNexLogs() {
    if (this.pageIndex <= this.lastPage && this.gettingNextAllowed) {
      this._fetchLogPage();
      this.pageIndex++;
    }
  }

  private _fetchLogPage(): void {
    this.loading = true;
    if (this.pageIndex === 0) {
      this.gettingNextAllowed = false;
    }

    if (this.type === 'task') {
      this.incidentsService
        .getTaskWorkLogsDs(this.id, '', 'asc', this.pageIndex, this.pageSize)
        .subscribe(
          (res) => {
            this.loading = false;
            this.cachedLogs = [...this.cachedLogs, ...res?.result?.content];
            this.lastPage =
              Math.ceil(res?.result?.totalElements / this.pageSize) - 1;
            this.dataStream.next(this.cachedLogs);
            if (this.pageIndex === 1) {
              this.newLogs = [];
              this.newLogs$.next(this.newLogs);
            }
            this.gettingNextAllowed = true;
            setTimeout((_) => {
              this.changeDetectorRef.detectChanges();
              this.scrollBottom();
            }, 400);
          },
          (err) => (this.loading = false)
        );
    } else {
      this.incidentsService
        .getWorkLogsDs(this.id, '', 'asc', this.pageIndex, this.pageSize)
        .subscribe(
          (res) => {
            this.loading = false;

            this.cachedLogs = [...this.cachedLogs, ...res?.result?.content];

            this.lastPage =
              Math.ceil(res?.result?.totalElements / this.pageSize) - 1;
            this.dataStream.next(this.cachedLogs);
            if (this.pageIndex === 1) {
              this.newLogs = [];
              this.newLogs$.next(this.newLogs);
            }
            this.gettingNextAllowed = true;

            setTimeout((_) => {
              this.changeDetectorRef.detectChanges();
              this.scrollBottom();
            }, 400);
          },
          (err) => (this.loading = false)
        );
    }
  }

  initLogPages() {
    this.newLogs = [];
    this.newLogs$.next(this.newLogs);
    this.cachedLogs = [];
    this.dataStream.next(this.cachedLogs);
    this.pageIndex = 0;
    this.lastPage = 1000;
  }

  loadMore() {
    this.getNexLogs();
  }

  loadData(
    itemId: number,
    filter: string = '',
    sortDirection: string = 'asc',
    pageIndex: number,
    pageSize: number = 0
  ) {
    if (this.type === 'incident') {
      this.data$ = this.incidentsService
        .getWorkLogsDs(itemId, filter, sortDirection, pageIndex, pageSize)
        .pipe(
          tap((data) => {
            this.totalElements = data.result.totalElements;
            return data?.result?.content;
          }),
          map((data) => {
            const content = data?.result?.content || [];
            return content.filter((msg) => msg.isActive === true);
          })
        );
    } else {
      this.data$ = this.incidentsService
        .getTaskWorkLogsDs(itemId, filter, sortDirection, pageIndex, pageSize)
        .pipe(
          tap((data) => {
            this.totalElements = data.result.totalElements;
          }),
          map((data) => {
            const content = data?.result?.content || [];
            return content.filter((msg) => msg.isActive === true);
          })
        );
    }
  }

  async addWorkLog() {
    this.currentOrg = this.commonData.currentOrgDetails;
    if (this.uploading) {
      return;
    }
    if (!this.notes || this.notes.length === 0) {
      this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get('WORK_LOG_LIST.FILL_YOUR_NOTES')
      );
      return;
    }

    if (this.type === 'task') {
      this.addTaskWorkLog();
      return;
    }

    const body = {
      createdBy: {
        id: this.getUserId(),
      },
      createdOn: new Date().toISOString(),
      id: 0,
      notes: this.notes,
      priority: { id: this.priority },
      privateIncidentWorkLogList: this.orgs as any[],
      isPublic: this.orgs?.length === 0,
      isActive: true,
    } as any;

    this.incidentsService.addWorkLog(this.id, body).subscribe(
      async (data) => {
        if (data) {
          this.commonService.announceDataUpdates('success');
          this.alertService.openSuccessSnackBar();
          const workLogNote = this.notes;
          this.notes = '';
          this.resetWorkLog();
          this.changeDetectorRef.detectChanges();
          await this.uploadFiles(data.result.id, workLogNote);
          const oldLogsCount = this.cachedLogs.length;
          this.initLogPages();
          this.pageSize = oldLogsCount + 1;
          this.getNexLogs();
        }
      },
      (error) => {
        this.alertService.openFailureSnackBar();
      }
    );
  }

  addTaskWorkLog() {
    if (this.uploading) {
      return;
    }
    if (!this.notes || this.notes.length === 0) {
      this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get('WORK_LOG_LIST.FILL_YOUR_NOTES')
      );
      return;
    }
    const body = {
      createdBy: { id: this.getUserId() },
      createdOn: new Date().toISOString(),
      id: 0,
      notes: this.notes,
      taskId: { id: this.id },
    };

    this.incidentsService.addTaskWorkLog(this.id, body).subscribe(
      async (data) => {
        if (data) {
          this.commonService.announceTaskWorklogUpdates('success');
          this.alertService.openSuccessSnackBar();
          this.resetWorkLog();
          this.changeDetectorRef.detectChanges();
          await this.uploadFiles(data.result.id, body.notes);
          const oldLogsCount = this.cachedLogs.length;
          this.initLogPages();
          this.pageSize = oldLogsCount + 1;
          this.getNexLogs();
        }
      },
      () => {
        this.alertService.openFailureSnackBar();
      }
    );
  }

  setEditMode(log) {
    this.resetWorkLog();
    this.notes = log?.notes;
    this.orgs = log.privateIncidentWorkLogList || [];
    this.priority = log?.priority ? log?.priority.id : '';
    this.selectedLog = log;
    this.mode = 'edit';
  }

  updateWorkLog() {
    this.selectedLog = {
      ...this.selectedLog,
      createdOn: new Date().toISOString(),
      notes: this.notes,
      priority: { id: this.priority },
      privateIncidentWorkLogList: this.orgs as any[],
      isActive: true,
      updated: true,
    };

    if (!this.selectedLog.notes) {
      this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get('WORK_LOG_LIST.FILL_YOUR_NOTES')
      );
      return;
    }

    this.incidentsService
      .updateWorkLog(this.id, this.selectedLog, this.type)
      .subscribe(
        async (data) => {
          if (data) {
            this.commonService.announceDataUpdates('success');
            this.alertService.openSuccessSnackBar();
            this.resetWorkLog();
            this.changeDetectorRef.detectChanges();
            await this.uploadFiles(data.result.id, this.notes);
            this.initLogPages();
            this.getNexLogs();
          }
        },
        () => {
          this.alertService.openFailureSnackBar();
        }
      );
  }

  deleteWorkLog(log) {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.incidentsService
            .deleteWorkLog(this.id, log, this.type)
            .subscribe(
              async (data) => {
                if (data) {
                  log.isActive = false;
                  this.cachedLogs = this.cachedLogs.filter(
                    (l) => l.id !== log.id
                  );
                  this.dataStream.next(this.cachedLogs);
                  this.requestResultActions();
                  if (log.hasAttachments) {
                    this.deleteWorkLogAttachment(log);
                  }
                }
              },
              () => {
                this.alertService.openFailureSnackBar();
              }
            );
        }
      });
  }

  requestResultActions() {
    this.commonService.announceDataUpdates('success');
    this.alertService.openSuccessSnackBar();
    this.resetWorkLog();
    this.changeDetectorRef.detectChanges();
    this.initLogPages();
    this.getNexLogs();
  }

  resetWorkLog() {
    this.selectedLog = null;
    this.mode = 'new';
    this.notes = '';
    this.orgs = [];
    this.priority = 1;
  }

  getUserId() {
    return this.commonData.currentUserDetails.id;
  }

  filesChanged(files: FileList) {
    this.files = Array.from(files);
  }

  async keydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.mode === 'edit') {
        this.updateWorkLog();
        return;
      }
      if (this.type === 'task') {
        this.addTaskWorkLog();
      }
      if (this.type === 'incident') {
        await this.addWorkLog();
      }
    }
  }

  async uploadFiles(id: number, description: string) {
    this.uploading = true;
    try {
      if (this.files?.length > 0) {
        const tagId =
          this.type === 'task'
            ? UploadTagIdConst.TASK
            : UploadTagIdConst.WORK_LOG;
        await this.dmsService
          .uploadFiles(this.files, id, tagId, description)
          .toPromise();
        this.fileInput.nativeElement.value = '';
        this.files = [];
      }
      this.uploading = false;
      this.changeDetectorRef.detectChanges();
    } catch {
      this.alertService.openFailureSnackBar();
      this.uploading = false;
      this.changeDetectorRef.detectChanges();
    }
  }

  remove(org: any): void {
    const index = this.orgs.indexOf(org);
    if (index >= 0) {
      this.orgs.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.orgs.indexOf(event.option.value) < 0) {
      this.orgs.push(event.option.value);
    }
    this.orgInput.nativeElement.value = '';
    this.orgCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    if (typeof value !== 'string') {
      return this.allOrgs;
    }
    const filterValue = value?.toLowerCase();
    return this.allOrgs.filter(
      (org) =>
        org.nameEn?.toLowerCase()?.indexOf(filterValue) === 0 ||
        org.nameAr?.toLowerCase()?.indexOf(filterValue) === 0
    );
  }

  getPriorityNameById(id) {
    if (!_.isEmpty(this.priorities)) {
      const priority = _.find(this.priorities, ['id', id]) as any;
      if (priority) {
        this.priorityStyle = `text-dark font-weight-500 label label-lg label-${priority?.color} label-inline m-2 `;
        return this.lang === 'en' ? priority.nameEn : priority.nameAr;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  canShowOrgAndPriority() {
    return this.type === 'incident';
  }

  private deleteWorkLogAttachment(log) {
    (log.attachments as any[]).forEach((attachment) => {
      this.attachmentsService.deleteFile(attachment.uuid).subscribe();
    });
  }
}
