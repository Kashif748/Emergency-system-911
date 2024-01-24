import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {filter, map, switchMap, take, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {BrowseResourceAnalysisAction} from "../../../states/browse-resource-analysis.action";
import {Select, Store} from "@ngxs/store";
import {StaffAction} from "@core/states/bc-resources/staff/staff.action";
import {BcResourcesStaffReq} from "../../../../../../api/models/bc-resources-staff-req";
import {StaffState} from "@core/states/bc-resources/staff/staff.state";
import {BcResourcesRemoteWork} from "../../../../../../api/models/bc-resources-remote-work";
import {RemoteWorkState} from "@core/states/bc-resources/remote-work/remote-work.state";
import {RemoteWorkAction} from "@core/states";
import {BcResourcesRecords} from "../../../../../../api/models/bc-resources-records";
import {RecordsState} from "@core/states/bc-resources/records/records.state";
import {RecordsAction} from "@core/states/bc-resources/records/records.action";
import {AppSystemAction} from "@core/states/bc-resources/app-system/app-system.action";
import {AppSystemState} from "@core/states/bc-resources/app-system/app-system.state";
import {BcResourcesAppAndSoftware} from "../../../../../../api/models/bc-resources-app-and-software";
import {InfraAction} from "@core/states/bc-resources/infra-req/infra.action";
import {OtherAction} from "@core/states/bc-resources/other/other.action";
import {OtherState} from "@core/states/bc-resources/other/other.state";
import {InfraState} from "@core/states/bc-resources/infra-req/infra.state";
import {BcResourcesItInfrastructure} from "../../../../../../api/models/bc-resources-it-infrastructure";
import {BcResourcesNonItInfrastructure} from "../../../../../../api/models/bc-resources-non-it-infrastructure";
import {ResourceAnalysisAction} from "@core/states/impact-analysis/resource-analysis.action";
import {BcResources} from "../../../../../../api/models/bc-resources";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BcActivityAnalysisWorkLog, BcActivityAnalysisWorkLogProjection, BcWorkLogTypes} from "../../../../../../api/models";
import {FormControl, Validators} from "@angular/forms";
import {ResourceWorklogsState} from "@core/states/bc-resources/worklogs/resourceWorklogs.state";
import {ResourceWorklogsAction} from "@core/states/bc-resources/worklogs/resourceWorklogs.action";
import {ILangFacade} from "@core/facades/lang.facade";
import {PerfectScrollbarComponent} from "ngx-perfect-scrollbar";

@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.component.html',
  styleUrls: ['./view-resource.component.scss']
})
export class ViewResourceComponent implements OnInit, OnDestroy {
  @ViewChild(PerfectScrollbarComponent)
  public directiveScroll: PerfectScrollbarComponent;

  // resource
  public resource$: Observable<BcResources>;
  // staff
  public staffPage$: Observable<BcResourcesStaffReq[]>;
  @Select(StaffState.loading)
  public staffLoading$: Observable<boolean>;
  // remote Work
  public remoteWorkPage$: Observable<BcResourcesRemoteWork[]>;
  @Select(RemoteWorkState.loading)
  public remoteWorkLoading$: Observable<boolean>;
  // record
  public recordPage$: Observable<BcResourcesRecords[]>;
  @Select(RecordsState.loading)
  public recordLoading$: Observable<boolean>;
  // Application & system
  public appSysPage$: Observable<BcResourcesAppAndSoftware[]>;
  @Select(RecordsState.loading)
  public appSysLoading$: Observable<boolean>;
  // IT Infr
  public itInfraPage$: Observable<BcResourcesItInfrastructure[]>;
  @Select(RecordsState.loading)
  public itInfraLoading$: Observable<boolean>;
  // Other Req
  public otherPage$: Observable<BcResourcesNonItInfrastructure[]>;
  @Select(RecordsState.loading)
  public otherLoading$: Observable<boolean>;

  // Worklogs Sidebar
  @Select(ResourceWorklogsState.activityWorklogTypes)
  public resourceWorklogTypes$: Observable<BcWorkLogTypes[]>;
  @Select(ResourceWorklogsState.loading)
  public worklogLoading$: Observable<boolean>;
  public worklogPage$: Observable<BcActivityAnalysisWorkLogProjection[]>;
  public selectedWorklogType: BcWorkLogTypes;
  public displayWorklogSide = false;
  note = new FormControl('', Validators.required);

  _resourceId: number;
  public opened$: Observable<boolean>;
  private destroy$ = new Subject();

