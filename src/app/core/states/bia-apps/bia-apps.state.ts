import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {EMPTY} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';
import {BcAnalysisControllerService} from "../../../api/services/bc-analysis-controller.service";
import {PageBcAnalysisByOrgHierarchyResponse} from "../../../api/models/page-bc-analysis-by-org-hierarchy-response";
import {BcAnalysisByOrgHierarchyResponse} from "../../../api/models/bc-analysis-by-org-hierarchy-response";
import {BiaAction} from "@core/states/bia-apps/bia-apps.action";

export interface BiaStateModel {
  page: PageBcAnalysisByOrgHierarchyResponse;
  bia: BcAnalysisByOrgHierarchyResponse;
  loading: boolean;
  blocking: boolean;
}

const BIA_APPS_STATE_TOKEN =
  new StateToken<BiaStateModel>('biaApps');

@State<BiaStateModel>({ name: BIA_APPS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BiaAppsState {
  /**
   *
   */
  constructor(
    private bia: BcAnalysisControllerService,
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

  /* ********************** ACTIONS ************************* */
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
}
