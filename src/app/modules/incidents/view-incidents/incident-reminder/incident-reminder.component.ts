import {ChangeDetectorRef, Component, Input, NgModule, OnDestroy, OnInit} from '@angular/core';
import {map, takeUntil} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Reminder} from "../incident-reminder/model/Incident-Reminder";
import {TranslationService} from "../../../i18n/translation.service";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import {IncidentReminderService} from "./incident-reminder.service";
import {ILangFacade} from "@core/facades/lang.facade";
import {ReminderFormComponent} from "./reminder-form/reminder-form.component";
import {ConfirmDialogComponent} from '../../../confirm-dialog/confirm-dialog.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {InlineSVGModule} from "ng-inline-svg";
import {TranslationModule} from "../../../i18n/translation.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NodataTableModule} from "@shared/components/nodata-table/nodata-table.module";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ChallengesComponent} from "../../challenges/challenges.component";
import {MatSortModule} from "@angular/material/sort";
import {SharedModule} from "@shared/shared.module";

@Component({
  selector: 'app-incident-reminder',
  templateUrl: './incident-reminder.component.html',
  styleUrls: ['./incident-reminder.component.scss']
})
export class IncidentReminderComponent implements OnInit, OnDestroy {

  // UI
  @Input() incidentId: number;

  // Variables
  currentOrg: any;
  lang = 'en';
  displayedColumns: string[] = [
    'id',
    'description',
    'createdOn',
    'createdBy',
    'reminderDate',
    'actions',
  ];

  dataSource: MatTableDataSource<Reminder> = new MatTableDataSource([]);
  totalElement$: Observable<number>;
  destroy$: Subject<boolean> = new Subject();
  loading = true;
  public dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));

  constructor(
    public matDialog: MatDialog,
    private incidentReminderService: IncidentReminderService,
    private translationService: TranslationService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private langFacade: ILangFacade) {
    const commonData = JSON.parse(localStorage.getItem('commonData'));
    this.currentOrg = commonData['currentOrgDetails'];
  }

  ngOnInit(): void {
    this.incidentId = this.activatedRoute.snapshot.params['id'];
    this.incidentReminderService.setIncidentId(this.incidentId);

    this.lang = this.translationService.getSelectedLanguage();
    this.totalElement$ = this.incidentReminderService.totalElementChanged$;
    this.incidentReminderService.remindersChanged$.pipe(takeUntil(this.destroy$)).subscribe(
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
    this.incidentReminderService.getContent();
  }

  onPagination(event: { pageSize: number; pageIndex: number }) {
    this.incidentReminderService.getContent(event.pageIndex, event.pageSize);
  }
  sortData(event) {
    this.loading = true;
    this.incidentReminderService.getContent(0, 10, event);
  }

  add() {
    this.matDialog.open(ReminderFormComponent, {
      data: {incID: this.incidentId},
      panelClass: 'modal',
    });
  }

  edit(reminder: Reminder) {
    this.matDialog.open(ReminderFormComponent, {
      data: {incID: this.incidentId, reminder},
      maxWidth: '50vw',
      panelClass: 'modal',
      disableClose: true,
    });
  }

  delete(id: number) {
    const data = this.prepareToSend(id);
    this.matDialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.incidentReminderService.deleteRemi(data);
        }
      });
  }

  prepareToSend(id) {
    const dataToSend: Reminder = new Reminder(null, null, false);
    dataToSend.id = id ? id : 0;
    return dataToSend;
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
@NgModule({
  declarations: [IncidentReminderComponent],
  imports: [
    MatToolbarModule,
    TranslationModule,
    MatTableModule,
    InlineSVGModule,
    MatPaginatorModule,
    NodataTableModule,
    MatTooltipModule,
    MatProgressBarModule,
    PerfectScrollbarModule,
    MatSortModule,
    SharedModule
  ],
})
export class IncidentReminderModule {
}
