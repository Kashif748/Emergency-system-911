import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { GroupLocationGeoResponse, OrgStructure } from 'src/app/api/models';
import { OrgMapGisLayerControllerService } from 'src/app/api/services';
import { GroupAction } from './group.action';
import { patch, updateItem } from '@ngxs/store/operators';
import { UrlHelperService } from '@core/services/url-helper.service';
import { ILangFacade } from '@core/facades/lang.facade';
import { OrgState } from '../org/org.state';
import { EMPTY } from 'rxjs';
import { ManageGroupsService } from '../../../api/services/manage-groups.service';
import { Group } from '../../../api/models/group';
import { PageGroupProjection } from '../../../api/models/page-group-projection';
import {
  Pageable,
  User,
  UserAndRoleProjection,
  UserInappAuthentication,
  UserMiddlewareAuth,
} from '../../../api/models';
import { GroupProjection } from '../../../api/models/group-projection';
import { UserGroupMapControllerService } from '../../../api/services/user-group-map-controller.service';
import { GroupUser } from '../../../api/models/group-user';
import { MessageHelper } from '@core/helpers/message.helper';
import { GroupLocationGeoInfo } from '../../../api/models/group-location-geo-info';
import { GroupLocationGeometryControllerService } from '../../../api/services/group-location-geometry-controller.service';
import { UserProfileControllerService } from '../../../api/services';
import { userType } from '../../../modules/groups-management/group.model';
import { GroupContractControllerService } from 'src/app/api/services/group-contract-controller.service';
import { GroupContract } from 'src/app/api/models/group-contract';

export interface GroupStateModel {
  page: PageGroupProjection;
  group: Group | GroupProjection;
  user: User & UserInappAuthentication & UserMiddlewareAuth;
  groupUser: GroupUser;
  groupContract: GroupContract;
  createdGroup: Group;
  groupLocGeometry: GroupLocationGeoInfo | GroupLocationGeoResponse[];
  groupMapUser: UserAndRoleProjection[];
  usersAssignToGroup: UserAndRoleProjection[];
  loading: boolean;
  blocking: boolean;
}

const USER_STATE_TOKEN = new StateToken<GroupStateModel>('group');

