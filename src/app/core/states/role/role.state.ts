import { Injectable } from '@angular/core';
import { MessageHelper } from '@core/helpers/message.helper';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { PageRoleProjection, Role, RoleProjection } from 'src/app/api/models';
import { RoleControllerService } from 'src/app/api/services';
import { RoleAction } from './role.action';

export interface RoleStateModel {
  page: PageRoleProjection;
  role: RoleProjection;
  loading: boolean;
  blocking: boolean;
  /**
   * temporary state to store entities and select them once
   */
  roles: Role[];
}

const ROLE_STATE_TOKEN = new StateToken<RoleStateModel>('role');
@State<RoleStateModel>({ name: ROLE_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class RoleState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private roleService: RoleControllerService
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([RoleState])
  static page(state: RoleStateModel) {
    return state?.page?.content;
  }
  @Selector([RoleState])
  static totalRecords(state: RoleStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([RoleState])
  static role(state: RoleStateModel) {
    return state?.role;
  }

  @Selector([RoleState])
  static loading(state: RoleStateModel) {
    return state?.loading;
  }

  @Selector([RoleState])
  static blocking(state: RoleStateModel) {
    return state?.blocking;
  }

  @Selector([RoleState])
  static roles(state: RoleStateModel) {
    return state?.roles;
  }
  /* ********************** ACTIONS ************************* */
  @Action(RoleAction.LoadRoles)
  loadRoles(
    { setState }: StateContext<RoleStateModel>,
    { payload }: RoleAction.LoadRoles
  ) {
    if (payload.orgId === null || payload.orgId === undefined) {
      setState(
        patch<RoleStateModel>({
          roles: [],
        })
      );
      return;
    }
    return this.roleService.getByOrgId({ orgId: payload.orgId }).pipe(
      tap((r) => {
        setState(
          patch<RoleStateModel>({
            roles: r.result,
          })
        );
      })
    );
  }

  // ============================================================

  /* ********************** ACTIONS ************************* */
  @Action(RoleAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<RoleStateModel>,
    { payload }: RoleAction.LoadPage
  ) {
    setState(
      patch<RoleStateModel>({
        loading: true,
      })
    );
    return this.roleService
      .findByPage1({
        ...payload.filters,
        orgIds:
          payload.filters?.orgIds?.length > 0
            ? payload.filters?.orgIds
            : undefined,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<RoleStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<RoleStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<RoleStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(RoleAction.GetRole, { cancelUncompleted: true })
  getRole(
    { setState }: StateContext<RoleStateModel>,
    { payload }: RoleAction.GetRole
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<RoleStateModel>({
          role: undefined,
        })
      );
      return;
    }
    setState(
      patch<RoleStateModel>({
        blocking: true,
      })
    );
    return this.roleService.getById3({ id: payload.id }).pipe(
      tap((res) => {
        setState(
          patch<RoleStateModel>({
            role: res.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<RoleStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(RoleAction.Activate)
  activate(
    { setState }: StateContext<RoleStateModel>,
    { payload }: RoleAction.Activate
  ) {
    return this.roleService.getById3({ id: payload.id }).pipe(
      switchMap((res) => {
        return this.roleService
          .updateRole({
            body: { ...res.result, isActive: true } as any,
          })
          .pipe(
            tap(() => {
              this.messageHelper.success();
              setState(
                patch<RoleStateModel>({
                  page: patch<PageRoleProjection>({
                    content: updateItem(
                      (r) => r.id === payload.id,
                      patch<RoleProjection>({
                        isActive: true,
                      })
                    ),
                  }),
                })
              );
            })
          );
      })
    );
  }

  @Action(RoleAction.Create)
  create(
    { setState }: StateContext<RoleStateModel>,
    { payload }: RoleAction.Create
  ) {
    setState(
      patch<RoleStateModel>({
        blocking: true,
      })
    );
    return this.roleService
      .createRole({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<RoleStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(RoleAction.Update)
  update(
    { setState }: StateContext<RoleStateModel>,
    { payload }: RoleAction.Update
  ) {
    setState(
      patch<RoleStateModel>({
        blocking: true,
      })
    );
    return this.roleService
      .updateRole({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<RoleStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
