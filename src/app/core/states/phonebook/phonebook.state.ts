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
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { ExternalPhonebook, PageExternalPhonebook } from 'src/app/api/models';
import { ExternalPhonebookControllerService } from 'src/app/api/services';
import { EmergenciesPhonebookService } from 'src/app/modules/emergencies-phonebook/emergencies-phonebook.service';
import { PhonebookAction } from './phonebook.action';

export interface PhonebookStateModel {
  page: PageExternalPhonebook;
  phonebook: ExternalPhonebook; //User
  loading: boolean;
  blocking: boolean;
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
      .search1({
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
}
