import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '@core/helpers/message.helper';
import {ApiHelper} from '@core/helpers/api.helper';
import {BrowseStaffAction} from "./browse-staff.action";

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
