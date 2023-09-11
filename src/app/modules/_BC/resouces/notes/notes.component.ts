import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { NOTES } from '../tempData.conts';
import {ActivityWorklogsState} from "@core/states/activity-analysis/worklogs/worklogs.state";
import {BrowseActivityWorklogsState, BrowseActivityWorklogsStateModel} from "../../activity-analysis/worklogs/states/browse-worklogs.state";
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {BcActivityAnalysisWorkLog} from "../../../../api/models";
import {BcWorkLogTypes} from "../../../../api/models/bc-work-log-types";
import {FormControl, Validators} from "@angular/forms";
import {DmsService} from "@core/api/services/dms.service";
import {MessageHelper} from "@core/helpers/message.helper";
import {ActivityAnalysisState} from "@core/states/activity-analysis/activity-analysis.state";
import {filter, switchMap, takeUntil, tap} from "rxjs/operators";
import {BrowseActivityWorklogsAction} from "../../activity-analysis/worklogs/states/browse-worklogs.action";
import {UploadTagIdConst} from "@core/constant/UploadTagIdConst";
import {ResourceWorklogsState} from "@core/states/bc-resources/worklogs/resourceWorklogs.state";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {BrowseResourceWorklogsAction} from "./states/browse-resource-worklogs.action";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  @Select(ActivityWorklogsState.page)
  public page$: Observable<BcActivityAnalysisWorkLog[]>;

  public activityWorklog : BcActivityAnalysisWorkLog;

  @Select(ResourceWorklogsState.activityWorklogTypes)
  public activityWorklogTypes$: Observable<BcWorkLogTypes[]>;

  @Select(ResourceWorklogsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ResourceWorklogsState.loading)
  public loading$: Observable<boolean>;

  @Select(ResourceWorklogsState.blocking)
  public blocking$: Observable<boolean>;

  @Select(BrowseActivityWorklogsState.state)
  public state$: Observable<BrowseActivityWorklogsStateModel>;

  private destroy$ = new Subject();
  public files: File[] = [];
  uploading = false;
  display: boolean = false;
  loadingImage= false
  note = new FormControl('', Validators.required);

  constructor(
    private store: Store,
    private lang: ILangFacade,
    private dmsService: DmsService,
    private messageHelper: MessageHelper
  ) {}

  ngOnInit(): void {
    this.store
      .select(ResourceAnalysisState.resourceAnalysis)
      .pipe(
        takeUntil(this.destroy$),
        tap((activity) => {
          this.store.dispatch([
            new BrowseResourceWorklogsAction.LoadResourceWorklogsTypes(),
            new BrowseResourceWorklogsAction.LoadResourceWorklogs({
              activityAnalysisId: activity.id,
            }),
          ]);
        })
      )
      .subscribe();
  }
  async submit() {
    if (this.note.invalid) {
      return;
    }
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    let worklog: BcActivityAnalysisWorkLog = {
      notes: this.note.value,
      activityAnalysis: activityAnalysis,
    };
    this.store
      .dispatch([new BrowseActivityWorklogsAction.Create(worklog)])
      .pipe(
        switchMap(() =>
          this.store.select(ActivityWorklogsState.activityWorklog)
        ),
        filter((p) => !!p),
        tap(async (data) => {
          console.log(data);
          await this.uploadFiles(data.id, this.note.value);
        })
      ).subscribe();
  }
  filter(event) {
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    this.store.dispatch(
      new BrowseActivityWorklogsAction.LoadActivityWorklogs({
        actionTypeId: event.id,
        activityAnalysisId: activityAnalysis.id,
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
    this.loadingImage =true;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