  public dir$ = this.lang.vm$.pipe(
      map(({ ActiveLang: { key } }) => (key === 'ar' ? 'rtl' : 'ltr'))
  );
  get editMode() {
    return this._resourceId !== undefined && this._resourceId !== null;
  }
  get viewOnly() {
    return this.route.snapshot.queryParams['_mode'] === 'viewonly';
  }
  @Input()
  set resourceId(v: number) {
    this._resourceId = v;
    if (v === undefined || v === null) {
      return;
    }
    this.store.dispatch([
      new ResourceAnalysisAction.GetResourceAnalysis({id: v}),
      new StaffAction.LoadPage({page: 0, size: 10, resourceId: v}),
      new RemoteWorkAction.LoadPage({page: 0, size: 10, resourceId: v}),
      new RecordsAction.LoadPage({page: 0, size: 10, resourceId: v}),
      new AppSystemAction.LoadPage({page: 0, size: 10, resourceId: v}),
      new InfraAction.LoadPage({page: 0, size: 10, resourceId: v}),
      new OtherAction.LoadPage({page: 0, size: 10, resourceId: v}),
      new ResourceWorklogsAction.LoadWorklogsTypes(),
    ]);
    this.resource$ = this.store.select(ResourceAnalysisState.resourceAnalysis).pipe(filter((p) => !!p));
    this.staffPage$ = this.store.select(StaffState.page).pipe(filter((p) => !!p));
    this.remoteWorkPage$ = this.store.select(RemoteWorkState.page).pipe(filter((p) => !!p));
    this.recordPage$ = this.store.select(RecordsState.page).pipe(filter((p) => !!p));
    this.appSysPage$ = this.store.select(AppSystemState.page).pipe(filter((p) => !!p));
    this.itInfraPage$ = this.store.select(InfraState.page).pipe(filter((p) => !!p));
    this.otherPage$ = this.store.select(OtherState.page).pipe(filter((p) => !!p));
    this.worklogPage$ = this.store.select(ResourceWorklogsState.page).pipe(filter((p) => !!p), tap(() =>
            setTimeout(() => {
              this.scrollBottom();
              }, 400)
        )
    );
  }
  constructor(
      private route: ActivatedRoute,
      private store: Store,
      private cdr: ChangeDetectorRef,
      private lang: ILangFacade,
  ) { }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
        map((params) => {
          const opened = params['_dialog'] == 'resources';
          if (opened) {
            this.resourceId = params['_id'];
          }
          return opened;
        })
    );
  }
  loadPage(actionType: any, stateSelector: any, v) {
    return this.store.dispatch(new actionType.LoadPage({
      page: 0,
      size: 10,
      resourceId: v
    })).pipe(
        switchMap(() => this.store.select(stateSelector.page)),
        filter((p) => !!p)
    );
  }

    close() {
    this.store.dispatch(new BrowseResourceAnalysisAction.ToggleDialog({}));
  }
  // Worklogs
  openWorklogSide() {
    if (this.displayWorklogSide) return;
    this.displayWorklogSide = true;

    this.resourceWorklogTypes$
        .pipe(
            take(1),
            map((worklogTypes) =>
                worklogTypes.find((worklogType) => worklogType?.modifiable)
            ),
            filter((worklogType) => !!worklogType),
            tap((worklogType) => {
              this.selectedWorklogType = worklogType;
              this.store.dispatch([
                new ResourceWorklogsAction.LoadPage({
                  resourceId: this._resourceId,
                  page: 0,
                  size: 100,
                  resetPage: true,
                  actionTypeId: worklogType?.id,
                }),
              ]);
            })
        )
        .subscribe();
  }
  filterWorklogs(event) {
    if (this.selectedWorklogType?.id == event.id) {
      this.selectedWorklogType = null;
    } else {
      this.selectedWorklogType = event;
    }
    const resourceAnalysis = this.store.selectSnapshot(
        ResourceAnalysisState.resourceAnalysis
    );
    this.store.dispatch(
        new ResourceWorklogsAction.LoadPage({
          page: 0,
          size: 100,
          actionTypeId: this.selectedWorklogType?.id,
          resourceId: resourceAnalysis?.id,
          resetPage: true,
        })
    );
  }
  async keydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submitWorklog();
    }
  }
  async submitWorklog() {
    if (this.note.invalid) {
      return;
    }
    const resourceAnalysis = this.store.selectSnapshot(
        ResourceAnalysisState.resourceAnalysis
    );
    const worklog: BcActivityAnalysisWorkLog = {
      notes: this.note.value,
      resource: {id: resourceAnalysis.id}
    };
    this.store.dispatch([new ResourceWorklogsAction.Create(worklog)])
        .pipe(
            switchMap(() =>
                this.store.select(ResourceWorklogsState.Worklog)
            ),
            filter((p) => !!p),
            tap(async (data) => {
              this.note.reset();
            })
        )
        .subscribe();
  }
  scrollBottom() {
    if (!this.directiveScroll) return;
    this.directiveScroll.directiveRef.scrollToBottom(0, 100);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
