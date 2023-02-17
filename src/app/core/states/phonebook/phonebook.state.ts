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
import { EmergenciesPhonebookService } from 'src/app/modules/emergencies-phonebook/emergencies-phonebook.service';
import { PhonebookAction } from './phonebook.action';

export interface PhonebookStateModel {
  page: any; //PageUserAndRoleProjection
  phonebook: any; //User
  loading: boolean;
  blocking: boolean;
}

const PHONEBOOK_STATE_TOKEN = new StateToken<PhonebookStateModel>('phonebook');

@State<PhonebookStateModel>({ name: PHONEBOOK_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class PhonebookState {
  constructor(private phonebookService: EmergenciesPhonebookService) {}
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
      .getPhonebook({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        request: {
          ...payload.filters,
        },
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
