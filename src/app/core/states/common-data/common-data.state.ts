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
import { finalize, tap } from 'rxjs/operators';
import { CommonDataProjection } from 'src/app/api/models';
import { CommonControllerService } from 'src/app/api/services';
import { CommonDataAction } from './common-data.action';
import { CommonService } from '@core/services/common.service';

export interface CommonDataStateModel {
  data: CommonDataProjection;
  loading: boolean;
}

const TASK_STATE_TOKEN = new StateToken<CommonDataStateModel>('common_data');
@State<CommonDataStateModel>({
  name: TASK_STATE_TOKEN,
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class CommonDataState {
  /**
   *
   */
  constructor(
    private commonDataService: CommonControllerService,
    private oldCommonDataService: CommonService
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([CommonDataState])
  static assetsCategories(state: CommonDataStateModel) {
    return state?.data?.assetsCategory;
  }

  @Selector([CommonDataState])
  static assetsGroups(state: CommonDataStateModel) {
    return state?.data?.assetsGroup;
  }

  @Selector([CommonDataState])
  static taskTypes(state: CommonDataStateModel) {
    return state?.data?.taskType;
  }

  @Selector([CommonDataState])
  static taskStatuses(state: CommonDataStateModel) {
    return state?.data?.taskStatus;
  }

  @Selector([CommonDataState])
  static priorities(state: CommonDataStateModel) {
    return state?.data?.priorities;
  }

  @Selector([CommonDataState])
  static currentUser(state: CommonDataStateModel) {
    return state?.data?.currentUserDetails;
  }

  @Selector([CommonDataState])
  static currentOrg(state: CommonDataStateModel) {
    return state?.data?.currentOrgDetails;
  }

  @Selector([CommonDataState])
  static entityTags(state: CommonDataStateModel) {
    return state?.data?.entityTags;
  }

  @Selector([CommonDataState])
  static currentGroup(state: CommonDataStateModel) {
    return state?.data?.currentGroupDetails;
  }
  @Selector([CommonDataState])
  static incidentStatus(state: CommonDataStateModel) {
    return state?.data?.incidentStatus;
  }

  @Selector([CommonDataState])
  static incidentCategories(state: CommonDataStateModel) {
    return state?.data?.incidentCategories;
  }

  @Selector([CommonDataState])
  static newsTypes(state: CommonDataStateModel) {
    return state?.data?.newsTypes;
  }

  /* ********************** ACTIONS ************************* */

  @Action(CommonDataAction.Load)
  load(
    { setState }: StateContext<CommonDataStateModel>,
    {}: CommonDataAction.Load
  ) {
    setState(
      patch<CommonDataStateModel>({
        loading: true,
      })
    );
    // return this.commonDataService.commonData()
    return this.oldCommonDataService.loadCommonData().pipe(
      tap(({ result: data }) => {
        setState(
          patch<CommonDataStateModel>({
            data,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<CommonDataStateModel>({
            loading: false,
          })
        );
      })
    );
  }
}
