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

export interface ActivityDependenciesStateModel {
  activityDependencyInternal: PageBcActivityDependencyInternal;
  activityDependencyExternal: PageBcActivityDependencyExternal;
  activityDependencyOrg: PageBcActivityDependencyOrg;

  loading: boolean;
  blocking: boolean;
}

const ACTIVITY_DEPENDENCIES_STATE_TOKEN =
  new StateToken<ActivityDependenciesStateModel>('activityDependencies');

@State<ActivityDependenciesStateModel>({
  name: ACTIVITY_DEPENDENCIES_STATE_TOKEN,
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
  // @Selector([ActivityDependenciesState])
  // static page(state: ActivityDependenciesStateModel): BcActivityDependencies[] {
  //   return state?.page?.content;
  // }

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

  /* ********************** ACTIONS ************************* */
  @Action(ActivityDependenciesAction.LoadDependencyInternal, {
    cancelUncompleted: true,
  })
  LoadDependencyInternal(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.LoadDependencyInternal
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        loading: true,
      })
    );
    return this.activityDependencyInternal
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
              activityDependencyInternal: res.result,
              loading: false,
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
              loading: false,
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
        blocking: true,
      })
    );

    return this.activityDependencyInternal
      .insertOne17({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ActivityDependenciesAction.LoadDependencyOrg, {
    cancelUncompleted: true,
  })
  LoadDependencyOrg(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.LoadDependencyOrg
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        loading: true,
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
              loading: false,
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
              loading: false,
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
        blocking: true,
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
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ActivityDependenciesAction.LoadDependencyExternal, {
    cancelUncompleted: true,
  })
  LoadDependencyExternal(
    { setState }: StateContext<ActivityDependenciesStateModel>,
    { payload }: ActivityDependenciesAction.LoadDependencyExternal
  ) {
    setState(
      patch<ActivityDependenciesStateModel>({
        loading: true,
      })
    );
    return this.activityDependencyExternal
      .search11({
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
              loading: false,
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
              loading: false,
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
        blocking: true,
      })
    );

    return this.activityDependencyExternal
      .insertOne18({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ActivityDependenciesStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
