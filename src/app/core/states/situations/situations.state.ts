import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { SituationsAction } from './situations.action';
import { PageSituationProjection } from 'src/app/api/models/page-situation-projection';
import { SituationControllerService } from 'src/app/api/services/situation-controller.service';
import { SituationProjection } from 'src/app/api/models/situation-projection';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import {
  SituationChartReportResponse,
  SituationStatisticsResponse,
} from 'src/app/api/models';
import { UrlHelperService } from '@core/services/url-helper.service';
import { ILangFacade } from '@core/facades/lang.facade';

export interface SituationsStateModel {
  page: PageSituationProjection;
  situation: SituationProjection;
  statistics: SituationStatisticsResponse;
  chartReport: SituationChartReportResponse;
  loading: boolean;
  statisticsLoading: boolean;
  blocking: boolean;
}

const SITUATIONS_STATE_TOKEN = new StateToken<SituationsStateModel>(
  'situations'
);

@State<SituationsStateModel>({ name: SITUATIONS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class SituationsState {
  constructor(
    private situationsService: SituationControllerService,
    private urlHelper: UrlHelperService,
    private langFacade: ILangFacade
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([SituationsState])
  static situation(state: SituationsStateModel) {
    return state?.situation;
  }
  @Selector([SituationsState])
  static page(state: SituationsStateModel) {
    return state?.page?.content;
  }
  @Selector([SituationsState])
  static totalRecords(state: SituationsStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([SituationsState])
  static loading(state: SituationsStateModel) {
    return state?.loading;
  }

  @Selector([SituationsState])
  static blocking(state: SituationsStateModel) {
    return state?.blocking;
  }

  @Selector([SituationsState])
  static statistics(state: SituationsStateModel) {
    return state?.statistics;
  }
  @Selector([SituationsState])
  static chartReport(state: SituationsStateModel) {
    return state?.chartReport;
  }
  @Selector([SituationsState])
  static statisticsLoading(state: SituationsStateModel) {
    return state?.statisticsLoading;
  }

  /* ********************** ACTIONS ************************* */
  @Action(SituationsAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.LoadPage
  ) {
    setState(
      patch<SituationsStateModel>({
        loading: true,
      })
    );
    return this.situationsService
      .search1({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        ...payload.filters,
        fromDate: payload.filters?.fromDate
          ? DateTimeUtil.format(
              payload.filters?.fromDate,
              DateTimeUtil.DATE_FORMAT
            )
          : undefined,
        toDate: payload.filters?.toDate
          ? DateTimeUtil.format(
              payload.filters?.toDate,
              DateTimeUtil.DATE_FORMAT
            )
          : undefined,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<SituationsStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<SituationsStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<SituationsStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(SituationsAction.GetSituation, { cancelUncompleted: true })
  getSituations(
    { setState }: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.GetSituation
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<SituationsStateModel>({
          situation: undefined,
        })
      );
      return;
    }

    return this.situationsService.getById({ id: payload.id }).pipe(
      tap((res) => {
        setState(
          patch<SituationsStateModel>({
            situation: res.result,
          })
        );
      })
    );
  }

  @Action(SituationsAction.Create)
  create(
    { setState }: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.Create
  ) {
    setState(
      patch<SituationsStateModel>({
        blocking: true,
      })
    );
    return this.situationsService
      .create8({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<SituationsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(SituationsAction.Update)
  update(
    { setState }: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.Update
  ) {
    setState(
      patch<SituationsStateModel>({
        blocking: true,
      })
    );
    return this.situationsService
      .update8({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<SituationsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(SituationsAction.GetStatistics)
  getStatistics(
    { setState }: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.GetStatistics
  ) {
    setState(
      patch<SituationsStateModel>({
        statisticsLoading: true,
      })
    );
    return this.situationsService.statistics2(payload).pipe(
      tap((res) => {
        setState(
          patch<SituationsStateModel>({
            statistics: res.result,
            statisticsLoading: false,
          })
        );
      })
    );
  }

  @Action(SituationsAction.GetChartReport)
  getChartReport(
    { setState }: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.GetChartReport
  ) {
    setState(
      patch<SituationsStateModel>({
        // statisticsLoading: true,
      })
    );
    return this.situationsService.chartReport(payload).pipe(
      tap((res) => {
        setState(
          patch<SituationsStateModel>({
            chartReport: res.result,
          })
        );
      })
    );
  }
  @Action(SituationsAction.ExportPdf)
  exportPdf(
    { setState }: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.GetStatistics
  ) {
    setState(
      patch<SituationsStateModel>({
        statisticsLoading: true,
      })
    );
    return this.situationsService
      .generate1({
        situationId: payload.situationId,
        lang: this.langFacade.stateSanpshot.ActiveLang.key == 'ar' + '',
      })
      .pipe(
        tap((res: any) => {
          const newBlob = new Blob([res], {
            type: `application/pdf`,
          });
          this.urlHelper.downloadBlob(newBlob);
        })
      );
  }
}
