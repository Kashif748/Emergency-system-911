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

import { BcPartnersControllerService } from 'src/app/api/services';
import { VendorsReportAction } from './vendors-report.action';
import { BcActivityAnalysisSummaryResponse } from 'src/app/api/models/bc-activity-analysis-summary-response';
import { ILangFacade } from '@core/facades/lang.facade';
import { UrlHelperService } from '@core/services/url-helper.service';
import { PageBcPartnersSummaryResponse } from 'src/app/api/models';

export interface VendorsReportStateModel {
  page: PageBcPartnersSummaryResponse;
  loading: boolean;
  blocking: boolean;
  exporting?: boolean;
}

const VENDORS_REPORT_STATE_TOKEN = new StateToken<VendorsReportStateModel>(
  'vendors_report'
);

@State<VendorsReportStateModel>({ name: VENDORS_REPORT_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class VendorsReportState {
  /**
   *
   */
  constructor(
    private partnersControllerService: BcPartnersControllerService,
    private langFacade: ILangFacade,
    private urlHelper: UrlHelperService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([VendorsReportState])
  static page(
    state: VendorsReportStateModel
  ): BcActivityAnalysisSummaryResponse[] {
    return state?.page?.content;
  }

  @Selector([VendorsReportState])
  static totalRecords(state: VendorsReportStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([VendorsReportState])
  static loading(state: VendorsReportStateModel) {
    return state?.loading;
  }

  @Selector([VendorsReportState])
  static blocking(state: VendorsReportStateModel) {
    return state?.blocking;
  }
  @Selector([VendorsReportState])
  static exporting(state: VendorsReportStateModel) {
    return state?.exporting;
  }

  /* ********************** ACTIONS ************************* */
  @Action(VendorsReportAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<VendorsReportStateModel>,
    { payload }: VendorsReportAction.LoadPage
  ) {
    setState(
      patch<VendorsReportStateModel>({
        loading: true,
      })
    );
    return this.partnersControllerService
      .summary({
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
            patch<VendorsReportStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<VendorsReportStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<VendorsReportStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(VendorsReportAction.Export, { cancelUncompleted: true })
  export(
    { setState }: StateContext<VendorsReportStateModel>,
    { payload }: VendorsReportAction.Export
  ) {
    setState(
      patch<VendorsReportStateModel>({
        exporting: true,
      })
    );
    return this.partnersControllerService
      .export7({
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
            `Vendors Report - ${new Date().toISOString().split('.')[0]}`
          );
        }),
        finalize(() => {
          setState(
            patch<VendorsReportStateModel>({
              exporting: false,
            })
          );
        })
      );
  }
}
