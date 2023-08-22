import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '@core/helpers/message.helper';
import {ApiHelper} from '@core/helpers/api.helper';
import {BrowseOtherAction} from "./browse-other.action";

export interface BrowseOtherStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_OTHER_UI_STATE_TOKEN = new StateToken<BrowseOtherStateModel>(
  'browse_other'
);

@State<BrowseOtherStateModel>({
  name: BROWSE_OTHER_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['details', 'requireCount'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseOtherState {
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
  @Selector([BrowseOtherState])
  static state(state: BrowseOtherStateModel): BrowseOtherStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseOtherAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    { dispatch }: StateContext<BrowseOtherStateModel>,
    { payload }: BrowseOtherAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.otherId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseOtherAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseOtherStateModel>,
    { payload }: BrowseOtherAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.otherId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
