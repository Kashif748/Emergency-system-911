import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {EMPTY} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';
import {BcResourcesRemoteWorkControllerService} from "../../../../api/services/bc-resources-remote-work-controller.service";
import {PageBcResourcesRemoteWork} from "../../../../api/models/page-bc-resources-remote-work";
import {BcResourcesRemoteWork} from "../../../../api/models/bc-resources-remote-work";
import {RemoteWorkAction} from "@core/states/bc-resources/remote-work/remote-work.action";

export interface RemoteWorkStateModel {
  page: PageBcResourcesRemoteWork;
  remoteWork: BcResourcesRemoteWork;
  loading: boolean;
  blocking: boolean;
}

const REMOTE_WORK_STATE_TOKEN =
  new StateToken<RemoteWorkStateModel>('remote_work');

@State<RemoteWorkStateModel>({ name: REMOTE_WORK_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class RemoteWorkState {
  /**
   *
   */
  constructor(
    private remoteWork: BcResourcesRemoteWorkControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([RemoteWorkState])
  static page(state: RemoteWorkStateModel) {
    return state?.page?.content;
  }

  @Selector([RemoteWorkState])
  static remoteWork(state: RemoteWorkStateModel) {
    return state?.remoteWork;
  }

  @Selector([RemoteWorkState])
  static totalRecords(state: RemoteWorkStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([RemoteWorkState])
  static loading(state: RemoteWorkStateModel) {
    return state?.loading;
  }

  @Selector([RemoteWorkState])
  static blocking(state: RemoteWorkStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(RemoteWorkAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<RemoteWorkStateModel>,
    { payload }: RemoteWorkAction.LoadPage
  ) {
    setState(
      patch<RemoteWorkStateModel>({
        loading: true,
      })
    );
    return this.remoteWork
      .search11({
        resourceId: payload.resourceId,
        isActive: true,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<RemoteWorkStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<RemoteWorkStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<RemoteWorkStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(RemoteWorkAction.Create)
  create(
    { setState }: StateContext<RemoteWorkStateModel>,
    { payload }: RemoteWorkAction.Create
  ) {
    setState(
      patch<RemoteWorkStateModel>({
        blocking: true,
      })
    );
    return this.remoteWork
      .insertOne6({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<RemoteWorkStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(RemoteWorkAction.Update)
  update(
    { setState }: StateContext<RemoteWorkStateModel>,
    { payload }: RemoteWorkAction.Update
  ) {
    setState(
      patch<RemoteWorkStateModel>({
        blocking: true,
      })
    );
    return this.remoteWork
      .update85({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<RemoteWorkStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(RemoteWorkAction.GetRemoteWork, { cancelUncompleted: true })
  getRemoteWork(
    { setState }: StateContext<RemoteWorkStateModel>,
    { payload }: RemoteWorkAction.GetRemoteWork
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<RemoteWorkStateModel>({
          remoteWork: undefined,
        })
      );
      return;
    }
    setState(
      patch<RemoteWorkStateModel>({
        blocking: true,
      })
    );
    return this.remoteWork.getOne7({ id: payload.id }).pipe(
      tap((remoteWork) => {
        setState(
          patch<RemoteWorkStateModel>({
            remoteWork: remoteWork.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<RemoteWorkStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
