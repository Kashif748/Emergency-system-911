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
import {IncidentLocationInfo} from "../../../api/models";
import {GroupCategoryCenterControllerService} from "../../../api/services/group-category-center-controller.service";
import {IncicentLocationInfoAction} from "@core/states/incident-location-info/incidentLocInfo.action";
import {GroupAction} from "@core/states/group/group.action";
import {UserState, UserStateModel} from "@core/states/user/user.state";


export interface ServiceCenterModel {
  /**
   * temporary state to store entities and select them once
   */
  incidentLocationInfo: IncidentLocationInfo;
  blocking: boolean;

  /**
   * temporary state to store entities and select them once
   */
}

const ROLE_STATE_TOKEN = new StateToken<ServiceCenterModel>('incidentLocInfo');
@State<ServiceCenterModel>({ name: ROLE_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class IncidentLocInfoState {
  /**
   *
   */
  constructor(
    private incidentLocInfo: GroupCategoryCenterControllerService,
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([IncidentLocInfoState])
  static centers(state: ServiceCenterModel) {
    return state?.incidentLocationInfo;
  }

  @Selector([IncidentLocInfoState])
  static blocking(state: ServiceCenterModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(IncicentLocationInfoAction.IncidentLocationInfo)
  incidentLocationInfo(
    { setState }: StateContext<ServiceCenterModel>,
    { payload }: IncicentLocationInfoAction.IncidentLocationInfo
  ) {
      return this.incidentLocInfo
        .update40({
          body: payload
        })
        .pipe(
          finalize(() => {
            setState(
              patch<ServiceCenterModel>({
                blocking: false,
              })
            );
          })
        );
  }

}
