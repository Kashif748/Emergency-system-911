import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
  Store,
  createSelector,
} from '@ngxs/store';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import {
  PageUserAndRoleProjection,
  User,
  UserAndRoleProjection,
  UserInappAuthentication,
  UserMiddlewareAuth,
  Ranks,
  OrgStructure,
  Role,
} from 'src/app/api/models';
import {
  DmsControllerService,
  RanksControllerService,
  RoleControllerService,
  UserProfileControllerService,
} from 'src/app/api/services';
import { UserAction } from './user.action';
import { patch, updateItem } from '@ngxs/store/operators';
import { UrlHelperService } from '@core/services/url-helper.service';
import { ILangFacade } from '@core/facades/lang.facade';
import { MessageHelper } from '@core/helpers/message.helper';
import { UploadTagIdConst } from '@core/constant/UploadTagIdConst';
import { OrgState } from '../org/org.state';
import { EMPTY, of } from 'rxjs';
import { TextUtils } from '@core/utils';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';

export interface UserStateModel {
  page?: PageUserAndRoleProjection;
  user?: User & UserInappAuthentication & UserMiddlewareAuth;
  ranks?: Ranks[];
  groupMapUser?: UserAndRoleProjection[];
  loading?: boolean;
  blocking?: boolean;
  users?: UserAndRoleProjection[];
  usersIsolated: { [key: string]: UserAndRoleProjection[] };
}

const USER_STATE_TOKEN = new StateToken<UserStateModel>('user');

