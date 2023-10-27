import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ILangFacade} from '@core/facades/lang.facade';
import {ActivityWorklogsState} from "@core/states/activity-analysis/worklogs/worklogs.state";
import {BrowseActivityWorklogsState, BrowseActivityWorklogsStateModel} from "../../activity-analysis/worklogs/states/browse-worklogs.state";
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {BcActivityAnalysisWorkLog, BcActivityAnalysisWorkLogProjection} from "../../../../api/models";
import {BcWorkLogTypes} from "../../../../api/models/bc-work-log-types";
import {FormControl, Validators} from "@angular/forms";
import {DmsService} from "@core/api/services/dms.service";
import {MessageHelper} from "@core/helpers/message.helper";
import {filter, map, switchMap, takeUntil, tap} from "rxjs/operators";
import {UploadTagIdConst} from "@core/constant/UploadTagIdConst";
import {ResourceWorklogsState} from "@core/states/bc-resources/worklogs/resourceWorklogs.state";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BrowseResourceWorklogsAction} from "./states/browse-resource-worklogs.action";
import {ActivityAnalysisState} from "@core/states/activity-analysis/activity-analysis.state";
import {BrowseActivityWorklogsAction} from "../../activity-analysis/worklogs/states/browse-worklogs.action";
import {PerfectScrollbarComponent} from "ngx-perfect-scrollbar";
import {BrowseResourceWorklogsState, BrowseResourceWorklogsStateModel} from "./states/browse-resource-worklogs.state";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;

  @ViewChild(PerfectScrollbarComponent)
  public directiveScroll: PerfectScrollbarComponent;

  public activityWorklog: BcActivityAnalysisWorkLog;

  @Select(ResourceWorklogsState.activityWorklogTypes)
  public activityWorklogTypes$: Observable<BcWorkLogTypes[]>;

  @Select(ResourceWorklogsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ResourceWorklogsState.loading)
  public loading$: Observable<boolean>;

  @Select(ResourceWorklogsState.blocking)
  public blocking$: Observable<boolean>;

  @Select(BrowseResourceWorklogsState.state)
  public state$: Observable<BrowseResourceWorklogsStateModel>;

  public selectedWorklogType: BcWorkLogTypes;
  public page$: Observable<BcActivityAnalysisWorkLogProjection[]>;

  public dir$ = this.lang.vm$.pipe(
    map(({ActiveLang: {key}}) => (key === 'ar' ? 'rtl' : 'ltr'))
  );

  private destroy$ = new Subject();
  public files: File[] = [];
  uploading = false;
  display: boolean = false;
  loadingImage = false
  note = new FormControl('', Validators.required);

  constructor(
    private store: Store,
    private lang: ILangFacade,
    private dmsService: DmsService,
    private messageHelper: MessageHelper
  ) {
  }

  ngOnInit(): void {
    this.store
      .select(ResourceAnalysisState.resourceAnalysis)
      .pipe(
        takeUntil(this.destroy$),
        tap((activity) => {
          this.store.dispatch([
            new BrowseResourceWorklogsAction.LoadResourceWorklogsTypes(),
            new BrowseResourceWorklogsAction.LoadResourceWorklogs({
              resourceId: activity.id,
              resetPage: true,
            }),
          ]);
        })
      )
      .subscribe();
    this.page$ = this.store.select(ResourceWorklogsState.page).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),

      tap(() =>
        setTimeout(() => {
          this.scrollBottom();
        }, 400)
      )
    );
  }

  setEditMode(log) {
    this.store.dispatch(new BrowseResourceWorklogsAction.ToggleEditMode(log));
  }

  deleteWorkLog(log) {
  }

  public loadPage() {
    const resource = this.store.selectSnapshot(
      ResourceAnalysisState.resourceAnalysis
    );
    const page = this.store.selectSnapshot(ActivityWorklogsState.page);
    const totalRecords = this.store.selectSnapshot(
      ActivityWorklogsState.totalRecords
    );
    this.store.dispatch(
      new BrowseResourceWorklogsAction.LoadResourceWorklogs({
        resourceId: resource.id,
        actionTypeId: this.selectedWorklogType?.id,
        pageRequest: {
          first: totalRecords - page.length,
          rows: 20,
        },
        resetPage: false,
      })
    );
  }

  async submit() {
    if (this.note.invalid) {
      return;
    }
    const activityAnalysis = this.store.selectSnapshot(
      ResourceAnalysisState.resourceAnalysis
    );
    const worklog: BcActivityAnalysisWorkLog = {
      notes: this.note.value,
      resource: {id: activityAnalysis.id}
    };
    this.store
      .dispatch([new BrowseResourceWorklogsAction.Create(worklog)])
      .pipe(
        switchMap(() =>
          this.store.select(ResourceWorklogsState.Worklog)
        ),
        filter((p) => !!p),
        tap(async (data) => {
          console.log(data);
          this.note.reset();
          await this.uploadFiles(data.id, this.note.value);
        })
      ).subscribe();
  }

  filter(event) {
    if (this.selectedWorklogType?.id == event.id) {
      this.selectedWorklogType = null;
    } else {
      this.selectedWorklogType = event;
    }
    const resource = this.store.selectSnapshot(
      ResourceAnalysisState.resourceAnalysis
    );
    this.store.dispatch(
      new BrowseResourceWorklogsAction.LoadResourceWorklogs({
        actionTypeId: this.selectedWorklogType?.id,
        resourceId: resource?.id,
        resetPage: true,
      })
    );
  }

  filesChanged(files: FileList) {
    this.files = Array.from(files);
  }

  async uploadFiles(id: number, description: string) {
    this.uploading = true;
    try {
      if (this.files?.length > 0) {
        const tagId = UploadTagIdConst.BC_ACTIVITYANALYSIS_WORKLOG;
        await this.dmsService
          .uploadFiles(this.files, id, tagId, description)
          .toPromise();
        this.fileInput.nativeElement.value = '';
        this.files = [];
      }
      this.uploading = false;
    } catch {
      this.messageHelper.error();
      this.uploading = false;
    }
  }

  showDialog(activityWorklog) {
    this.activityWorklog = activityWorklog;
    this.display = true;
    this.loadingImage = true;
  }

  async keydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submit();
    }
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
