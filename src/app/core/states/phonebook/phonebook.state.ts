import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { PhonebookAction } from './phonebook.action';
import {ExternalPhonebookControllerService} from "../../../api/services/external-phonebook-controller.service";
import {PageExternalPhonebookProjection} from "../../../api/models/page-external-phonebook-projection";
import {ExternalPhonebook} from "../../../api/models/external-phonebook";


export interface PhonebookStateModel {
  page: PageExternalPhonebookProjection;
  phonebook: ExternalPhonebook; //User
  loading: boolean;
  blocking: boolean;
  // sidebar state
  sidebarPage: PageExternalPhonebookProjection;
  sidebarLoading: boolean;
}

const PHONEBOOK_STATE_TOKEN = new StateToken<PhonebookStateModel>('phonebook');

@State<PhonebookStateModel>({ name: PHONEBOOK_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class PhonebookState {
  constructor(private phonebookService: ExternalPhonebookControllerService) {}
  /* ************************ SELECTORS ******************** */
  @Selector([PhonebookState])
  static page(state: PhonebookStateModel) {
    return state?.page?.content;
  }
  @Selector([PhonebookState])
  static totalRecords(state: PhonebookStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([PhonebookState])
  static phonebook(state: PhonebookStateModel) {
    return state?.phonebook;
  }

  @Selector([PhonebookState])
  static loading(state: PhonebookStateModel) {
    return state?.loading;
  }

  @Selector([PhonebookState])
  static blocking(state: PhonebookStateModel) {
    return state?.blocking;
  }
  // sidebar selectors
  @Selector([PhonebookState])
  static sidebarPage(state: PhonebookStateModel) {
    return state?.sidebarPage?.content;
  }
  @Selector([PhonebookState])
  static totalSidebarPageRecords(state: PhonebookStateModel) {
    return state?.sidebarPage?.totalElements;
  }
  @Selector([PhonebookState])
  static sidebarLoading(state: PhonebookStateModel) {
    return state?.sidebarLoading;
  }

  /* ********************** ACTIONS ************************* */
  @Action(PhonebookAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<PhonebookStateModel>,
    { payload }: PhonebookAction.LoadPage
  ) {
    setState(
      patch<PhonebookStateModel>({
        loading: true,
      })
    );
    return this.phonebookService
      .search2({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        ...payload.filters,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<PhonebookStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<PhonebookStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<PhonebookStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(PhonebookAction.GetPhonebook, { cancelUncompleted: true })
  getPhonebook(
    { setState }: StateContext<PhonebookStateModel>,
    { payload }: PhonebookAction.GetPhonebook
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<PhonebookStateModel>({
          phonebook: undefined,
        })
      );
      return;
    }

    return this.phonebookService.getById4({ id: payload.id }).pipe(
      tap((res) => {
        setState(
          patch<PhonebookStateModel>({
            phonebook: res.result,
          })
        );
      })
    );
  }

  @Action(PhonebookAction.Create)
  create(
    { setState }: StateContext<PhonebookStateModel>,
    { payload }: PhonebookAction.Create
  ) {
    setState(
      patch<PhonebookStateModel>({
        blocking: true,
      })
    );
    return this.phonebookService
      .create17({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<PhonebookStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(PhonebookAction.Update)
  update(
    { setState }: StateContext<PhonebookStateModel>,
    { payload }: PhonebookAction.Update
  ) {
    setState(
      patch<PhonebookStateModel>({
        blocking: true,
      })
    );
    return this.phonebookService
      .update17({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<PhonebookStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
  // sidebar actions
  @Action(PhonebookAction.LoadSidebarPage, { cancelUncompleted: true })
  loadSidebarPage(
    { setState }: StateContext<PhonebookStateModel>,
    { payload }: PhonebookAction.LoadPage
  ) {
    setState(
      patch<PhonebookStateModel>({
        sidebarLoading: true,
      })
    );
    return this.phonebookService
      .search2({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        ...payload.filters,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<PhonebookStateModel>({
              sidebarPage: res.result,
              sidebarLoading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<PhonebookStateModel>({
              sidebarPage: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<PhonebookStateModel>({
              sidebarLoading: false,
            })
          );
        })
      );
  }
}
