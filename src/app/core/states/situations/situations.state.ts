import {Injectable} from '@angular/core';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {patch} from '@ngxs/store/operators';
import {EMPTY} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {SituationsAction} from './situations.action';
import {PageSituationProjection} from 'src/app/api/models/page-situation-projection';
import {SituationControllerService} from 'src/app/api/services/situation-controller.service';
import {SituationProjection} from 'src/app/api/models/situation-projection';
import {DateTimeUtil} from '@core/utils/DateTimeUtil';
import {SituationChartReportResponse, SituationStatisticsResponse} from 'src/app/api/models';
import {UrlHelperService} from '@core/services/url-helper.service';
import {ILangFacade} from '@core/facades/lang.facade';
import {PageAttachmentPerSituationResponse} from "../../../api/models/page-attachment-per-situation-response";
import {AlertnessLevelControllerService} from "../../../api/services/alertness-level-controller.service";
import {PageAlertnessLevel} from "../../../api/models/page-alertness-level";

export interface SituationsStateModel {
  page: PageSituationProjection;
  situationAttachmentPage: PageAttachmentPerSituationResponse;
  situation: SituationProjection;
  createdSituation: SituationProjection;
  activeSituation: SituationProjection;
  statistics: SituationStatisticsResponse;
  chartReport: SituationChartReportResponse;
  alertnessLevelPage: PageAlertnessLevel;
  loading: boolean;
  attachmentLoading: boolean;
  exportLoading: boolean;
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
    private langFacade: ILangFacade,
    private alertness: AlertnessLevelControllerService
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([SituationsState])
  static situation(state: SituationsStateModel) {
    return state?.situation;
  }
  @Selector([SituationsState])
  static createdSituation(state: SituationsStateModel) {
    return state?.createdSituation;
  }
  @Selector([SituationsState])
  static activeSituation(state: SituationsStateModel) {
    return state?.activeSituation;
  }
  @Selector([SituationsState])
  static page(state: SituationsStateModel) {
    return state?.page?.content;
  }
  @Selector([SituationsState])
  static situationAttachmentPage(state: SituationsStateModel) {
    return state?.situationAttachmentPage.content;
  }
  @Selector([SituationsState])
  static situationTotalRecords(state: SituationsStateModel) {
    return state?.situationAttachmentPage.totalElements;
  }
  @Selector([SituationsState])
  static totalRecords(state: SituationsStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([SituationsState])
  static alertness(state: SituationsStateModel) {
    return state?.alertnessLevelPage?.content;
  }

  @Selector([SituationsState])
  static attachmentLoading(state: SituationsStateModel) {
    return state?.attachmentLoading;
  }

  @Selector([SituationsState])
  static loading(state: SituationsStateModel) {
    return state?.loading;
  }

  @Selector([SituationsState])
  static exportLoading(state: SituationsStateModel) {
    return state?.exportLoading;
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
        active: true,
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

  @Action(SituationsAction.LoadSituationAttachment, { cancelUncompleted: true })
  LoadSituationAttachment(
    { setState }: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.LoadSituationAttachment
  ) {
    setState(
      patch<SituationsStateModel>({
        attachmentLoading: true,
      })
    );
    return this.situationsService.attachments({
      situationId: payload.id,
      pageable: {
        page: payload.page,
        size: payload.size,
        sort: payload.sort,
      }
    }).pipe(
      tap((res) => {
        setState(
          patch<SituationsStateModel>({
            situationAttachmentPage: res.result,
            attachmentLoading: false,
          })
        );
      }),
      catchError(() => {
        setState(
          patch<SituationsStateModel>({
            situationAttachmentPage: { content: [], totalElements: 0 },
          })
        );
        return EMPTY;
      }),
      finalize(() => {
        setState(
          patch<SituationsStateModel>({
            attachmentLoading: false,
          })
        );
      })
    );
  }

  @Action(SituationsAction.GetAlertnessLevel, { cancelUncompleted: true })
  getAlertnessLevel(
    { setState }: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.GetAlertnessLevel
  ) {
    return this.alertness.getByActivePage({
      pageable: {
        page: payload.page,
        size: payload.size,
        sort: payload.sort,
      }
    }).pipe(
      tap((res) => {
        setState(
          patch<SituationsStateModel>({
            alertnessLevelPage: res.result,
          })
        );
      }),
      catchError(() => {
        setState(
          patch<SituationsStateModel>({
            situationAttachmentPage: { content: [], totalElements: 0 },
          })
        );
        return EMPTY;
      }),
      finalize(() => {
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

  @Action(SituationsAction.GetActiveSituation, { cancelUncompleted: true })
  getActiveSituation({ setState }: StateContext<SituationsStateModel>) {
    return this.situationsService.getActiveSituation().pipe(
      tap((res) => {
        setState(
          patch<SituationsStateModel>({
            activeSituation: res.result,
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
        tap(({ result: Situation }) => {
          setState(
            patch<SituationsStateModel>({
              createdSituation: Situation,
            })
          );
        }),
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
  @Action(SituationsAction.Delete)
  delete(
    { setState, getState }: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.Delete
  ) {
    setState(
      patch<SituationsStateModel>({
        blocking: true,
      })
    );
    const situation = getState().page.content.find(
      (item) => item.id === payload.id
    );

    const situationParam = {
      id: situation.id,
      type: situation.newsType?.id,
      theme: situation.themeType?.id,
      endDate: DateTimeUtil.getDateInUTCFormat(situation.endDate),
      startDate: DateTimeUtil.getDateInUTCFormat(situation.startDate),
      nameAr: situation.nameAr,
      nameEn: situation.nameEn,
      isActive: false,
    };
    return this.situationsService
      .update8({
        body: { ...situationParam },
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

  @Action(SituationsAction.Export, { cancelUncompleted: true })
  export(
    {setState}: StateContext<SituationsStateModel>,
    { payload }: SituationsAction.Export
  ) {
    setState(
      patch<SituationsStateModel>({
        exportLoading: true,
      })
    );
    return this.situationsService
      .generate1({
        lang: this.langFacade.stateSanpshot.ActiveLang.key == 'ar',
        situationId: payload.situationId,
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
            `SITUATIONS - ${new Date().toISOString().split('.')[0]}`
          );
          setState(
            patch<SituationsStateModel>({
              exportLoading: false,
            })
          );
        })
      );
  }
}
