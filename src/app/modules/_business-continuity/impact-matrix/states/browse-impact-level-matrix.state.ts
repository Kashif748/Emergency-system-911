import {PageRequestModel} from "@core/models/page-request.model";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {MessageHelper} from "@core/helpers/message.helper";
import {ApiHelper} from "@core/helpers/api.helper";
import {ActivatedRoute, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {iif, patch} from "@ngxs/store/operators";
import {BrowseImpactLevelMatrixAction} from "./browse-impact-level-matrix.action";
import {ImpactLevelAction} from "@core/states";


export interface BrowseImpactLevelStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_IMPACT_LEVEL_UI_STATE_TOKEN =
  new StateToken<BrowseImpactLevelStateModel>('browse_ImpactLevelColume');

@State<BrowseImpactLevelStateModel>({
  name: BROWSE_IMPACT_LEVEL_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'criticality',
      'rtoEn',
      'description'
    ],
    view: 'TABLE',
  },
})

@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseImpactLevelMatrixState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseImpactLevelMatrixState])
  static state(state: BrowseImpactLevelStateModel): BrowseImpactLevelStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseImpactLevelMatrixAction.LoadImpactLevel)
  loadImpactLevel(
    {setState, dispatch, getState}: StateContext<BrowseImpactLevelStateModel>,
    {payload}: BrowseImpactLevelMatrixAction.LoadImpactLevel
  ) {
    setState(
      patch<BrowseImpactLevelStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new ImpactLevelAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
      })
    );
  }
}
