import {PageRequestModel} from "@core/models/page-request.model";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {iif, patch} from "@ngxs/store/operators";
import {EMPTY} from "rxjs";
import {MessageHelper} from "@core/helpers/message.helper";
import {ApiHelper} from "@core/helpers/api.helper";
import {catchError, finalize, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {LocationTypeAction} from "@core/states/bc/location-type/locationType.action";
import {BrowseLocationTypeAction} from "./browse-locationType.action";
import {BrowseRtoStateModel} from "../../rto/states/browse-rto.state";


export interface BrowseLocationTypeStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_LOCATION_TYPE_UI_STATE_TOKEN =
  new StateToken<BrowseLocationTypeStateModel>('browse_bc_location_type');

@State<BrowseLocationTypeStateModel>({
  name: BROWSE_LOCATION_TYPE_UI_STATE_TOKEN,
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
export class BrowseLocationTypeState {
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
  @Selector([BrowseLocationTypeState])
  static state(state: BrowseLocationTypeStateModel): BrowseLocationTypeStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseLocationTypeAction.LoadLocationType)
  loadLocationType(
    { setState, dispatch, getState }: StateContext<BrowseLocationTypeStateModel>,
    { payload }: BrowseLocationTypeAction.LoadLocationType
  ) {
    setState(
      patch<BrowseLocationTypeStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new LocationTypeAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
      })
    );
  }

  @Action(BrowseLocationTypeAction.CreateLocationType)
  createLocationType(
    { dispatch }: StateContext<BrowseLocationTypeStateModel>,
    { payload }: BrowseLocationTypeAction.CreateLocationType
  ) {
    return dispatch(new LocationTypeAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseLocationTypeAction.LoadLocationType(),
          new BrowseLocationTypeAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseLocationTypeAction.UpdateLocationType)
  updateLocationType(
    { dispatch }: StateContext<BrowseRtoStateModel>,
    { payload }: BrowseLocationTypeAction.UpdateLocationType
  ) {
    return dispatch(new LocationTypeAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseLocationTypeAction.LoadLocationType());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseLocationTypeAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseLocationTypeAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseLocationTypeStateModel>,
    { payload }: BrowseLocationTypeAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.id,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseLocationTypeAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseLocationTypeStateModel>,
    { payload }: BrowseLocationTypeAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.id,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
