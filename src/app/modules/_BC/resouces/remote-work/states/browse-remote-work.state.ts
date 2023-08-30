import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '@core/helpers/message.helper';
import {ApiHelper} from '@core/helpers/api.helper';
import {BrowseRemoteWorkAction} from "./browse-remote-work.action";

export interface BrowseRemoteWorkStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_REMOTE_WORK_UI_STATE_TOKEN = new StateToken<BrowseRemoteWorkStateModel>(
  'browse_remote_work'
);

@State<BrowseRemoteWorkStateModel>({
  name: BROWSE_REMOTE_WORK_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['personalDesignation', 'priorityLevel'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseRemoteWorkState {
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
  @Selector([BrowseRemoteWorkState])
  static state(state: BrowseRemoteWorkStateModel): BrowseRemoteWorkStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseRemoteWorkAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    { dispatch }: StateContext<BrowseRemoteWorkStateModel>,
    { payload }: BrowseRemoteWorkAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.remoteWorkId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseRemoteWorkAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseRemoteWorkStateModel>,
    { payload }: BrowseRemoteWorkAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.remoteWorkId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}