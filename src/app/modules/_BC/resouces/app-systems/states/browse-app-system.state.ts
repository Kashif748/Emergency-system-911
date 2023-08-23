import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '@core/helpers/message.helper';
import {ApiHelper} from '@core/helpers/api.helper';
import {BrowseAppSystemAction} from "./browse-app-system.action";

export interface BrowseAppSystemStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_APP_SYSTEM_UI_STATE_TOKEN = new StateToken<BrowseAppSystemStateModel>(
  'browse_appSystem'
);

@State<BrowseAppSystemStateModel>({
  name: BROWSE_APP_SYSTEM_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['recordName', 'recordType', 'criticality'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseAppSystemState {
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
  @Selector([BrowseAppSystemState])
  static state(state: BrowseAppSystemStateModel): BrowseAppSystemStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseAppSystemAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    { dispatch }: StateContext<BrowseAppSystemStateModel>,
    { payload }: BrowseAppSystemAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.appSystemId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseAppSystemAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseAppSystemStateModel>,
    { payload }: BrowseAppSystemAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.appSystemId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
