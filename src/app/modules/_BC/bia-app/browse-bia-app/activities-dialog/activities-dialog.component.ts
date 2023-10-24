import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ILangFacade} from '@core/facades/lang.facade';
import {combineLatest, Observable, Subject} from 'rxjs';
import {BcActivities, BcActivityAnalysisDto, BcCycles} from 'src/app/api/models';
import {Select, Store} from '@ngxs/store';
import {ImpactAnalysisState} from '@core/states/impact-analysis/impact-analysis.state';
import {auditTime, map, takeUntil, tap} from 'rxjs/operators';
import {OrgActivityAction, OrgActivityState} from '@core/states';
import {Dialog} from "primeng/dialog";
import {TranslateObjPipe} from "@shared/sh-pipes/translate-obj.pipe";
import {BrowseBiaAppAction} from "../../states/browse-bia-app.action";

interface tableRow {
  activity: BcActivities;
  selected: boolean;
}
@Component({
  selector: 'app-bia-activities-dialog',
  templateUrl: './activities-dialog.component.html',
  styleUrls: ['./activities-dialog.component.scss'],
})
export class ActivitiesDialogComponent implements OnInit, OnDestroy {
  page$: Observable<any[]>;
  @ViewChild(Dialog) dialog: Dialog;

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  public opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  @Select(ImpactAnalysisState.blocking)
  public blocking$: Observable<boolean>;

  @Select(OrgActivityState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(OrgActivityState.loading)
  public loading$: Observable<boolean>;

  public tableValue$: Observable<any[]>;

  public name = '';
  private auditLoadPage$ = new Subject<string>();
  _analysisId: number;
  _cycleID: number;
  get editMode() {
    return this._analysisId !== undefined && this._analysisId !== null;
  }
  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
  }

  public get asDialog() {
    return this.route.component !== ActivitiesDialogComponent;
  }
  public selectedCycle: BcCycles;
  public selectedActivities: any[] = [];

  private destroy$ = new Subject();
  @Input()
  set analysisId(v: number) {
    this._analysisId = v;
    // this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
  }
  constructor(
    private route: ActivatedRoute,
    private lang: ILangFacade,
    private store: Store,
    private cdr: ChangeDetectorRef,
    private translateObj: TranslateObjPipe,
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this._cycleID = params['_cycleId'];
        this.analysisId = params['_id'];
      });
  }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'new_activities'),
      tap(() => {
        this.selectedActivities = [];
        this.selectedCycle = null;
      })
    );
    this.loadPage('', true);
    this.page$ = combineLatest([
      this.store.select(OrgActivityState.idsList),
      this.store.select(OrgActivityState.page),
    ]).pipe(
      map(([ids, activities]) => {
        this.selectedActivities = [];
        let tableRows = activities.map((activity) => {
          let tableRow = {
            ...activity,
            selected: false,
          };
          if (ids && ids.includes(activity.id)) {
            tableRow.selected = true;
            // this.selectedActivities.push(tableRow);
          }
          return tableRow;
        });
        console.log(this.selectedActivities);
        return tableRows;
      })
    );

    this.auditLoadPage$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((search: string) => {
        this.store.dispatch(
          new OrgActivityAction.LoadPage({
            page: 0,
            size: 100,
            filters: { name: search },
          })
        );
      });
  }
  submit() {
    if (!this.selectedActivities || !this.selectedCycle) {
      return;
    }
    let activities: BcActivityAnalysisDto[];
    activities = this.selectedActivities
      .filter((activity) => !activity.selected)
      .map((activity) => {
        return {
          activityId: activity.id,
          cycleId: this.selectedCycle?.id,
        };
      });

    this.store.dispatch(
      new BrowseBiaAppAction.SetCycleActivities(activities)
    );
  }
  loadPage(search?: string, direct = false) {
    if (direct) {
      this.store.dispatch(
        new OrgActivityAction.LoadPage({
          page: 0,
          size: 100,
          filters: { name: this.name },
        })
      );
      return;
    }
    this.auditLoadPage$.next(search);
  }
  toggleDialog() {
    this.store.dispatch(
      new BrowseBiaAppAction.ToggleDialog({ dialog: 'new_activities' })
    );
  }
  close() {
    this.store.dispatch(new BrowseBiaAppAction.ToggleDialog({}));
  }

  changeSelect(event) {
  }
  selectCycle(event) {
    this.selectedCycle = event?.value;
    this.store.dispatch(
      new OrgActivityAction.loadIdsList({ cycleId: this.selectedCycle.id })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
