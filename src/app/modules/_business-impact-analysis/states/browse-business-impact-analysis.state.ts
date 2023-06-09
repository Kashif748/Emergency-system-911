import {PageRequestModel} from "@core/models/page-request.model";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {MessageHelper} from "@core/helpers/message.helper";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiHelper} from "@core/helpers/api.helper";
import {TextUtils} from "@core/utils";
import {iif, patch} from "@ngxs/store/operators";
import {BrowseBusinessImpactAnalysisAction} from "./browse-business-impact-analysis.action";


export interface BrowseBusinessImpactAnalysisStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_BUSINESS_ANALYSIS_UI_STATE_TOKEN =
  new StateToken<BrowseBusinessImpactAnalysisStateModel>('browse_business_impact_analysis');

@State<BrowseBusinessImpactAnalysisStateModel>({
  name: BROWSE_BUSINESS_ANALYSIS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'activityName',
      'activityFrequency',
      'analysisCycle',
      'rto',
      'priorityLevel',
      'status',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })

export class BrowseBusinessImpactAnalysisState {
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
  @Selector([BrowseBusinessImpactAnalysisState])
  static state(state: BrowseBusinessImpactAnalysisStateModel): BrowseBusinessImpactAnalysisStateModel {
    return state;
  }

  @Selector([BrowseBusinessImpactAnalysisState])
  static hasFilters(state: BrowseBusinessImpactAnalysisStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter(
        (k) =>
          k !== 'active' &&
          !TextUtils.IsEmptyOrWhiteSpaces(state.pageRequest.filters[k])
      ).length > 0
    );
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseBusinessImpactAnalysisAction.LoadBusinessImpactAnalysis)
  loadUsers(
    { setState, dispatch, getState }: StateContext<BrowseBusinessImpactAnalysisStateModel>,
    { payload }: BrowseBusinessImpactAnalysisAction.LoadBusinessImpactAnalysis
  ) {
    setState(
      patch<BrowseBusinessImpactAnalysisStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    /*return dispatch(
      new UserAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: this.filters(pageRequest),
      })
    );*/
  }
}
