import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
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
import { OffcanvasPhonebookAction } from './offcanvas-phonebook.action';

export interface OffcanvasPhonebookStateModel {
  pageRequest: PageRequestModel;
}

export const OFFCANVAS_PHONEBOOK_UI_STATE_TOKEN =
  new StateToken<OffcanvasPhonebookStateModel>('Offcanvas_phonebook');

@State<OffcanvasPhonebookStateModel>({
  name: OFFCANVAS_PHONEBOOK_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {
        active: true,
      },
      first: 0,
      rows: 20,
    },
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class OffcanvasPhonebookState {
  /**
   *
   */
  constructor(private apiHelper: ApiHelper) {}
  /* ************************ SELECTORS ******************** */
  @Selector([OffcanvasPhonebookState])
  static state(
    state: OffcanvasPhonebookStateModel
  ): OffcanvasPhonebookStateModel {
    return state;
  }
  @Selector([OffcanvasPhonebookState])
  static hasFilters(state: OffcanvasPhonebookStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter((k) => k !== 'active' && k !== 'isInternal')
        .length > 0
    );
  }
  /* ********************** ACTIONS ************************* */
  @Action(OffcanvasPhonebookAction.LoadPhonebook)
  loadPhonebook(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<OffcanvasPhonebookStateModel>,
    { payload }: OffcanvasPhonebookAction.LoadPhonebook
  ) {
    setState(
      patch<OffcanvasPhonebookStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new PhonebookAction.LoadSidebarPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }

  @Action(OffcanvasPhonebookAction.ToggleDialog, { cancelUncompleted: true })
  openDialog({}: StateContext<OffcanvasPhonebookStateModel>) {}

  @Action(OffcanvasPhonebookAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<OffcanvasPhonebookStateModel>,
    { payload }: OffcanvasPhonebookAction.UpdateFilter
  ) {
    setState(
      patch<OffcanvasPhonebookStateModel>({
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
