import { Injectable } from '@angular/core';
import { MessageHelper } from '@core/helpers/message.helper';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { PageBcActivities } from '../../../api/models/page-bc-activities';
import { BcActivities } from '../../../api/models/bc-activities';
import { BcActivitiesControllerService } from '../../../api/services/bc-activities-controller.service';
import { OrgActivityAction } from '@core/states/org-activities/orgActivity.action';
import { ActivityFrquencyStateModel } from '@core/states/bc/activity-frquency/activity-frquency.state';

export interface OrgActivitiesStateModel {
  page: PageBcActivities;
  idsList: number[];
  orgActivity: BcActivities;
  loading: boolean;
  blocking: boolean;
}

const ORG_ACTIVITY_STATE_TOKEN = new StateToken<OrgActivitiesStateModel>(
  'orgActivity'
);
@State<OrgActivitiesStateModel>({
  name: ORG_ACTIVITY_STATE_TOKEN,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class OrgActivityState {
  /**
   *
   */
  constructor(
    private bcActivities: BcActivitiesControllerService,
    private messageHelper: MessageHelper,
    private store: Store
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([OrgActivityState])
  static idsList(state: OrgActivitiesStateModel) {
    return state?.idsList;
  }

  @Selector([OrgActivityState])
  static page(state: OrgActivitiesStateModel) {
    return state?.page?.content;
  }
  @Selector([OrgActivityState])
  static totalRecords(state: OrgActivitiesStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([OrgActivityState])
  static orgActivity(state: OrgActivitiesStateModel) {
    return state?.orgActivity;
  }

  @Selector([OrgActivityState])
  static loading(state: OrgActivitiesStateModel) {
    return state?.loading;
  }

  @Selector([OrgActivityState])
  static blocking(state: OrgActivitiesStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */

  @Action(OrgActivityAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<OrgActivitiesStateModel>,
    { payload }: OrgActivityAction.LoadPage
  ) {
    setState(
      patch<OrgActivitiesStateModel>({
        loading: true,
      })
    );
    return this.bcActivities
      .search28({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort ? payload.sort : ['id', 'desc'],
        },
        isActive: true,
        ...payload.filters,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<OrgActivitiesStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<OrgActivitiesStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<OrgActivitiesStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(OrgActivityAction.loadIdsList, { cancelUncompleted: true })
  loadIdsList(
    { setState }: StateContext<OrgActivitiesStateModel>,
    { payload }: OrgActivityAction.loadIdsList
  ) {
    return this.bcActivities
      .list11({
        cycleId: payload.cycleId,
        orgHierarchyId:payload.orgHierarchyId
      })
      .pipe(
        tap((res) => {
          setState(
            patch<OrgActivitiesStateModel>({
              idsList: res.result,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<OrgActivitiesStateModel>({
              idsList: [],
            })
          );
          return EMPTY;
        })
      );
  }

  @Action(OrgActivityAction.GetOrgActivities, { cancelUncompleted: true })
  getOrgActivities(
    { setState }: StateContext<OrgActivitiesStateModel>,
    { payload }: OrgActivityAction.GetOrgActivities
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<OrgActivitiesStateModel>({
          orgActivity: undefined,
        })
      );
      return;
    }
    setState(
      patch<OrgActivitiesStateModel>({
        blocking: true,
      })
    );
    return this.bcActivities.getOne37({ id: payload.id }).pipe(
      tap((res) => {
        setState(
          patch<OrgActivitiesStateModel>({
            orgActivity: res.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ActivityFrquencyStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(OrgActivityAction.Create)
  create(
    { setState }: StateContext<OrgActivitiesStateModel>,
    { payload }: OrgActivityAction.Create
  ) {
    setState(
      patch<OrgActivitiesStateModel>({
        blocking: true,
      })
    );
    return this.bcActivities
      .insertOne35({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<OrgActivitiesStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(OrgActivityAction.Update)
  update(
    { setState }: StateContext<OrgActivitiesStateModel>,
    { payload }: OrgActivityAction.Update
  ) {
    setState(
      patch<OrgActivitiesStateModel>({
        blocking: true,
      })
    );
    return this.bcActivities
      .update118({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<OrgActivitiesStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
