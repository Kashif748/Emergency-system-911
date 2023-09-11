import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '@core/helpers/message.helper';
import {ApiHelper} from '@core/helpers/api.helper';
import {EMPTY} from "rxjs";
import {catchError, finalize, tap} from "rxjs/operators";
import {iif, patch} from "@ngxs/store/operators";
import {BrowseStaffAction} from "./browse-staff.action";
import { StaffAction} from "@core/states/bc-resources/staff/staff.action";

export interface BrowseStaffStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_STAFF_UI_STATE_TOKEN = new StateToken<BrowseStaffStateModel>(
  'browse_staff'
);

@State<BrowseStaffStateModel>({
  name: BROWSE_STAFF_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['personalDesignation', 'keyResponsibilities'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseStaffState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseStaffState])
  static state(state: BrowseStaffStateModel): BrowseStaffStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseStaffAction.LoadStaff)
  loadStaff(
    { setState, dispatch, getState }: StateContext<BrowseStaffStateModel>,
    { payload }: BrowseStaffAction.LoadStaff
  ) {
    setState(
      patch<BrowseStaffStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new StaffAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        resourceId: payload.resourceId,
      })
    );
  }
  @Action(BrowseStaffAction.LoadMinPersonal)
  loadMinStaff(
    { setState, dispatch, getState }: StateContext<BrowseStaffStateModel>,
    { payload }: BrowseStaffAction.LoadMinPersonal
  ) {
    setState(
      patch<BrowseStaffStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new StaffAction.LoadMinPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
      })
    );
  }

  @Action(BrowseStaffAction.CreateStaff)
  createStaff(
    { dispatch }: StateContext<BrowseStaffStateModel>,
    { payload }: BrowseStaffAction.CreateStaff
  ) {
    return dispatch(new StaffAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseStaffAction.LoadStaff({
            resourceId: payload.resource?.id,
          }),
          new BrowseStaffAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseStaffAction.UpdateStaff)
  updateStaff(
    { dispatch }: StateContext<BrowseStaffStateModel>,
    { payload }: BrowseStaffAction.UpdateStaff
  ) {
    return dispatch(new StaffAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseStaffAction.LoadStaff({
          resourceId: payload.resource?.id,
        }));
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseStaffAction.ToggleDialog({}));
      })
    );
  }
  @Action(BrowseStaffAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    { dispatch }: StateContext<BrowseStaffStateModel>,
    { payload }: BrowseStaffAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.staffId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseStaffAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseStaffStateModel>,
    { payload }: BrowseStaffAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.staffId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
