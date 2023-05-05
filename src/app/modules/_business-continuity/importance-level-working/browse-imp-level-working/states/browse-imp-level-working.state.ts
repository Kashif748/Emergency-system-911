import {PageRequestModel} from "@core/models/page-request.model";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {ApiHelper} from "@core/helpers/api.helper";
import {MessageHelper} from "@core/helpers/message.helper";
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {iif, patch} from "@ngxs/store/operators";
import {catchError, tap} from "rxjs/operators";
import {BrowseRtoStateModel} from "../../../rto/states/browse-rto.state";
import {EMPTY} from "rxjs";
import {BrowseImpLevelWorkingAction} from "./browse-imp-level-working.action";
import {ImpLevelWorkingAction} from "@core/states";


export interface BrowseImpLevelWorkingStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_IMP_LEVEL_WORKING_UI_STATE_TOKEN =
  new StateToken<BrowseImpLevelWorkingStateModel>('browse_imp_level_working');

@State<BrowseImpLevelWorkingStateModel>({
  name: BROWSE_IMP_LEVEL_WORKING_UI_STATE_TOKEN,
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
export class BrowseImpLevelWorkingState {
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
  @Selector([BrowseImpLevelWorkingState])
  static state(state: BrowseImpLevelWorkingStateModel): BrowseImpLevelWorkingStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseImpLevelWorkingAction.LoadImpLevelWorking)
  LoadImpLevelWorking(
    { setState, dispatch, getState }: StateContext<BrowseImpLevelWorkingStateModel>,
    { payload }: BrowseImpLevelWorkingAction.LoadImpLevelWorking
  ) {
    setState(
      patch<BrowseImpLevelWorkingStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new ImpLevelWorkingAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
      })
    );
  }

  @Action(BrowseImpLevelWorkingAction.CreateImpLevelWorking)
  createRto(
    { dispatch }: StateContext<BrowseRtoStateModel>,
    { payload }: BrowseImpLevelWorkingAction.CreateImpLevelWorking
  ) {
    return dispatch(new ImpLevelWorkingAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseImpLevelWorkingAction.LoadImpLevelWorking(),
          new BrowseImpLevelWorkingAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
}
