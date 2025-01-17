import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
import { MessageHelper } from '@core/helpers/message.helper';
import { PageRequestModel } from '@core/models/page-request.model';
import { PhonebookAction } from '@core/states/phonebook/phonebook.action';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BrowsePhonebookAction } from './browse-phonebook.action';

export interface BrowsePhonebookStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_PHONEBOOK_UI_STATE_TOKEN =
  new StateToken<BrowsePhonebookStateModel>('browse_phonebook');

@State<BrowsePhonebookStateModel>({
  name: BROWSE_PHONEBOOK_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'firstName',
      'title',
      'jobTitle',
      'phoneNumber',
      'mobileNumber',
      'orgName',
      'isActive',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowsePhonebookState {
  /**
   *
   */
  constructor(
    private apiHelper: ApiHelper,
    private messageHelper: MessageHelper,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([BrowsePhonebookState])
  static state(state: BrowsePhonebookStateModel): BrowsePhonebookStateModel {
    return state;
  }
  /* ********************** ACTIONS ************************* */
  @Action(BrowsePhonebookAction.LoadPhonebook)
  loadPhonebook(
    { setState, dispatch, getState }: StateContext<BrowsePhonebookStateModel>,
    { payload }: BrowsePhonebookAction.LoadPhonebook
  ) {
    setState(
      patch<BrowsePhonebookStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new PhonebookAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }
  @Action(BrowsePhonebookAction.CreatePhonebook)
  CreatePhonebook(
    { dispatch }: StateContext<BrowsePhonebookStateModel>,
    { payload }: BrowsePhonebookAction.CreatePhonebook
  ) {
    return dispatch(new PhonebookAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowsePhonebookAction.LoadPhonebook(),
          new BrowsePhonebookAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowsePhonebookAction.UpdatePhonebook)
  UpdatePhonebook(
    { dispatch }: StateContext<BrowsePhonebookStateModel>,
    { payload }: BrowsePhonebookAction.UpdatePhonebook
  ) {
    return dispatch(new PhonebookAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowsePhonebookAction.LoadPhonebook(),
          new BrowsePhonebookAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {})
    );
  }

  @Action(BrowsePhonebookAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowsePhonebookStateModel>,
    { payload }: BrowsePhonebookAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.phonebookId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowsePhonebookAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowsePhonebookStateModel>,
    { payload }: BrowsePhonebookAction.UpdateFilter
  ) {
    setState(
      patch<BrowsePhonebookStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: 0,
          filters: iif(
            payload.clear === true,
            {},
            patch({
              ...payload,
            })
          ),
        }),
      })
    );
  }
}
