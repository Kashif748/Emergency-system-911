import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '@core/helpers/message.helper';
import {ApiHelper} from '@core/helpers/api.helper';
import {BrowseRecordAction} from "./browse-records.action";

export interface BrowseRecordStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_RECORD_UI_STATE_TOKEN = new StateToken<BrowseRecordStateModel>(
  'browse_record'
);

@State<BrowseRecordStateModel>({
  name: BROWSE_RECORD_UI_STATE_TOKEN,
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
export class BrowseRecordsState {
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
  @Selector([BrowseRecordsState])
  static state(state: BrowseRecordStateModel): BrowseRecordStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseRecordAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    { dispatch }: StateContext<BrowseRecordStateModel>,
    { payload }: BrowseRecordAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.recordId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseRecordAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseRecordStateModel>,
    { payload }: BrowseRecordAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.recordId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
