import { EMPTY } from 'rxjs';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { Injectable } from '@angular/core';
import { BcVersions } from '../../../../api/models/bc-versions';
import { BcVersionsControllerService } from '../../../../api/services/bc-versions-controller.service';
import { BCAction } from '@core/states/bc/bc/bc.action';
import { PageBcVersions } from '../../../../api/models/page-bc-versions';
import { BcVersionsStatus } from '../../../../api/models/bc-versions-status';
export enum VERSION_STATUSES {
  CREATED = 1,
  UNDER_APPROVAL,
  APPROVED,
  NEEDS_MODIFICATIONS,
  ARCHIVED,
}

export interface BCStateModel {
  versions: PageBcVersions;
  selectedVersion: BcVersions;
  status: BcVersionsStatus;
  loading: boolean;
  blocking: boolean;
}

const BC_STATE_TOKEN = new StateToken<BCState>('bc');

@State<BCState>({ name: BC_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BCState {
  /**
   *
   */
  constructor(private bC: BcVersionsControllerService) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BCState])
  static versions(state: BCStateModel) {
    return state?.versions?.content;
  }

  @Selector([BCState])
  static status(state: BCStateModel) {
    return state?.status;
  }

  @Selector([BCState])
  static selectedVersion(state: BCStateModel) {
    return state?.selectedVersion;
  }

  @Selector([BCState])
  static totalRecords(state: BCStateModel) {
    return state?.versions?.totalElements;
  }

  @Selector([BCState])
  static loading(state: BCStateModel) {
    return state?.loading;
  }

  @Selector([BCState])
  static blocking(state: BCStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BCAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<BCStateModel>,
    { payload }: BCAction.LoadPage
  ) {
    setState(
      patch<BCStateModel>({
        loading: true,
      })
    );
    return this.bC
      .getAll10({
        isActive: true,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        // request: payload.filters,
      })
      .pipe(
        tap((res) => {
          const sortedVersions = res.result.content.sort((a, b) => b.id - a.id);
          setState(
            patch<BCStateModel>({
              versions: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<BCStateModel>({
              versions: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<BCStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(BCAction.Create)
  create(
    { setState }: StateContext<BCStateModel>,
    { payload }: BCAction.Create
  ) {
    setState(
      patch<BCStateModel>({
        blocking: true,
      })
    );
    return this.bC
      .insertOne1({
        body: payload,
      })
      .pipe(
        tap((bc) => {
          setState(
            patch<BCStateModel>({
              selectedVersion: bc.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<BCStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(BCAction.GetVersion, { cancelUncompleted: true })
  getBc({ setState }: StateContext<BCStateModel>, { payload }: BCAction.GetVersion) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<BCStateModel>({
          selectedVersion: undefined,
        })
      );
      return;
    }
    setState(
      patch<BCStateModel>({
        blocking: true,
      })
    );
    return this.bC.getOne({ id: payload.id }).pipe(
      tap((bc) => {
        setState(
          patch<BCStateModel>({
            selectedVersion: bc.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<BCStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(BCAction.Status, { cancelUncompleted: true })
  getstatus(
    { setState }: StateContext<BCStateModel>,
    { payload }: BCAction.Status
  ) {
    /*if (payload.id === undefined || payload.id === null) {
      setState(
        patch<BCStateModel>({
          bc: undefined,
        })
      );
      return;
    }*/
    setState(
      patch<BCStateModel>({
        blocking: true,
      })
    );
    return this.bC
      .manageVersionStatus({
        versionId: payload.versionId,
        statusId: payload.statusId,
      })
      .pipe(
        tap((status) => {
          setState(
            patch<BCStateModel>({
              status: status.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<BCStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
