import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiHelper} from '@core/helpers/api.helper';
import {MessageHelper} from '@core/helpers/message.helper';
import {PageRequestModel} from '@core/models/page-request.model';
import {TextUtils} from '@core/utils';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {BrowseStatisticsAction} from "./browse-statistics.action";
import {IncidentStatisticsAction} from "@core/states/incident-statistics/incident-statistics.action";
import {iif, patch} from "@ngxs/store/operators";

export interface BrowseStatisticsStateModel {
  pageRequest: PageRequestModel;
}

export const BROWSE_STATISTICS_UI_STATE_TOKEN =
  new StateToken<BrowseStatisticsStateModel>('browse_emergency_statistics');

@State<BrowseStatisticsStateModel>({
  name: BROWSE_STATISTICS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {
        fromDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        toDate: new Date(),
      },
      first: 0,
      rows: 10,
    }
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseStatisticsState {
  /**
   *
   */
  constructor(
    private apiHelper: ApiHelper,
    private messageHelper: MessageHelper,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([BrowseStatisticsState])
  static state(state: BrowseStatisticsStateModel): BrowseStatisticsStateModel {
    return {
      ...state,
      pageRequest: {
        ...state.pageRequest,
        filters: {
          ...state.pageRequest.filters,
          fromDate: state.pageRequest.filters['fromDate']
              ? new Date(state.pageRequest.filters['fromDate'])
              : undefined,
          toDate: state.pageRequest.filters['toDate']
              ? new Date(state.pageRequest.filters['toDate'])
              : undefined,
        },
      },
    };
  }

  @Selector([BrowseStatisticsState])
  static hasFilters(state: BrowseStatisticsStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter(
        (k) =>
          k !== 'active' &&
          !TextUtils.IsEmptyOrWhiteSpaces(state.pageRequest.filters[k])
      ).length > 0
    );
  }
  /* ********************** ACTIONS ************************* */
  @Action(BrowseStatisticsAction.LoadIncidentStatistics)
  loadIncidentStatistics(
      { setState, dispatch, getState }: StateContext<BrowseStatisticsStateModel>,
      { payload}: BrowseStatisticsAction.LoadIncidentStatistics
  ) {
    const pageRequest = getState().pageRequest;
    return dispatch(
        new IncidentStatisticsAction.LoadIncidentStatistics({
          filters: {...pageRequest?.filters},
        })
    );
  }
  @Action(BrowseStatisticsAction.LoadIncidentStatisticsCenter)
  loadIncidentStatisticsCenter(
      { setState, dispatch, getState }: StateContext<BrowseStatisticsStateModel>,
      { payload}: BrowseStatisticsAction.LoadIncidentStatisticsCenter
  ) {
    const pageRequest = getState().pageRequest;
    return dispatch(
        new IncidentStatisticsAction.LoadIncidentStatistics({
          filters: {...pageRequest?.filters},
        })
    );
  }
  @Action(BrowseStatisticsAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
      { setState }: StateContext<BrowseStatisticsStateModel>,
      { payload }: BrowseStatisticsAction.UpdateFilter
  ) {
    setState(
        patch<BrowseStatisticsStateModel>({
          pageRequest: patch<PageRequestModel>({
            first: 0,
            filters: iif(
                payload.clear === true,
                {},
                patch({
                  ...payload,
                  type: undefined,
                })
            ),
          }),
        })
    );
  }
}
