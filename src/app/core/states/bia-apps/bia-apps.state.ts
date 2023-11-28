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
import { BcAnalysisControllerService } from '../../../api/services/bc-analysis-controller.service';
import { PageBcAnalysisByOrgHierarchyResponse } from '../../../api/models/page-bc-analysis-by-org-hierarchy-response';
import { BcAnalysisByOrgHierarchyResponse } from '../../../api/models/bc-analysis-by-org-hierarchy-response';
import { BiaAction } from '@core/states/bia-apps/bia-apps.action';
import {
  BcCycleStatusControllerService,
  BcCyclesControllerService,
} from '../../../api/services';
import { BcCycleStatus } from 'src/app/api/models';

export interface BiaStateModel {
  page: PageBcAnalysisByOrgHierarchyResponse;
  bia: BcAnalysisByOrgHierarchyResponse;
  statuses: BcCycleStatus[];
  loading: boolean;
  blocking: boolean;
}

const BIA_APPS_STATE_TOKEN = new StateToken<BiaStateModel>('biaApps');

@State<BiaStateModel>({ name: BIA_APPS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BiaAppsState {
  /**
   *
   */
  constructor(
    private bia: BcAnalysisControllerService,
    private cycle: BcCyclesControllerService,
    private cycleStatusService: BcCycleStatusControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BiaAppsState])
  static page(state: BiaStateModel) {
    return state?.page?.content;
  }

  @Selector([BiaAppsState])
  static bia(state: BiaStateModel) {
    return state?.bia;
  }

  @Selector([BiaAppsState])
  static totalRecords(state: BiaStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([BiaAppsState])
  static loading(state: BiaStateModel) {
    return state?.loading;
  }

  @Selector([BiaAppsState])
  static blocking(state: BiaStateModel) {
    return state?.blocking;
  }

  @Selector([BiaAppsState])
  static statuses(state: BiaStateModel) {
    return state.statuses;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BiaAction.LoadStatuses, { cancelUncompleted: true })
  loadStatuses(
    { setState }: StateContext<BiaStateModel>,
    { payload }: BiaAction.LoadStatuses
  ) {
    return this.cycleStatusService
      .getAll23({
        isActive: true,
        pageable: {
          page: payload?.page ?? 0,
          size: payload?.size ?? 50,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<BiaStateModel>({
              statuses: res.result?.content,
            })
          );
        })
      );
  }
  @Action(BiaAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<BiaStateModel>,
    { payload }: BiaAction.LoadPage
  ) {
    setState(
      patch<BiaStateModel>({
        loading: true,
      })
    );
    return this.bia
      .analysis({
        cycleId: payload.cycleId,
        orgHierarchyId: payload.filters?.orgHierarchyId?.id,
        status: payload.filters?.activityAnalysisStatusId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort ? payload.sort : ['rowNumber', 'desc'],
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<BiaStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<BiaStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<BiaStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(BiaAction.Delete, { cancelUncompleted: true })
  Delete(
    { setState }: StateContext<BiaStateModel>,
    { payload }: BiaAction.Delete
  ) {
    if (payload.id === undefined || payload.id === null) {
      return;
    }
    setState(
      patch<BiaStateModel>({
        loading: true,
      })
    );
    return this.cycle.deleteById25({ id: payload.id }).pipe(
      finalize(() => {
        setState(
          patch<BiaStateModel>({
            loading: false,
          })
        );
      })
    );
  }
}
