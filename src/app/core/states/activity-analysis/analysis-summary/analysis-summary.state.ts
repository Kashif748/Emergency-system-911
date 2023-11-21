import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';

import { BcActivityAnalysisControllerService } from 'src/app/api/services';
import { ActivitySummaryAction } from './analysis-summary.action';
import { PageBcActivityAnalysisSummaryResponse } from 'src/app/api/models/page-bc-activity-analysis-summary-response';
import { BcActivityAnalysisSummaryResponse } from 'src/app/api/models/bc-activity-analysis-summary-response';
import { ILangFacade } from '@core/facades/lang.facade';
import { UrlHelperService } from '@core/services/url-helper.service';

export interface AnalysisSummaryStateModel {
  page: PageBcActivityAnalysisSummaryResponse;
  loading: boolean;
  blocking: boolean;
  exporting?: boolean;
}

const ANALYSIS_SUMMARY_STATE_TOKEN = new StateToken<AnalysisSummaryStateModel>(
  'activity_analysis_summary'
);

@State<AnalysisSummaryStateModel>({ name: ANALYSIS_SUMMARY_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class AnalysisSummaryState {
  /**
   *
   */
  constructor(
    private activitiesAnalysisController: BcActivityAnalysisControllerService,
    private langFacade: ILangFacade,
    private urlHelper: UrlHelperService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([AnalysisSummaryState])
  static page(
    state: AnalysisSummaryStateModel
  ): BcActivityAnalysisSummaryResponse[] {
    return state?.page?.content;
  }

  @Selector([AnalysisSummaryState])
  static totalRecords(state: AnalysisSummaryStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([AnalysisSummaryState])
  static loading(state: AnalysisSummaryStateModel) {
    return state?.loading;
  }

  @Selector([AnalysisSummaryState])
  static blocking(state: AnalysisSummaryStateModel) {
    return state?.blocking;
  }
  @Selector([AnalysisSummaryState])
  static exporting(state: AnalysisSummaryStateModel) {
    return state?.exporting;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ActivitySummaryAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<AnalysisSummaryStateModel>,
    { payload }: ActivitySummaryAction.LoadPage
  ) {
    setState(
      patch<AnalysisSummaryStateModel>({
        loading: true,
      })
    );
    return this.activitiesAnalysisController
      .summary1({
        ...payload.filters,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<AnalysisSummaryStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<AnalysisSummaryStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<AnalysisSummaryStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ActivitySummaryAction.Export, { cancelUncompleted: true })
  export(
    { setState }: StateContext<AnalysisSummaryStateModel>,
    { payload }: ActivitySummaryAction.Export
  ) {
    setState(
      patch<AnalysisSummaryStateModel>({
        exporting: true,
      })
    );
    return this.activitiesAnalysisController
      .export9({
        as: payload.type,
        lang: this.langFacade.stateSanpshot.ActiveLang.key == 'ar',
        ...payload.filters,
      })
      .pipe(
        tap((res: any) => {
          const newBlob = new Blob([res], {
            type: `application/${
              payload.type === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }`,
          });
          this.urlHelper.downloadBlob(
            newBlob,
            `Activity Summary - ${new Date().toISOString().split('.')[0]}`
          );
        }),
        finalize(() => {
          setState(
            patch<AnalysisSummaryStateModel>({
              exporting: false,
            })
          );
        })
      );
  }
}
