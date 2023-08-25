import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DmsService } from '@core/api/services/dms.service';
import { UploadTagIdConst } from '@core/constant/UploadTagIdConst';
import { ILangFacade } from '@core/facades/lang.facade';
import { MessageHelper } from '@core/helpers/message.helper';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { ActivityWorklogsState } from '@core/states/activity-analysis/worklogs/worklogs.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BcActivityAnalysisWorkLog } from 'src/app/api/models';
import { BcWorkLogTypes } from 'src/app/api/models/bc-work-log-types';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';
import { NOTES } from '../tempData.conts';
import { BrowseActivityWorklogsAction } from './states/browse-worklogs.action';
import {
  BrowseActivityWorklogsState,
  BrowseActivityWorklogsStateModel,
} from './states/browse-worklogs.state';

@Component({
  selector: 'app-worklogs',
  templateUrl: './worklogs.component.html',
  styleUrls: ['./worklogs.component.scss'],
})
export class WorklogsComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;

  @Select(ActivityWorklogsState.page)
  public page$: Observable<BcActivityAnalysisWorkLog[]>;

  public activityWorklog : BcActivityAnalysisWorkLog;

  @Select(ActivityWorklogsState.activityWorklogTypes)
  public activityWorklogTypes$: Observable<BcWorkLogTypes[]>;

  @Select(ActivityWorklogsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ActivityWorklogsState.loading)
  public loading$: Observable<boolean>;

  @Select(ActivityWorklogsState.blocking)
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
      .select(ActivityAnalysisState.activityAnalysis)
      .pipe(
        takeUntil(this.destroy$),
        tap((activity) => {
          this.store.dispatch([
            new BrowseActivityWorklogsAction.LoadActivityWorklogsTypes(),
            new BrowseActivityWorklogsAction.LoadActivityWorklogs({
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
