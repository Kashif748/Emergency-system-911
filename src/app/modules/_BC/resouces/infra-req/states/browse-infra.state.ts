import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '@core/helpers/message.helper';
import {ApiHelper} from '@core/helpers/api.helper';
import {BrowseInfraAction} from "./browse-infra.action";

export interface BrowseInfraStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_INFRA_UI_STATE_TOKEN = new StateToken<BrowseInfraStateModel>(
  'browse_infra'
);

@State<BrowseInfraStateModel>({
  name: BROWSE_INFRA_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['details', 'requiredCount', 'availableCount', 'toBePurchased'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseInfraState {
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
  @Selector([BrowseInfraState])
  static state(state: BrowseInfraStateModel): BrowseInfraStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseInfraAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    { dispatch }: StateContext<BrowseInfraStateModel>,
    { payload }: BrowseInfraAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.infraId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseInfraAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseInfraStateModel>,
    { payload }: BrowseInfraAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.infraId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
