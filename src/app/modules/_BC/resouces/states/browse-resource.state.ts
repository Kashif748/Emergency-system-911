import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {MessageHelper} from "@core/helpers/message.helper";
import {patch} from "@ngxs/store/operators";
import {BrowseResourceAction} from "./browse-resource.action";


export interface BrowseResourceStateModel {
  tabIndex: number;
}

export const BROWSE_RESOURCE_UI_STATE_TOKEN =
  new StateToken<BrowseResourceStateModel>('browse_resource');

@State<BrowseResourceStateModel>({
  name: BROWSE_RESOURCE_UI_STATE_TOKEN,
  defaults: {
    tabIndex: -1,
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })

export class BrowseResourceState {
  /**
   *
   */
  constructor(private messageHelper: MessageHelper, private router: Router) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseResourceState])
  static state(
    state: BrowseResourceStateModel
  ): BrowseResourceStateModel {
    return state;
  }

  @Selector([BrowseResourceState])
  static tabIndex(state: BrowseResourceStateModel): number {
    return state.tabIndex;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseResourceAction.ChangeTab, { cancelUncompleted: true })
  ChangeTab(
    { setState }: StateContext<BrowseResourceStateModel>,
    { payload }: BrowseResourceAction.ChangeTab
  ) {
    setState(
      patch<BrowseResourceStateModel>({
        tabIndex: payload?.index,
      })
    );
  }
}
