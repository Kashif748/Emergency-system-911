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
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';

import { ActivityDependenciesAction } from './dependencies.action';
import { BcActivityDependencyInternalControllerService } from 'src/app/api/services/bc-activity-dependency-internal-controller.service';
import { BcActivityDependencyExternalControllerService } from 'src/app/api/services/bc-activity-dependency-external-controller.service';
import { BcActivityDependencyOrgControllerService } from 'src/app/api/services/bc-activity-dependency-org-controller.service';
import { PageBcActivityDependencyInternal } from 'src/app/api/models/page-bc-activity-dependency-internal';
import { PageBcActivityDependencyExternal } from 'src/app/api/models/page-bc-activity-dependency-external';
import { PageBcActivityDependencyOrg } from 'src/app/api/models/page-bc-activity-dependency-org';

export enum DEPENDENCIES_TYPES {
  DEPENDENCY_ORG = 'DEPENDENCY_ORG',
  DEPENDENCY_INTERNAL = 'DEPENDENCY_INTERNAL',
  DEPENDENCY_EXTERNAL = 'DEPENDENCY_EXTERNAL',
}
export interface DependenciesFlags {
  DEPENDENCY_ORG: boolean;
  DEPENDENCY_INTERNAL: boolean;
  DEPENDENCY_EXTERNAL: boolean;
}

export interface ActivityDependenciesStateModel {
  activityDependencyInternal?: PageBcActivityDependencyInternal;
  activityDependencyExternal?: PageBcActivityDependencyExternal;
  activityDependencyOrg?: PageBcActivityDependencyOrg;

  loading?: DependenciesFlags;
  blocking: DependenciesFlags;
  noDepend: DependenciesFlags;
}

const ACTIVITY_DEPENDENCIES_STATE_TOKEN =
  new StateToken<ActivityDependenciesStateModel>('activityDependencies');