@State<UserStateModel>({
  name: USER_STATE_TOKEN,
  defaults: { usersIsolated: {} },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class UserState {
  /**
   *
   */
  constructor(
    private userService: UserProfileControllerService,
    private rankService: RanksControllerService,
    private urlHelper: UrlHelperService,
    private langFacade: ILangFacade,
    private messageHelper: MessageHelper,
    private dmsService: DmsControllerService,
    private store: Store,
    private roleService: RoleControllerService
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([UserState])
  static page(state: UserStateModel) {
    return state?.page?.content;
  }

  @Selector([UserState])
  static users(state: UserStateModel) {
    return state?.users;
  }

  static usersIsolated(key: string) {
    return createSelector([UserState], (state: UserStateModel) => {
      return state.usersIsolated[key];
    });
  }

  @Selector([UserState])
  static totalRecords(state: UserStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([UserState])
  static user(state: UserStateModel) {
    return state?.user;
  }

  @Selector([UserState])
  static groupMapUsers(state: UserStateModel) {
    return state?.groupMapUser;
  }

  @Selector([UserState])
  static ranks(state: UserStateModel) {
    return state?.ranks;
  }

  @Selector([UserState])
  static loading(state: UserStateModel) {
    return state?.loading;
  }

  @Selector([UserState])
  static blocking(state: UserStateModel) {
    return state?.blocking;
  }
  /* ********************** ACTIONS ************************* */
  @Action(UserAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<UserStateModel>,
    { payload }: UserAction.LoadPage
  ) {
    setState(
      patch<UserStateModel>({
        loading: true,
      })
    );
    return this.userService
      .getAllUsers1({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        request: payload.filters,
      })
      .pipe(
        tap(({ result }) => {
          setState(
            patch<UserStateModel>({
              page: {
                ...result,
                content: result?.content?.map((u) => {
                  return {
                    ...u,
                    expireDate: DateTimeUtil.getDateInGMTFormat(
                      u.expireDate
                    ) as any,
                  };
                }),
              },
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<UserStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<UserStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(UserAction.LoadUsers, { cancelUncompleted: true })
  loadUsers(
    { setState }: StateContext<UserStateModel>,
    { payload }: UserAction.LoadUsers
  ) {
    return this.userService
      .getAllForOrg({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        name: payload.search,
      })
      .pipe(
        tap(({ result: { content: list } }) => {
          if (payload.isolatedKey) {
            setState(
              patch<UserStateModel>({
                usersIsolated: {
                  [payload.isolatedKey]: list,
                },
              })
            );
          } else {
            setState(
              patch<UserStateModel>({
                users: list,
              })
            );
          }
        })
      );
  }

  @Action(UserAction.GetUser, { cancelUncompleted: true })
  getUser(
    { setState }: StateContext<UserStateModel>,
    { payload }: UserAction.GetUser
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<UserStateModel>({
          user: undefined,
        })
      );
      return;
    }
    setState(
      patch<UserStateModel>({
        blocking: true,
      })
    );
    return this.userService.get1({ userId: payload.id }).pipe(
      map(({ result: u }) => {
        return {
          ...u,
          expireDate: DateTimeUtil.getDateInGMTFormat(u.expireDate) as any,
        };
      }),
      switchMap((user) =>
        this.dmsService
          .findAttachment({
            entityId: payload.id,
            entityTagId: UploadTagIdConst.SIGNATURE,
          })
          .pipe(
            map((a) => {
              return {
                ...user,
                signature: a.result[0]?.uuid,
              };
            }),
            catchError(() => of(user))
          )
      ),
      switchMap((user) =>
        this.dmsService
          .findAttachment({
            entityId: payload.id,
            entityTagId: UploadTagIdConst.USER_PHOTO,
          })
          .pipe(
            map((a) => {
              return {
                ...user,
                profileImg: a.result[0]?.uuid,
              };
            }),
            catchError(() => of(user))
          )
      ),
      switchMap((user) =>
        this.store.selectOnce(OrgState.orgs).pipe(
          map((orgs) => {
            if (!orgs) {
              return user;
            }
            return {
              ...user,
              orgStructure: orgs.find(
                (o) => o.id == user.orgStructure?.id
              ) as OrgStructure,
            };
          })
        )
      ),
      switchMap((user) =>
        this.roleService.getByOrgId({ orgId: user.orgStructure?.id }).pipe(
          map(({ result: roles }) => {
            return {
              ...user,
              roleIds: user?.roleIds
                ?.map((id) => roles.find((r) => r.id == id))
                ?.filter((v) => !!v) as any,
            };
          }),
          catchError(() =>
            of({
              ...user,
              roleIds: user?.roleIds?.map((id) => {
                return { id, ...TextUtils.OBFUSCATE_I18N_NAME };
              }) as any,
            })
          )
        )
      ),
      tap((user) => {
        setState(
          patch<UserStateModel>({
            user: user,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<UserStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(UserAction.GetRanks)
  getRanks(
    { setState }: StateContext<UserStateModel>,
    {}: UserAction.GetRanks
  ) {
    return this.rankService.findActiveList1({}).pipe(
      tap((res) => {
        setState(
          patch<UserStateModel>({
            ranks: res.result,
          })
        );
      })
    );
  }

  @Action(UserAction.Export, { cancelUncompleted: true })
  export({}: StateContext<UserStateModel>, { payload }: UserAction.Export) {
    return this.userService
      .export1({
        as: payload.type,
        lang: this.langFacade.stateSanpshot.ActiveLang.key == 'ar',
        request: payload.filters,
      })
      .pipe(
        tap((res: any) => {
          const newBlob = new Blob([res], {
            type: `application/${
              payload.type === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }`,
          });
          this.urlHelper.downloadBlob(
            newBlob,
            `USERS - ${new Date().toISOString().split('.')[0]}`
          );
        })
      );
  }

  @Action(UserAction.Activate)
  activate(
    { setState }: StateContext<UserStateModel>,
    { payload }: UserAction.Activate
  ) {
    return this.userService
      .updateUserToActive({
        userId: payload.id,
      })
      .pipe(
        tap(() => {
          this.messageHelper.success();
          setState(
            patch<UserStateModel>({
              page: patch<PageUserAndRoleProjection>({
                content: updateItem(
                  (u) => u.id === payload.id,
                  patch<UserAndRoleProjection>({
                    isActive: true,
                  })
                ),
              }),
            })
          );
        })
      );
  }

  @Action(UserAction.Create)
  create(
    { setState }: StateContext<UserStateModel>,
    { payload }: UserAction.Create
  ) {
    setState(
      patch<UserStateModel>({
        blocking: true,
      })
    );
    return this.userService
      .v2Create({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<UserStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(UserAction.Update)
  update(
    { setState }: StateContext<UserStateModel>,
    { payload }: UserAction.Update
  ) {
    setState(
      patch<UserStateModel>({
        blocking: true,
      })
    );
    return this.userService
      .v2Update({
        userId: payload.id,
        body: { ...payload, id: undefined, password: '' },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<UserStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(UserAction.UploadSignature)
  uploadSignature(
    { getState, setState }: StateContext<UserStateModel>,
    { payload }: UserAction.UploadSignature
  ) {
    setState(
      patch<UserStateModel>({
        blocking: true,
      })
    );
    const user = getState().user;
    const formData: FormData = new FormData();
    formData.append('file', payload.file, payload.file.name);
    return this.dmsService
      .upload({
        tagId: UploadTagIdConst.SIGNATURE,
        recordId: user.id,
        body: formData as any,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<UserStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(UserAction.UploadProfilePhoto)
  uploadProfilePhoto(
    { getState, setState }: StateContext<UserStateModel>,
    { payload }: UserAction.UploadProfilePhoto
  ) {
    setState(
      patch<UserStateModel>({
        blocking: true,
      })
    );
    const user = getState().user;
    const formData: FormData = new FormData();
    formData.append('file', payload.file, payload.file.name);
    return this.dmsService
      .upload({
        tagId: UploadTagIdConst.USER_PHOTO,
        recordId: user.id,
        body: formData as any,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<UserStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
