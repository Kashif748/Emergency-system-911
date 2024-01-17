import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiHelper} from '@core/helpers/api.helper';
import {MessageHelper} from '@core/helpers/message.helper';
import {PageRequestModel} from '@core/models/page-request.model';
import {TextUtils} from '@core/utils';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {IncidentCategoriesAction} from "@core/states/incident-categories/incident-categories.action";
import {BrowseStatisticsAction} from "./browse-statistics.action";

export interface BrowseStatisticsStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_STATISTICS_UI_STATE_TOKEN =
  new StateToken<BrowseStatisticsStateModel>('browse_emergency_statistics');

@State<BrowseStatisticsStateModel>({
  name: BROWSE_STATISTICS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'nameAr',
      'nameEn',
      'org',
      'emiratesId',
      'userName',
      'title',
      'role',
    ],
    view: 'TABLE',
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
    return state;
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
  @Action(BrowseStatisticsAction.LoadIncidentCategories)
  loadUsers(
    { setState, dispatch }: StateContext<BrowseStatisticsStateModel>,
    { }: BrowseStatisticsAction.LoadIncidentCategories
  ) {
    return dispatch(
      new IncidentCategoriesAction.LoadIncidentCategories()
    );
  }
}