import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { patch } from '@ngxs/store/operators';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { SystemsAction } from './systems.action';
import { BcSystemsControllerService } from 'src/app/api/services';
import { BcSystems, PageBcSystems } from 'src/app/api/models';

export interface SystemsStateModel {
  page: PageBcSystems;
  system: BcSystems;
  loading: boolean;
  blocking: boolean;
}

const SYSTEMS_STATE_TOKEN = new StateToken<SystemsStateModel>('systems');

@State<SystemsStateModel>({ name: SYSTEMS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class SystemsState {
  /**
   *
   */
  constructor(
    private systemsService: BcSystemsControllerService,
    private store: Store
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([SystemsState])
  static page(state: SystemsStateModel) {
    return state?.page?.content;
  }

  @Selector([SystemsState])
  static system(state: SystemsStateModel) {
    return state?.system;
  }

  @Selector([SystemsState])
  static totalRecords(state: SystemsStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([SystemsState])
  static loading(state: SystemsStateModel) {
    return state?.loading;
  }

  @Selector([SystemsState])
  static blocking(state: SystemsStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(SystemsAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<SystemsStateModel>,
    { payload }: SystemsAction.LoadPage
  ) {
    setState(
      patch<SystemsStateModel>({
        loading: true,
      })
    );

    return this.systemsService
      .getAll10({
        isActive: true,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort ? payload.sort : ['id', 'desc'],
        },
        orgHierarchyId:
          payload?.filters?.orgHierarchyId
            ?.map((node) => node.key)
            ?.join(',') || '',
        name: payload.filters?.name ,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<SystemsStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<SystemsStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<SystemsStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(SystemsAction.Create)
  create(
    { setState }: StateContext<SystemsStateModel>,
    { payload }: SystemsAction.Create
  ) {
    setState(
      patch<SystemsStateModel>({
        blocking: true,
      })
    );
    return this.systemsService
      .insertOne3({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<SystemsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(SystemsAction.Update)
  update(
    { setState }: StateContext<SystemsStateModel>,
    { payload }: SystemsAction.Update
  ) {
    setState(
      patch<SystemsStateModel>({
        blocking: true,
      })
    );

    return this.systemsService
      .update82({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<SystemsStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(SystemsAction.Delete)
  delete(
    { setState }: StateContext<SystemsStateModel>,
    { payload }: SystemsAction.Delete
  ) {
    return this.systemsService.deleteById3({ id: payload.id });
  }
  @Action(SystemsAction.GetSystem, { cancelUncompleted: true })
  getLocation(
    { setState }: StateContext<SystemsStateModel>,
    { payload }: SystemsAction.GetSystem
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<SystemsStateModel>({
          system: undefined,
        })
      );
      return;
    }
    setState(
      patch<SystemsStateModel>({
        blocking: true,
      })
    );
    return this.systemsService.getOne3({ id: payload.id }).pipe(
      tap((system) => {
        setState(
          patch<SystemsStateModel>({
            system: system.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<SystemsStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
