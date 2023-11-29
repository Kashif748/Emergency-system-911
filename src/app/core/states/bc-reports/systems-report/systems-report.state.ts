import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';

import { BcActivitySystemsControllerService } from 'src/app/api/services';
import { SystemsReportAction } from './systems-report.action';
import { BcActivityAnalysisSummaryResponse } from 'src/app/api/models/bc-activity-analysis-summary-response';
import { ILangFacade } from '@core/facades/lang.facade';
import { UrlHelperService } from '@core/services/url-helper.service';
import { PageBcActivitySystemsSummaryResponse } from 'src/app/api/models/page-bc-activity-systems-summary-response';

export interface SystemsReportStateModel {
  page: PageBcActivitySystemsSummaryResponse;
  loading: boolean;
  blocking: boolean;
  exporting?: boolean;
}

const SYSTEMS_REPORT_STATE_TOKEN = new StateToken<SystemsReportStateModel>(
  'systems_report'
);

@State<SystemsReportStateModel>({ name: SYSTEMS_REPORT_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class SystemsReportState {
  /**
   *
   */
  constructor(
    private activitySystemsController: BcActivitySystemsControllerService,
    private langFacade: ILangFacade,
    private urlHelper: UrlHelperService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([SystemsReportState])
  static page(
    state: SystemsReportStateModel
  ): BcActivityAnalysisSummaryResponse[] {
    return state?.page?.content;
  }

  @Selector([SystemsReportState])
  static totalRecords(state: SystemsReportStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([SystemsReportState])
  static loading(state: SystemsReportStateModel) {
    return state?.loading;
  }

  @Selector([SystemsReportState])
  static blocking(state: SystemsReportStateModel) {
    return state?.blocking;
  }
  @Selector([SystemsReportState])
  static exporting(state: SystemsReportStateModel) {
    return state?.exporting;
  }

  /* ********************** ACTIONS ************************* */
  @Action(SystemsReportAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<SystemsReportStateModel>,
    { payload }: SystemsReportAction.LoadPage
  ) {
    setState(
      patch<SystemsReportStateModel>({
        loading: true,
      })
    );
    return this.activitySystemsController
      .summary1({
        ...payload.filters,
        cycleId: payload.filters['cycleId'],

        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<SystemsReportStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<SystemsReportStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<SystemsReportStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(SystemsReportAction.Export, { cancelUncompleted: true })
  export(
    { setState }: StateContext<SystemsReportStateModel>,
    { payload }: SystemsReportAction.Export
  ) {
    setState(
      patch<SystemsReportStateModel>({
        exporting: true,
      })
    );
    return this.activitySystemsController
      .export9({
        as: payload.type,
        cycleId: payload.filters['cycleId'],
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
            `Systems Summary - ${new Date().toISOString().split('.')[0]}`
          );
        }),
        finalize(() => {
          setState(
            patch<SystemsReportStateModel>({
              exporting: false,
            })
          );
        })
      );
  }
}
