import { Injectable } from '@angular/core';
import { SelectorOptions, State, StateToken } from '@ngxs/store';

export interface BrowseTasksStateModel {}

export const BROWSE_TASKS_UI_STATE_TOKEN =
  new StateToken<BrowseTasksStateModel>('browse_tasks');

@State<BrowseTasksStateModel>({
  name: BROWSE_TASKS_UI_STATE_TOKEN,
  defaults: {},
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseTasksSTate {
  /**
   *
   */
  constructor() {}
}
