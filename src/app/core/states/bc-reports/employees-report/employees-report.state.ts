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

import { BcActivityEmployeesControllerService } from 'src/app/api/services';
import { EmployeesReportAction } from './employees-report.action';
import { BcActivityAnalysisSummaryResponse } from 'src/app/api/models/bc-activity-analysis-summary-response';
import { ILangFacade } from '@core/facades/lang.facade';
import { UrlHelperService } from '@core/services/url-helper.service';
import { PageBcActivityEmployeesSummaryResponse } from 'src/app/api/models';

export interface EmployeesReportStateModel {
  page: PageBcActivityEmployeesSummaryResponse;
  loading: boolean;
  blocking: boolean;
  exporting?: boolean;
}

const EMPLOYEES_REPORT_STATE_TOKEN = new StateToken<EmployeesReportStateModel>(
  'employees_report'
);

@State<EmployeesReportStateModel>({ name: EMPLOYEES_REPORT_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class EmployeesReportState {
  /**
   *
   */
  constructor(
    private employeesControllerService: BcActivityEmployeesControllerService,
    private langFacade: ILangFacade,
    private urlHelper: UrlHelperService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([EmployeesReportState])
  static page(
    state: EmployeesReportStateModel
  ): BcActivityAnalysisSummaryResponse[] {
    return state?.page?.content;
  }

  @Selector([EmployeesReportState])
  static totalRecords(state: EmployeesReportStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([EmployeesReportState])
  static loading(state: EmployeesReportStateModel) {
    return state?.loading;
  }

  @Selector([EmployeesReportState])
  static blocking(state: EmployeesReportStateModel) {
    return state?.blocking;
  }
  @Selector([EmployeesReportState])
  static exporting(state: EmployeesReportStateModel) {
    return state?.exporting;
  }

  /* ********************** ACTIONS ************************* */
  @Action(EmployeesReportAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<EmployeesReportStateModel>,
    { payload }: EmployeesReportAction.LoadPage
  ) {
    setState(
      patch<EmployeesReportStateModel>({
        loading: true,
      })
    );
    return this.employeesControllerService
      .summary2({
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
            patch<EmployeesReportStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<EmployeesReportStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<EmployeesReportStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(EmployeesReportAction.Export, { cancelUncompleted: true })
  export(
    { setState }: StateContext<EmployeesReportStateModel>,
    { payload }: EmployeesReportAction.Export
  ) {
    setState(
      patch<EmployeesReportStateModel>({
        exporting: true,
      })
    );
    return this.employeesControllerService
      .export10({
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
            `Employees Report - ${new Date().toISOString().split('.')[0]}`
          );
        }),
        finalize(() => {
          setState(
            patch<EmployeesReportStateModel>({
              exporting: false,
            })
          );
        })
      );
  }
}