@State<GroupStateModel>({ name: USER_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class GroupState {
  /**
   *
   */
  constructor(
    private groupService: ManageGroupsService,
    private urlHelper: UrlHelperService,
    private langFacade: ILangFacade,
    private store: Store,
    private messageHelper: MessageHelper,
    private createUserGroupMap: UserGroupMapControllerService,
    private groupLocationGeometry: GroupLocationGeometryControllerService,
    private userService: UserProfileControllerService,
    private contractController: GroupContractControllerService
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([GroupState])
  static page(state: GroupStateModel) {
    return state?.page?.content;
  }
  @Selector([GroupState])
  static totalRecords(state: GroupStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([GroupState])
  static group(state: GroupStateModel) {
    return state?.group;
  }

  @Selector([GroupState])
  static geometryResponse(state: GroupStateModel) {
    return state?.groupLocGeometry;
  }

  @Selector([GroupState])
  static loading(state: GroupStateModel) {
    return state?.loading;
  }

  @Selector([GroupState])
  static blocking(state: GroupStateModel) {
    return state?.blocking;
  }

  @Selector([GroupState])
  static groupMapUsers(state: GroupStateModel) {
    return state?.groupMapUser;
  }

  @Selector([GroupState])
  static usersAssignToGroup(state: GroupStateModel) {
    return state?.usersAssignToGroup;
  }
  @Selector([GroupState])
  static groupContract(state: GroupStateModel) {
    return state?.groupContract;
  }

  /* ********************** ACTIONS ************************* */
  @Action(GroupAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.LoadPage
  ) {
    setState(
      patch<GroupStateModel>({
        loading: true,
      })
    );
    return this.groupService
      .findByPage2({
        page: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        } as Pageable,
        filter: {
          ...payload.filters,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<GroupStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<GroupStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(GroupAction.GetGroup, { cancelUncompleted: true })
  getUser(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.GetGroup
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<GroupStateModel>({
          group: undefined,
        })
      );
      return;
    }
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.groupService.get20({ id: payload.id }).pipe(
      switchMap((res) =>
        this.store.selectOnce(OrgState.orgs).pipe(
          map((orgs) => {
            if (!orgs) {
              return res;
            }
            return {
              ...res,
              orgStructure: orgs.find(
                (o) => o.id == res.result.orgStructure?.id
              ) as OrgStructure,
            };
          })
        )
      ),
      tap((res) => {
        setState(
          patch<GroupStateModel>({
            group: res.result,
            usersAssignToGroup: res.result.users,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<GroupStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(GroupAction.Export, { cancelUncompleted: true })
  export({}: StateContext<GroupStateModel>, { payload }: GroupAction.Export) {
    return this.groupService
      .export6({
        as: payload.type,
        lang: this.langFacade.stateSanpshot.ActiveLang.key == 'ar',
        filter: { ...payload.filters },
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
            `TEAMS&GROUPS - ${new Date().toISOString().split('.')[0]}`
          );
        })
      );
  }

  @Action(GroupAction.Activate)
  activate(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.Activate
  ) {
    return this.groupService
      .get20({
        id: payload.id,
      })
      .pipe(
        tap(() => {
          this.messageHelper.success();
          setState(
            patch<GroupStateModel>({
              page: patch<PageGroupProjection>({
                content: updateItem(
                  (u) => u.id === payload.id,
                  patch<GroupProjection>({
                    isActive: true,
                  })
                ),
              }),
            })
          );
        })
      );
  }

  @Action(GroupAction.CreateUser)
  createUser(
    { setState, getState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.CreateUser
  ) {
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.createUserGroupMap
      .createUserGroupMap({
        groupId: getState().createdGroup?.id || payload.groupId,
        body: payload.user,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(GroupAction.GroupGeometryLocation)
  groupGeometryLocation(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.GroupGeometryLocation
  ) {
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.groupLocationGeometry
      .update52({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
  @Action(GroupAction.AddContract)
  AddContract(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.AddContract
  ) {
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.contractController
      .update53({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
  @Action(GroupAction.GetContract)
  GetContract(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.GetContract
  ) {
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.contractController
      .getByGroup({
        groupId: payload.groupId,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<GroupStateModel>({
              groupContract: res.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(GroupAction.Create)
  create(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.Create
  ) {
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.groupService
      .create46({
        body: payload,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<GroupStateModel>({
              createdGroup: res.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(GroupAction.Delete)
  delete(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.Delete
  ) {
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.groupService
      .update51({
        body: payload,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<GroupStateModel>({
              createdGroup: res.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(GroupAction.Update)
  update(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.Update
  ) {
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.groupService
      .update51({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(GroupAction.UpdateUser)
  updateUser(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.UpdateUser
  ) {
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.createUserGroupMap
      .updateUserGroupMemberMap({
        groupId: payload.groupId,
        body: payload.user,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(GroupAction.UpdateManager)
  UpdateManager(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.UpdateManager
  ) {
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.createUserGroupMap
      .updateUserGroupManagerMap({
        groupId: payload.groupId,
        body: payload.user,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(GroupAction.GetGeometryLocation, { cancelUncompleted: true })
  getGeometryLocationInfo(
    { setState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.GetGeometryLocation
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<GroupStateModel>({
          groupLocGeometry: undefined,
        })
      );
      return;
    }
    setState(
      patch<GroupStateModel>({
        blocking: true,
      })
    );
    return this.groupLocationGeometry
      .getByGroupId({
        groupId: payload.id,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<GroupStateModel>({
              groupLocGeometry: res.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<GroupStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(GroupAction.LoadGroupMapUserPage, { cancelUncompleted: true })
  LoadGroupMapUserPage(
    { setState, getState }: StateContext<GroupStateModel>,
    { payload }: GroupAction.LoadGroupMapUserPage
  ) {
    const users = getState().usersAssignToGroup;
    let manager;
    if (users) {
      manager = users.find((item, index) => {
        if (item['type'] == userType.MANAGER) {
          return item;
        }
      });
    }
    if (payload.selectedUsers) {

    }
    return this.userService
      .getAllForOrg({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        name: payload.name,
      })
      .pipe(
        tap(({ result: { content: list } }) => {
          setState(
            patch<GroupStateModel>({
              groupMapUser: list.map((v) => {
                if (payload.type === 'manager') {
                  const isDisabled = payload.selectedUsers?.some(selectedUser => selectedUser.id === v.id) ?? false;
                  return { ...v, disabled: isDisabled };
                } else {
                  const isManager = manager?.user?.id === v.id || (payload.selectedUsers && payload.selectedUsers['id'] === v.id);
                  return { ...v, disabled: isManager };
                }
              }),
            })
          );
        })
      );
  }
}
