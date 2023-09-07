import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageHelper} from '@core/helpers/message.helper';
import {ApiHelper} from '@core/helpers/api.helper';
import {BrowseRemoteWorkStateModel} from "../../remote-work/states/browse-remote-work.state";
import {iif, patch} from "@ngxs/store/operators";
import {EMPTY} from "rxjs";
import {catchError, finalize, tap} from "rxjs/operators";
import {BrowseRecordAction} from "./browse-records.action";
import {RecordsAction} from "@core/states/bc-resources/records/records.action";

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
  @Action(BrowseRecordAction.LoadRecords)
  loadRecord(
    { setState, dispatch, getState }: StateContext<BrowseRemoteWorkStateModel>,
    { payload }: BrowseRecordAction.LoadRecords
  ) {
    setState(
      patch<BrowseRemoteWorkStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new RecordsAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        resourceId: payload.resourceId,
      })
    );
  }
  @Action(BrowseRecordAction.CreateRecord)
  createRecord(
    { dispatch }: StateContext<BrowseRemoteWorkStateModel>,
    { payload }: BrowseRecordAction.CreateRecord
  ) {
    return dispatch(new RecordsAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseRecordAction.LoadRecords({
            resourceId: payload.resource?.id,
          }),
          new BrowseRecordAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseRecordAction.UpdateRecord)
  updateRecord(
    { dispatch }: StateContext<BrowseRemoteWorkStateModel>,
    { payload }: BrowseRecordAction.UpdateRecord
  ) {
    return dispatch(new RecordsAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseRecordAction.LoadRecords({
          resourceId: payload.resource?.id,
        }));
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseRecordAction.ToggleDialog({}));
      })
    );
  }
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