@State<ActivityDependenciesStateModel>({
  name: ACTIVITY_DEPENDENCIES_STATE_TOKEN,
  defaults: {
    loading: {
      DEPENDENCY_EXTERNAL: false,
      DEPENDENCY_ORG: false,
      DEPENDENCY_INTERNAL: false,
    },
    blocking: {
      DEPENDENCY_EXTERNAL: false,
      DEPENDENCY_ORG: false,
      DEPENDENCY_INTERNAL: false,
    },
    noDepend: {
      DEPENDENCY_EXTERNAL: false,
      DEPENDENCY_ORG: false,
      DEPENDENCY_INTERNAL: false,
    },
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ActivityDependenciesState {
  /**
   *
   */
  constructor(
    private activityDependencyInternal: BcActivityDependencyInternalControllerService,
    private activityDependencyExternal: BcActivityDependencyExternalControllerService,
    private activityDependencyOrg: BcActivityDependencyOrgControllerService
  ) {}

  /* ************************ SELECTORS ******************** */

  @Selector([ActivityDependenciesState])
  static activityDependencyInternal(state: ActivityDependenciesStateModel) {
    return state?.activityDependencyInternal.content;
  }

  @Selector([ActivityDependenciesState])
  static activityDependencyExternal(state: ActivityDependenciesStateModel) {
    return state?.activityDependencyExternal.content;
  }

  @Selector([ActivityDependenciesState])
  static activityDependencyOrg(state: ActivityDependenciesStateModel) {
    return state?.activityDependencyOrg.content;
  }

  @Selector([ActivityDependenciesState])
  static loading(state: ActivityDependenciesStateModel) {
    return state?.loading;
  }

  @Selector([ActivityDependenciesState])
  static blocking(state: ActivityDependenciesStateModel) {
    return state?.blocking;
  }
  @Selector([ActivityDependenciesState])
  static noDepend(state: ActivityDependenciesStateModel) {
    return state?.noDepend;
  }
  /* ********************** ACTIONS ************************* */
  /**
   * Dependencies Internal  actions
   */
  @Action(ActivityDependenciesAction.LoadDependencyInternal, {
    cancelUncompleted: true,
  })
  LoadDependencyInternal(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.LoadDependencyInternal
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        loading: patch({
          DEPENDENCY_INTERNAL: true,
        }),
      })
    );
    return this.activityDependencyInternal
      .search13({
        isActive: true,
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityDependenciesStateModel>({
              activityDependencyInternal:res.result,
              loading: patch({
                DEPENDENCY_INTERNAL: false,
              }),
              noDepend: patch({
                DEPENDENCY_INTERNAL: this.checkNoDepends(res.result?.content),
              }),
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              activityDependencyInternal: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              loading: patch({
                DEPENDENCY_INTERNAL: false,
              }),
            })
          );
        })
      );
  }
  @Action(ActivityDependenciesAction.CreateInternal)
  CreateInternal(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.CreateInternal
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        blocking: patch({
          DEPENDENCY_INTERNAL: true,
        }),
      })
    );

    return this.activityDependencyInternal
      .insertOne19({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              blocking: patch({
                DEPENDENCY_INTERNAL: false,
              }),
            })
          );
        })
      );
  }
  @Action(ActivityDependenciesAction.DeleteInternal, {
    cancelUncompleted: true,
  })
  DeleteInternal(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.DeleteInternal
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        loading: patch({
          DEPENDENCY_INTERNAL: true,
        }),
      })
    );
    return this.activityDependencyInternal
      .deleteById19({
        id: payload.id,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityDependenciesStateModel>({
              loading: patch({
                DEPENDENCY_INTERNAL: false,
              }),
            })
          );
        }),
        catchError(() => {
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              loading: patch({
                DEPENDENCY_INTERNAL: false,
              }),
            })
          );
        })
      );
  }

  /**
   * Dependencies Org  actions
   */
  @Action(ActivityDependenciesAction.LoadDependencyOrg, {
    cancelUncompleted: true,
  })
  LoadDependencyOrg(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.LoadDependencyOrg
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        loading: patch({
          DEPENDENCY_ORG: true,
        }),
      })
    );
    return this.activityDependencyOrg
      .search9({
        isActive: true,
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityDependenciesStateModel>({
              activityDependencyOrg: res.result,
              loading: patch({
                DEPENDENCY_ORG: false,
              }),
              noDepend: patch({
                DEPENDENCY_ORG: this.checkNoDepends(res.result?.content),
              }),
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              activityDependencyOrg: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              loading: patch({
                DEPENDENCY_ORG: false,
              }),
            })
          );
        })
      );
  }

  @Action(ActivityDependenciesAction.CreateOrg)
  CreateOrg(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.CreateOrg
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        blocking: patch({
          DEPENDENCY_ORG: true,
        }),
      })
    );

    return this.activityDependencyOrg
      .insertOne16({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              blocking: patch({
                DEPENDENCY_ORG: false,
              }),
            })
          );
        })
      );
  }
  @Action(ActivityDependenciesAction.DeleteOrg, {
    cancelUncompleted: true,
  })
  DeleteOrg(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.DeleteOrg
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        loading: patch({
          DEPENDENCY_ORG: true,
        }),
      })
    );
    return this.activityDependencyOrg
      .deleteById16({
        id: payload.id,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityDependenciesStateModel>({
              loading: patch({
                DEPENDENCY_ORG: false,
              }),
            })
          );
        }),
        catchError(() => {
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              loading: patch({
                DEPENDENCY_EXTERNAL: false,
              }),
            })
          );
        })
      );
  }

  /**
   * Dependencies External  actions
   */
  @Action(ActivityDependenciesAction.LoadDependencyExternal, {
    cancelUncompleted: true,
  })
  LoadDependencyExternal(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.LoadDependencyExternal
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        loading: patch({
          DEPENDENCY_EXTERNAL: true,
        }),
      })
    );
    return this.activityDependencyExternal
      .search10({
        isActive: true,
        cycleId: payload.cycleId,
        activityId: payload.activityId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityDependenciesStateModel>({
              activityDependencyExternal: res.result,
              loading: patch({
                DEPENDENCY_EXTERNAL: false,
              }),
              noDepend: patch({
                DEPENDENCY_EXTERNAL: this.checkNoDepends(res.result?.content),
              }),
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              activityDependencyExternal: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              loading: patch({
                DEPENDENCY_EXTERNAL: false,
              }),
            })
          );
        })
      );
  }
  @Action(ActivityDependenciesAction.CreateExternal)
  CreateExternal(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.CreateExternal
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        blocking: patch({
          DEPENDENCY_EXTERNAL: true,
        }),
      })
    );

    return this.activityDependencyExternal
      .insertOne16({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              blocking: patch({
                DEPENDENCY_EXTERNAL: false,
              }),
            })
          );
        })
      );
  }
  @Action(ActivityDependenciesAction.DeleteExternal, {
    cancelUncompleted: true,
  })
  DeleteExternal(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.DeleteExternal
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        loading: patch({
          DEPENDENCY_EXTERNAL: true,
        }),
      })
    );
    return this.activityDependencyExternal
      .deleteById16({
        id: payload.id,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ActivityDependenciesStateModel>({
              loading: patch({
                DEPENDENCY_EXTERNAL: false,
              }),
            })
          );
        }),
        catchError(() => {
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              loading: patch({
                DEPENDENCY_EXTERNAL: false,
              }),
            })
          );
        })
      );
  }

  checkNoDepends(dependencies: any[]): boolean {
    if (!dependencies || dependencies?.length == 0) return false;
    return dependencies.some((item) => item?.isFound == false);
  }
}
